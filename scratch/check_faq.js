const fs = require('fs');
const path = require('path');

function walk(dir) {
  let res = [];
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory() && f.name !== 'node_modules' && f.name !== '.git') {
      res = res.concat(walk(p));
    } else if (f.isFile() && (p.endsWith('.html') || p.endsWith('.js') || p.endsWith('.css'))) {
      res.push(p);
    }
  }
  return res;
}

for (const file of walk('.')) {
  const c = fs.readFileSync(file, 'utf8');
  const lines = c.split('\n');
  lines.forEach((line, idx) => {
    if (line.includes('الأسئلة الشائعة') && (line.includes('rounded') || line.includes('bg-') || line.includes('active'))) {
      console.log(`${file}:${idx + 1}: ${line.trim()}`);
    }
  });
}
