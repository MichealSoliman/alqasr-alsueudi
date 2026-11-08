const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

function getHtmlFiles(dir, files = []) {
  const skip = ['node_modules', '.git', '.vscode', 'components', 'src', 'dist', 'scratch', 'scripts', 'partials'];
  const items = fs.readdirSync(dir);
  for (const item of items) {
    if (skip.includes(item)) continue;
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      getHtmlFiles(full, files);
    } else if (item.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

const files = getHtmlFiles(root);
const rows = [];

files.forEach(file => {
  const rel = path.relative(root, file).replace(/\\/g, '/');
  const url = rel === 'index.html' ? '/' : '/' + rel.replace('/index.html', '') + '/';
  const html = fs.readFileSync(file, 'utf8');

  // Title
  const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';

  // Meta description
  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i) || html.match(/<meta\s+content="([^"]*)"\s+name="description"/i);
  const desc = descMatch ? descMatch[1].trim() : '';

  // Canonical
  const canonMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i);
  const canonical = canonMatch ? canonMatch[1].trim() : '';

  // H1
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : '';

  // Header and Footer links
  const headerMatch = html.match(/<!-- @header -->([\s\S]*?)<!-- \/@header -->/i);
  const headerLinks = headerMatch ? (headerMatch[1].match(/<a\s+[^>]*href=/gi) || []).length : 0;

  const footerMatch = html.match(/<!-- @footer -->([\s\S]*?)<!-- \/@footer -->/i);
  const footerLinks = footerMatch ? (footerMatch[1].match(/<a\s+[^>]*href=/gi) || []).length : 0;

  const totalInternalLinks = (html.match(/href="\/[^"]*"/g) || []).length;

  rows.push({
    url,
    title,
    titleLen: title.length,
    desc,
    descLen: desc.length,
    canonical,
    h1,
    headerLinks,
    footerLinks,
    totalInternalLinks
  });
});

const csv = 'URL,Title,TitleLength,Description,DescLength,Canonical,H1,HeaderLinks,FooterLinks,TotalInternalLinks\n' +
  rows.map(r => `"${r.url}","${r.title.replace(/"/g, '""')}",${r.titleLen},"${r.desc.replace(/"/g, '""')}",${r.descLen},"${r.canonical}","${r.h1.replace(/"/g, '""')}",${r.headerLinks},${r.footerLinks},${r.totalInternalLinks}`).join('\n');

fs.writeFileSync(path.join(root, 'audit-pages-v2.csv'), csv, 'utf8');
console.log('audit-pages-v2.csv generated successfully with', rows.length, 'pages.');

