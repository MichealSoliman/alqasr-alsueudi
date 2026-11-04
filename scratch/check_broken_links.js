const fs = require('fs');
const path = require('path');

function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (file === 'node_modules' || file === '.git' || file === 'dist') continue;
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getAllHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const rootDir = path.resolve(__dirname, '..');
const htmlFiles = getAllHtmlFiles(rootDir);
console.log('Total HTML files to scan:', htmlFiles.length);

const brokenLinks = [];

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const hrefMatches = content.matchAll(/href=["'](\/[^"'#?]+|\.\.?\/[^"'#?]+)["']/g);
  for (const m of hrefMatches) {
    const rawLink = m[1];
    if (rawLink.startsWith('http') || rawLink.startsWith('tel:') || rawLink.startsWith('mailto:') || rawLink.startsWith('#')) continue;
    if (rawLink.endsWith('.css') || rawLink.endsWith('.js') || rawLink.endsWith('.png') || rawLink.endsWith('.webp') || rawLink.endsWith('.ico') || rawLink.endsWith('.xml')) continue;
    
    // Resolve target path
    let targetPath;
    if (rawLink.startsWith('/')) {
      targetPath = path.join(rootDir, rawLink);
    } else {
      targetPath = path.resolve(path.dirname(file), rawLink);
    }
    
    // Check if target directory or index.html exists
    const exists = fs.existsSync(targetPath) || fs.existsSync(targetPath + '.html') || fs.existsSync(path.join(targetPath, 'index.html'));
    if (!exists) {
      brokenLinks.push({
        source: path.relative(rootDir, file),
        link: rawLink,
        resolved: targetPath
      });
    }
  }
});

console.log('Broken internal links found:', brokenLinks.length);
brokenLinks.forEach(b => console.log(`In ${b.source} -> Broken link: ${b.link}`));

