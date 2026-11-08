const fs = require('fs');
const path = require('path');

const sampleHeaderPath = path.resolve(__dirname, 'sample_header.html');
let header = fs.readFileSync(sampleHeaderPath, 'utf8');

// Replace relative ../ and ./ with root-relative /
header = header.replace(/href="\.\.\//g, 'href="/');
header = header.replace(/src="\.\.\//g, 'src="/');
header = header.replace(/href="\.\//g, 'href="/');
header = header.replace(/src="\.\//g, 'src="/');

// Ensure logo points to /assets/img/logo.webp
header = header.replace(/src="[^"]*logo\.webp"/, 'src="/assets/img/logo.webp"');

// Ensure home link points to /
header = header.replace(/href="\.\."/, 'href="/"');

fs.writeFileSync(path.resolve(__dirname, 'root_header.html'), header, 'utf8');
console.log('root_header.html created successfully!');

