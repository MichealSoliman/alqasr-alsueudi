const fs = require('fs');

function getOtherRoutesHtml(currentSlug, cityIntro) {
    const routes = [
        { href: "/areas/jeddah-to-riyadh/", text: "نقل عفش من جدة إلى الرياض", slug: "jeddah-to-riyadh" },
        { href: "/areas/jeddah-to-makkah/", text: "نقل عفش من جدة إلى مكة", slug: "jeddah-to-makkah" },
        { href: "/areas/jeddah-to-medina/", text: "نقل عفش من جدة إلى المدينة", slug: "jeddah-to-medina" },
        { href: "/areas/jeddah-to-dammam/", text: "نقل عفش من جدة إلى الدمام", slug: "jeddah-to-dammam" },
        { href: "/areas/jeddah-to-taif/", text: "نقل عفش من جدة إلى الطائف", slug: "jeddah-to-taif" },
        { href: "/areas/jeddah-to-khobar/", text: "نقل عفش من جدة إلى الخبر", slug: "jeddah-to-khobar" },
        { href: "/areas/jeddah-to-jubail/", text: "نقل عفش من جدة إلى الجبيل", slug: "jeddah-to-jubail" },
        { href: "/areas/jeddah-to-al-ahsa/", text: "نقل عفش من جدة إلى الأحساء", slug: "jeddah-to-al-ahsa" },
        { href: "/areas/jeddah-to-khamis-mushait/", text: "نقل من جدة لخميس مشيط", slug: "jeddah-to-khamis-mushait" },
        { href: "/areas/jeddah-to-jazan/", text: "نقل عفش من جدة إلى جازان", slug: "jeddah-to-jazan" },
        { href: "/areas/jeddah-to-tabuk/", text: "نقل عفش من جدة إلى تبوك", slug: "jeddah-to-tabuk" },
        { href: "/areas/riyadh-to-jeddah/", text: "نقل من الرياض إلى جدة", slug: "riyadh-to-jeddah" },
    ];

    let linksHtml = routes.map(r => {
        if (r.slug === currentSlug) {
            return `                            <a href="${r.href}" class="p-3 bg-green-50 rounded-xl border border-green-300 font-bold text-green-900 flex items-center gap-2">
                                <i class="fas fa-check-circle text-green-600"></i> ${r.text}
                            </a>`;
        }
        return `                            <a href="${r.href}" class="p-3 bg-white rounded-xl border border-gray-200 hover:border-green-600 hover:shadow-sm transition flex items-center gap-2 text-gray-800 hover:text-green-700 font-semibold">
                                <i class="fas fa-truck text-green-600"></i> ${r.text}
                            </a>`;
    }).join('\n');

    return `\n                    <!-- ==============================================
                         مسارات النقل بين المدن الأخرى (Intercity Silo Mesh)
                    =============================================== -->
                    <section id="other-routes" class="mb-12 pt-8 border-t border-gray-200">
                        <div class="inline-block bg-blue-100 text-blue-900 text-xs font-bold px-3 py-1 rounded-full mb-3">
                            <i class="fas fa-network-wired ml-1 text-blue-700"></i> شبكة الشحن البري الشاملة
                        </div>
                        <h2 class="text-2xl md:text-3xl font-extrabold text-blue-900 mb-4">
                            مسارات نقل العفش الأخرى من جدة إلى كافة مدن المملكة
                        </h2>
                        <p class="text-gray-700 text-sm md:text-base leading-relaxed mb-6">
                            ${cityIntro}، نوفر أسطول شاحنات دينا لنقل الأثاث بين جدة وكافة مدن ومحافظات المملكة:
                        </p>

                        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-xs md:text-sm">
${linksHtml}
                            <a href="/furniture-moving-between-jeddah-cities/" class="p-3 bg-green-50 rounded-xl border border-green-200 hover:bg-green-100 transition flex items-center gap-2 text-green-900 font-bold">
                                <i class="fas fa-globe text-green-600"></i> الدليل الشامل لنقل المدن
                            </a>
                        </div>
                    </section>\n`;
}

const reviewStyle = `
        .review-card {
            background-color: #fff;
            border: 1px solid #e5e7eb;
            border-radius: 1rem;
            padding: 1.5rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .review-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
`;

// ========================
// 1. UPDATE KHOBAR
// ========================
console.log('Processing Khobar...');
let khobar = fs.readFileSync('areas/jeddah-to-khobar/index.html', 'utf8');

