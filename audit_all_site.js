const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (['node_modules', '.git', 'dist', 'components'].includes(file)) continue;
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      results = results.concat(getHtmlFiles(full));
    } else if (file.endsWith('.html')) {
      results.push(full);
    }
  }
  return results;
}

const files = getHtmlFiles('.');
console.log('Total HTML files:', files.length);

const issues = [];
for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const titleMatch = content.match(/<title>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';

  const descMatch = content.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
                    content.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
  const desc = descMatch ? descMatch[1].trim() : '';

  const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ') : '';

  const canonicalMatch = content.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
  const canonical = canonicalMatch ? canonicalMatch[1].trim() : '';

  const hasPhoneInTitle = /\d{7,}/.test(title);
  const hasOldDropdown = content.includes('w-64 bg-white border border-gray-100 rounded-xl');
  const isMissingH1 = !h1;
  const isMissingDesc = !desc;
  const isMissingCanonical = !canonical;

  if (hasPhoneInTitle || hasOldDropdown || isMissingH1 || isMissingDesc || isMissingCanonical) {
    issues.push({
      file: f.replace(/\\/g, '/'),
      title,
      hasPhoneInTitle,
      hasOldDropdown,
      isMissingH1,
      isMissingDesc,
      isMissingCanonical
    });
  }
}

console.log('Files with issues:', issues.length);
console.log(JSON.stringify(issues, null, 2));
