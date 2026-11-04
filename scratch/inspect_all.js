const fs = require('fs');

const pages = [
    'areas/jeddah-to-riyadh/index.html',
    'areas/jeddah-to-makkah/index.html',
    'areas/jeddah-to-medina/index.html',
    'areas/jeddah-to-dammam/index.html',
    'areas/jeddah-to-taif/index.html',
    'areas/jeddah-to-tabuk/index.html',
    'areas/jeddah-to-jazan/index.html',
    'areas/jeddah-to-jubail/index.html',
    'areas/jeddah-to-khamis-mushait/index.html',
    'areas/jeddah-to-khobar/index.html',
    'areas/jeddah-to-al-ahsa/index.html',
    'areas/riyadh-to-jeddah/index.html'
];

for (const p of pages) {
    if (!fs.existsSync(p)) continue;
    const content = fs.readFileSync(p, 'utf8');
    const hasBreadcrumb = content.includes('nav aria-label="مسار التصفح"') || content.includes('aria-label="Breadcrumb"') || content.includes('الرئيسية');
    const hasVisualBreadcrumb = content.includes('aria-label="مسار التصفح"') || content.includes('aria-label="breadcrumb"') || content.includes('class="breadcrumb');
    const hasOtherRoutes = content.includes('id="other-routes"');
    const hasReviews = content.includes('id="reviews"');
    const hasSchemaReviews = content.includes('"review": [') || content.includes('"review":[');
    console.log(`${p}:
  VisualBreadcrumb: ${hasVisualBreadcrumb}
  OtherRoutes: ${hasOtherRoutes}
  ReviewsSection: ${hasReviews}
  SchemaReviews: ${hasSchemaReviews}`);
}

