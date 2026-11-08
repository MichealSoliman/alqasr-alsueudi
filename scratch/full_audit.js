/**
 * full_audit.js — generates audit-pages.csv + audit-pages-issues.md
 * Run from project root: node scratch/full_audit.js
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

// Read sitemap URLs
let sitemapUrls = new Set();
try {
  const sm = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
  const matches = sm.match(/<loc>(.*?)<\/loc>/g) || [];
  matches.forEach(m => {
    const url = m.replace(/<\/?loc>/g, '').trim();
    // convert to path
    const p = url.replace('https://alqasr-alsueudi.com', '') || '/';
    sitemapUrls.add(p);
  });
} catch(e) {}

// Collect all HTML files (exclude node_modules, components)
function getHtmlFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    if (['node_modules', '.git', '.vscode', 'components', 'src', 'dist', 'scratch', 'scripts'].includes(item)) continue;
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

function getUrlFromPath(filePath) {
  const rel = path.relative(root, filePath).replace(/\\/g, '/');
  if (rel === 'index.html') return '/';
  return '/' + rel.replace('/index.html', '') + '/';
}

function countWords(html) {
  // strip tags
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return text.split(' ').filter(w => w.length > 2).length;
}

function extractJsonLdTypes(html) {
  const types = [];
  const schemas = html.match(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi) || [];
  schemas.forEach(s => {
    try {
      const json = JSON.parse(s.replace(/<script[^>]+>|<\/script>/gi, ''));
      const objs = json['@graph'] ? json['@graph'] : [json];
      objs.forEach(o => { if (o['@type']) types.push(o['@type']); });
    } catch(e) {}
  });
  return types;
}

const htmlFiles = getHtmlFiles(root);
const rows = [];
const titlesSeen = {};
const descsSeen = {};

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const url = getUrlFromPath(file);

  // Title
  const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';
  const titleLen = title.length;

  // Meta description
  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"[^>]*>/i) ||
                    html.match(/<meta\s+content="([^"]*)"\s+name="description"[^>]*>/i);
  const desc = descMatch ? descMatch[1].trim() : '';
  const descLen = desc.length;

  // Canonical
  const canonMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"[^>]*>/i);
  const canonical = canonMatch ? canonMatch[1].trim() : '';

  // H1s
  const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  const h1Texts = h1Matches.map(h => h.replace(/<[^>]+>/g, '').trim());
  const h1Count = h1Texts.length;

  // Robots meta
  const robotsMatch = html.match(/<meta\s+name="robots"\s+content="([^"]*)"[^>]*>/i);
  const robots = robotsMatch ? robotsMatch[1] : 'index,follow';

  // JSON-LD types
  const schemaTypes = extractJsonLdTypes(html);
  const hasAggRating = schemaTypes.some(t => t === 'AggregateRating') || html.includes('aggregateRating');
  const hasHowTo = schemaTypes.includes('HowTo');
  const hasBreadcrumb = schemaTypes.includes('BreadcrumbList') || html.includes('BreadcrumbList');

  // Word count
  const wordCount = countWords(html);

  // Internal links (outbound from this page)
  const internalLinks = (html.match(/href="\/[^"]*"/g) || []).length;

  // In sitemap
  const inSitemap = sitemapUrls.has(url) || sitemapUrls.has(url.slice(0, -1));

  rows.push({
    url, title, titleLen, desc, descLen, canonical, h1Count,
    h1Text: h1Texts.join(' | '),
    robots, schemaTypes: schemaTypes.join(';'),
    hasAggRating, hasHowTo, hasBreadcrumb,
    wordCount, internalLinks, inSitemap
  });

  // Track duplicates
  if (title) {
    if (!titlesSeen[title]) titlesSeen[title] = [];
    titlesSeen[title].push(url);
  }
  if (desc) {
    if (!descsSeen[desc]) descsSeen[desc] = [];
    descsSeen[desc].push(url);
  }
}

// Write CSV
const csvHeader = 'URL,Title,TitleLen,Description,DescLen,Canonical,H1Count,H1Text,Robots,SchemaTypes,HasAggRating,HasHowTo,HasBreadcrumb,WordCount,InternalLinks,InSitemap\n';
const csvRows = rows.map(r =>
  [r.url, `"${r.title.replace(/"/g,'""')}"`, r.titleLen,
   `"${r.desc.replace(/"/g,'""')}"`, r.descLen,
   `"${r.canonical}"`, r.h1Count, `"${r.h1Text.replace(/"/g,'""')}"`,
   r.robots, `"${r.schemaTypes}"`,
   r.hasAggRating, r.hasHowTo, r.hasBreadcrumb,
   r.wordCount, r.internalLinks, r.inSitemap
  ].join(',')
).join('\n');

fs.writeFileSync(path.join(root, 'audit-pages.csv'), csvHeader + csvRows, 'utf8');
console.log('✅ audit-pages.csv written with', rows.length, 'pages');

// Write issues report
let issues = '# تقرير مشاكل الصفحات\n\n';

// Duplicate titles
const dupTitles = Object.entries(titlesSeen).filter(([t, urls]) => urls.length > 1);
issues += '## عناوين Title مكررة\n\n';
if (dupTitles.length === 0) issues += 'لا توجد عناوين مكررة ✅\n\n';
else dupTitles.forEach(([t, urls]) => { issues += `**"${t}"**\n${urls.map(u => '- ' + u).join('\n')}\n\n`; });

// Duplicate descriptions
const dupDescs = Object.entries(descsSeen).filter(([d, urls]) => urls.length > 1);
issues += '## Meta Descriptions مكررة\n\n';
if (dupDescs.length === 0) issues += 'لا توجد وصف مكرر ✅\n\n';
else dupDescs.forEach(([d, urls]) => { issues += `**"${d.substring(0,80)}..."**\n${urls.map(u => '- ' + u).join('\n')}\n\n`; });

// Pages with no H1
const noH1 = rows.filter(r => r.h1Count === 0);
issues += '## صفحات بلا H1\n\n';
if (noH1.length === 0) issues += 'لا توجد صفحات بلا H1 ✅\n\n';
else noH1.forEach(r => { issues += `- ${r.url}\n`; });
issues += '\n';

// Pages with multiple H1
const multiH1 = rows.filter(r => r.h1Count > 1);
issues += '## صفحات بأكثر من H1\n\n';
if (multiH1.length === 0) issues += 'لا توجد صفحات بأكثر من H1 ✅\n\n';
else multiH1.forEach(r => { issues += `- ${r.url} (${r.h1Count} H1)\n`; });
issues += '\n';

// Pages not in sitemap
const notInSitemap = rows.filter(r => !r.inSitemap && !r.robots.includes('noindex'));
issues += '## صفحات غير موجودة في Sitemap (indexable)\n\n';
if (notInSitemap.length === 0) issues += 'جميع الصفحات في Sitemap ✅\n\n';
else notInSitemap.forEach(r => { issues += `- ${r.url} (robots: ${r.robots})\n`; });
issues += '\n';

// Pages with aggregateRating
const withAR = rows.filter(r => r.hasAggRating);
issues += '## صفحات تحتوي على aggregateRating (يجب إزالتها)\n\n';
if (withAR.length === 0) issues += 'لا توجد aggregateRating ✅\n\n';
else withAR.forEach(r => { issues += `- ${r.url}\n`; });
issues += '\n';

// Canonical mismatches
const canonMismatch = rows.filter(r => r.canonical && !r.canonical.endsWith(r.url) && r.canonical !== 'https://alqasr-alsueudi.com' + r.url.slice(0,-1));
issues += '## Canonical غير مطابق للـ URL\n\n';
if (canonMismatch.length === 0) issues += 'لا توجد حالات عدم تطابق ✅\n\n';
else canonMismatch.forEach(r => { issues += `- ${r.url} → canonical: ${r.canonical}\n`; });

fs.writeFileSync(path.join(root, 'audit-pages-issues.md'), issues, 'utf8');
console.log('✅ audit-pages-issues.md written');

