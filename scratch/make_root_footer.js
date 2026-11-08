const fs = require('fs');
const path = require('path');

const sampleFooterPath = path.resolve(__dirname, 'sample_footer.html');
let footer = fs.readFileSync(sampleFooterPath, 'utf8');

// Replace relative paths with root-relative /
footer = footer.replace(/href="\.\.\//g, 'href="/');
footer = footer.replace(/src="\.\.\//g, 'src="/');
footer = footer.replace(/href="\.\//g, 'href="/');
footer = footer.replace(/src="\.\//g, 'src="/');

// Ensure logo path
footer = footer.replace(/src="[^"]*logo\.webp"/, 'src="/assets/img/logo.webp"');

// Ensure phone international format
footer = footer.replace(/tel:0540026747/g, 'tel:+966540026747');

// Ensure /contact/ and /gallery/ links exist in legal bar
if (!footer.includes('/contact/')) {
  footer = footer.replace(
    '<a href="/about/" class="hover:text-[#00c864] transition-colors">من نحن</a>',
    '<a href="/contact/" class="hover:text-[#00c864] transition-colors">اتصل بنا</a>\n                <span>•</span>\n                <a href="/gallery/" class="hover:text-[#00c864] transition-colors">معرض الصور</a>\n                <span>•</span>\n                <a href="/about/" class="hover:text-[#00c864] transition-colors">من نحن</a>'
  );
}

fs.writeFileSync(path.resolve(__dirname, 'root_footer.html'), footer, 'utf8');
console.log('root_footer.html created successfully! Length:', footer.length);

