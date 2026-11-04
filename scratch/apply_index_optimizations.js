const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

console.log('Original length:', html.length);

// ==========================================
// 1. HEAD MODIFICATIONS
// ==========================================

// 1.1 Title
html = html.replace(
    /<title>.*?<\/title>/,
    '<title>شركة نقل عفش جدة | فك وتركيب وتغليف | القصر السعودي</title>'
);

// 1.2 Meta Description
html = html.replace(
    /<meta name="description" content="[^"]*">/,
    '<meta name="description" content="شركة نقل عفش جدة: دينا مقفلة، فك وتركيب وتغليف احترافي، وونش رفع لجميع الأحياء. أسعار تبدأ من 300 ريال. اتصل الآن 0540026747">'
);

// 1.3 Open Graph & Twitter
html = html.replace(
    /<meta property="og:title" content="[^"]*">/,
    '<meta property="og:title" content="شركة نقل عفش جدة | القصر السعودي - فك وتركيب وتغليف">'
);
html = html.replace(
    /<meta property="og:description" content="[^"]*">/,
    '<meta property="og:description" content="شركة نقل عفش جدة: دينا مقفلة، فك وتركيب وتغليف احترافي، وونش رفع لجميع الأحياء. أسعار تبدأ من 300 ريال. اتصل الآن 0540026747">\n    <meta property="og:image:alt" content="سيارة دينا مقفلة لنقل العفش بجدة - شركة القصر السعودي">'
);
html = html.replace(
    /<meta name="twitter:title" content="[^"]*">/,
    '<meta name="twitter:title" content="شركة نقل عفش جدة | القصر السعودي - فك وتركيب وتغليف">'
);
html = html.replace(
    /<meta name="twitter:description" content="[^"]*">/,
    '<meta name="twitter:description" content="شركة نقل عفش جدة: دينا مقفلة، فك وتركيب وتغليف احترافي، وونش رفع لجميع الأحياء. أسعار تبدأ من 300 ريال. اتصل الآن 0540026747">\n    <meta name="twitter:image:alt" content="سيارة دينا مقفلة لنقل العفش بجدة - شركة القصر السعودي">'
);

// 1.4 Delete unused meta tags
html = html.replace(/\s*<meta http-equiv="Content-Language" content="ar-SA">/, '');
html = html.replace(/\s*<meta name="rating" content="general">/, '');
html = html.replace(/\s*<meta name="geo\.region" content="SA-02">/, '');
html = html.replace(/\s*<meta name="geo\.placename" content="Jeddah">/, '');

// 1.5 Icons
html = html.replace(/\s*<link rel="icon" type="image\/png" href="\/assets\/img\/favicon\.ico">/, '\n    <link rel="icon" type="image/png" sizes="32x32" href="/assets/img/favicon-32.png">');

// 1.6 Font preloads: remove cairo-latin preload
html = html.replace(/\s*<link rel="preload" href="\/assets\/fonts\/cairo-latin\.woff2" as="font" type="font\/woff2" crossorigin="">/, '');

// 1.7 Stylesheets relative paths
html = html.replace('href="./dist/style.css"', 'href="/dist/style.css"');
html = html.replace('href="./assets/css/style.css"', 'href="/assets/css/style.css"');

console.log('Head tags updated.');

