const fs = require('fs');

const updatedUrls = [
    'https://alqasr-alsueudi.com/',
    'https://alqasr-alsueudi.com/areas/',
    'https://alqasr-alsueudi.com/furniture-moving-between-jeddah-cities/',
    'https://alqasr-alsueudi.com/areas/jeddah-to-riyadh/',
    'https://alqasr-alsueudi.com/areas/riyadh-to-jeddah/',
    'https://alqasr-alsueudi.com/areas/jeddah-to-makkah/',
    'https://alqasr-alsueudi.com/areas/jeddah-to-medina/',
    'https://alqasr-alsueudi.com/areas/jeddah-to-dammam/',
    'https://alqasr-alsueudi.com/areas/jeddah-to-taif/',
    'https://alqasr-alsueudi.com/areas/jeddah-to-khobar/',
    'https://alqasr-alsueudi.com/areas/jeddah-to-jubail/',
    'https://alqasr-alsueudi.com/areas/jeddah-to-tabuk/',
    'https://alqasr-alsueudi.com/areas/jeddah-to-jazan/',
    'https://alqasr-alsueudi.com/areas/jeddah-to-khamis-mushait/',
    'https://alqasr-alsueudi.com/areas/jeddah-to-al-ahsa/',
    'https://alqasr-alsueudi.com/blogs/how-to-move-heavy-furniture-without-damage/'
];

let sitemap = fs.readFileSync('sitemap.xml', 'utf8');

let count = 0;
for (const url of updatedUrls) {
    // regex matching <url>\s*<loc>url</loc>\s*<lastmod>[^<]+</lastmod>
    const escapedUrl = url.replace(/[\/\.]/g, '\\$&');
    const regex = new RegExp(`(<loc>${escapedUrl}<\/loc>\\s*<lastmod>)[^<]+(<\/lastmod>)`);
    if (regex.test(sitemap)) {
        sitemap = sitemap.replace(regex, `$12026-11-04$2`);
        count++;
        console.log(`Updated: ${url}`);
    } else {
        console.log(`NOT found: ${url}`);
    }
}

// Also upgrade priorities of intercity routes to 0.9 if 0.8
const intercityUrls = [
    'https://alqasr-alsueudi.com/areas/riyadh-to-jeddah/',
    'https://alqasr-alsueudi.com/areas/jeddah-to-medina/',
    'https://alqasr-alsueudi.com/areas/jeddah-to-khobar/',
    'https://alqasr-alsueudi.com/areas/jeddah-to-al-ahsa/'
];

for (const url of intercityUrls) {
    const escapedUrl = url.replace(/[\/\.]/g, '\\$&');
    const prioRegex = new RegExp(`(<loc>${escapedUrl}<\\/loc>[\\s\\S]*?<priority>)0\\.8(<\\/priority>)`);
    if (prioRegex.test(sitemap)) {
        sitemap = sitemap.replace(prioRegex, `$10.9$2`);
        console.log(`Priority upgraded to 0.9: ${url}`);
    }
}

fs.writeFileSync('sitemap.xml', sitemap, 'utf8');
console.log(`Total URLs updated with 2026-11-04: ${count}/${updatedUrls.length}`);

