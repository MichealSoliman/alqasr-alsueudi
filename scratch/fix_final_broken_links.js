const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

function fixFile(relPath, replacer) {
  const full = path.join(root, relPath);
  if (fs.existsSync(full)) {
    let content = fs.readFileSync(full, 'utf8');
    content = replacer(content);
    fs.writeFileSync(full, content, 'utf8');
  }
}

// 1. /areas/hayu-alrawda/index.html: hayu-alzalara -> hayu-alzahra
fixFile('areas/hayu-alrawda/index.html', c => c.replace(/\/areas\/hayu-alzalara\/?/g, '/areas/hayu-alzahra/'));

// 2. /areas/jeddah-to-al-ahsa/index.html: /how-to-move-heavy-furniture-without-damage/ -> /blogs/how-to-move-heavy-furniture-without-damage/
fixFile('areas/jeddah-to-al-ahsa/index.html', c => c.replace(/href="\/how-to-move-heavy-furniture-without-damage\/?"/g, 'href="/blogs/how-to-move-heavy-furniture-without-damage/"'));

// 3. /blogs/choosing-a-furniture-moving-company/index.html
fixFile('blogs/choosing-a-furniture-moving-company/index.html', c => {
  return c.replace(/href="\/cheap-furniture-moving-in-jeddah\/?"/g, 'href="/furniture-moving-prices-in-jeddah/"')
          .replace(/href="\/cheap-furniture-moving-jeddah\/?"/g, 'href="/furniture-moving-prices-in-jeddah/"')
          .replace(/href="\/tips-before-moving-furniture-in-jeddah\/?"/g, 'href="/blogs/tips-before-moving-furniture-in-jeddah/"');
});

// 4. In index.html: [[GBP_REVIEWS_URL]] placeholder
fixFile('index.html', c => c.replace(/href="\[\[GBP_REVIEWS_URL\]\]"/g, 'href="tel:+966540026747" data-placeholder="[[GBP_REVIEWS_URL]]"'));

// 5. In villa-moving-jeddah/index.html: moving-villas-jeddah.webp -> villa-moving-jeddah.webp
fixFile('villa-moving-jeddah/index.html', c => c.replace(/moving-villas-jeddah\.webp/g, 'villa-moving-jeddah.webp'));

console.log('Fixed final specific broken links!');