// ==========================================
// 2. REWRITE JSON-LD
// ==========================================
const newJsonLd = `    <!-- Unified Schema (JSON-LD) -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "MovingCompany",
          "@id": "https://alqasr-alsueudi.com/#movingcompany",
          "name": "شركة القصر السعودي لنقل العفش بجدة",
          "alternateName": "القصر السعودي",
          "url": "https://alqasr-alsueudi.com/",
          "logo": "https://alqasr-alsueudi.com/assets/img/logo.webp",
          "image": [
            "https://alqasr-alsueudi.com/assets/img/furniture-moving-jeddah.webp"
          ],
          "telephone": "+966540026747",
          "email": "info@alqasr-alsueudi.com",
          "priceRange": "300-2500 SAR",
          "description": "شركة القصر السعودي لنقل أثاث المنازل والفلل والمكاتب بجدة مع الفك والتركيب والتغليف داخل جدة وخارجها.",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "[[STREET_ADDRESS]]",
            "addressLocality": "جدة",
            "addressRegion": "منطقة مكة المكرمة",
            "postalCode": "[[POSTAL_CODE]]",
            "addressCountry": "SA"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "[[LAT]]",
            "longitude": "[[LNG]]"
          },
          "hasMap": "[[GOOGLE_MAPS_URL]]",
          "areaServed": [
            { "@type": "City", "name": "جدة" },
            { "@type": "AdministrativeArea", "name": "شمال جدة" },
            { "@type": "AdministrativeArea", "name": "وسط جدة" },
            { "@type": "AdministrativeArea", "name": "شرق جدة" },
            { "@type": "AdministrativeArea", "name": "جنوب جدة" },
            { "@type": "City", "name": "مكة المكرمة" },
            { "@type": "City", "name": "الرياض" }
          ],
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday"
            ],
            "opens": "00:00",
            "closes": "23:59"
          },
          "paymentAccepted": "Cash, Credit Card, Mada, Bank Transfer",
          "currenciesAccepted": "SAR",
          "sameAs": [
            "https://x.com/alqusralsaudi",
            "https://www.facebook.com/profile.php?id=61576821128694",
            "https://www.instagram.com/alqusralsaudimoving/",
            "https://www.tiktok.com/@alqusralsaudimoving",
            "[[GBP_URL]]"
          ]
        },
        {
          "@type": "WebSite",
          "@id": "https://alqasr-alsueudi.com/#website",
          "url": "https://alqasr-alsueudi.com/",
          "name": "شركة القصر السعودي",
          "inLanguage": "ar-SA",
          "publisher": {
            "@id": "https://alqasr-alsueudi.com/#movingcompany"
          }
        },
        {
          "@type": "FAQPage",
          "@id": "https://alqasr-alsueudi.com/#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "كم تكلفة نقل العفش بجدة؟",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "تبدأ الأسعار التقديرية لنقل العفش بجدة من 300 ريال، وتتحدد التكلفة النهائية بناءً على حجم المنقولات، عدد الغرف، المسافة بين السكن الحالي والجديد، وجود أدوار مرتفعة، والخدمات المطلوبة مثل الفك والتركيب والتغليف."
              }
            },
            {
              "@type": "Question",
              "name": "هل تشمل الخدمة الفك والتركيب؟",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "نعم، نوفر طاقماً فنياً متخصصاً لفك غرف النوم والمطابخ والستائر والمكيفات، ثم إعادة تركيبها وتثبيتها بشكل آمن ودقيق في موقع السكن الجديد."
              }
            },
            {
              "@type": "Question",
              "name": "هل يتم تغليف الأثاث لحمايته أثناء النقل؟",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "نعم، يتم استخدام مواد تغليف مناسبة مثل البلاستيك الفقاعي والكرتون المقوى والنايلون الاسترتش لحماية الأسطح الخشبية والزجاجية والأجهزة الكهربائية من الخدوش والأتربة."
              }
            },
            {
              "@type": "Question",
              "name": "هل تنقلون الفلل والمكاتب والشركات؟",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "نعم، نوفر دينا نقل مغلقة بأحجام مختلفة وشاحنات مجهزة لنقل محتويات الشقق والمنازل والفلل بالكامل، بالإضافة إلى نقل أثاث ومعدات المكاتب والشركات التجارية."
              }
            },
            {
              "@type": "Question",
              "name": "هل تقدمون خدمة ونش رفع الأثاث؟",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "نعم، نوفر رافعة ونش هيدروليكي لتنزيل ورفع الأثاث الثقيل والقطع الضخمة عبر الواجهات الخارجية للشبابيك والبلكونات في حالة ضيق المبنى أو الأدوار العليا."
              }
            },
            {
              "@type": "Question",
              "name": "هل تغطي خدماتكم كافة أحياء مدينة جدة؟",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "نعم، نقدم خدمات النقل في كافة أحياء شمال ووسط وشرق وجنوب جدة، إلى جانب توفير رحلات نقل وشحن العفش من جدة إلى مختلف مدن المملكة."
              }
            },
            {
              "@type": "Question",
              "name": "هل توفرون مستودعات لتخزين الأثاث؟",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "نعم، نوفر خيارات تخزين أثاث مؤقتة أو طويلة المدى في مساحات مخصصة ومحمية لمنع اختلاط المنقولات والحفاظ عليها حتى استلامها."
              }
            },
            {
              "@type": "Question",
              "name": "كيف يتم تحديد السعر وحجز الخدمة؟",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "تواصل معنا عبر الاتصال أو الواتساب ووضّح حجم الأثاث وطبيعة الموقعين لتحديد التكلفة الدقيقة والموعد المناسب لبدء العمل."
              }
            },
            {
              "@type": "Question",
              "name": "كيف أختار شركة نقل عفش موثوقة في جدة؟",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "ابحث عن شركة تقدم عرض سعر واضحاً قبل التنفيذ، وتستخدم سيارات مقفلة، وتوفر فنيين للفك والتركيب، ولديها تقييمات حقيقية على خرائط جوجل وبيانات تواصل وعنوان معلن. وننصحك بسؤال الشركة عمّا يشمله السعر تحديداً قبل الحجز."
              }
            },
            {
              "@type": "Question",
              "name": "هل يمكن حجز خدمة نقل العفش في نفس اليوم؟",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "نستقبل طلبات الحجز على مدار الساعة عبر الاتصال أو الواتساب، وتعتمد إمكانية التنفيذ في نفس اليوم على توفر الفريق والسيارات في الموعد المطلوب، لذا ننصح بالتواصل مبكراً لتأكيد الموعد."
              }
            },
            {
              "@type": "Question",
              "name": "ما الفرق بين نقل العفش داخل جدة ونقله بين المدن؟",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "النقل داخل جدة يتم غالباً في يوم واحد وتُحسب تكلفته حسب حجم الأثاث والدور والخدمات، أما النقل بين المدن فيعتمد على المسافة ونوع الشاحنة وتغليف الطرق الطويلة، ويُحدد سعره بعد معرفة الوجهة وحجم المنقولات."
              }
            }
          ]
        }
      ]
    }
    </script>`;

const schemaRegex = /<!-- Unified Schema \(JSON-LD\) -->[\s\S]*?<\/script>/;
html = html.replace(schemaRegex, newJsonLd);
console.log('JSON-LD updated.');

// ==========================================
// 3. SEMANTIC HTML & BODY WRAPPER
// ==========================================
// Skip link
const skipLink = `\n    <!-- رابط التخطي للوصولية (Accessibility Skip Link) -->\n    <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:right-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-900 focus:text-white focus:rounded-lg focus:shadow-lg">تخطي إلى المحتوى</a>\n`;
html = html.replace('<body class="bg-white text-gray-800">', `<body class="bg-white text-gray-800">${skipLink}`);

