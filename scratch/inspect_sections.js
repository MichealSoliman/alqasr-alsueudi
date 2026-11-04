const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const s = html.indexOf('aria-labelledby="testimonials-heading"');
const e = html.indexOf('</section>', s);
console.log(html.slice(s - 50, e + 10));
