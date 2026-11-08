const fs = require('fs');
const path = require('path');

const p = path.resolve(__dirname, '../index.html');
let html = fs.readFileSync(p, 'utf8');
html = html.replace(/<link\s+rel=["']icon["'][^>]*favicon-32\.png[^>]*>\s*/gi, '');
fs.writeFileSync(p, html, 'utf8');
console.log('Removed missing favicon-32.png link from index.html');

