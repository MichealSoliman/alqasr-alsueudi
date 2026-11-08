const fs = require('fs');
const path = require('path');

const sitemapPath = path.resolve(__dirname, '../sitemap.xml');
let sm = fs.readFileSync(sitemapPath, 'utf8');

const updatedUrls = [
  'https://alqasr-alsueudi.com/moving-electrical-appliances-in-jeddah/',
  'https://alqasr-alsueudi.com/furniture-storage-in-jeddah/',
  'https://alqasr-alsueudi.com/furniture-moving-prices-in-jeddah/',
  'https://alqasr-alsueudi.com/furniture-dismantling-and-assembly-in-jeddah/',
  'https://alqasr-alsueudi.com/disassembly-and-assembly-of-bedrooms/',
  'https://alqasr-alsueudi.com/services/'
];

updatedUrls.forEach(url => {
  const reg = new RegExp(`(<loc>${url.replace(/\//g, '\\/')}<\\/loc>\\s*<lastmod>)[^<]+(<\\/lastmod>)`, 'gi');
  sm = sm.replace(reg, `$12026-11-08$2`);
});

fs.writeFileSync(sitemapPath, sm, 'utf8');
console.log('sitemap.xml updated with lastmod 2026-11-08 for the 5 modified pages and services!');

