const fs = require('fs');
const path = require('path');

const sitemapPath = path.resolve(__dirname, '../sitemap.xml');
let sm = fs.readFileSync(sitemapPath, 'utf8');

// 1. Remove priority and changefreq tags if any
sm = sm.replace(/<priority>[\s\S]*?<\/priority>\s*/gi, '');
sm = sm.replace(/<changefreq>[\s\S]*?<\/changefreq>\s*/gi, '');

// 2. Add /contact/ if not already present
if (!sm.includes('https://alqasr-alsueudi.com/contact/')) {
  const contactEntry = `  <url>\n    <loc>https://alqasr-alsueudi.com/contact/</loc>\n    <lastmod>2026-11-08</lastmod>\n  </url>\n`;
  sm = sm.replace('</urlset>', contactEntry + '</urlset>');
}

// 3. Ensure gallery is not in sitemap (since it is noindex)
if (sm.includes('https://alqasr-alsueudi.com/gallery/')) {
  sm = sm.replace(/<url>\s*<loc>https:\/\/alqasr-alsueudi\.com\/gallery\/<\/loc>[\s\S]*?<\/url>\s*/gi, '');
}

fs.writeFileSync(sitemapPath, sm, 'utf8');
console.log('sitemap.xml successfully cleaned and updated with contact page!');