// Main content tag wrapping
// open after </header>
html = html.replace('</header>', '</header>\n\n    <!-- Main Content Semantic Wrapper -->\n    <main id="main-content">');
// close before <div id="site-footer"
html = html.replace('<div id="site-footer"', '</main>\n\n    <div id="site-footer"');

console.log('Semantic HTML tags wrapped.');

// ==========================================
// 4. PHONE & WHATSAPP URL UNIFICATION
// ==========================================
// tel:+966540026747 everywhere
html = html.replace(/href="tel:0540026747"/g, 'href="tel:+966540026747"');

// whatsapp URI encoding
const generalWaMsg = encodeURIComponent("السلام عليكم، أرغب بعرض سعر لنقل عفش في جدة");
const econWaMsg = encodeURIComponent("السلام عليكم، أرغب بطلب الباقة الاقتصادية لنقل العفش");
const familyWaMsg = encodeURIComponent("السلام عليكم، أرغب بطلب باقة العائلة لنقل العفش");
const vipWaMsg = encodeURIComponent("السلام عليكم، أرغب بطلب باقة VIP لنقل العفش");

html = html.replace(/href="https:\/\/wa\.me\/966540026747\?text=طلب\+الباقة\+الاقتصادية\+لنقل\+العفش"/g, `href="https://wa.me/966540026747?text=${econWaMsg}"`);
html = html.replace(/href="https:\/\/wa\.me\/966540026747\?text=طلب\+باقة\+النقل\+الشامل"/g, `href="https://wa.me/966540026747?text=${familyWaMsg}"`);
html = html.replace(/href="https:\/\/wa\.me\/966540026747\?text=طلب\+الباقة\+الملكية\+VIP"/g, `href="https://wa.me/966540026747?text=${vipWaMsg}"`);

// Replace general wa.me (not followed by ?text=)
html = html.replace(/href="https:\/\/wa\.me\/966540026747(?!\?text=)"/g, `href="https://wa.me/966540026747?text=${generalWaMsg}"`);

console.log('Phones and WhatsApp URLs updated.');

// ==========================================
// 5. HERO SECTION UPDATES
// ==========================================
// Badge
html = html.replace(
    'الشركة الأولى المعتمدة لنقل وتغليف الأثاث في جدة | ترخيص رسمي وضمان 100%',
    'شركة القصر السعودي لنقل العفش بجدة | فك وتركيب وتغليف على مدار الساعة'
);

// Subtitle paragraph
html = html.replace(
    /<p class="text-lg md:text-xl text-gray-100 mb-6 leading-relaxed max-w-3xl mx-auto">[\s\S]*?<\/p>/,
    `<p class="text-lg md:text-xl text-gray-100 mb-6 leading-relaxed max-w-3xl mx-auto">نقدم خدمات شركة نقل عفش بجدة لنقل أثاث المنازل والفلل والمكاتب داخل جميع أحياء جدة، تشمل الفك والتركيب والتغليف الشامل بأجود الخامات، مع أسطول دينا مقفلة ومجهزة لحماية المنقولات من الخدوش والأتربة والكسر.</p>`
);

// Hero Stats -> Qualitative
const oldHeroStats = `<div class="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/10 pt-8 max-w-3xl mx-auto">
                    <div>
                        <div class="text-2xl sm:text-3xl font-bold text-green-300">15+</div>
                        <div class="text-xs sm:text-sm text-gray-200">سنوات خبرة بمجال النقل</div>
                    </div>
                    <div>
                        <div class="text-2xl sm:text-3xl font-bold text-green-300">5000+</div>
                        <div class="text-xs sm:text-sm text-gray-200">عميل راضٍ في جدة</div>
                    </div>
                    <div>
                        <div class="text-2xl sm:text-3xl font-bold text-green-300">24/7</div>
                        <div class="text-xs sm:text-sm text-gray-200">خدمة عملاء ودعم فوري</div>
                    </div>
                    <div>
                        <div class="text-2xl sm:text-3xl font-bold text-green-300">100%</div>
                        <div class="text-xs sm:text-sm text-gray-200">ضمان سلامة المنقولات</div>
                    </div>
                </div>`;

const newHeroStats = `<div class="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/10 pt-8 max-w-3xl mx-auto">
                    <div class="p-2">
                        <div class="text-lg sm:text-xl font-bold text-green-300">معاينة وتقدير</div>
                        <div class="text-xs sm:text-sm text-gray-200">قبل بدء التنفيذ</div>
                    </div>
                    <div class="p-2">
                        <div class="text-lg sm:text-xl font-bold text-green-300">دينا مقفلة</div>
                        <div class="text-xs sm:text-sm text-gray-200">مجهزة لحماية العفش</div>
                    </div>
                    <div class="p-2">
                        <div class="text-lg sm:text-xl font-bold text-green-300">استقبال الطلبات</div>
                        <div class="text-xs sm:text-sm text-gray-200">على مدار 24 ساعة</div>
                    </div>
                    <div class="p-2">
                        <div class="text-lg sm:text-xl font-bold text-green-300">تغطية للتلف</div>
                        <div class="text-xs sm:text-sm text-gray-200">وفق شروط الاتفاق</div>
                    </div>
                </div>`;

