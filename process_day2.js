const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const neighborhoods = [
    {
        dir: 'hayu-aleazizia',
        nameAr: 'العزيزية',
        streets: ['شارع المكرونة', 'شارع غرناطة', 'طريق التضامن العربي'],
        landmarks: ['فلامنجو مول', 'مستشفى المكرونة', 'سوق النجار'],
        nature: 'يتميز بكثافة سكانية وتجارية عالية، ويضم مزيجاً من العمائر السكنية المتعددة الطوابق والمجمعات التجارية.',
        transportChallenges: 'قد تواجه سيارات النقل الكبيرة تحديات في بعض الشوارع الداخلية الضيقة، مما يتطلب استخدام سيارات (دينا) متوسطة الحجم لسهولة التنقل والوقوف.',
        mapQuery: 'حي العزيزية جدة'
    },
    {
        dir: 'hayu-alhamdania',
        nameAr: 'الحمدانية',
        streets: ['شارع الحمدانية العام', 'طريق الحرمين', 'شارع القاسم بن أمية'],
        landmarks: ['سوبرماركت بنده', 'المدينة الرياضية القريبة'],
        nature: 'حي حديث وسريع النمو، يتميز بالشوارع الواسعة والفلل السكنية الراقية والعمائر الحديثة.',
        transportChallenges: 'شوارع الحي الواسعة تسهل دخول شاحنات النقل الكبيرة (التريلات) والدينات بمرونة عالية، مما يسرع من عملية التحميل والتنزيل خاصة للفلل والمنازل الكبيرة.',
        mapQuery: 'حي الحمدانية جدة'
    },
    {
        dir: 'hayu-obhur-al-shamaliya',
        nameAr: 'أبحر الشمالية',
        streets: ['طريق عابر القارات', 'شارع الأمير عبد المجيد', 'طريق الكورنيش'],
        landmarks: ['شرم أبحر', 'كلية البترجي', 'المنتجعات السياحية'],
        nature: 'حي ساحلي راقٍ، يتكون بشكل رئيسي من الفلل الفاخرة والمجمعات السكنية الحديثة والقصور.',
        transportChallenges: 'نقل العفش في أبحر الشمالية يتطلب عناية فائقة وتغليفاً ممتازاً لحماية الأثاث من الرطوبة القريبة من البحر. المساحات الواسعة تسمح باستخدام الرافعات (الونش) بسهولة للفلل والأدوار العليا.',
        mapQuery: 'حي أبحر الشمالية جدة'
    },
    {
        dir: 'hayu-alrawda',
        nameAr: 'الروضة',
        streets: ['شارع التحلية (الأمير محمد بن عبد العزيز)', 'شارع صاري', 'شارع الكيال'],
        landmarks: ['مستشفى الملك فيصل التخصصي', 'ممشى الروضة', 'أسواق ستارز آفينيو'],
        nature: 'من أرقى وأعرق أحياء جدة، يجمع بين السكن الفاخر والمراكز التجارية والطبية الكبرى.',
        transportChallenges: 'بسبب الحركة المرورية الكثيفة في الشوارع الرئيسية المحيطة، نفضل جدولة عمليات نقل العفش في أوقات هادئة لتجنب الازدحام، مع توفير أقصى درجات الاحترافية لنقل الأثاث الثمين.',
        mapQuery: 'حي الروضة جدة'
    },
    {
        dir: 'hayu-alsalama',
        nameAr: 'السلامة',
        streets: ['شارع عبد الرحمن السديري', 'طريق المدينة المنورة', 'شارع صاري'],
        landmarks: ['دوار رامي (سابقاً)', 'مركز الشعلة التجاري', 'مستشفى الأنصار'],
        nature: 'حي حيوي في قلب جدة، يتميز بتخطيط شبكي يضم عمائر سكنية وأسواقاً نشطة ومكاتب إدارية.',
        transportChallenges: 'التخطيط الشبكي للحي يسهل الوصول لمعظم المواقع، إلا أن الكثافة في أوقات الذروة تتطلب سائقين ذوي خبرة. نوفر دينات نقل عفش مخصصة تناسب مواقف العمائر السكنية.',
        mapQuery: 'حي السلامة جدة'
    }
];

const areasDir = path.join(__dirname, 'areas');

let stats = {
    updated: [],
    failed: []
};

