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
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const mmIdx = content.indexOf('id="mobile-menu"');
  if (mmIdx === -1) {
    console.log('NO mobile-menu:', file);
    continue;
  }
  // Check the HTML 300 chars before mobile-menu
  const before = content.slice(Math.max(0, mmIdx - 300), mmIdx);
  // Count unclosed divs in `before`
  const lastHeader = content.lastIndexOf('<header', mmIdx);
  const headerToMm = content.slice(lastHeader, mmIdx);
  
  // Find opening divs and closing divs
  const opens = (headerToMm.match(/<div\b/gi) || []).length;
  const closes = (headerToMm.match(/<\/div>/gi) || []).length;
  console.log(`${file}: header-to-mobileMenu opens=${opens}, closes=${closes}, diff=${opens - closes}`);
}
