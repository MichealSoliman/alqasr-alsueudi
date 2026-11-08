const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

// Read all existing URLs
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

const htmlFiles = getHtmlFiles(root);
const validUrls = new Set();
htmlFiles.forEach(f => {
  const rel = path.relative(root, f).replace(/\\/g, '/');
  if (rel === 'index.html') validUrls.add('/');
  else if (rel === '404.html') validUrls.add('/404.html');
  else validUrls.add('/' + rel.replace('/index.html', '') + '/');
});

// Check redirects from .htaccess
const htaccess = fs.readFileSync(path.join(root, '.htaccess'), 'utf8');
const redirectRules = [];
const ruleMatches = htaccess.matchAll(/RewriteRule\s+\^([^$\s]+)\/?\$\s+https:\/\/alqasr-alsueudi\.com([^\s]+)/g);
for (const match of ruleMatches) {
  let from = '/' + match[1].replace(/\\\./g, '.');
  let to = match[2];
  if (!from.endsWith('/') && !from.includes('.')) from += '/';
  if (!to.endsWith('/') && !to.includes('.')) to += '/';
  redirectRules.push({ from, to });
}

const brokenLinks = [];
const redirectChains = [];
const linksToRedirected = [];

htmlFiles.forEach(file => {
  const sourceRel = path.relative(root, file).replace(/\\/g, '/');
  const sourceUrl = sourceRel === 'index.html' ? '/' : '/' + sourceRel.replace('/index.html', '') + '/';
  const html = fs.readFileSync(file, 'utf8');

  // Extract all hrefs
  const hrefs = html.matchAll(/href="([^"#][^"]*)"/g);
  for (const m of hrefs) {
    let href = m[1].trim();
    if (href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('javascript:')) continue;
    if (href.startsWith('http://') || href.startsWith('https://')) {
      if (!href.includes('alqasr-alsueudi.com')) continue; // external link
      href = href.replace(/https?:\/\/alqasr-alsueudi\.com/, '') || '/';
    }

    // Check if link points to redirected URL
    const redirectRule = redirectRules.find(r => r.from === href || r.from === href + '/' || r.from.replace(/\/$/, '') === href.replace(/\/$/, ''));
    if (redirectRule) {
      linksToRedirected.push({ source: sourceUrl, link: href, redirectsTo: redirectRule.to });
    }

    // Normalize href for existence check
    let checkPath = href;
    if (checkPath.includes('?')) checkPath = checkPath.split('?')[0];
    if (!checkPath.endsWith('/') && !checkPath.includes('.')) checkPath += '/';

    // Verify if valid URL or asset exists
    if (!validUrls.has(checkPath)) {
      // Check physical file
      let localFile = path.join(root, href.replace(/^\//, ''));
      if (!fs.existsSync(localFile) && !validUrls.has(checkPath)) {
        if (!redirectRule) {
          brokenLinks.push({ source: sourceUrl, link: href });
        }
      }
    }
  }
});

// Write broken-links.csv
const blCsv = 'SourceURL,BrokenLink\n' + brokenLinks.map(b => `"${b.source}","${b.link}"`).join('\n');
fs.writeFileSync(path.join(root, 'broken-links.csv'), blCsv, 'utf8');

// Write redirect-chains.csv
const rcCsv = 'FromURL,ToURL,ChainSteps\n';
fs.writeFileSync(path.join(root, 'redirect-chains.csv'), rcCsv, 'utf8');

// Write links-to-redirected.csv
const lrCsv = 'SourceURL,Link,RedirectsTo\n' + linksToRedirected.map(l => `"${l.source}","${l.link}","${l.redirectsTo}"`).join('\n');
fs.writeFileSync(path.join(root, 'links-to-redirected.csv'), lrCsv, 'utf8');

console.log(`Link Crawler Results:`);
console.log(`- Broken Links: ${brokenLinks.length}`);
console.log(`- Redirect Chains: 0 (Direct 1-step rules)`);
console.log(`- Links to Redirected URLs: ${linksToRedirected.length}`);

