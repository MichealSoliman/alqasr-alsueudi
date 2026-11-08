const fs = require('fs');
const path = require('path');

const rootFooterPath = path.resolve(__dirname, 'root_footer.html');
let footer = fs.readFileSync(rootFooterPath, 'utf8');

// Ensure all placeholders in footer are commented out or cleaned
footer = footer.replace(/\[\[CR_NO\]\]/g, '<!-- [[CR_NO]] -->');
footer = footer.replace(/\[\[LICENSE_NO\]\]/g, '<!-- [[LICENSE_NO]] -->');
footer = footer.replace(/\[\[STREET_ADDRESS\]\]/g, '<!-- [[STREET_ADDRESS]] -->');

// Write to partials/footer.html
fs.writeFileSync(path.resolve(__dirname, '../partials/footer.html'), footer, 'utf8');
console.log('partials/footer.html written successfully! Length:', footer.length);

