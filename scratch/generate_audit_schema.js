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

  const schemas = html.match(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi) || [];
  const types = [];

  schemas.forEach(s => {
    try {
      const raw = s.replace(/<script[^>]+>|<\/script>/gi, '');
      const json = JSON.parse(raw);
      const items = json['@graph'] ? json['@graph'] : [json];
      items.forEach(it => {
        if (it && it['@type']) types.push(it['@type']);
      });
    } catch(e) {}
  });

  const hasBreadcrumb = types.includes('BreadcrumbList');
  const faqCount = types.filter(t => t === 'FAQPage').length;

  rows.push({
    url,
    types: types.join('; '),
    hasBreadcrumb: hasBreadcrumb ? 'Yes' : 'No',
    faqCount
  });
});

const csv = 'URL,Types,HasBreadcrumb,FAQPageCount\n' +
  rows.map(r => `"${r.url}","${r.types}","${r.hasBreadcrumb}",${r.faqCount}`).join('\n');

fs.writeFileSync(path.join(root, 'audit-schema.csv'), csv, 'utf8');
console.log('audit-schema.csv generated with', rows.length, 'pages.');

