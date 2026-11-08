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
let modifiedCount = 0;

files.forEach(file => {
  const rel = path.relative(root, file).replace(/\\/g, '/');
  const url = rel === 'index.html' ? '/' : '/' + rel.replace('/index.html', '') + '/';
  if (url === '/') return; // Leave homepage untouched!

  let html = fs.readFileSync(file, 'utf8');
  let original = html;

  // Extract page title and H1 for breadcrumbs if needed
  const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
  let pageTitle = titleMatch ? titleMatch[1].split('|')[0].trim() : 'خدمات نقل العفش';

  // 1. D.1, D.2, D.3, D.4: Clean and unify JSON-LD schemas
  html = html.replace(/(<script[^>]+type="application\/ld\+json"[^>]*>)([\s\S]*?)(<\/script>)/gi, (match, open, jsonStr, close) => {
    try {
      let data = JSON.parse(jsonStr);
      let graph = data['@graph'] ? data['@graph'] : [data];

      // Remove Organization, WebSite, LocalBusiness from inner pages
      graph = graph.filter(item => {
        if (!item || !item['@type']) return false;
        if (['Organization', 'WebSite', 'LocalBusiness'].includes(item['@type'])) return false;
        return true;
      });

      // Filter duplicate FAQPage (Keep only one FAQPage)
      let faqSeen = false;
      graph = graph.filter(item => {
        if (item && item['@type'] === 'FAQPage') {
          if (faqSeen) return false;
          faqSeen = true;
        }
        return true;
      });

      // Transform types:
      graph.forEach(item => {
        if (!item) return;

        // D.1: Replace full MovingCompany definition with reference in inner pages
        if (item['@type'] === 'MovingCompany') {
          item['@type'] = 'Service';
          item.provider = { "@id": "https://alqasr-alsueudi.com/#movingcompany" };
          delete item.address;
          delete item.geo;
          delete item.telephone;
          delete item.priceRange;
          delete item.openingHoursSpecification;
        }

        // D.2: Replace SelfStorage and HomeAndConstructionBusiness with Service
        if (['SelfStorage', 'HomeAndConstructionBusiness'].includes(item['@type'])) {
          item['@type'] = 'Service';
          item.provider = { "@id": "https://alqasr-alsueudi.com/#movingcompany" };
          delete item.address;
          delete item.geo;
          delete item.telephone;
        }

        // D.4: Replace Article on areas/cities with WebPage + Service
        if (item['@type'] === 'Article') {
          if (url.startsWith('/areas/')) {
            item['@type'] = 'WebPage';
          } else if (url.startsWith('/blogs/')) {
            item['@type'] = 'BlogPosting';
          }
        }

        // D.5: Offer / OfferCatalog cleanup - keep simple
        if (item.provider && !item.provider['@id']) {
          item.provider = { "@id": "https://alqasr-alsueudi.com/#movingcompany" };
        }
      });

      // D.3.5: Ensure BreadcrumbList exists in graph
      const hasBreadcrumb = graph.some(it => it && it['@type'] === 'BreadcrumbList');
      if (!hasBreadcrumb && url !== '/' && url !== '/404.html') {
        let sectionName = 'الخدمات';
        let sectionUrl = 'https://alqasr-alsueudi.com/services/';
        if (url.startsWith('/areas/')) {
          sectionName = 'أحياء جدة والمدن';
          sectionUrl = 'https://alqasr-alsueudi.com/areas/';
        } else if (url.startsWith('/blogs/')) {
          sectionName = 'المدونة';
          sectionUrl = 'https://alqasr-alsueudi.com/blogs/';
        }

        graph.push({
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

      return open + '\n' + JSON.stringify({ "@context": "https://schema.org", "@graph": graph }, null, 2) + '\n' + close;
    } catch(e) {
      return match;
    }
  });

  // D.3.5: Check visible breadcrumb HTML in specified pages
  const needsVisibleBreadcrumb = [
    '/areas/hayu-alhamdania/',
    '/areas/hayu-alnahda/',
    '/areas/hayu-alnasim/',
    '/areas/jeddah-to-alshatea/',
    '/blogs/how-to-move-heavy-furniture-without-damage/',
    '/blogs/tips-before-moving-furniture-in-jeddah/'
  ];

  if (needsVisibleBreadcrumb.includes(url) && !html.includes('aria-label="مسار التنقل"')) {
    let sectionName = url.startsWith('/areas/') ? 'أحياء جدة' : 'المدونة';
    let sectionUrl = url.startsWith('/areas/') ? '/areas/' : '/blogs/';

    const breadcrumbHtml = `
    <!-- Visual Breadcrumb -->
    <nav aria-label="مسار التنقل" class="py-3 px-4 bg-gray-50 border-b border-gray-100 text-xs sm:text-sm text-gray-500">
        <div class="container mx-auto">
            <ol class="flex items-center space-x-2 space-x-reverse">
                <li><a href="/" class="hover:text-blue-900 transition-colors">الرئيسية</a></li>
                <li><span class="text-gray-400">/</span></li>
                <li><a href="${sectionUrl}" class="hover:text-blue-900 transition-colors">${sectionName}</a></li>
                <li><span class="text-gray-400">/</span></li>
                <li class="text-blue-900 font-semibold" aria-current="page">${pageTitle}</li>
            </ol>
        </div>
    </nav>
    `;

    // Insert after header or after body
    if (html.includes('<!-- /@header -->')) {
      html = html.replace('<!-- /@header -->', '<!-- /@header -->\n' + breadcrumbHtml);
    } else if (html.includes('</header>')) {
      html = html.replace('</header>', '</header>\n' + breadcrumbHtml);
    }
  }

  if (html !== original) {
    fs.writeFileSync(file, html, 'utf8');
    modifiedCount++;
  }
});

console.log(`clean_schemas.js completed: Updated schemas in ${modifiedCount} files.`);