html = html.replace(oldHeroStats, newHeroStats);
console.log('Hero section updated.');

// ==========================================
// 6. ABOUT SECTION UPDATES
// ==========================================
// Badge
html = html.replace(
    '🏆 خبرة ميدانية لأكثر من 15 عاماً في جدة',
    '🏆 خبرة واحترافية في نقل الأثاث بجدة'
);

// Typo: نجارين خبراة -> نجارين خبراء
html = html.replace('فنيين ونجارين خبراة', 'فنيين ونجارين خبراء');

// First paragraph in about
const oldAboutP1 = `<p class="mb-4">
                        تعد <strong>شركة القصر السعودي</strong> خيارًا موثوقًا عند البحث عن <strong>شركة نقل عفش
                            جدة</strong>، حيث نمتلك خبرة تمتد لأكثر من 15 عامًا في إدارة عمليات النقل السكنية والتجارية.
                        نخدم أصحاب الشقق، الفلل، والمكاتب في كافة أحياء جدة (الشمالية، الجنوبية، والوسطى).
                    </p>`;

const newAboutP1 = `<p class="mb-4">
                        تعد <strong>شركة القصر السعودي</strong> خيارًا موثوقًا في خدمات <strong>نقل أثاث بجدة</strong>، حيث نعتمد على كوادر مهنية مدربة في إدارة عمليات النقل السكنية والتجارية. نخدم أصحاب الشقق، الفلل، والمكاتب في كافة أحياء جدة (الشمالية، الجنوبية، والوسطى).
                    </p>`;

html = html.replace(oldAboutP1, newAboutP1);

// Stats in About section
const oldAboutStats = `<div class="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                        <div class="text-3xl font-bold text-green-700">15+</div>
                        <div class="text-sm font-semibold text-gray-600 mt-1">سنة خبرة ميدانية</div>
                    </div>
                    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                        <div class="text-3xl font-bold text-green-700">5000+</div>
                        <div class="text-sm font-semibold text-gray-600 mt-1">عملية نقل ناجحة</div>
                    </div>
                    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                        <div class="text-3xl font-bold text-green-700">24/7</div>
                        <div class="text-sm font-semibold text-gray-600 mt-1">جاهزية على مدار اليوم</div>
                    </div>
                    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                        <div class="text-3xl font-bold text-green-700">✔️</div>
                        <div class="text-sm font-semibold text-gray-600 mt-1">التزام تام بالسلامة والمواعيد</div>
                    </div>
                </div>`;

const newAboutStats = `<div class="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                        <div class="text-2xl font-bold text-green-700">معاينة وتقدير</div>
                        <div class="text-sm font-semibold text-gray-600 mt-1">تقييم واضح قبل التنفيذ</div>
                    </div>
                    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                        <div class="text-2xl font-bold text-green-700">دينا مقفلة</div>
                        <div class="text-sm font-semibold text-gray-600 mt-1">شاحنات مجهزة ومبطنة</div>
                    </div>
                    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                        <div class="text-2xl font-bold text-green-700">24/7</div>
                        <div class="text-sm font-semibold text-gray-600 mt-1">استقبال الطلبات على مدار اليوم</div>
                    </div>
                    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                        <div class="text-2xl font-bold text-green-700">✔️</div>
                        <div class="text-sm font-semibold text-gray-600 mt-1">التزام تام بالسلامة والمواعيد</div>
                    </div>
                </div>`;

html = html.replace(oldAboutStats, newAboutStats);
console.log('About section updated.');

// ==========================================
// 7. PRICING SECTION UPDATES
// ==========================================
// Intro paragraph
html = html.replace(
    'نقدم أفضل عروض أسعار نقل الأثاث في جدة بأسعار تنافسية تبدأ من 300 ريال مع توفير باقات مرنة تناسب حجم منقولاتك وميزانيتك مع الضمان الشامل.',
    'نقدم أفضل أسعار نقل العفش بجدة بتكلفة تنافسية وشفافة تبدأ من 300 ريال مع توفير باقات مرنة تناسب حجم منقولاتك وميزانيتك مع وضوح كامل في بنود الخدمة.'
);

// Economy package description
html = html.replace(
    'مخصصة لمن حزم أمتعته بنفسه ويرغب في شاحنة مجهزة وعمالة مدربة للتحميل والتنزيل والنقل السريع.',
    'مخصصة لمن حزم أمتعته بنفسه ويرغب في شاحنة مجهزة وعمالة مدربة. تشمل النقل والتحميل والتنزيل فقط.'
);

// VIP package updates
html = html.replace('تغليف شامل 5 طبقات مستوردة', 'تغليف متعدد الطبقات');
html = html.replace('إشراف هندسي ميداني كامل', 'إشراف ميداني كامل');
html = html.replace('ضمان شامل مكتوب ضد أي خدش', 'تغطية للتلف وفق شروط الاتفاق');

// Table first row
const oldTableRow1 = `<td class="p-4 font-bold text-blue-900">شقة صغيرة (1-2 غرفة)</td>
                                <td class="p-4 text-green-700 font-black">300 - 500 ريال</td>
                                <td class="p-4 text-gray-600">دينا واحدة + 2 عمال + فك وتركيب وتغليف أساسي</td>`;

const newTableRow1 = `<td class="p-4 font-bold text-blue-900">شقة صغيرة (1-2 غرفة)</td>
                                <td class="p-4 text-green-700 font-black">300 - 500 ريال</td>
                                <td class="p-4 text-gray-600">نقل وتحميل وتنزيل (300 ريال) - ويُضاف الفك والتركيب والتغليف الأساسي حسب القطع (حتى 500 ريال)</td>`;