neighborhoods.forEach(hood => {
    const indexPath = path.join(areasDir, hood.dir, 'index.html');
    if (!fs.existsSync(indexPath)) {
        stats.failed.push(hood.dir);
        return;
    }

    let html = fs.readFileSync(indexPath, 'utf-8');
    const $ = cheerio.load(html, { decodeEntities: false });

    const $article = $('.article-content');
    if ($article.length === 0) return;

    // 1. Update the introduction paragraph to be local-specific
    const introP = $article.find('p').first();
    const newIntro = `<p>إذا كنت تبحث عن <strong>شركة نقل عفش في حي ${hood.nameAr} بجدة</strong> موثوقة واحترافية، فإن <a href="https://alqasr-alsueudi.com/" class="text-primary font-bold">شركة القصر السعودي</a> تقدم لك الحلول المتكاملة. يعتبر حي ${hood.nameAr} من الأحياء المهمة في جدة حيث ${hood.nature} نحن نفهم طبيعة المنطقة واحتياجات سكانها، ونوفر سيارات نقل وعمالة مدربة للتعامل مع كافة متطلبات نقل السكن أو المكاتب داخل الحي أو منه إلى أي وجهة أخرى.</p>`;
    introP.replaceWith(newIntro);

    // 2. Add Local Content Section (H2)
    // Remove if already exists to prevent duplication
    $('#local-info-section, #local-map-section').remove();
    $('.local-content-wrapper').remove();

    const localSectionHtml = `
    <div class="local-content-wrapper my-8 p-6 bg-blue-50 border border-blue-100 rounded-xl">
        <h2 id="local-info-section" class="text-2xl font-bold text-blue-900 mb-4 border-r-4 border-primary pr-3">تفاصيل النقل في حي ${hood.nameAr}</h2>
        <p class="mb-4 text-gray-700 leading-relaxed">
            لضمان تقديم خدمة سريعة وآمنة، نعتمد على معرفتنا التامة بشبكة طرق الحي. يحيط بالحي شوارع رئيسية مثل <strong>${hood.streets.join(' و')}</strong>، ونتواجد بالقرب من معالم بارزة كـ <strong>${hood.landmarks.join(' و')}</strong> لتسهيل تحديد مواقع الاستلام والتسليم.
        </p>
        <p class="mb-4 text-gray-700 leading-relaxed">
            ${hood.transportChallenges}
        </p>
        <p class="mb-2 text-gray-700 leading-relaxed">
            للحصول على خدمة متكاملة، يمكنك الاستفادة من <a href="../../furniture-dismantling-and-assembly-in-jeddah/" class="text-primary hover:underline font-semibold">خدمات فك وتركيب الأثاث</a> بأيدي نجارين محترفين، بالإضافة إلى <a href="../../furniture-packing-in-jeddah/" class="text-primary hover:underline font-semibold">تغليف العفش</a> لحمايته أثناء النقل. وللتعرف على التكلفة التقريبية راجع <a href="../../furniture-moving-prices-in-jeddah/" class="text-primary hover:underline font-semibold">أسعار نقل العفش بجدة</a>.
        </p>
    </div>
    
    <div class="local-content-wrapper my-8">
        <h2 id="local-map-section" class="text-2xl font-bold text-blue-900 mb-4 border-r-4 border-primary pr-3">موقع حي ${hood.nameAr} على الخريطة</h2>
        <div class="w-full h-80 rounded-xl overflow-hidden shadow-md border border-gray-200">
            <iframe 
                title="خريطة حي ${hood.nameAr} جدة"
                src="https://www.google.com/maps?q=${encodeURIComponent('حي ' + hood.nameAr + ' جدة')}&output=embed" 
                width="100%" 
                height="100%" 
                style="border:0;" 
                allowfullscreen="" 
                loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade">
            </iframe>
        </div>
    </div>
    `;

    // Insert the local section right after the TOC or Intro if no TOC
    const $toc = $('.table-of-contents');
    if ($toc.length > 0) {
        $toc.after(localSectionHtml);
    } else {
        $article.find('p').first().after(localSectionHtml);
    }

    // 3. Regenerate TOC to include new headers
    // We will just call the same logic to rebuild the TOC
    let tocHtml = `<nav class="table-of-contents bg-gray-50 border border-gray-200 rounded-xl p-6 my-8" aria-label="فهرس المحتوى">\n            <h2 class="text-xl font-extrabold text-blue-900 mb-4 flex items-center m-0 border-0"><i class="fas fa-list-ul ml-2 text-green-600"></i> فهرس المحتوى</h2>\n            <ul class="space-y-3 m-0 list-none p-0">`;
    const headings = $article.find('h2');
    headings.each((i, el) => {
        const $h2 = $(el);
        const text = $h2.text().trim();
        if (text.includes('مراجعة المحتوى') || text.includes('فهرس المحتوى')) return;

        let id = $h2.attr('id');
        if (!id) {
            id = `section-${i+1}`;
            // apply basic ID assignment if missing
            $h2.attr('id', id);
        }

        tocHtml += `\n                <li><a href="#${id}" class="text-gray-700 hover:text-green-700 font-semibold transition-colors flex items-center"><i class="fas fa-chevron-left ml-2 text-xs text-green-600"></i> ${text}</a></li>`;
    });
    tocHtml += `\n            </ul>\n        </nav>`;

    $toc.replaceWith(tocHtml);

    fs.writeFileSync(indexPath, $.html(), 'utf-8');
    stats.updated.push({
        hood: hood.dir,
        streets: hood.streets.length,
        mapAdded: true,
        tocUpdated: true
    });
});

console.log(JSON.stringify(stats, null, 2));
