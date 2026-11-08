const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

const targetPages = [
  '/moving-electrical-appliances-in-jeddah/',
  '/furniture-storage-in-jeddah/',
  '/furniture-moving-prices-in-jeddah/',
  '/furniture-dismantling-and-assembly-in-jeddah/',
  '/disassembly-and-assembly-of-bedrooms/'
];

console.log('URL | Title | Meta Length | H1 | Words | Links | Schema Types');
console.log('-------------------------------------------------------------------------------------');

targetPages.forEach(p => {
  const filePath = path.join(root, p.replace(/^\//, ''), 'index.html');
  const html = fs.readFileSync(filePath, 'utf8');

  const title = (html.match(/<title[^>]*>(.*?)<\/title>/i) || [])[1] || '';
  const desc = (html.match(/<meta\s+name="description"\s+content="([^"]*)"/i) || [])[1] || '';
  const h1 = ((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [])[1] || '').replace(/<[^>]+>/g, '').trim();

  // Word count
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const words = text.split(' ').filter(w => w.length > 2).length;

  // Link count
  const links = (html.match(/href="\/[^"]*"/g) || []).length;

  // Schemas
  const schemas = html.match(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi) || [];
  const types = [];
  schemas.forEach(s => {
    try {
      const parsed = JSON.parse(s.replace(/<script[^>]+>|<\/script>/gi, ''));
      const items = parsed['@graph'] ? parsed['@graph'] : [parsed];
      items.forEach(it => { if (it && it['@type']) types.push(it['@type']); });
    } catch(e) {}
  });

  console.log(`${p}`);
  console.log(`  Title (${title.length}c): ${title}`);
  console.log(`  Meta (${desc.length}c): ${desc}`);
  console.log(`  H1: ${h1}`);
  console.log(`  Words: ${words} | Links: ${links} | Schema: ${types.join(', ')}`);
});

