const fs = require('fs');
const path = require('path');

const cityDirs = [
  'jeddah-to-riyadh',
  'jeddah-to-makkah',
  'jeddah-to-medina',
  'jeddah-to-dammam',
  'jeddah-to-taif',
  'jeddah-to-tabuk',
  'jeddah-to-jazan',
  'jeddah-to-jubail',
  'jeddah-to-khamis-mushait',
  'jeddah-to-khobar',
  'jeddah-to-al-ahsa',
  'riyadh-to-jeddah'
];

cityDirs.forEach(dir => {
  const filePath = path.join(__dirname, '..', 'areas', dir, 'index.html');
  if (!fs.existsSync(filePath)) {
    console.log(dir, 'FILE NOT FOUND');
    return;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  
  const titleMatch = content.match(/<title>(.*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1] : 'NO TITLE';
  
  const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
  const desc = descMatch ? descMatch[1] : 'NO DESC';
  
  const canonMatch = content.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/i);
  const canonical = canonMatch ? canonMatch[1] : 'NO CANONICAL';
  
  const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ') : 'NO H1';
  
  const hasBreadcrumbNav = content.includes('aria-label="مسار التصفح"') || (content.includes('breadcrumb') && content.includes('<ol'));
  const hasReviewsSection = content.includes('آراء العملاء') || content.includes('تجارب العملاء') || content.includes('تقييمات العملاء');
  const hasMap = content.includes('<iframe') && content.includes('google.com/maps');
  const hasPricingTable = content.includes('<table') || content.includes('جدول أسعار');
  const schemaHasRating = content.includes('AggregateRating');
  const schemaHasReviews = content.includes('"review":');
  
  console.log('=== ' + dir + ' ===');
  console.log('Title:', title);
  console.log('H1:', h1);
  console.log('Canonical:', canonical);
  console.log('Has Visual Breadcrumb:', hasBreadcrumbNav);
  console.log('Has Pricing Table:', hasPricingTable);
  console.log('Has Map:', hasMap);
  console.log('Has Reviews Section:', hasReviewsSection);
  console.log('Schema AggregateRating:', schemaHasRating);
  console.log('Schema Reviews:', schemaHasReviews);
  console.log('File size (chars):', content.length);
  console.log('');
});

