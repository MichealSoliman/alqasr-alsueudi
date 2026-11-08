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
let count = 0;

files.forEach(file => {
  let html = fs.readFileSync(file, 'utf8');
  let original = html;

  // Replace /blogs/best-furniture-moving-company-in-jeddah/ with /
  html = html.replace(/href="\/blogs\/best-furniture-moving-company-in-jeddah\/?"/g, 'href="/"');

  // Replace /blogs/cheap-furniture-moving-jeddah/ with /furniture-moving-prices-in-jeddah/
  html = html.replace(/href="\/blogs\/cheap-furniture-moving-jeddah\/?"/g, 'href="/furniture-moving-prices-in-jeddah/"');

  // Replace other orphaned old blog links if any
  html = html.replace(/href="\/blogs\/cheapest-furniture-moving-company-in-jeddah\/?"/g, 'href="/furniture-moving-prices-in-jeddah/"');
  html = html.replace(/href="\/blogs\/cheap-dyna-furniture-moving-jeddah\/?"/g, 'href="/dyna-furniture-moving-jeddah/"');
  html = html.replace(/href="\/blogs\/best-moving-company-jeddah\/?"/g, 'href="/"');

  if (html !== original) {
    fs.writeFileSync(file, html, 'utf8');
    count++;
  }
});

console.log(`fix_remaining_blog_links.js: Cleaned links in ${count} files.`);