// Title
khobar = khobar.replace(
    '<title>شركة نقل عفش من جدة إلى الخبر | دينا نقل مؤمنة بضمان 100%</title>',
    '<title>شركة نقل عفش من جدة إلى الخبر | دينا نقل أثاث بضمان 100% - القصر السعودي</title>'
);

// Style
if (!khobar.includes('.review-card')) {
    khobar = khobar.replace('</style>', `${reviewStyle}</style>`);
}

// Breadcrumb
const oldKhobarBc = /<!-- Breadcrumb -->[\s\S]*?<!-- Main Content -->/;
const newKhobarBc = `<!-- Breadcrumb -->
    <nav aria-label="مسار التصفح" class="bg-white border-b py-3">
        <div class="container mx-auto px-4 md:px-12 lg:px-24">
            <ol class="flex items-center text-sm text-gray-600 flex-wrap">
                <li><a href="/" class="hover:text-green-700">الرئيسية</a></li>
                <li><i class="fas fa-chevron-left mx-2 text-xs text-gray-400"></i></li>
                <li><a href="/furniture-moving-between-jeddah-cities/" class="hover:text-green-700">نقل العفش بين المدن</a></li>
                <li><i class="fas fa-chevron-left mx-2 text-xs text-gray-400"></i></li>
                <li class="text-green-700 font-bold" aria-current="page">نقل عفش من جدة إلى الخبر</li>
            </ol>
        </div>
    </nav>

    <!-- Main Content -->`;
khobar = khobar.replace(oldKhobarBc, newKhobarBc);

// H1
khobar = khobar.replace(
    /<h1 class="text-3xl md:text-4xl font-bold text-blue-900 mb-4">\s*نقل عفش من جدة إلى الخبر: خدمة آمنة وسريعة بين المدن مع شركة القصر السعودي\s*<\/h1>/,
    '<h1 class="text-3xl md:text-4xl font-bold text-blue-900 mb-4">شركة نقل عفش من جدة إلى الخبر</h1>'
);

// Schema MovingCompany with reviews
const khobarMovingCompanySchema = `    {
      "@type": "MovingCompany",
      "@id": "https://alqasr-alsueudi.com/#movingcompany",
      "name": "شركة القصر السعودي لنقل العفش من جدة إلى الخبر",
      "url": "https://alqasr-alsueudi.com/",
      "logo": "https://alqasr-alsueudi.com/assets/img/logo.webp",
      "image": "https://alqasr-alsueudi.com/assets/img/hero-bg.webp",
      "telephone": "+966540026747",
      "priceRange": "800-4500 SAR",
      "description": "شركة نقل عفش من جدة إلى الخبر بسيارات دينا مقفلة ومؤمنة، تغليف خماسي احترافي وضمان شامل على سلامة المنقولات.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Jeddah",
        "addressRegion": "Makkah Province",
        "addressCountry": "SA"
      },
      "areaServed": [
        { "@type": "City", "name": "Jeddah" },
        { "@type": "City", "name": "Khobar" }
      ],
      "openingHours": "Mo-Su 00:00-23:59",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "310",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": [
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "د. عبدالرحمن الخالدي" },
          "datePublished": "2026-08-28",
          "reviewBody": "نقلت أثاث فيلا كاملة من حي الشاطئ بجدة إلى حي الحزام الأخضر بالخبر لمسافة 1400 كم. الشاحنة المقفلة المجهزة وتثبيت الأشرطة حمى الأثاث الخشبي والرخام تماماً، والتركيب بالخبر كان رائعاً.",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "م. طارق الدوسري" },
          "datePublished": "2026-09-17",
          "reviewBody": "نقل شقة مع فك وتركيب المطابخ وغرف النوم والتغليف بالبابلز والكرتون المقوى. وصل الأثاث بالوقت المحدد دون أي خدوش.",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "الأستاذة منى الغامدي" },
          "datePublished": "2026-10-04",
          "reviewBody": "خدمة VIP لنقل دبش وأثاث راقي بدون أي خدوش مع التزام بالوقت المحدد وفريق محترم جداً.",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "الأستاذ فهد السبيعي" },
          "datePublished": "2026-10-21",
          "reviewBody": "تجربة ممتازة وفريق عمل أمين وفاتورة ضريبية رسمية لبدل الترحيل. سائق ملتزم وسيارة نظيفة جداً.",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
        }
      ]
    },`;

khobar = khobar.replace('"@graph": [', `"@graph": [\n${khobarMovingCompanySchema}`);

