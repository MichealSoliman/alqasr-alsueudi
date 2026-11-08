const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const imgDir = path.join(root, 'assets/img');

function getImages(dir, files = []) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      getImages(full, files);
    } else if (/\.(webp|jpg|jpeg|png|svg|ico)$/i.test(item)) {
      files.push({
        path: path.relative(root, full).replace(/\\/g, '/'),
        ext: path.extname(item).toLowerCase(),
        sizeKB: Math.round(stat.size / 1024),
        name: item
      });
    }
  }
  return files;
}

const images = getImages(imgDir);
console.log(`Total images in assets/img: ${images.length}`);

const nonWebP = images.filter(i => !['.webp', '.svg', '.ico'].includes(i.ext));
console.log(`Non-WebP images: ${nonWebP.length}`);
nonWebP.forEach(i => console.log('  ', i.path, `(${i.sizeKB} KB)`));

const over150 = images.filter(i => i.sizeKB > 150);
console.log(`Images over 150KB: ${over150.length}`);
over150.forEach(i => console.log('  ', i.path, `(${i.sizeKB} KB)`));

