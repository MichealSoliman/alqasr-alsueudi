const fs = require('fs');
const path = require('path');

const cssPath = path.resolve(__dirname, '../assets/css/main.min.css');
let css = fs.readFileSync(cssPath, 'utf8');

const helperCss = `
/* Layout Grid & Flex Utilities for Contact and Gallery */
.grid { display: grid; }
.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
.grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.gap-2 { gap: 0.5rem; }
.gap-3 { gap: 0.75rem; }
.gap-4 { gap: 1rem; }
.gap-5 { gap: 1.25rem; }
.gap-6 { gap: 1.5rem; }
.gap-8 { gap: 2rem; }

@media (min-width: 640px) {
  .sm\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .sm\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .sm\\:flex-row { flex-direction: row; }
}

@media (min-width: 768px) {
  .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .md\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .md\\:flex-row { flex-direction: row; }
}

@media (min-width: 1024px) {
  .lg\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .lg\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .lg\\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .lg\\:flex-row { flex-direction: row; }
}
`;

if (!css.includes('.grid-cols-4')) {
  fs.writeFileSync(cssPath, css + '\n' + helperCss, 'utf8');
  console.log('Successfully appended layout utilities to main.min.css');
} else {
  console.log('Utilities already present');
}