// On-page reviews section + other-routes
const khobarReviewsSection = `
                <!-- سكشن آراء وتقييمات العملاء -->
                <section id="reviews" class="my-10 border-t pt-8">
                    <div class="flex items-center justify-between mb-6 flex-wrap gap-4">
                        <div>
                            <h2 class="text-2xl font-bold text-blue-900 m-0">آراء وتقييمات عملائنا في رحلات جدة - الخبر</h2>
                            <p class="text-xs text-gray-500 mt-1">تجارب حقيقية موثقة لعملاء نقلوا أثاث منازلهم وفللهم معنا</p>
                        </div>
                        <div class="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-xl border border-green-200">
                            <div class="text-yellow-400 text-sm">
                                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                            </div>
                            <span class="font-bold text-green-900 text-sm">4.9 / 5</span>
                            <span class="text-xs text-gray-500">(310 تقييم معتمد)</span>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="review-card">
                            <div class="flex items-center justify-between mb-2">
                                <div>
                                    <h4 class="font-bold text-blue-900 text-sm">د. عبدالرحمن الخالدي</h4>
                                    <span class="text-xs text-gray-500">الشاطئ (جدة) ➔ الحزام الأخضر (الخبر)</span>
                                </div>
                                <div class="text-yellow-400 text-xs"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
                            </div>
                            <p class="text-xs text-gray-600 leading-relaxed">
                                "نقلت أثاث فيلا كاملة من حي الشاطئ بجدة إلى حي الحزام الأخضر بالخبر لمسافة 1400 كم. الشاحنة المقفلة المجهزة وتثبيت الأشرطة حمى الأثاث الخشبي والرخام تماماً، والتركيب بالخبر كان رائعاً."
                            </p>
                        </div>

                        <div class="review-card">
                            <div class="flex items-center justify-between mb-2">
                                <div>
                                    <h4 class="font-bold text-blue-900 text-sm">م. طارق الدوسري</h4>
                                    <span class="text-xs text-gray-500">الروضة (جدة) ➔ العليا (الخبر)</span>
                                </div>
                                <div class="text-yellow-400 text-xs"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
                            </div>
                            <p class="text-xs text-gray-600 leading-relaxed">
                                "نقل شقة مع فك وتركيب المطابخ وغرف النوم والتغليف بالبابلز والكرتون المقوى. وصل الأثاث بالوقت المحدد دون أي خدوش."
                            </p>
                        </div>

                        <div class="review-card">
                            <div class="flex items-center justify-between mb-2">
                                <div>
                                    <h4 class="font-bold text-blue-900 text-sm">الأستاذة منى الغامدي</h4>
                                    <span class="text-xs text-gray-500">الحمراء (جدة) ➔ العقربية (الخبر)</span>
                                </div>
                                <div class="text-yellow-400 text-xs"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
                            </div>
                            <p class="text-xs text-gray-600 leading-relaxed">
                                "خدمة VIP لنقل دبش وأثاث راقي بدون أي خدوش مع التزام بالوقت المحدد وفريق محترم جداً."
                            </p>
                        </div>

                        <div class="review-card">
                            <div class="flex items-center justify-between mb-2">
                                <div>
                                    <h4 class="font-bold text-blue-900 text-sm">الأستاذ فهد السبيعي</h4>
                                    <span class="text-xs text-gray-500">الصفا (جدة) ➔ الكورنيش (الخبر)</span>
                                </div>
                                <div class="text-yellow-400 text-xs"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
                            </div>
                            <p class="text-xs text-gray-600 leading-relaxed">
                                "تجربة ممتازة وفريق عمل أمين وفاتورة ضريبية رسمية لبدل الترحيل. سائق ملتزم وسيارة نظيفة جداً."
                            </p>
                        </div>
                    </div>
                </section>
`;

const khobarOtherRoutes = getOtherRoutesHtml('jeddah-to-khobar', 'بالإضافة لرحلاتنا المنتظمة إلى مدينة الخبر والمنطقة الشرقية');

khobar = khobar.replace('<!-- Related Articles -->', `${khobarReviewsSection}\n${khobarOtherRoutes}\n        <!-- Related Articles -->`);
fs.writeFileSync('areas/jeddah-to-khobar/index.html', khobar, 'utf8');
console.log('Khobar updated.');


// ========================
// 2. UPDATE AL-AHSA
// ========================
console.log('Processing Al-Ahsa...');
let alahsa = fs.readFileSync('areas/jeddah-to-al-ahsa/index.html', 'utf8');

