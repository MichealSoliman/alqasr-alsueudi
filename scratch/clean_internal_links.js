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

  // Replace full domain internal links
  html = html.replace(/href="https?:\/\/alqasr-alsueudi\.com(\/[^"]*)"/g, 'href="$1"');

  // Replace href="../" and href="./"
  // For relative paths like href="../services/" or href="./about/"
  html = html.replace(/href="\.\.\/([^"]*)"/g, (m, p) => {
    let clean = p.replace(/^(\.\.\/)+/, '');
    return 'href="/' + clean + '"';
  });
  html = html.replace(/href="\.\/([^"]*)"/g, 'href="/$1"');

  // Remove index.html from hrefs
  html = html.replace(/href="([^"]*)\/index\.html"/g, 'href="$1/"');
  html = html.replace(/href="\/index\.html"/g, 'href="/"');

  // Ensure trailing slash on directory-style internal links (not files with extensions like .css, .js, .webp, .png, etc.)
  html = html.replace(/href="(\/[a-zA-Z0-9_\-]+(?:\/[a-zA-Z0-9_\-]+)*)"/g, (m, p) => {
    if (p.includes('.') || p.startsWith('//') || p === '/') return m;
    return `href="${p}/"`;
  });

  if (html !== original) {
    fs.writeFileSync(file, html, 'utf8');
    count++;
  }
});

console.log(`clean_internal_links.js: Cleaned internal links in ${count} files.`);

