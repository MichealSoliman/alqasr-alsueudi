const fs = require('fs');
const path = require('path');

function auditAreas() {
  const areasDir = 'areas';
  const areas = fs.readdirSync(areasDir).filter(f => fs.statSync(path.join(areasDir, f)).isDirectory());
  console.log(`=== AUDITING ${areas.length} AREA PAGES ===`);
  
  let phoneInTitleCount = 0;
  let oldDropdownCount = 0;
  let missingCanonical = 0;
  let missingH1 = 0;
  let missingSchema = 0;

  areas.forEach(area => {
    const file = path.join(areasDir, area, 'index.html');
    if (!fs.existsSync(file)) {
      console.log(`[MISSING FILE] ${file}`);
      return;
    }
    const html = fs.readFileSync(file, 'utf8');
    const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : '';
    if (/05\d{8}/.test(title)) {
      phoneInTitleCount++;
      console.log(`[PHONE IN TITLE] ${area}: ${title}`);
    }
    if (html.includes('w-64 bg-white border border-gray-100') || !html.includes('w-[580px]')) {
      oldDropdownCount++;
    }
    if (!/<link\s+rel=["']canonical["']/i.test(html)) {
      missingCanonical++;
    }
    if (!/<h1[^>]*>/i.test(html)) {
      missingH1++;
    }
    if (!/<script\s+type=["']application\/ld\+json["']/i.test(html)) {
      missingSchema++;
    }
  });

  console.log(`\nArea Summary:
- Phone in title: ${phoneInTitleCount}
- Old or incomplete dropdown: ${oldDropdownCount}
- Missing canonical: ${missingCanonical}
- Missing H1: ${missingH1}
- Missing Schema: ${missingSchema}`);
}

function auditBlogs() {
  const blogs = [
    'tips-before-moving-furniture-in-jeddah',
    'best-furniture-packaging-materials',
    'choosing-a-furniture-moving-company',
    'how-to-move-heavy-furniture-without-damage'
  ];
  console.log(`\n=== AUDITING 4 ACTIVE BLOGS ===`);
  blogs.forEach(b => {
    const file = path.join('blogs', b, 'index.html');
    if (fs.existsSync(file)) {
      const html = fs.readFileSync(file, 'utf8');
      const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
      const title = titleMatch ? titleMatch[1].trim() : '';
      const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
      const h1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : '';
      const canMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
      const canonical = canMatch ? canMatch[1] : '';
      const schemaMatch = html.match(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/i);
      const hasSchema = !!schemaMatch;
      const oldNav = html.includes('w-64 bg-white border border-gray-100');
      
      console.log(`[Blog] ${b}:
  Title: ${title}
  H1: ${h1}
  Canonical: ${canonical}
  Has Schema: ${hasSchema}
  Old Nav: ${oldNav}`);
    }
  });
}

function auditMainPages() {
  console.log(`\n=== AUDITING MAIN & STATIC PAGES ===`);
  const files = ['index.html', 'about/index.html', 'privacy-policy/index.html', 'terms-of-service/index.html', 'services/index.html', 'areas/index.html', 'blogs/index.html'];
  files.forEach(f => {
    if (fs.existsSync(f)) {
      const html = fs.readFileSync(f, 'utf8');
      const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
      const title = titleMatch ? titleMatch[1].trim() : '';
      const hasPhone = /05\d{8}/.test(title);
      const hasOldNav = html.includes('w-64 bg-white border border-gray-100');
      console.log(`Page [${f}]:
  Title: ${title} (Has phone: ${hasPhone})
  Old Nav: ${hasOldNav}`);
    }
  });
}

auditAreas();
auditBlogs();
auditMainPages();
