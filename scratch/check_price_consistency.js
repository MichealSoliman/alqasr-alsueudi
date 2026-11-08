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

  // Find all prices
  const matches = html.matchAll(/(?:تبدأ من|من|ابتداءً من)\s*([0-9]+)\s*ريال/gi);
  for (const m of matches) {
    const raw = m[0];
    const amount = parseInt(m[1]);
    const isCompliant = amount >= 250;
    rows.push({
      url,
      foundPrice: raw,
      amount,
      isCompliant: isCompliant ? 'Compliant' : 'VIOLATION'
    });
  }
});

const csv = 'URL,FoundText,Amount,ComplianceStatus\n' +
  rows.map(r => `"${r.url}","${r.foundPrice}",${r.amount},"${r.isCompliant}"`).join('\n');

fs.writeFileSync(path.join(root, 'price-consistency.csv'), csv, 'utf8');
console.log(`price-consistency.csv generated with ${rows.length} price occurrences.`);
const violations = rows.filter(r => r.isCompliant === 'VIOLATION');
console.log(`Total violations (< 250 SAR): ${violations.length}`);
if (violations.length > 0) {
  console.log('Sample violations:', violations.slice(0, 10));
}