html = html.replace(oldTableRow1, newTableRow1);

// Table note under table
html = html.replace(
    '</tbody>\n                    </table>\n                </div>',
    '</tbody>\n                    </table>\n                </div>\n                <p class="text-xs text-gray-500 mt-4 text-center font-medium">الأسعار تقديرية وتُحدد نهائياً بعد معرفة حجم الأثاث والموقعين، وآخر تحديث: نوفمبر 2026.</p>'
);

// Factors influencing price box
const oldFactorsBox = /<div class="mt-8 bg-blue-50\/70 rounded-2xl p-6 border border-blue-100 text-gray-700">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<!-- Process CTA Banner -->/;
const newFactorsBox = `<div class="mt-8 bg-blue-50/70 rounded-2xl p-6 border border-blue-100 text-gray-700">
                <h3 class="text-xl font-bold text-blue-900 mb-3">
                    العوامل المؤثرة في تحديد سعر نقل العفش النهائي:
                </h3>
                <p class="text-sm md:text-base leading-relaxed mb-4">
                    لا يوجد سعر ثابت لجميع الحالات، بل يُحسب السعر بدقة بعد تقييم العناصر التالية:
                </p>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs md:text-sm font-semibold">
                    <div class="bg-white p-3 rounded-xl border border-blue-100 flex items-center gap-2">
                        <span class="text-green-600">▪</span> حجم وكمية الأثاث
                    </div>
                    <div class="bg-white p-3 rounded-xl border border-blue-100 flex items-center gap-2">
                        <span class="text-green-600">▪</span> المسافة بين الموقعين
                    </div>
                    <div class="bg-white p-3 rounded-xl border border-blue-100 flex items-center gap-2">
                        <span class="text-green-600">▪</span> رقم الدور وتوفر المصعد أو الونش
                    </div>
                    <div class="bg-white p-3 rounded-xl border border-blue-100 flex items-center gap-2">
                        <span class="text-green-600">▪</span> خدمات الفك والتركيب والتغليف المطلوبة
                    </div>
                </div>
                <div class="mt-4 pt-3 border-t border-blue-200/60 text-center">
                    <a href="/furniture-moving-prices-in-jeddah/" class="inline-flex items-center gap-1.5 text-blue-900 font-extrabold hover:text-green-700 text-sm underline">
                        تفاصيل أسعار نقل العفش بجدة كاملة ←
                    </a>
                </div>
            </div>
        </div>

        <!-- Process CTA Banner -->`;

html = html.replace(oldFactorsBox, newFactorsBox);
console.log('Pricing section updated.');

// ==========================================
// 8. SERVICES SECTION UPDATES
// ==========================================
html = html.replace(
    'نوفر باقة شاملة من خدمات نقل أثاث المنازل، الفلل، والمكاتب مع الفك والتركيب والتغليف وتخزين العفش بأعلى معايير الجودة والأمان.',
    'بصفتنا شركة نقل اثاث بجدة متخصصة، نوفر باقة شاملة من خدمات نقل أثاث المنازل، الفلل، والمكاتب مع الفك والتركيب والتغليف وتخزين العفش بأعلى معايير الجودة والأمان.'
);
console.log('Services section updated.');

// ==========================================
// 9. WHY US SECTION UPDATES
// ==========================================
// Intro
html = html.replace(
    'مزايا حقيقية وضمانات كتابية تجعلنا الخيار الأول لأكثر من 5000 عميل في كافة أحياء جدة ومحافظاتها.',
    'مزايا عملية في الفك والتغليف والنقل والتواصل تجعل شركة القصر السعودي خياراً موثوقاً لعملائنا في أحياء جدة.'
);

// Reason 2: المكثفات والمكيفات -> الأجهزة الكهربائية والمكيفات
html = html.replace(
    'التعامل الفني المباشر مع غرف النوم الكبيرة والمكثفات والمكيفات وإعادة تركيبها بالموقع\n                            الجديد.',
    'التعامل الفني المباشر مع غرف النوم الكبيرة والأجهزة الكهربائية والمكيفات وإعادة تركيبها بالموقع الجديد.'
);
html = html.replace(
    'التعامل الفني المباشر مع غرف النوم الكبيرة والمكثفات والمكيفات وإعادة تركيبها بالموقع الجديد.',
    'التعامل الفني المباشر مع غرف النوم الكبيرة والأجهزة الكهربائية والمكيفات وإعادة تركيبها بالموقع الجديد.'
);

// Comparison table
const oldCompTable = /<div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-16">[\s\S]*?<\/tbody>\s*<\/table>\s*<\/div>\s*<\/div>/;

