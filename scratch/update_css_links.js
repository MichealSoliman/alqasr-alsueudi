const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
function getHtmlFiles(dir, files = []) {
  const skip = ['node_modules', '.git', '.vscode', 'components', 'src', 'dist', 'scratch', 'scripts'];
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
for (const file of files) {
  let html = fs.readFileSync(file, 'utf8');
  let original = html;

  // Remove cairo-latin preload
  html = html.replace(/<link\s+rel=["']preload["'][^>]*cairo-latin\.woff2[^>]*>\s*/gi, '');

  // Consolidate CSS to main.min.css
  if (html.includes('dist/style.css') || html.includes('assets/css/style.css')) {
    html = html.replace(/<link[^>]+href=["'][^"']*dist\/style\.css["'][^>]*>\s*<link[^>]+href=["'][^"']*assets\/css\/style\.css["'][^>]*>/i, '<link rel="stylesheet" href="/assets/css/main.min.css">');
    html = html.replace(/<link[^>]+href=["'][^"']*assets\/css\/style\.css["'][^>]*>\s*<link[^>]+href=["'][^"']*dist\/style\.css["'][^>]*>/i, '<link rel="stylesheet" href="/assets/css/main.min.css">');

    // Individual leftover instances
    html = html.replace(/<link[^>]+href=["'][^"']*dist\/style\.css["'][^>]*>/i, '<link rel="stylesheet" href="/assets/css/main.min.css">');
    html = html.replace(/<link[^>]+href=["'][^"']*assets\/css\/style\.css["'][^>]*>\s*/i, '');
  }

  if (html !== original) {
    fs.writeFileSync(file, html, 'utf8');
    count++;
  }
}

console.log('Updated CSS and font preload in', count, 'files');

