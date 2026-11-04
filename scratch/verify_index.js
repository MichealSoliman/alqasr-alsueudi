const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const title = (html.match(/<title>(.*?)<\/title>/i) || [])[1];
const desc = (html.match(/<meta name="description" content="(.*?)">/i) || [])[1];

console.log('Title:', title);
console.log('Desc:', desc);
console.log('Desc Length:', desc ? desc.length : 0);

// Check JSON-LD
const schemaMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
if (schemaMatch) {
    try {
        const parsed = JSON.parse(schemaMatch[1]);
        console.log('JSON-LD is VALID JSON! Graph items:', parsed['@graph'].length);
        parsed['@graph'].forEach((item, i) => console.log(`  Item ${i + 1}: ${item['@type']}`));
    } catch (e) {
        console.error('JSON-LD parsing error:', e.message);
    }
} else {
    console.log('No JSON-LD found');
}

// Check placeholders
const placeholders = html.match(/\[\[[A-Z_]+\]\]/g);
console.log('Placeholders found in index.html:', [...new Set(placeholders)]);

// Check H1 count
const h1s = html.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi);
console.log('H1 count:', h1s ? h1s.length : 0);
if (h1s) console.log('H1:', h1s[0].replace(/<[^>]+>/g, '').trim());

// Check main wrapper
console.log('Has <main id="main-content">:', html.includes('<main id="main-content">'));
console.log('Has </main> before footer:', html.includes('</main>\n\n    <div id="site-footer"'));

// Check skip link
console.log('Has skip link:', html.includes('href="#main-content"'));