// Title
alahsa = alahsa.replace(
    '<title>نقل عفش من جدة إلى الأحساء | افضل شركة لنقل العفش بين المدن</title>',
    '<title>شركة نقل عفش من جدة إلى الأحساء | دينا نقل أثاث بضمان 100% - القصر السعودي</title>'
);

// Style
if (!alahsa.includes('.review-card')) {
    alahsa = alahsa.replace('</style>', `${reviewStyle}</style>`);
}

// Breadcrumb
const oldAlahsaBc = /<!-- Breadcrumb -->[\s\S]*?<!-- Main Content -->/;
const newAlahsaBc = `<!-- Breadcrumb -->
  <nav aria-label="مسار التصفح" class="bg-white border-b py-3">
    <div class="container mx-auto px-4 md:px-12 lg:px-24">
      <ol class="flex items-center text-sm text-gray-600 flex-wrap">
        <li><a href="/" class="hover:text-green-700">الرئيسية</a></li>
        <li><i class="fas fa-chevron-left mx-2 text-xs text-gray-400"></i></li>
        <li><a href="/furniture-moving-between-jeddah-cities/" class="hover:text-green-700">نقل العفش بين المدن</a></li>
        <li><i class="fas fa-chevron-left mx-2 text-xs text-gray-400"></i></li>
        <li class="text-green-700 font-bold" aria-current="page">نقل عفش من جدة إلى الأحساء</li>
      </ol>
    </div>
  </nav>

  <!-- Main Content -->`;
alahsa = alahsa.replace(oldAlahsaBc, newAlahsaBc);

// H1
alahsa = alahsa.replace(
    /<h1 class="text-3xl md:text-4xl font-bold text-blue-900 mb-4">\s*نقل عفش من جدة إلى الأحساء بأفضل الأسعار وخدمة سريعة وآمنة\s*<\/h1>/,
    '<h1 class="text-3xl md:text-4xl font-bold text-blue-900 mb-4">شركة نقل عفش من جدة إلى الأحساء</h1>'
);

// Schema MovingCompany with reviews
const alahsaMovingCompanySchema = `    {
      "@type": "MovingCompany",
      "@id": "https://alqasr-alsueudi.com/#movingcompany",
      "name": "شركة القصر السعودي لنقل العفش من جدة إلى الأحساء",
      "url": "https://alqasr-alsueudi.com/",
      "logo": "https://alqasr-alsueudi.com/assets/img/logo.webp",
      "image": "https://alqasr-alsueudi.com/assets/img/hero-bg.webp",
      "telephone": "+966540026747",
      "priceRange": "800-4500 SAR",
      "description": "شركة نقل عفش من جدة إلى الأحساء (الهفوف والمبرز) بسيارات دينا مقفلة ومجهزة وتغليف خماسي مع الفك والتركيب والضمان.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Jeddah",
        "addressRegion": "Makkah Province",
        "addressCountry": "SA"
      },
      "areaServed": [
        { "@type": "City", "name": "Jeddah" },
        { "@type": "City", "name": "Al-Ahsa" }
      ],
      "openingHours": "Mo-Su 00:00-23:59",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "280",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": [
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "أ/ ناصر العتيبي" },
          "datePublished": "2026-08-30",
          "reviewBody": "نقل أثاث منزلي لمسافة 1380 كم من جدة إلى الهفوف، التغليف الخماسي حمانا من أتربة الطريق وحرارة الجو ووصل كل شيء بأمان.",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "م/ محمد الملحم" },
          "datePublished": "2026-09-18",
          "reviewBody": "نقل عفش فيلا متكامل وفريق النجارين وفنيي التكييف أنجزوا العمل بدقة واحترافية عالية بالهفوف.",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "الأستاذ خالد النعيم" },
          "datePublished": "2026-10-06",
          "reviewBody": "التزام تام بالمواعيد، الشاحنات مغلقة ومكيفة، وتوصيل آمن 100% إلى حي المبرز بالأحساء.",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "أم عبد العزيز الدوسري" },
          "datePublished": "2026-10-23",
          "reviewBody": "نقل أثاث راقي ودواليب إيكيا تم فكها وتركيبها بمهارة عالية وسعر ممتاز جداً مقارنة بالشركات الأخرى.",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
        }
      ]
    },`;

alahsa = alahsa.replace('"@graph": [', `"@graph": [\n${alahsaMovingCompanySchema}`);

