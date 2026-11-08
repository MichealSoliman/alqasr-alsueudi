const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

// Check key deliverable files
const checks = [
  'contact/index.html',
  'gallery/index.html',
  'sitemap.xml',
  'robots.txt',
  'assets/css/main.min.css',
  'partials/header.html',
  'partials/footer.html',
  'build.js',
  'audit-pages.csv',
  'redirects-rules.md',
  'change-log.md',
  'tracking.md'
];

console.log('=== DELIVERABLE FILES ===');
checks.forEach(f => {
  const exists = fs.existsSync(path.join(root, f));
  console.log((exists ? '✅' : '❌') + ' ' + f);
});

// Check a few pages for key elements
console.log('\n=== PAGE CHECKS ===');
const pages = [
  'index.html',
  'areas/jeddah-to-riyadh/index.html',
  'furniture-dismantling-and-assembly-in-jeddah/index.html',
  'furniture-storage-in-jeddah/index.html',
  'north-jeddah-furniture-moving/index.html',
  'moving-offices-in-jeddah/index.html'
];
pages.forEach(p => {
  try {
    const html = fs.readFileSync(path.join(root, p), 'utf8');
    const hasAR = html.includes('aggregateRating');
    const hasBL = html.includes('BreadcrumbList');
    const hasDefer = html.includes('defer');
    const hasSkip = html.includes('skip-to') || html.includes('تخطى') || html.includes('skip-link');
    const hasGA4 = html.includes('gtag') || html.includes('GA4_ID') || html.includes('G-');
    console.log(p);
    console.log('  aggRating:', hasAR, '| Breadcrumb:', hasBL, '| defer:', hasDefer, '| skip:', hasSkip, '| GA4:', hasGA4);
  } catch(e) {
    console.log(p, 'ERROR:', e.message);
  }
});

