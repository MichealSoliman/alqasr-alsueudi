/**
 * fix_site_wide.js — applies all remaining technical SEO fixes:
 * 1. Remove aggregateRating, HowTo, standalone Review from JSON-LD
 * 2. Add skip-link to all pages
 * 3. Add GA4 placeholder snippet to all pages
 * 4. Add defer to all script tags (non-async ones)
 * 5. Add rel="noopener noreferrer" to all target="_blank" links
 * Run from project root: node scratch/fix_site_wide.js
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const changes = [];

function getHtmlFiles(dir, files = []) {
  const skip = ['node_modules', '.git', '.vscode', 'components', 'src', 'dist', 'scratch', 'scripts', 'contact', 'gallery'];
  const items = fs.readdirSync(dir);
  for (const item of items) {
    if (skip.includes(item)) continue;
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      getHtmlFiles(full, files);
    } else if (item === 'index.html') {
      files.push(full);
    }
  }
  return files;
}

function cleanJsonLd(html, filePath) {
  let changed = false;

  // Remove aggregateRating key (and its object value) from JSON-LD
  // Also remove HowTo type blocks, standalone Review schema
  const newHtml = html.replace(
    /(<script[^>]+type="application\/ld\+json"[^>]*>)([\s\S]*?)(<\/script>)/gi,
    (match, open, json, close) => {
      try {
        let obj = JSON.parse(json);
        let modified = false;

        function cleanObj(o) {
          if (!o || typeof o !== 'object') return o;
          // Remove aggregateRating
          if ('aggregateRating' in o) {
            delete o.aggregateRating;
            modified = true;
          }
          // Remove review array
          if ('review' in o) {
            delete o.review;
            modified = true;
          }
          // Handle @graph
          if (o['@graph']) {
            const before = o['@graph'].length;
            // Remove HowTo and standalone Review types
            o['@graph'] = o['@graph'].filter(item => {
              const t = item['@type'];
              if (t === 'HowTo' || t === 'Review') {
                modified = true;
                return false;
              }
              return true;
            });
            // Recurse into each graph item
            o['@graph'].forEach(item => cleanObj(item));
            if (o['@graph'].length !== before) modified = true;
          }
          // If top-level @type is HowTo or Review, remove whole block
          if (o['@type'] === 'HowTo' || o['@type'] === 'Review') {
            modified = true;
            return null;
          }
          return o;
        }

        const cleaned = cleanObj(obj);
        if (modified) {
          changed = true;
          if (cleaned === null) return ''; // remove entire script block
          return open + '\n' + JSON.stringify(cleaned, null, 2) + '\n' + close;
        }
      } catch(e) {}
      return match;
    }
  );

  return { html: newHtml, changed };
}

function addSkipLink(html) {
  // Only add if not already present
  if (html.includes('skip-to-content') || html.includes('تخطى إلى')) return { html, changed: false };

  const skipHtml = `<a href="#main-content" class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:right-4 focus:z-50 focus:bg-blue-700 focus:text-white focus:px-4 focus:py-2 focus:rounded focus:text-sm focus:font-bold" id="skip-to-content">تخطى إلى المحتوى الرئيسي</a>\n`;

  // Insert after <body tag
  const newHtml = html.replace(/(<body[^>]*>)/, '$1\n' + skipHtml);
  const changed = newHtml !== html;
  return { html: newHtml, changed };
}

function addGA4(html) {
  // Only add if not already present
  if (html.includes('gtag') || html.includes('[[GA4_ID]]') || html.includes('googletagmanager')) {
    return { html, changed: false };
  }

  const ga4Snippet = `  <!-- Google Analytics 4 -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=[[GA4_ID]]"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '[[GA4_ID]]', { 'send_page_view': true });
  </script>
  <!-- End GA4 -->
`;

  // Insert before </head>
  const newHtml = html.replace('</head>', ga4Snippet + '</head>');
  const changed = newHtml !== html;
  return { html: newHtml, changed };
}

function addDeferToScripts(html) {
  // Add defer to script tags that have src but lack defer and async
  let changed = false;
  const newHtml = html.replace(/<script([^>]*?)src="([^"]*)"([^>]*?)>/gi, (match, pre, src, post) => {
    // Skip if already has defer or async
    if (/defer/.test(match) || /async/.test(match)) return match;
    // Skip GA4 (already async)
    if (src.includes('googletagmanager')) return match;
    changed = true;
    return `<script${pre}src="${src}"${post} defer>`;
  });
  return { html: newHtml, changed };
}

function addNoopener(html) {
  // Add rel="noopener noreferrer" to target="_blank" links that don't already have it
  let changed = false;
  const newHtml = html.replace(/<a([^>]+)target="_blank"([^>]*)>/gi, (match, pre, post) => {
    if (/noopener/.test(match)) return match;
    // Add rel attribute
    if (/rel=/.test(match)) {
      // Update existing rel
      changed = true;
      return match.replace(/rel="([^"]*)"/, (rm, rv) => `rel="${rv} noopener noreferrer"`);
    } else {
      changed = true;
      return `<a${pre}target="_blank" rel="noopener noreferrer"${post}>`;
    }
  });
  return { html: newHtml, changed };
}

// Process all HTML files
const files = getHtmlFiles(root);
let totalChanged = 0;

for (const file of files) {
  let html = fs.readFileSync(file, 'utf8');
  const rel = path.relative(root, file).replace(/\\/g, '/');
  const pageChanges = [];

  // 1. Clean JSON-LD
  const r1 = cleanJsonLd(html, file);
  if (r1.changed) { html = r1.html; pageChanges.push('Removed aggregateRating/HowTo/Review from JSON-LD'); }

  // 2. Add skip-link
  const r2 = addSkipLink(html);
  if (r2.changed) { html = r2.html; pageChanges.push('Added skip-link'); }

  // 3. Add GA4
  const r3 = addGA4(html);
  if (r3.changed) { html = r3.html; pageChanges.push('Added GA4 placeholder'); }

  // 4. Add defer
  const r4 = addDeferToScripts(html);
  if (r4.changed) { html = r4.html; pageChanges.push('Added defer to script tags'); }

  // 5. Add noopener
  const r5 = addNoopener(html);
  if (r5.changed) { html = r5.html; pageChanges.push('Added noopener noreferrer to target=_blank'); }

  if (pageChanges.length > 0) {
    fs.writeFileSync(file, html, 'utf8');
    totalChanged++;
    console.log(`✅ ${rel}: ${pageChanges.join(', ')}`);
    pageChanges.forEach(c => changes.push({ file: rel, change: c }));
  }
}

console.log(`\n✅ Done. Modified ${totalChanged}/${files.length} files.`);

// Save changes log data
fs.writeFileSync(path.join(root, 'scratch/site_wide_changes.json'), JSON.stringify(changes, null, 2));

