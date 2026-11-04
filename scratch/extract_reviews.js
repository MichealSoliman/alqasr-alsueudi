const fs = require('fs');

function extractReviews(file, id) {
    const content = fs.readFileSync(file, 'utf8');
    const idx = content.indexOf(`id="${id}"`);
    if (idx === -1) return [];
    const endIdx = content.indexOf('</section>', idx);
    const section = content.slice(idx, endIdx);
    
    // matches cards
    const reviews = [];
    const re = /<div class="font-bold text-blue-950 text-sm">([^<]+)<\/div>[\s\S]*?<p class="text-xs text-gray-600 leading-relaxed">\s*"([\s\S]*?)"\s*<\/p>/g;
    let match;
    while ((match = re.exec(section)) !== null) {
        reviews.push({
            name: match[1].trim(),
            body: match[2].trim()
        });
    }
    return reviews;
}

['taif', 'tabuk', 'jubail', 'khamis-mushait'].forEach(city => {
    const file = `areas/jeddah-to-${city}/index.html`;
    const revs = extractReviews(file, 'customer-reviews');
    console.log(`=== ${city} (${revs.length} reviews) ===`);
    revs.forEach(r => console.log(`- ${r.name}: ${r.body.slice(0, 60)}...`));
});

