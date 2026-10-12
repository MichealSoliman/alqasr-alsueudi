const fs = require('fs');
const path = require('path');

const componentPath = path.join(__dirname, 'components', 'footer.html');
const jsPath = path.join(__dirname, 'assets', 'js', 'footer.js');

if (!fs.existsSync(componentPath) || !fs.existsSync(jsPath)) {
    console.error('Error: components/footer.html or assets/js/footer.js not found');
    process.exit(1);
}

const componentHtml = fs.readFileSync(componentPath, 'utf8');
const jsContent = fs.readFileSync(jsPath, 'utf8');

// Convert {ROOT} to ${root}
let converted = componentHtml.replace(/\{ROOT\}/g, '${root}');
// Ensure year is dynamic ${currentYear}
converted = converted.replace(/2026/g, '${currentYear}');

// Find getFooterHTML function in footer.js
const fnStart = '    function getFooterHTML(root) {\n        const currentYear = new Date().getFullYear();\n        return `';
const fnEnd = '`;\n    }';

const startIdx = jsContent.indexOf(fnStart);
const endIdx = jsContent.indexOf(fnEnd, startIdx);

if (startIdx === -1 || endIdx === -1) {
    console.error('Could not locate getFooterHTML function bounds in footer.js');
    process.exit(1);
}

const newJsContent = jsContent.substring(0, startIdx + fnStart.length) + '\n' + converted.trim() + '\n    ' + jsContent.substring(endIdx);

fs.writeFileSync(jsPath, newJsContent, 'utf8');
console.log(' Successfully synchronized components/footer.html into assets/js/footer.js!');
