const fs = require('fs');
const path = require('path');

const root = __dirname;
const headerContent = fs.readFileSync(path.join(root, 'partials/header.html'), 'utf8');
const footerContent = fs.readFileSync(path.join(root, 'partials/footer.html'), 'utf8');

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

  // Replace Header
  if (html.includes('<!-- @header -->')) {
    html = html.replace(/<!-- @header -->[\s\S]*?<!-- \/@header -->/i, `<!-- @header -->\n${headerContent}\n<!-- /@header -->`);
  } else if (html.includes('<header')) {
    html = html.replace(/<header[\s\S]*?<\/header>/i, `<!-- @header -->\n${headerContent}\n<!-- /@header -->`);
  }

  // Replace Footer
  if (html.includes('<!-- @footer -->')) {
    html = html.replace(/<!-- @footer -->[\s\S]*?<!-- \/@footer -->/i, `<!-- @footer -->\n${footerContent}\n<!-- /@footer -->`);
  } else if (html.includes('<footer')) {
    html = html.replace(/<footer[\s\S]*?<\/footer>/i, `<!-- @footer -->\n${footerContent}\n<!-- /@footer -->`);
  }

  if (html !== original) {
    fs.writeFileSync(file, html, 'utf8');
    count++;
  }
});

console.log(`build.js completed: Injected header and footer into ${count} files.`);

