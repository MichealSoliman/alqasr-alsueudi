const fs = require('fs');
const path = require('path');

const lines = fs.readFileSync(path.resolve(__dirname, '../audit-schema.csv'), 'utf8').split('\n');

const missingBc = lines.filter(l => l.includes(',"No",') && !l.includes('404') && !l.startsWith('URL'));
console.log('Missing Breadcrumb count (excluding 404):', missingBc.length);
if (missingBc.length > 0) console.log(missingBc);

const multipleFaq = lines.filter(l => {
  const parts = l.split(',');
  return parseInt(parts[parts.length - 1]) > 1;
});
console.log('Multiple FAQPage count:', multipleFaq.length);
if (multipleFaq.length > 0) console.log(multipleFaq);

const orgPages = lines.filter(l => !l.startsWith('"/",') && (l.includes('Organization') || l.includes('MovingCompany') || l.includes('LocalBusiness')));
console.log('Inner pages with full Organization/MovingCompany:', orgPages.length);
if (orgPages.length > 0) console.log(orgPages);

