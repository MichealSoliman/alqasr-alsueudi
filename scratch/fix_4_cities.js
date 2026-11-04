const fs = require('fs');

function getBreadcrumbHtml(cityLabel) {
    return `                <!-- مسار التصفح المرئي (Breadcrumbs) -->
                <nav aria-label="مسار التصفح" class="mb-4 text-xs md:text-sm text-gray-200">
                    <ol class="flex items-center gap-2 justify-center flex-wrap">
                        <li><a href="/" class="hover:underline text-white/90">الرئيسية</a></li>
                        <li><i class="fas fa-chevron-left text-[10px] text-green-300"></i></li>
                        <li><a href="/furniture-moving-between-jeddah-cities/" class="hover:underline text-white/90">نقل العفش بين المدن</a></li>
                        <li><i class="fas fa-chevron-left text-[10px] text-green-300"></i></li>
                        <li class="text-yellow-300 font-bold" aria-current="page">${cityLabel}</li>
                    </ol>
                </nav>\n`;
}

const items = [
    { file: 'areas/jeddah-to-taif/index.html', label: 'نقل عفش من جدة إلى الطائف' },
    { file: 'areas/jeddah-to-tabuk/index.html', label: 'نقل عفش من جدة إلى تبوك' },
    { file: 'areas/jeddah-to-jubail/index.html', label: 'نقل عفش من جدة إلى الجبيل' },
    { file: 'areas/jeddah-to-khamis-mushait/index.html', label: 'نقل عفش من جدة إلى خميس مشيط' },
];

for (const item of items) {
    let c = fs.readFileSync(item.file, 'utf8');
    
    // Add breadcrumb before the badge
    const badgeRegex = /(<div class="[^"]*inline-flex items-center gap-2 bg-green-600\/90[^"]*">)/;
    if (badgeRegex.test(c)) {
        c = c.replace(badgeRegex, `${getBreadcrumbHtml(item.label)}$1`);
        console.log(`Breadcrumb added to ${item.file}`);
    } else {
        console.log(`Badge not found in ${item.file}`);
    }

    // Add id="reviews"
    if (c.includes('id="customer-reviews"')) {
        c = c.replace('id="customer-reviews"', 'id="reviews"');
        console.log(`id="reviews" updated in ${item.file}`);
    }

    fs.writeFileSync(item.file, c, 'utf8');
}