const newCompTable = `<div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-16">
                <div class="bg-blue-900 text-white p-5 text-center">
                    <h3 class="text-xl md:text-2xl font-bold">
                        ما الذي تحصل عليه عند اختيار شركة نقل منظمة مقابل العمالة غير المنظمة؟
                    </h3>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-right text-sm border-collapse">
                        <thead>
                            <tr class="bg-gray-100 text-blue-900 border-b border-gray-200">
                                <th class="p-4 font-bold w-1/4">معيار المقارنة</th>
                                <th class="p-4 font-bold text-green-800 bg-green-50/70 w-3/8 border-r border-green-200">شركة القصر السعودي</th>
                                <th class="p-4 font-bold text-red-800 bg-red-50/70 w-3/8 border-r border-red-200">العمالة غير المنظمة</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100 text-gray-700">
                            <tr class="hover:bg-gray-50/50">
                                <td class="p-4 font-bold text-blue-900">1. الضمان والمسؤولية</td>
                                <td class="p-4 bg-green-50/40 text-green-900 border-r border-green-100">
                                    <strong>✔️ اتفاق واضح</strong> على الخدمة والتعويض عند التلف وفق شروط الاتفاق
                                </td>
                                <td class="p-4 bg-red-50/40 text-red-900 border-r border-red-100">
                                    <strong>❌ غالباً لا يوجد اتفاق</strong> مكتوب أو آلية تعويض واضحة
                                </td>
                            </tr>
                            <tr class="hover:bg-gray-50/50">
                                <td class="p-4 font-bold text-blue-900">2. خبرة الفك والتركيب</td>
                                <td class="p-4 bg-green-50/40 text-green-900 border-r border-green-100">
                                    <strong>✔️ نجارون وفنيون</strong> لفك وتركيب غرف النوم والمطابخ والمكيفات
                                </td>
                                <td class="p-4 bg-red-50/40 text-red-900 border-r border-red-100">
                                    <strong>❌ عمالة قد لا تمتلك</strong> خبرة الفك والتركيب المتخصصة
                                </td>
                            </tr>
                            <tr class="hover:bg-gray-50/50">
                                <td class="p-4 font-bold text-blue-900">3. خامات التغليف والحماية</td>
                                <td class="p-4 bg-green-50/40 text-green-900 border-r border-green-100">
                                    <strong>✔️ تغليف متعدد الطبقات</strong> (فقاعات بابلز، كرتون مقوى، استرتش)
                                </td>
                                <td class="p-4 bg-red-50/40 text-red-900 border-r border-red-100">
                                    <strong>❌ قد يتم النقل</strong> بدون تغليف مناسب لحماية الأسطح
                                </td>
                            </tr>
                            <tr class="hover:bg-gray-50/50">
                                <td class="p-4 font-bold text-blue-900">4. نوع سيارات النقل</td>
                                <td class="p-4 bg-green-50/40 text-green-900 border-r border-green-100">
                                    <strong>✔️ دينا صندوق مقفل ومبطن</strong> لحماية الأثاث من الغبار والحرارة
                                </td>
                                <td class="p-4 bg-red-50/40 text-red-900 border-r border-red-100">
                                    <strong>❌ قد تكون السيارة مكشوفة</strong> ومعرضة للأتربة والعوامل الجوية
                                </td>
                            </tr>
                            <tr class="hover:bg-gray-50/50">
                                <td class="p-4 font-bold text-blue-900">5. الشفافية والمواعيد</td>
                                <td class="p-4 bg-green-50/40 text-green-900 border-r border-green-100">
                                    <strong>✔️ سعر متفق عليه</strong> قبل التنفيذ ومواعيد محددة بدقة
                                </td>
                                <td class="p-4 bg-red-50/40 text-red-900 border-r border-red-100">
                                    <strong>❌ قد تظهر تكاليف إضافية</strong> بعد التحميل ومواعيد غير منضبطة
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>`;

html = html.replace(oldCompTable, newCompTable);
console.log('Why us section updated.');

// ==========================================
// 10. STORAGE SECTION UPDATES
// ==========================================
html = html.replace(
    '🏬 مستودعات نموذجية مؤمنة 24/7',
    '🏬 مساحات تخزين مخصصة ومحمية'
);
html = html.replace(
    'مساحات تخزين مستقلة ومكيفة ومحمية بكاميرات المراقبة وعزل تام ضد الرطوبة والحشرات للحفاظ على أثاثك بأعلى درجات الأمان.',
    'مساحات تخزين مخصصة ومحمية للأثاث لفترات قصيرة أو طويلة للحفاظ على العفش والمنقولات حتى موعد استلامها.'
);
console.log('Storage section updated.');

// ==========================================
// 11. CTA BEFORE TESTIMONIALS (Section 5 Keyword: نقل عفش جدة 24 ساعة)
// ==========================================
html = html.replace(
    'فريقنا جاهز على مدار 24 ساعة لتقديم خدمة\n                    نقل أثاث متكاملة بجدة مع التقدير المالي الدقيق والالتزام الفوري.',
    'نوفر خدمات نقل عفش جدة 24 ساعة لتلبية طلبات النقل العاجل والمجدول بأعلى درجات الالتزام والأمان والتقدير الدقيق للتكلفة.'
);
html = html.replace(
    'فريقنا جاهز على مدار 24 ساعة لتقديم خدمة نقل أثاث متكاملة بجدة مع التقدير المالي الدقيق والالتزام الفوري.',
    'نوفر خدمات نقل عفش جدة 24 ساعة لتلبية طلبات النقل العاجل والمجدول بأعلى درجات الالتزام والأمان والتقدير الدقيق للتكلفة.'
);

// ==========================================
// 12. TESTIMONIALS SECTION UPDATES
// ==========================================
const oldTestimonialsRegex = /<section class="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50" aria-labelledby="testimonials-heading">[\s\S]*?<\/section>/;

