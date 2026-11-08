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
  const rel = path.relative(root, file).replace(/\\/g, '/');
  const url = rel === 'index.html' ? '/' : '/' + rel.replace('/index.html', '') + '/';
  if (url === '/') return; // Home page stays intact

  let html = fs.readFileSync(file, 'utf8');
  let original = html;

  // Extract all JSON-LD blocks
  const blocks = [];
  const scriptRegex = /<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = scriptRegex.exec(html)) !== null) {
    try {
      const parsed = JSON.parse(match[1]);
      const items = parsed['@graph'] ? parsed['@graph'] : [parsed];
      items.forEach(it => { if (it && it['@type']) blocks.push(it); });
    } catch(e) {}
  }

  if (blocks.length > 0) {
    // Deduplicate and filter schemas
    const finalGraph = [];
    let hasBreadcrumb = false;
    let hasFAQ = false;
    let hasService = false;
    let hasWebPage = false;
    let hasBlog = false;

    // Title for fallback
    const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
    let pageTitle = titleMatch ? titleMatch[1].split('|')[0].trim() : 'خدمات نقل العفش بجدة';

    blocks.forEach(item => {
      let t = item['@type'];
      // Convert arrays like ["MovingCompany", "LocalBusiness"]
      if (Array.isArray(t)) t = t[0];

      if (['Organization', 'WebSite', 'MovingCompany', 'LocalBusiness'].includes(t)) {
        return; // Exclude from inner pages
      }
      if (['SelfStorage', 'HomeAndConstructionBusiness'].includes(t)) {
        item['@type'] = 'Service';
        t = 'Service';
      }
      if (t === 'Article') {
        if (url.startsWith('/areas/')) { item['@type'] = 'WebPage'; t = 'WebPage'; }
        else if (url.startsWith('/blogs/')) { item['@type'] = 'BlogPosting'; t = 'BlogPosting'; }
      }
      if (['Offer', 'OfferCatalog', 'ContactPoint'].includes(t)) {
        return; // Remove unverified offers / contactPoints
      }

      if (t === 'BreadcrumbList') {
        if (!hasBreadcrumb) {
          finalGraph.push(item);
          hasBreadcrumb = true;
        }
        return;
      }

      if (t === 'FAQPage') {
        if (!hasFAQ) {
          finalGraph.push(item);
          hasFAQ = true;
        }
        return;
      }

      if (t === 'Service') {
        if (!hasService) {
          item.provider = { "@id": "https://alqasr-alsueudi.com/#movingcompany" };
          delete item.address;
          delete item.geo;
          delete item.telephone;
          finalGraph.push(item);
          hasService = true;
        }
        return;
      }

      if (t === 'WebPage') {
        if (!hasWebPage) {
          finalGraph.push(item);
          hasWebPage = true;
        }
        return;
      }

      if (t === 'BlogPosting') {
        if (!hasBlog) {
          finalGraph.push(item);
          hasBlog = true;
        }
        return;
      }

      // Add any other unique type once
      finalGraph.push(item);
    });

    // Ensure BreadcrumbList exists on all inner pages (except 404)
    if (!hasBreadcrumb && url !== '/404.html') {
      let sectionName = 'الخدمات';
      let sectionUrl = 'https://alqasr-alsueudi.com/services/';
      if (url.startsWith('/areas/')) {
        sectionName = 'أحياء جدة والمدن';
        sectionUrl = 'https://alqasr-alsueudi.com/areas/';
      } else if (url.startsWith('/blogs/')) {
        sectionName = 'المدونة';
        sectionUrl = 'https://alqasr-alsueudi.com/blogs/';
      }

      finalGraph.push({
        "@type": "BreadcrumbList",
        "@id": `https://alqasr-alsueudi.com${url}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "الرئيسية",
            "item": "https://alqasr-alsueudi.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": sectionName,
            "item": sectionUrl
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": pageTitle,
            "item": `https://alqasr-alsueudi.com${url}`
          }
        ]
      });
    }

    // Replace all existing script ld+json blocks with ONE single clean block
    html = html.replace(/<script[^>]+type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>\s*/gi, '');
    const cleanScript = `\n    <script type="application/ld+json">\n${JSON.stringify({ "@context": "https://schema.org", "@graph": finalGraph }, null, 2)}\n    </script>\n`;
    html = html.replace('</head>', cleanScript + '</head>');
  }

  if (html !== original) {
    fs.writeFileSync(file, html, 'utf8');
    count++;
  }
});

console.log(`consolidate_inner_schemas.js: Consolidated schemas in ${count} files.`);

