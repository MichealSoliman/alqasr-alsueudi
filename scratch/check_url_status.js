const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

const urlsToCheck = [
  '/blogs/furniture-moving-trucks-in-jeddah/',
  '/blogs/furniture-dismantling-and-assembly-in-jeddah/',
  '/blogs/furniture-moving-prices-in-jeddah/',
  '/blogs/furniture-packing-in-jeddah/',
  '/blogs/cheap-furniture-moving-in-jeddah/',
  '/blogs/furniture-moving-for-offices-and-companies/',
  '/blogs/best-furniture-moving-north-jeddah/',
  '/furniture-moving-company-in-jeddah-and-riyadh/',
  '/furniture-moving-in-jeddah/',
  '/intercity/',
  '/areas/jeddah-to-alkhabar/',
  '/index.html',
  '/blogs/index.html',
  '/services/index.html',
  '/about/index.html',
  '/contact/index.html',
  '/gallery/index.html'
];

const rows = [];

urlsToCheck.forEach(url => {
  // Check if file exists
  let checkPath = url;
  if (checkPath.endsWith('/')) checkPath += 'index.html';
  const filePath = path.join(root, checkPath.replace(/^\//, ''));
  const fileExists = fs.existsSync(filePath);

  let expectedStatus = '404';
  let canonical = 'N/A';
  let redirectTarget = 'None';

  if (fileExists) {
    expectedStatus = '200 OK';
    try {
      const html = fs.readFileSync(filePath, 'utf8');
      const canonMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i);
      if (canonMatch) canonical = canonMatch[1];
    } catch(e) {}
  } else {
    // Check .htaccess for 301 redirect
    const htaccess = fs.readFileSync(path.join(root, '.htaccess'), 'utf8');
    const slug = url.replace(/^\//, '').replace(/\/$/, '');
    const reg = new RegExp(`RewriteRule\\s+\\^${slug}\\/?\\$\\s+https:\\/\\/alqasr-alsueudi\\.com([^\\s]+)`, 'i');
    const m = htaccess.match(reg);
    if (m) {
      expectedStatus = '301 Redirect';
      redirectTarget = m[1];
    } else if (url.endsWith('index.html')) {
      expectedStatus = '301 Redirect (to clean slash URL)';
      redirectTarget = url.replace(/index\.html$/, '');
    }
  }

  rows.push({
    url,
    fileExists: fileExists ? 'Yes' : 'No',
    expectedStatus,
    redirectTarget,
    canonical
  });
});

const csv = 'URL,FileExists,ExpectedStatus,RedirectTarget,Canonical\n' +
  rows.map(r => `"${r.url}","${r.fileExists}","${r.expectedStatus}","${r.redirectTarget}","${r.canonical}"`).join('\n');

fs.writeFileSync(path.join(root, 'url-status.csv'), csv, 'utf8');
console.log('url-status.csv created successfully with', rows.length, 'records');

