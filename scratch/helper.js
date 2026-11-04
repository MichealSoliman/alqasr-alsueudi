const fs = require('fs');

function inspectPage(file) {
    const content = fs.readFileSync(file, 'utf8');
    const hasReviews = content.indexOf('id="reviews"') > -1 || content.indexOf("id='reviews'") > -1;
    const reviewMatches = content.match(/class="[^"]*review[^"]*"/g);
    console.log(`File: ${file}`);
    console.log(`Has id="reviews": ${hasReviews}`);
    console.log(`Review class matches: ${reviewMatches ? reviewMatches.length : 0}`);
    
    // Check if other-routes is present
    const hasOtherRoutes = content.indexOf('id="other-routes"') > -1 || content.indexOf('id=\'other-routes\'') > -1;
    console.log(`Has other-routes: ${hasOtherRoutes}`);
    
    // Check H1
    const h1 = (content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [])[1];
    console.log(`H1: ${h1 ? h1.replace(/<[^>]+>/g, '').trim() : 'NONE'}`);
    
    // Check Title
    const title = (content.match(/<title>([\s\S]*?)<\/title>/i) || [])[1];
    console.log(`Title: ${title ? title.trim() : 'NONE'}`);
}

const args = process.argv.slice(2);
if (args.length > 0) {
    inspectPage(args[0]);
}

