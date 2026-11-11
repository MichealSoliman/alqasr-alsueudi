const fs = require('fs');
const html = fs.readFileSync('furniture-storage-in-jeddah/index.html', 'utf8');

// Check H1
const h1s = html.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi) || [];
console.log('H1 count:', h1s.length, 'Text:', h1s[0].replace(/<[^>]+>/g, '').trim());

// Check headings sequence
const headings = html.match(/<h[1-6][^>]*>/gi) || [];
console.log('Headings count:', headings.length, 'First few:', headings.slice(0, 10));

// Check forbidden words in main
const mainMatch = html.match(/<main[\s\S]*?<\/main>/i);
const mainText = mainMatch ? mainMatch[0] : html;
const forbidden = ['سجل تجاري', 'ترخيص', 'معتمد', 'فواتير معتمدة', 'عقود رسمية', 'تأمين'];
forbidden.forEach(w => {
  const countInMain = (mainText.match(new RegExp(w, 'g')) || []).length;
  const countInAll = (html.match(new RegExp(w, 'g')) || []).length;
  console.log(`Word "${w}": main=${countInMain}, all=${countInAll}`);
});

// Check Placeholders
const ph = html.match(/\[\[.*?\]\]/g) || [];
console.log('Placeholders found:', ph);

// Check JSON-LD validity
const scriptMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
if (scriptMatch) {
  try {
    const parsed = JSON.parse(scriptMatch[1]);
    console.log('JSON-LD valid. Types in graph:', parsed['@graph'].map(x => x['@type']));
  } catch(e) {
    console.error('JSON-LD parse error:', e.message);
  }
}

