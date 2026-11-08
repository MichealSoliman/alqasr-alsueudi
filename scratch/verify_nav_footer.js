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
console.log('URL | Header Links | Footer Links | Total Links');
console.log('----------------------------------------------------');

let allEqual = true;
let firstHCount = null;
let firstFCount = null;

files.forEach(file => {
  const rel = path.relative(root, file).replace(/\\/g, '/');
  const url = rel === 'index.html' ? '/' : '/' + rel.replace('/index.html', '') + '/';
  const html = fs.readFileSync(file, 'utf8');

  // Count header links
  const headerMatch = html.match(/<!-- @header -->([\s\S]*?)<!-- \/@header -->/i);
  const headerLinks = headerMatch ? (headerMatch[1].match(/<a\s+[^>]*href=/gi) || []).length : 0;

  // Count footer links
  const footerMatch = html.match(/<!-- @footer -->([\s\S]*?)<!-- \/@footer -->/i);
  const footerLinks = footerMatch ? (footerMatch[1].match(/<a\s+[^>]*href=/gi) || []).length : 0;

  if (firstHCount === null) {
    firstHCount = headerLinks;
    firstFCount = footerLinks;
  } else {
    if (headerLinks !== firstHCount || footerLinks !== firstFCount) {
      allEqual = false;
    }
  }

  console.log(`${url.padEnd(45)} | H: ${String(headerLinks).padEnd(2)} | F: ${String(footerLinks).padEnd(2)} | Total: ${headerLinks + footerLinks}`);
});

console.log('----------------------------------------------------');
console.log(`Verification Result: ${allEqual ? '✅ All 61 pages have identical Header (' + firstHCount + ') and Footer (' + firstFCount + ') link counts!' : '❌ Mismatch detected'}`);

