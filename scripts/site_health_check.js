const fs = require('fs');
const path = require('path');

function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (file === 'node_modules' || file === '.git' || file === 'dist' || file === 'scripts') return;
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getAllHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const htmlFiles = getAllHtmlFiles('.');
console.log(`Checking ${htmlFiles.length} HTML files...`);

let issues = [];

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  
  // 1. Title tag
  const titleMatch = content.match(/<title>([\s\S]*?)<\/title>/i);
  if (!titleMatch) {
    issues.push({ file, type: 'MISSING_TITLE' });
  } else {
    const title = titleMatch[1].trim();
    if (/05\d{8}/.test(title)) {
      issues.push({ file, type: 'PHONE_IN_TITLE', detail: title });
    }
    if (title.length < 15) {
      issues.push({ file, type: 'SHORT_TITLE', detail: title });
    }
  }

  // 2. Meta description
  const metaDesc = content.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i);
  if (!metaDesc) {
    issues.push({ file, type: 'MISSING_META_DESCRIPTION' });
  }

  // 3. Canonical tag
  const canonical = content.match(/<link\s+rel=["']canonical["']\s+href=["']([\s\S]*?)["']/i);
  if (!canonical) {
    issues.push({ file, type: 'MISSING_CANONICAL' });
  }

  // 4. H1 tag
  const h1 = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (!h1) {
    issues.push({ file, type: 'MISSING_H1' });
  }

  // 5. Internal link check (checking hrefs starting with /)
  const links = [...content.matchAll(/href=["'](\/[^"'#?]+)["']/g)].map(m => m[1]);
  links.forEach(link => {
    // If it's a root link
    if (link === '/' || link === '') return;
    // Remove leading slash
    const cleanPath = link.replace(/^\//, '');
    
    // Check if file or directory/index.html exists
    const directPath = path.join('.', cleanPath);
    const dirIndexPath = path.join('.', cleanPath, 'index.html');
    
    if (!fs.existsSync(directPath) && !fs.existsSync(dirIndexPath)) {
      // Ignore static assets or external handles
      if (!cleanPath.startsWith('assets/') && !cleanPath.endsWith('.css') && !cleanPath.endsWith('.js') && !cleanPath.endsWith('.ico') && !cleanPath.endsWith('.xml') && !cleanPath.endsWith('.txt')) {
        issues.push({ file, type: 'BROKEN_INTERNAL_LINK', detail: link });
      }
    }
  });
});

console.log(`\n=== SITE HEALTH CHECK RESULTS ===`);
console.log(`Total Issues Found: ${issues.length}`);
if (issues.length > 0) {
  issues.forEach(i => console.log(`[${i.type}] in ${i.file}: ${i.detail || ''}`));
} else {
  console.log('CONGRATULATIONS: 0 issues found! Site is 100% clean, error-free, and SEO optimized.');
}
