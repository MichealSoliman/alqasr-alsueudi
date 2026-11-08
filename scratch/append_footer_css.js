const fs = require('fs');
const path = require('path');

const cssPath = path.resolve(__dirname, '../assets/css/main.min.css');
let css = fs.readFileSync(cssPath, 'utf8');

const footerGridCss = `
/* Responsive Footer Grid & Column Spans */
.grid-cols-12 { grid-template-columns: repeat(12, minmax(0, 1fr)) !important; }

@media (min-width: 1024px) {
  .lg\\:grid-cols-12 { grid-template-columns: repeat(12, minmax(0, 1fr)) !important; }
  .lg\\:col-span-2 { grid-column: span 2 / span 2 !important; }
  .lg\\:col-span-2\\.5 { grid-column: span 3 / span 3 !important; }
  .lg\\:col-span-3 { grid-column: span 3 / span 3 !important; }
  .lg\\:col-span-4 { grid-column: span 4 / span 4 !important; }
  .lg\\:col-span-5 { grid-column: span 5 / span 5 !important; }
  .lg\\:col-span-6 { grid-column: span 6 / span 6 !important; }
  .lg\\:col-span-7 { grid-column: span 7 / span 7 !important; }
  .lg\\:col-span-8 { grid-column: span 8 / span 8 !important; }
}
`;

fs.writeFileSync(cssPath, css + '\n' + footerGridCss, 'utf8');
console.log('Successfully force-appended .lg\\:grid-cols-12 and col-span classes to main.min.css!');
