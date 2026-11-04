const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const s = html.indexOf('id="dyna-winch-fleet"');
console.log(html.slice(s, s + 3500));
