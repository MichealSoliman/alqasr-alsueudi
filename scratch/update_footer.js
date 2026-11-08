const fs = require('fs');
const path = require('path');

const footerPath = path.resolve(__dirname, '../assets/js/footer.js');
let content = fs.readFileSync(footerPath, 'utf8');

// Replace tel:0540026747 with tel:+966540026747
content = content.replace(/tel:0540026747/g, 'tel:+966540026747');

// Add links to /contact/ and /gallery/ in the legal/links bar if not present
const targetAbout = '<a href="${root}about/" class="hover:text-[#00c864] transition-colors">من نحن</a>';
const replacementAbout = '<a href="${root}contact/" class="hover:text-[#00c864] transition-colors">اتصل بنا</a>\n                <span>•</span>\n                <a href="${root}gallery/" class="hover:text-[#00c864] transition-colors">معرض الصور</a>\n                <span>•</span>\n                <a href="${root}about/" class="hover:text-[#00c864] transition-colors">من نحن</a>';

if (content.includes(targetAbout) && !content.includes('contact/')) {
  content = content.replace(targetAbout, replacementAbout);
}

// Add CR_NO and LICENSE_NO placeholders in legal notice
content = content.replace('سجل تجاري وترخيص خدمات نقل الأثاث والمعدات اللوجستية في المملكة العربية السعودية', 'سجل تجاري: [[CR_NO]] • ترخيص نقل: [[LICENSE_NO]]');

fs.writeFileSync(footerPath, content, 'utf8');
console.log('footer.js updated successfully!');

