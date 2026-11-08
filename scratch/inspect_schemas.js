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
const report = [];

files.forEach(file => {
  const rel = path.relative(root, file).replace(/\\/g, '/');
  const url = rel === 'index.html' ? '/' : '/' + rel.replace('/index.html', '') + '/';
  const html = fs.readFileSync(file, 'utf8');

  const schemas = html.match(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi) || [];
  const types = [];

  schemas.forEach(s => {
    try {
      const raw = s.replace(/<script[^>]+>|<\/script>/gi, '');
      const json = JSON.parse(raw);
      const items = json['@graph'] ? json['@graph'] : [json];
      items.forEach(it => {
        if (it && it['@type']) types.push(it['@type']);
      });
    } catch(e) {}
  });

  report.push({
    url,
    types,
    hasOrg: types.includes('Organization'),
    hasWebSite: types.includes('WebSite'),
    hasMovingCompany: types.includes('MovingCompany'),
    hasLocalBusiness: types.includes('LocalBusiness'),
    hasSelfStorage: types.includes('SelfStorage'),
    hasHomeAndConstruction: types.includes('HomeAndConstructionBusiness'),
    hasArticle: types.includes('Article'),
    faqCount: types.filter(t => t === 'FAQPage').length,
    hasBreadcrumb: types.includes('BreadcrumbList')
  });
});

console.log('Schema scan results for', report.length, 'files:');
const nonHomeIssues = report.filter(r => r.url !== '/' && (r.hasOrg || r.hasWebSite || r.hasMovingCompany || r.hasLocalBusiness || r.hasSelfStorage || r.hasHomeAndConstruction || r.hasArticle || r.faqCount > 1 || !r.hasBreadcrumb));
console.log('Pages needing schema fix:', nonHomeIssues.length);
nonHomeIssues.forEach(i => {
  console.log(i.url, '-> Org:', i.hasOrg, '| WebSite:', i.hasWebSite, '| MC:', i.hasMovingCompany, '| Storage/Home:', i.hasSelfStorage || i.hasHomeAndConstruction, '| Article:', i.hasArticle, '| FAQs:', i.faqCount, '| Breadcrumb:', i.hasBreadcrumb);
});

