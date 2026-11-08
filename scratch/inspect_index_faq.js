const fs = require('fs');
const path = require('path');

const p = path.resolve(__dirname, '../index.html');
const html = fs.readFileSync(p, 'utf8');

const q9Idx = html.indexOf('faq-ans-9');
console.log('q9Idx:', q9Idx);

const q1Idx = html.indexOf('faq-ans-1');
console.log('q1Idx:', q1Idx);

const bodyEndIdx = html.indexOf('</body>');
console.log('bodyEndIdx:', bodyEndIdx);

console.log('--- Content around q9Idx: ---');
console.log(html.substring(q9Idx - 100, q9Idx + 500));

