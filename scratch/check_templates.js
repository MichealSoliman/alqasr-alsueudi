const fs = require('fs');
const c = fs.readFileSync('index.html', 'utf8');
const idx = c.indexOf('Contextual N');
console.log(c.slice(idx, idx + 1000));
