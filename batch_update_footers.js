const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    for (const file of list) {
        if (file === 'node_modules' || file === '.git' || file === 'components') continue;
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            results = results.concat(getHtmlFiles(filePath));
        } else if (file.endsWith('.html')) {
            results.push(filePath);
        }
    }
    return results;
}

function getRootPrefix(filePath) {
    const rel = path.relative('.', filePath).replace(/\\/g, '/');
    const parts = rel.split('/');
    const depth = parts.length - 1;
    if (depth === 0) return './';
    return '../'.repeat(depth);
}

const files = getHtmlFiles('.');
let updatedCount = 0;

for (const f of files) {
    let content = fs.readFileSync(f, 'utf8');
    if (!content.includes('<footer')) continue;

    const root = getRootPrefix(f);
    const footerReplacement = `<!-- الفوتر الموحد (Unified Footer Component) -->\n    <div id="site-footer" data-root="${root}"></div>\n    <script src="${root}assets/js/footer.js" defer></script>`;

    const footerRegex = /<!--\s*Footer\s*-->[\s\S]*?<\/footer>|<footer[\s\S]*?<\/footer>/i;
    content = content.replace(footerRegex, footerReplacement);

    // Also update navbar.js src to use root relative path
    content = content.replace(/src=["']\/assets\/js\/navbar\.js["']/g, `src="${root}assets/js/navbar.js"`);

    // Verify file integrity
    if (!content.includes('</body>') || !content.includes('</html>')) {
        console.error(`Error: File integrity compromised in ${f}`);
        process.exit(1);
    }

    fs.writeFileSync(f, content, 'utf8');
    updatedCount++;
    console.log(`[${updatedCount}/59] Updated ${f} (root: ${root})`);
}

console.log(`\n🎉 Successfully updated ${updatedCount} files with unified footer component!`);
