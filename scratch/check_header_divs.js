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
let issues = [];
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const hStart = content.indexOf('<header');
  if (hStart === -1) continue;
  const hEnd = content.indexOf('</header>', hStart);
  if (hEnd === -1) {
    issues.push({ file, error: 'No </header>' });
    continue;
  }
  const headerHtml = content.slice(hStart, hEnd + 9);
  
  // Check div balance inside header
  const openDivs = (headerHtml.match(/<div\b/gi) || []).length;
  const closeDivs = (headerHtml.match(/<\/div>/gi) || []).length;
  
  // Check if mobile-menu has w-full
  const hasWFull = headerHtml.includes('id="mobile-menu"') && headerHtml.includes('id="mobile-menu" class="') && headerHtml.match(/id="mobile-menu"[^>]*w-full/);
  
  if (openDivs !== closeDivs) {
    issues.push({ file, error: `Div mismatch: opens=${openDivs}, closes=${closeDivs}` });
  }
}
console.log('Total files checked:', files.length);
console.log('Issues found:', issues.length);
issues.forEach(i => console.log(i.file, i.error));