const newTestimonialsSection = `<section class="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50" aria-labelledby="testimonials-heading">
        <div class="container mx-auto px-4 md:px-8 lg:px-16 text-center">

            <!-- Section Header -->
            <div class="max-w-3xl mx-auto mb-8">
                <span class="text-amber-600 font-bold text-sm bg-amber-50 px-4 py-1.5 rounded-full border border-amber-200 inline-block mb-3">
                    ⭐ تقييمات العملاء
                </span>
                <h2 id="testimonials-heading" class="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-4">
                    آراء عملائنا في نقل العفش بجدة
                </h2>
                <p class="text-gray-600 text-base md:text-lg leading-relaxed">
                    نعتز بآراء وتجارب عملائنا الكرام في كافة أحياء جدة، ونحرص دائماً على تقديم أعلى معايير الشفافية والدقة في خدمات نقل وتغليف الأثاث.
                </p>
            </div>

            <!-- Google Business Profile Reviews Button -->
            <div class="inline-flex flex-col sm:flex-row items-center justify-center gap-4 bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm max-w-xl mx-auto">
                <div class="text-right">
                    <p class="font-bold text-blue-900 text-base mb-1">شاركنا تجربتك واقرأ التقييمات الحقيقية</p>
                    <p class="text-xs text-gray-500">تقييمات موثقة ومباشرة عبر منصة خرائط Google</p>
                </div>
                <a href="[[GBP_REVIEWS_URL]]" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white font-bold px-6 py-3.5 rounded-xl transition shadow-md text-sm shrink-0">
                    <i class="fab fa-google text-yellow-400"></i>
                    <span>اطلع على تقييمات عملائنا على خرائط جوجل</span>
                </a>
            </div>

        </div>
    </section>`;

html = html.replace(oldTestimonialsRegex, newTestimonialsSection);
console.log('Testimonials section updated.');

// ==========================================
// 13. FAQ SECTION UPDATES
// ==========================================
// Fix Q4 typo in visual HTML
html = html.replace(
    'نقل محتويات منازل الشقق والفلل بالكامل',
    'نقل محتويات الشقق والمنازل والفلل بالكامل'
);

// Add Q9, Q10, Q11 before the closing of #faq-accordion
const newFaqVisualItems = `
                <!-- Q9 -->
                <div class="border border-gray-200 rounded-2xl bg-gray-50 overflow-hidden">
                    <button type="button" class="w-full text-right p-5 md:p-6 font-bold text-blue-900 text-base md:text-lg flex justify-between items-center gap-4 focus:outline-none focus:ring-2 focus:ring-blue-900" aria-expanded="false" aria-controls="faq-ans-9" onclick="toggleFaq('faq-ans-9', this)">
                        <span>كيف أختار شركة نقل عفش موثوقة في جدة؟</span>
                        <span class="text-xl font-bold text-green-700 transform transition-transform duration-200 faq-icon">+</span>
                    </button>
                    <div id="faq-ans-9" class="hidden p-5 md:p-6 pt-0 text-gray-700 text-sm md:text-base leading-relaxed border-t border-gray-200/50 bg-white">
                        ابحث عن شركة تقدم عرض سعر واضحاً قبل التنفيذ، وتستخدم سيارات مقفلة، وتوفر فنيين للفك والتركيب، ولديها تقييمات حقيقية على خرائط جوجل وبيانات تواصل وعنوان معلن. وننصحك بسؤال الشركة عمّا يشمله السعر تحديداً قبل الحجز.
                    </div>
                </div>

                <!-- Q10 -->
                <div class="border border-gray-200 rounded-2xl bg-gray-50 overflow-hidden">
                    <button type="button" class="w-full text-right p-5 md:p-6 font-bold text-blue-900 text-base md:text-lg flex justify-between items-center gap-4 focus:outline-none focus:ring-2 focus:ring-blue-900" aria-expanded="false" aria-controls="faq-ans-10" onclick="toggleFaq('faq-ans-10', this)">
                        <span>هل يمكن حجز خدمة نقل العفش في نفس اليوم؟</span>
                        <span class="text-xl font-bold text-green-700 transform transition-transform duration-200 faq-icon">+</span>
                    </button>
                    <div id="faq-ans-10" class="hidden p-5 md:p-6 pt-0 text-gray-700 text-sm md:text-base leading-relaxed border-t border-gray-200/50 bg-white">
                        نستقبل طلبات الحجز على مدار الساعة عبر الاتصال أو الواتساب، وتعتمد إمكانية التنفيذ في نفس اليوم على توفر الفريق والسيارات في الموعد المطلوب، لذا ننصح بالتواصل مبكراً لتأكيد الموعد.
                    </div>
                </div>

                <!-- Q11 -->
                <div class="border border-gray-200 rounded-2xl bg-gray-50 overflow-hidden">
                    <button type="button" class="w-full text-right p-5 md:p-6 font-bold text-blue-900 text-base md:text-lg flex justify-between items-center gap-4 focus:outline-none focus:ring-2 focus:ring-blue-900" aria-expanded="false" aria-controls="faq-ans-11" onclick="toggleFaq('faq-ans-11', this)">
                        <span>ما الفرق بين نقل العفش داخل جدة ونقله بين المدن؟</span>
                        <span class="text-xl font-bold text-green-700 transform transition-transform duration-200 faq-icon">+</span>
                    </button>
                    <div id="faq-ans-11" class="hidden p-5 md:p-6 pt-0 text-gray-700 text-sm md:text-base leading-relaxed border-t border-gray-200/50 bg-white">
                        النقل داخل جدة يتم غالباً في يوم واحد وتُحسب تكلفته حسب حجم الأثاث والدور والخدمات، أما النقل بين المدن فيعتمد على المسافة ونوع الشاحنة وتغليف الطرق الطويلة، ويُحدد سعره بعد معرفة الوجهة وحجم المنقولات.
                    </div>
                </div>`;

