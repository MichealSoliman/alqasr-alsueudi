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
const providerObj = {
  "@type": "MovingCompany",
  "@id": "https://alqasr-alsueudi.com/#movingcompany",
  "name": "شركة القصر السعودي لنقل العفش بجدة",
  "url": "https://alqasr-alsueudi.com/"
};

let count = 0;

files.forEach(file => {
  const rel = path.relative(root, file).replace(/\\/g, '/');
  const url = rel === 'index.html' ? '/' : '/' + rel.replace('/index.html', '') + '/';
  let html = fs.readFileSync(file, 'utf8');
  let original = html;

  // Process JSON-LD script tags
  html = html.replace(/(<script[^>]+type="application\/ld\+json"[^>]*>)([\s\S]*?)(<\/script>)/gi, (match, open, jsonStr, close) => {
    try {
      let data = JSON.parse(jsonStr);
      let graph = data['@graph'] ? data['@graph'] : [data];

      // 0.4: Change Schema for /about/ to AboutPage
      if (url === '/about/') {
        graph.forEach(it => {
          if (it['@type'] === 'WebPage' || it['@type'] === 'Service') {
            it['@type'] = 'AboutPage';
          }
        });
      }

      // 0.4: Change Schema for /services/ to CollectionPage (with ItemList)
      if (url === '/services/') {
        graph.forEach(it => {
          if (it['@type'] === 'WebPage' || it['@type'] === 'Service') {
            it['@type'] = 'CollectionPage';
          }
        });
      }

      // 0.5: Replace simplified provider in every Service across the site
      graph.forEach(it => {
        if (it && it['@type'] === 'Service') {
          it.provider = providerObj;
        }
      });

      return open + '\n' + JSON.stringify({ "@context": "https://schema.org", "@graph": graph }, null, 2) + '\n' + close;
    } catch(e) {
      return match;
    }
  });

  if (html !== original) {
    fs.writeFileSync(file, html, 'utf8');
    count++;
  }
});

console.log(`update_schemas_04_05.js: Updated schemas in ${count} files.`);

