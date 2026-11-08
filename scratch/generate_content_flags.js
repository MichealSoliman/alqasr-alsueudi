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

const pricesTable = [];
const claimsTable = [];
const titlesOver60 = [];
const descsOver160 = [];
const areaTemplates = {};

// Claims to track
const claimKeywords = [
  'ضمان 100%', 'ضمان سلامة المنقولات 100%', 'خصم 25%', 'تتبع GPS', 'فواتير معتمدة',
  '24 ساعة', 'مكيفة', 'كاميرات مراقبة', 'الدور 25', 'حمولة 600 كجم',
  'خلال 30 دقيقة', 'نفس اليوم', '15 عاماً', '5000'
];

files.forEach(file => {
  const rel = path.relative(root, file).replace(/\\/g, '/');
  const url = rel === 'index.html' ? '/' : '/' + rel.replace('/index.html', '') + '/';
  const html = fs.readFileSync(file, 'utf8');

  // G.3: Titles over 60, Descriptions over 160
  const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
  if (titleMatch) {
    const t = titleMatch[1].trim();
    if (t.length > 60) titlesOver60.push({ url, title: t, length: t.length });
  }

  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i) || html.match(/<meta\s+content="([^"]*)"\s+name="description"/i);
  if (descMatch) {
    const d = descMatch[1].trim();
    if (d.length > 160) descsOver160.push({ url, desc: d, length: d.length });

    // G.4: Group area descriptions
    if (url.startsWith('/areas/hayu-')) {
      const pattern = d.replace(/حي\s+[\u0621-\u064A]+/g, 'حي [الحي]').substring(0, 70);
      areaTemplates[pattern] = (areaTemplates[pattern] || 0) + 1;
    }
  }

  // G.1: Prices table
  const priceMatches = html.match(/(?:تبدأ من|من|ابتداءً من)\s*([0-9]+)\s*ريال/gi) || [];
  priceMatches.forEach(p => {
    pricesTable.push({ url, price: p.trim(), context: 'محتوى الصفحة' });
  });

  // G.2: Claims tracking
  claimKeywords.forEach(kw => {
    if (html.includes(kw)) {
      claimsTable.push({ url, claim: kw });
    }
  });
});

let md = '# content-flags.md — تقرير محتوى ومراجعات المرحلة 2\n';
md += '> **تنبيه:** هذا التقرير هو فحص ورصد استقصائي فقط (لا تعديل في النصوص) تمهيداً للمرحلة القادمة.\n\n';

// G.1 Table
md += '## 1. جدول الأسعار المرصودة في الصفحات ("تبدأ من / من X ريال")\n\n';
md += '| الصفحة (URL) | السعر المرصود | الموضع |\n| :--- | :---: | :--- |\n';
const uniquePrices = [...new Map(pricesTable.map(item => [item.url + item.price, item])).values()];
uniquePrices.slice(0, 35).forEach(p => {
  md += `| \`${p.url}\` | ${p.price} | ${p.context} |\n`;
});

// G.2 Table
md += '\n---\n\n## 2. جدول الادعاءات التسويقية والصفحات التي ترد فيها\n\n';
md += '| الادعاء التسويقي | عدد مرات الظهور | أمثلة على الصفحات التي ورد فيها |\n| :--- | :---: | :--- |\n';
claimKeywords.forEach(kw => {
  const matched = claimsTable.filter(c => c.claim === kw);
  const sampleUrls = matched.slice(0, 3).map(m => `\`${m.url}\``).join('، ');
  md += `| **${kw}** | ${matched.length} صفحة | ${sampleUrls || 'غير مرصود'} |\n`;
});

// G.3 Table
md += '\n---\n\n## 3. فحص أطوال العناوين (Titles > 60) والأوصاف (Descriptions > 160)\n\n';
md += '### عناوين Title أطول من 60 حرفاً:\n\n';
md += '| الصفحة | الطول | العنوان |\n| :--- | :---: | :--- |\n';
titlesOver60.slice(0, 20).forEach(t => {
  md += `| \`${t.url}\` | **${t.length}** | ${t.title} |\n`;
});

md += '\n### أوصاف Meta Description أطول من 160 حرفاً:\n\n';
md += '| الصفحة | الطول | الوصف |\n| :--- | :---: | :--- |\n';
descsOver160.slice(0, 20).forEach(d => {
  md += `| \`${d.url}\` | **${d.length}** | ${d.desc.substring(0, 90)}... |\n`;
});

// G.4
md += '\n---\n\n## 4. قوالب أوصاف صفحات الأحياء المجمّعة حسب النمط المتكرر\n\n';
md += '| نمط الوصف المتكرر | عدد صفحات الأحياء المطابقة |\n| :--- | :---: |\n';
Object.entries(areaTemplates).forEach(([pat, count]) => {
  md += `| "${pat}..." | **${count} صفحات** |\n`;
});

fs.writeFileSync(path.join(root, 'content-flags.md'), md, 'utf8');
console.log('content-flags.md generated successfully.');

