const fs = require('fs');
const path = require('path');

function walk(dir) {
  let res = [];
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory() && f.name !== 'node_modules' && f.name !== '.git') res = res.concat(walk(p));
    else if (f.isFile() && p.endsWith('.html')) res.push(p);
  }
  return res;
}

const files = walk('.');
let updated = 0;
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('id="mobile-menu"')) continue;
  
  // Ensure w-full is on mobile-menu div
  const newContent = content.replace(/id="mobile-menu"\s+class="([^"]*)"/g, (match, classes) => {
    if (!classes.includes('w-full')) {
      return `id="mobile-menu" class="${classes} w-full"`;
    }
    return match;
  });
  
  if (newContent !== content) {
    fs.writeFileSync(file, newContent, 'utf8');
    updated++;
  }
}
console.log('Updated w-full in', updated, 'files');