// Insert before the closing div of faq-accordion
const faqClosingIdx = html.indexOf('</div>\n\n            <!-- Bottom FAQ Contact Card -->');
if (faqClosingIdx > -1) {
    html = html.slice(0, faqClosingIdx) + newFaqVisualItems + '\n            ' + html.slice(faqClosingIdx);
} else {
    // try alternative marker
    const altIdx = html.indexOf('<!-- Bottom FAQ Contact Card -->');
    const prevDiv = html.lastIndexOf('</div>', altIdx);
    html = html.slice(0, prevDiv) + newFaqVisualItems + '\n            </div>\n\n            ' + html.slice(altIdx);
}

console.log('FAQ section updated with Q9-11.');

// ==========================================
// 14. FOOTER SECTION UPDATES
// ==========================================
// Update guarantees/claims in Pre-Footer
html = html.replace('ضمان شامل ضد الكسر والخدش', 'تغطية للتلف وفق شروط الاتفاق');
html = html.replace('نجارون وفنيون مدربون ومعتمدون', 'نجارون وفنيون مدربون');
html = html.replace('عقود رسمية وفواتير معتمدة وضمان سلامة المنقولات', 'اتفاق واضح على الخدمة والسعر قبل التنفيذ');
html = html.replace('خبرة ميدانية موثقة تمتد لأكثر من 15 عاماً في المملكة', 'خبرة ميدانية موثقة في نقل وتغليف الأثاث بالمملكة');
html = html.replace('سجل تجاري وترخيص خدمات نقل الأثاث والمعدات اللوجستية في المملكة العربية السعودية', 'سجل تجاري رقم: [[CR_NO]] | ترخيص نقل رقم: [[LICENSE_NO]]');

// Col 4 Branch & Company Details
const oldMainBranch = `<span class="text-xs text-gray-400 block">الفرع الرئيسي:</span>
                                <span class="text-gray-300 text-xs">جدة ، منطقة مكة المكرمة ، المملكة العربية السعودية</span>`;

const newMainBranch = `<span class="text-xs text-gray-400 block">بيانات العنوان والترخيص:</span>
                                <span class="text-gray-300 text-xs block">[[STREET_ADDRESS]] - جدة، منطقة مكة المكرمة</span>
                                <span class="text-gray-400 text-[11px] block mt-1">سجل تجاري: [[CR_NO]] | ترخيص: [[LICENSE_NO]]</span>`;

html = html.replace(oldMainBranch, newMainBranch);

// Add Google Map Embed in Col 4 after the contact button
const oldCol4Btn = `<a href="tel:+966540026747" class="w-full text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-transform active:scale-95 text-center flex items-center justify-center gap-2 text-sm hover:opacity-95" style="background: linear-gradient(90deg, #007d3f 0%, #1e3a8a 100%);" aria-label="طلب خدمة نقل عفش فوري">
                        <i class="fas fa-bolt text-yellow-300"></i>
                        <span>طلب تسعيرة ومعاينة فورية</span>
                    </a>`;

const newCol4BtnAndMap = `${oldCol4Btn}
                    <div class="mt-4 pt-3 border-t border-gray-800">
                        <iframe src="[[GOOGLE_MAPS_URL_EMBED]]" loading="lazy" title="موقع شركة القصر السعودي لنقل العفش بجدة" width="100%" height="200" style="border:0;" allowfullscreen="" referrerpolicy="no-referrer-when-downgrade" class="rounded-xl"></iframe>
                    </div>`;

html = html.replace(oldCol4Btn, newCol4BtnAndMap);

// Snapchat link
html = html.replace(
    'href="https://profile.snapchat.com/69559e3b-ee97-4df4-ad3c-a9ecd4e74996/profiles/1cb75ef1-3e7d-48cd-8c44-0f5b7b334029/details/public-stories"',
    'href="[[SNAPCHAT_PUBLIC_URL]]"'
);

// Twitter aria-label
html = html.replace('aria-label="حساب تويتر القصر السعودي"', 'aria-label="حساب القصر السعودي على منصة X"');

// Floating WhatsApp button rel="noopener noreferrer"
html = html.replace(
    '<a href="https://wa.me/966540026747" target="_blank" aria-label="تواصل معنا عبر واتساب"',
    '<a href="https://wa.me/966540026747" target="_blank" rel="noopener noreferrer" aria-label="تواصل معنا عبر واتساب"'
);

// Scripts defer
html = html.replace('<script src="/assets/js/navbar.js"></script>', '<script src="/assets/js/navbar.js" defer></script>');
html = html.replace('<script src="./assets/js/navbar.js"></script>', '<script src="/assets/js/navbar.js" defer></script>');

console.log('Footer & scripts updated.');

// ==========================================
// 15. UNIFY ALL RELATIVE PATHS (./path/ -> /path/)
// ==========================================
html = html.replace(/href="\.\//g, 'href="/');
html = html.replace(/src="\.\//g, 'src="/');

console.log('Relative paths unified to root-relative.');

// Save updated HTML
fs.writeFileSync('index.html', html, 'utf8');
console.log('Finished updating index.html. New length:', html.length);

