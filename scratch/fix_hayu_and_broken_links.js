const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

function getHtmlFiles(dir, files = []) {
  const skip = ['node_modules', '.git', '.vscode', 'components', 'src', 'dist', 'scratch', 'scripts', 'partials'];
  const items = fs.readdirSync(dir);
  for (const item of items) {
    if (skip.includes(item)) continue;
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      getHtmlFiles(full, files);
    } else if (item.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

const files = getHtmlFiles(root);
let count = 0;

// List of neighborhood slugs that belong under /areas/
const hayuSlugs = [
  'hayu-albawadi', 'hayu-aleazizia', 'hayu-alfayha', 'hayu-alhamdania',
  'hayu-alhamraa', 'hayu-aljamiah', 'hayu-almarwa', 'hayu-alnaeim',
  'hayu-alnahda', 'hayu-alnakhil', 'hayu-alnasim', 'hayu-alrabwah',
  'hayu-alrawda', 'hayu-alrehab', 'hayu-alruwais', 'hayu-alsalama',
  'hayu-alsamer', 'hayu-alzahra', 'hayu-mushrifah', 'hayu-obhur-al-shamaliya'
];

files.forEach(file => {
  let html = fs.readFileSync(file, 'utf8');
  let original = html;

  // 1. Fix hayu-* links missing /areas/
  hayuSlugs.forEach(slug => {
    const reg = new RegExp(`href="/${slug}/?"`, 'g');
    html = html.replace(reg, `href="/areas/${slug}/"`);
  });

  // 2. Fix intercity links missing /areas/
  const intercitySlugs = [
    'jeddah-to-al-ahsa', 'jeddah-to-alshatea', 'jeddah-to-dammam', 'jeddah-to-jazan',
    'jeddah-to-jubail', 'jeddah-to-khamis-mushait', 'jeddah-to-khobar', 'jeddah-to-makkah',
    'jeddah-to-medina', 'jeddah-to-riyadh', 'jeddah-to-safa', 'jeddah-to-tabuk',
    'jeddah-to-taif', 'riyadh-to-jeddah'
  ];
  intercitySlugs.forEach(slug => {
    const reg = new RegExp(`href="/${slug}/?"`, 'g');
    html = html.replace(reg, `href="/areas/${slug}/"`);
  });

  // 3. Fix links to redirected URLs:
  // /blogs/furniture-storage-in-jeddah/ -> /furniture-storage-in-jeddah/
  html = html.replace(/href="\/blogs\/furniture-storage-in-jeddah\/?"/g, 'href="/furniture-storage-in-jeddah/"');
  // /best-furniture-moving-company-in-jeddah/ -> /
  html = html.replace(/href="\/best-furniture-moving-company-in-jeddah\/?"/g, 'href="/"');
  // /furniture-moving-jeddah/ -> /
  html = html.replace(/href="\/furniture-moving-jeddah\/?"/g, 'href="/"');
  // /furniture-moving-company-in-jeddah-and-riyadh/ -> /areas/jeddah-to-riyadh/
  html = html.replace(/href="\/furniture-moving-company-in-jeddah-and-riyadh\/?"/g, 'href="/areas/jeddah-to-riyadh/"');
  // /furniture-moving-in-jeddah/ -> /moving-furniture-inside-jeddah/
  html = html.replace(/href="\/furniture-moving-in-jeddah\/?"/g, 'href="/moving-furniture-inside-jeddah/"');
  // /intercity/ -> /furniture-moving-between-jeddah-cities/
  html = html.replace(/href="\/intercity\/?"/g, 'href="/furniture-moving-between-jeddah-cities/"');
  // /areas/jeddah-to-alkhabar/ -> /areas/jeddah-to-khobar/
  html = html.replace(/href="\/areas\/jeddah-to-alkhabar\/?"/g, 'href="/areas/jeddah-to-khobar/"');

  // Blogs that map to services
  html = html.replace(/href="\/blogs\/furniture-moving-prices-in-jeddah\/?"/g, 'href="/furniture-moving-prices-in-jeddah/"');
  html = html.replace(/href="\/blogs\/furniture-dismantling-and-assembly-in-jeddah\/?"/g, 'href="/furniture-dismantling-and-assembly-in-jeddah/"');
  html = html.replace(/href="\/blogs\/furniture-packing-in-jeddah\/?"/g, 'href="/furniture-packing-in-jeddah/"');
  html = html.replace(/href="\/blogs\/furniture-moving-for-offices-and-companies\/?"/g, 'href="/moving-offices-in-jeddah/"');
  html = html.replace(/href="\/blogs\/best-furniture-moving-north-jeddah\/?"/g, 'href="/north-jeddah-furniture-moving/"');
  html = html.replace(/href="\/blogs\/cheap-furniture-moving-in-jeddah\/?"/g, 'href="/furniture-moving-prices-in-jeddah/"');

  if (html !== original) {
    fs.writeFileSync(file, html, 'utf8');
    count++;
  }
});

console.log(`fix_hayu_and_broken_links.js: Updated links in ${count} files.`);

