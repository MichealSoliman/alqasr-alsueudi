const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

function getHtmlFiles(dir, files = []) {
  const skip = ['node_modules', '.git', '.vscode', 'components', 'src', 'dist', 'scratch', 'scripts'];
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
const changeRecords = [];

// List of strict replacements for NO claims
const claimReplacements = [
  {
    regex: /ضمان\s+سلامة\s+المنقولات\s+100%/g,
    replace: 'عناية فائقة بسلامة المنقولات وضمان تعويض العميل'
  },
  {
    regex: /ضمان\s+شامل\s+ضد\s+الكسر\s+والخدش\s+100%/g,
    replace: 'عناية فائقة وضمان سلامة المنقولات أثناء النقل'
  },
  {
    regex: /ضمان\s+100%/g,
    replace: 'ضمان سلامة المنقولات'
  },
  {
    regex: /بنسبة\s+100%/g,
    replace: 'بأعلى معايير الأمان'
  },
  {
    regex: /خصم\s+25%/g,
    replace: 'أسعار تنافسية تبدأ من 250 ريال'
  },
  {
    regex: /تتبع\s+GPS/g,
    replace: 'متابعة مباشرة للشاحنة'
  },
  {
    regex: /فواتير\s+معتمدة\s+وعقود\s+رسمية/g,
    replace: 'عقود موثقة وإيصالات رسمية'
  },
  {
    regex: /مستودعات\s+مكيفة\s+ومؤمنة/g,
    replace: 'مستودعات معزولة ونظيفة ومؤمنة'
  },
  {
    regex: /مستودعات\s+مكيفة/g,
    replace: 'مستودعات معزولة ونظيفة'
  },
  {
    regex: /كاميرات\s+مراقبة\s+24\/7/g,
    replace: 'حراسة وأمان تام'
  },
  {
    regex: /حتى\s+الدور\s+25/g,
    replace: 'للأدوار العليا'
  },
  {
    regex: /حمولة\s+600\s*كجم/g,
    replace: 'حمولات ثقيلة'
  },
  {
    regex: /خلال\s+30\s+دقيقة/g,
    replace: 'في الموعد المحدد بدقة'
  },
  {
    regex: /أكثر\s+من\s+15\s+عاماً/g,
    replace: 'سنوات من الخبرة المتمرسة'
  },
  {
    regex: /أكثر\s+من\s+5000\s+عميل/g,
    replace: 'مئات العملاء في جدة'
  }
];

files.forEach(file => {
  let html = fs.readFileSync(file, 'utf8');
  let original = html;
  const rel = path.relative(root, file).replace(/\\/g, '/');

  claimReplacements.forEach(({ regex, replace }) => {
    if (regex.test(html)) {
      html = html.replace(regex, replace);
      changeRecords.push({ file: rel, element: 'نص المحتوى', before: regex.toString(), after: replace, reason: 'تطبيق قرارات الادعاءات الصارمة من owner-inputs.md' });
    }
  });

  if (html !== original) {
    fs.writeFileSync(file, html, 'utf8');
  }
});

// Also check partials
['partials/header.html', 'partials/footer.html'].forEach(p => {
  const full = path.join(root, p);
  if (fs.existsSync(full)) {
    let html = fs.readFileSync(full, 'utf8');
    let original = html;
    claimReplacements.forEach(({ regex, replace }) => {
      if (regex.test(html)) {
        html = html.replace(regex, replace);
        changeRecords.push({ file: p, element: 'Partial Component', before: regex.toString(), after: replace, reason: 'تنقية الادعاءات في الـ Partials' });
      }
    });
    if (html !== original) fs.writeFileSync(full, html, 'utf8');
  }
});

console.log(`clean_claims.js: Cleaned claims across files, recorded ${changeRecords.length} occurrences.`);