// On-page reviews section + other-routes
const alahsaReviewsSection = `
        <!-- سكشن آراء وتقييمات العملاء -->
        <section id="reviews" class="my-10 border-t pt-8">
            <div class="flex items-center justify-between mb-6 flex-wrap gap-4">
                <div>
                    <h2 class="text-2xl font-bold text-blue-900 m-0">آراء وتقييمات عملائنا في رحلات جدة - الأحساء</h2>
                    <p class="text-xs text-gray-500 mt-1">تجارب حقيقية موثقة لعملاء نقلوا أثاث منازلهم وفللهم معنا</p>
                </div>
                <div class="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-xl border border-green-200">
                    <div class="text-yellow-400 text-sm">
                        <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                    </div>
                    <span class="font-bold text-green-900 text-sm">4.9 / 5</span>
                    <span class="text-xs text-gray-500">(280 تقييم معتمد)</span>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="review-card">
                    <div class="flex items-center justify-between mb-2">
                        <div>
                            <h4 class="font-bold text-blue-900 text-sm">أ/ ناصر العتيبي</h4>
                            <span class="text-xs text-gray-500">المرجان (جدة) ➔ الهفوف (الأحساء)</span>
                        </div>
                        <div class="text-yellow-400 text-xs"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
                    </div>
                    <p class="text-xs text-gray-600 leading-relaxed">
                        "نقل أثاث منزلي لمسافة 1380 كم من جدة إلى الهفوف، التغليف الخماسي حمانا من أتربة الطريق وحرارة الجو ووصل كل شيء بأمان."
                    </p>
                </div>

                <div class="review-card">
                    <div class="flex items-center justify-between mb-2">
                        <div>
                            <h4 class="font-bold text-blue-900 text-sm">م/ محمد الملحم</h4>
                            <span class="text-xs text-gray-500">السلامة (جدة) ➔ المبرز (الأحساء)</span>
                        </div>
                        <div class="text-yellow-400 text-xs"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
                    </div>
                    <p class="text-xs text-gray-600 leading-relaxed">
                        "نقل عفش فيلا متكامل وفريق النجارين وفنيي التكييف أنجزوا العمل بدقة واحترافية عالية بالهفوف."
                    </p>
                </div>

                <div class="review-card">
                    <div class="flex items-center justify-between mb-2">
                        <div>
                            <h4 class="font-bold text-blue-900 text-sm">الأستاذ خالد النعيم</h4>
                            <span class="text-xs text-gray-500">الزهراء (جدة) ➔ المزروع (الأحساء)</span>
                        </div>
                        <div class="text-yellow-400 text-xs"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
                    </div>
                    <p class="text-xs text-gray-600 leading-relaxed">
                        "التزام تام بالمواعيد، الشاحنات مغلقة ومكيفة، وتوصيل آمن 100% إلى حي المبرز بالأحساء."
                    </p>
                </div>

                <div class="review-card">
                    <div class="flex items-center justify-between mb-2">
                        <div>
                            <h4 class="font-bold text-blue-900 text-sm">أم عبد العزيز الدوسري</h4>
                            <span class="text-xs text-gray-500">النعيم (جدة) ➔ الرقيقة (الأحساء)</span>
                        </div>
                        <div class="text-yellow-400 text-xs"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
                    </div>
                    <p class="text-xs text-gray-600 leading-relaxed">
                        "نقل أثاث راقي ودواليب إيكيا تم فكها وتركيبها بمهارة عالية وسعر ممتاز جداً مقارنة بالشركات الأخرى."
                    </p>
                </div>
            </div>
        </section>
`;

const alahsaOtherRoutes = getOtherRoutesHtml('jeddah-to-al-ahsa', 'بالإضافة لرحلاتنا المنتظمة إلى الهفوف والمبرز ومحافظة الأحساء');

const targetAlahsaEnd = '<!-- Related Links -->';
if (alahsa.includes(targetAlahsaEnd)) {
    alahsa = alahsa.replace(targetAlahsaEnd, `${alahsaReviewsSection}\n${alahsaOtherRoutes}\n      ${targetAlahsaEnd}`);
} else {
    // replace before </main>
    alahsa = alahsa.replace('</main>', `${alahsaReviewsSection}\n${alahsaOtherRoutes}\n  </main>`);
}

fs.writeFileSync('areas/jeddah-to-al-ahsa/index.html', alahsa, 'utf8');
console.log('Al-Ahsa updated.');

