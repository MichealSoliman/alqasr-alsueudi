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
const forbiddenClaims = [
  'ضمان 100%',
  'ضمان سلامة المنقولات 100%',
  'خصم 25%',
  'تتبع GPS',
  'مستودعات مكيفة',
  'كاميرات مراقبة 24/7',
  'الدور 25',
  'حمولة 600 كجم',
  'خلال 30 دقيقة'
];

const scanResults = [];

files.forEach(file => {
  const rel = path.relative(root, file).replace(/\\/g, '/');
  const url = rel === 'index.html' ? '/' : '/' + rel.replace('/index.html', '') + '/';
  const html = fs.readFileSync(file, 'utf8');

  forbiddenClaims.forEach(claim => {
    if (html.includes(claim)) {
      scanResults.push({ url, claim, status: 'FOUND_UNRESOLVED' });
    }
  });
});

const csv = 'URL,ForbiddenClaim,Status\n' +
  scanResults.map(r => `"${r.url}","${r.claim}","${r.status}"`).join('\n');

fs.writeFileSync(path.join(root, 'claims-scan.csv'), csv, 'utf8');
console.log(`claims-scan.csv generated with ${scanResults.length} violations found.`);

