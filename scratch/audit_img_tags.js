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

  // Process all <img> tags
  let isFirstImg = true;
  html = html.replace(/<img\s+([^>]+)>/gi, (match, attrs) => {
    let newAttrs = attrs;

    // Check if alt exists
    if (!/alt=/i.test(newAttrs)) {
      newAttrs += ' alt="شركة القصر السعودي لنقل وتغليف الأثاث بجدة"';
    }

    // Add loading="lazy" to all images except the first visible one (hero/logo)
    if (isFirstImg) {
      isFirstImg = false;
      // First image doesn't get lazy, maybe fetchpriority="high"
      if (!/fetchpriority=/i.test(newAttrs)) {
        newAttrs += ' fetchpriority="high"';
      }
    } else {
      if (!/loading=/i.test(newAttrs)) {
        newAttrs += ' loading="lazy"';
      }
    }

    // Ensure width and height exist if missing
    if (!/width=/i.test(newAttrs) && !/height=/i.test(newAttrs)) {
      if (newAttrs.includes('logo')) {
        newAttrs += ' width="64" height="64"';
      } else {
        newAttrs += ' width="400" height="240"';
      }
    }

    return `<img ${newAttrs}>`;
  });

  if (html !== original) {
    fs.writeFileSync(file, html, 'utf8');
    count++;
  }
});

console.log(`audit_img_tags.js: Checked and updated image attributes in ${count} files.`);

