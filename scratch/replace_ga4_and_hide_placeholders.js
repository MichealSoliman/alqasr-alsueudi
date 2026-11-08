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

files.forEach(file => {
  let html = fs.readFileSync(file, 'utf8');
  let original = html;

  // 1. Remove inline GA4 snippet
  html = html.replace(/<!-- Google Analytics 4 -->[\s\S]*?<!-- End GA4 -->\s*/gi, '');
  html = html.replace(/<script async src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=\[\[GA4_ID\]\]"><\/script>\s*<script>[\s\S]*?gtag\('config',\s*'\[\[GA4_ID\]\]'[\s\S]*?<\/script>\s*/gi, '');

  // 2. Add /assets/js/analytics.js defer script before </head> or before navbar.js
  if (!html.includes('/assets/js/analytics.js')) {
    html = html.replace('</head>', '    <script src="/assets/js/analytics.js" defer></script>\n</head>');
  }

  // 3. E.1: Hide visible placeholders in HTML body using HTML comments or fallback text
  // Replace [[STREET_ADDRESS]] with placeholder text or comment
  html = html.replace(/\[\[STREET_ADDRESS\]\]/g, '<!-- [[STREET_ADDRESS]] -->جدة، المملكة العربية السعودية');
  html = html.replace(/\[\[GOOGLE_MAPS_EMBED_URL\]\]/g, '<!-- [[GOOGLE_MAPS_EMBED_URL]] -->');
  html = html.replace(/\[\[POSTAL_CODE\]\]/g, '<!-- [[POSTAL_CODE]] -->');
  html = html.replace(/\[\[CR_NO\]\]/g, '<!-- [[CR_NO]] -->');
  html = html.replace(/\[\[LICENSE_NO\]\]/g, '<!-- [[LICENSE_NO]] -->');

  if (html !== original) {
    fs.writeFileSync(file, html, 'utf8');
    count++;
  }
});

console.log(`replace_ga4_and_hide_placeholders.js: Processed ${count} files.`);

