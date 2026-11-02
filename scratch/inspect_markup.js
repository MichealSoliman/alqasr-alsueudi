const fs = require('fs');

const files = ['dyna-furniture-moving-jeddah/index.html', 'index.html', 'services/index.html'];
for (const f of files) {
  const c = fs.readFileSync(f, 'utf8');
  const mm = c.indexOf('id="mobile-menu"');
  console.log('=== ' + f + ' ===');
  console.log(c.slice(Math.max(0, mm - 250), mm + 120));
}
