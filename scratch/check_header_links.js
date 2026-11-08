const fs = require('fs');
const path = require('path');

const h = fs.readFileSync(path.resolve(__dirname, 'root_header.html'), 'utf8');
const links = h.match(/href="[^"]*"/g) || [];
console.log('Links in root_header:', links.length);
links.forEach(l => console.log('  ', l));

