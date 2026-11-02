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
let variations = new Set();
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const mmIdx = content.indexOf('id="mobile-menu"');
  if (mmIdx === -1) continue;
  const ulMatch = content.slice(mmIdx, mmIdx + 300).match(/<ul[^>]*>/);
  if (ulMatch) {
    variations.add(ulMatch[0]);
  }
}
console.log('Mobile menu ul variations:');
for (const v of variations) {
  console.log(v);
}
