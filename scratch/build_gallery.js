const fs = require('fs');
const path = require('path');

const rootHeader = fs.readFileSync(path.resolve(__dirname, 'root_header.html'), 'utf8');

// Build gallery/index.html
const galleryHtml = `<!DOCTYPE html>
<html lang="ar-SA" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>معرض صور نقل العفش | القصر السعودي جدة</title>
    <meta name="description" content="معرض صور أعمال شركة القصر السعودي: دينا نقل عفش مقفلة بجدة، تغليف الأثاث، فك وتركيب غرف النوم، ونش رفع هيدروليكي.">
    <!-- noindex: أزل هذا الـ meta بعد إضافة 8 صور حقيقية على الأقل -->
    <meta name="robots" content="noindex, follow">
    <link rel="canonical" href="https://alqasr-alsueudi.com/gallery/">

    <meta property="og:title" content="معرض صور نقل العفش | القصر السعودي جدة">
    <meta property="og:description" content="معرض صور لأعمال وأسطول شركة القصر السعودي لنقل وتغليف الأثاث بجدة.">
    <meta property="og:url" content="https://alqasr-alsueudi.com/gallery/">
    <meta property="og:type" content="website">

    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    <link rel="preload" href="/assets/fonts/cairo-arabic.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="stylesheet" href="/assets/css/all.min.css" media="print" onload="this.media='all'">
    <noscript><link rel="stylesheet" href="/assets/css/all.min.css"></noscript>
    <link rel="stylesheet" href="/assets/css/main.min.css">

    <!-- Google Analytics 4 -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=[[GA4_ID]]"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '[[GA4_ID]]', { 'send_page_view': true });
    </script>
    <!-- End GA4 -->

    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": "https://alqasr-alsueudi.com/gallery/#webpage",
          "url": "https://alqasr-alsueudi.com/gallery/",
          "name": "معرض صور أعمال شركة القصر السعودي لنقل العفش",
          "description": "توثيق ميداني لعمليات فك، تغليف، تحميل، ونقل الأثاث بجدة.",
          "inLanguage": "ar-SA"
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://alqasr-alsueudi.com/gallery/#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "الرئيسية",
              "item": "https://alqasr-alsueudi.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "معرض الصور",
              "item": "https://alqasr-alsueudi.com/gallery/"
            }
          ]
        }
      ]
    }
    </script>
</head>
<body class="bg-gray-50 text-gray-800 font-sans antialiased min-h-screen flex flex-col justify-between">
    <a href="#main-content" class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:right-4 focus:z-50 focus:bg-blue-700 focus:text-white focus:px-4 focus:py-2 focus:rounded focus:text-sm focus:font-bold" id="skip-to-content">تخطى إلى المحتوى الرئيسي</a>

    <!-- الموقع يعتمد الهيدر الكامل المتناسق -->
    ${rootHeader}

    <main id="main-content" class="flex-grow py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <!-- Breadcrumb -->
        <nav aria-label="مسار التنقل" class="mb-6 text-sm text-gray-500">
            <ol class="flex items-center space-x-2 space-x-reverse">
                <li><a href="/" class="hover:text-blue-600 transition-colors">الرئيسية</a></li>
                <li><span class="text-gray-400">/</span></li>
                <li class="text-blue-900 font-semibold" aria-current="page">معرض الصور</li>
            </ol>
        </nav>

        <!-- Hero Header -->
        <div class="text-center mb-12 bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white py-12 px-6 rounded-3xl shadow-lg relative overflow-hidden">
            <div class="relative z-10">
                <span class="inline-block bg-blue-500/30 text-blue-200 border border-blue-400/30 text-xs font-bold px-3 py-1 rounded-full mb-3">توثيق ميداني مباشر</span>
                <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 tracking-tight">معرض صور أعمال شركة القصر السعودي</h1>
                <p class="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">شاهد بنفسك جودة العمل: شاحنات دينا مجهزة، مواد تغليف مستوردة، ورافعات هيدروليكية تضمن وصول أثاثك بدون أي خدش.</p>
            </div>
            <div class="absolute -right-10 -bottom-10 w-48 h-48 bg-blue-700/30 rounded-full blur-2xl pointer-events-none"></div>
            <div class="absolute -left-10 -top-10 w-48 h-48 bg-green-500/20 rounded-full blur-2xl pointer-events-none"></div>
        </div>

        <!-- Gallery Grid (8 Slots) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
            <!-- Slot 1 -->
            <div class="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 flex flex-col hover:shadow-xl transition-all group">
                <div class="bg-gradient-to-br from-gray-100 to-gray-200 aspect-[4/3] flex flex-col items-center justify-center p-6 text-center border-b border-gray-100 relative group-hover:scale-105 transition-transform duration-300">
                    <div class="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-2 text-xl">
                        <i class="fas fa-truck-moving"></i>
                    </div>
                    <span class="text-gray-400 font-mono text-xs font-bold">[[PHOTO_1]]</span>
                    <span class="text-[11px] text-gray-500 mt-1">صورة شاحنة النقل</span>
                </div>
                <div class="p-4 flex-grow flex flex-col justify-between">
                    <div>
                        <h3 class="font-bold text-gray-900 text-base mb-1">أسطول سيارات دينا مقفلة</h3>
                        <p class="text-xs text-gray-500 leading-relaxed">شاحنات مجهزة ومبطنة من الداخل بالكامل لحماية الأثاث أثناء النقل السريع بجدة.</p>
                    </div>
                    <span class="mt-3 text-[11px] font-semibold text-blue-600 flex items-center gap-1">
                        <i class="fas fa-check-circle text-xs"></i> أسطول حديث 2026
                    </span>
                </div>
            </div>

            <!-- Slot 2 -->
            <div class="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 flex flex-col hover:shadow-xl transition-all group">
                <div class="bg-gradient-to-br from-gray-100 to-gray-200 aspect-[4/3] flex flex-col items-center justify-center p-6 text-center border-b border-gray-100 relative group-hover:scale-105 transition-transform duration-300">
                    <div class="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-2 text-xl">
                        <i class="fas fa-couch"></i>
                    </div>
                    <span class="text-gray-400 font-mono text-xs font-bold">[[PHOTO_2]]</span>
                    <span class="text-[11px] text-gray-500 mt-1">صورة تغليف الكنب</span>
                </div>
                <div class="p-4 flex-grow flex flex-col justify-between">
                    <div>
                        <h3 class="font-bold text-gray-900 text-base mb-1">تغليف الصالونات والمجالس</h3>
                        <p class="text-xs text-gray-500 leading-relaxed">استخدام الرول الفقاعي والاسترتش البلاستيكي متعدد الطبقات لمنع الغبار والتمزق.</p>
                    </div>
                    <span class="mt-3 text-[11px] font-semibold text-green-600 flex items-center gap-1">
                        <i class="fas fa-check-circle text-xs"></i> خامات ممتازة
                    </span>
                </div>
            </div>

            <!-- Slot 3 -->
            <div class="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 flex flex-col hover:shadow-xl transition-all group">
                <div class="bg-gradient-to-br from-gray-100 to-gray-200 aspect-[4/3] flex flex-col items-center justify-center p-6 text-center border-b border-gray-100 relative group-hover:scale-105 transition-transform duration-300">
                    <div class="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-2 text-xl">
                        <i class="fas fa-tools"></i>
                    </div>
                    <span class="text-gray-400 font-mono text-xs font-bold">[[PHOTO_3]]</span>
                    <span class="text-[11px] text-gray-500 mt-1">صورة فك وتركيب</span>
                </div>
                <div class="p-4 flex-grow flex flex-col justify-between">
                    <div>
                        <h3 class="font-bold text-gray-900 text-base mb-1">فك غرف النوم والدواليب</h3>
                        <p class="text-xs text-gray-500 leading-relaxed">نجارون متخصصون في فك غرف النوم الإيطالية والتركية وايكيا مع إعادة تركيبها بدقة.</p>
                    </div>
                    <span class="mt-3 text-[11px] font-semibold text-amber-600 flex items-center gap-1">
                        <i class="fas fa-check-circle text-xs"></i> نجار محترف
                    </span>
                </div>
            </div>

            <!-- Slot 4 -->
            <div class="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 flex flex-col hover:shadow-xl transition-all group">
                <div class="bg-gradient-to-br from-gray-100 to-gray-200 aspect-[4/3] flex flex-col items-center justify-center p-6 text-center border-b border-gray-100 relative group-hover:scale-105 transition-transform duration-300">
                    <div class="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mb-2 text-xl">
                        <i class="fas fa-wine-glass-alt"></i>
                    </div>
                    <span class="text-gray-400 font-mono text-xs font-bold">[[PHOTO_4]]</span>
                    <span class="text-[11px] text-gray-500 mt-1">صورة تغليف الزجاج</span>
                </div>
                <div class="p-4 flex-grow flex flex-col justify-between">
                    <div>
                        <h3 class="font-bold text-gray-900 text-base mb-1">تعبئة المطبخ والزجاجيات</h3>
                        <p class="text-xs text-gray-500 leading-relaxed">كراتين مقواة مخصصة وفواصل ورقية وإسفنجية لحماية الأواني الحساسة من الكسر.</p>
                    </div>
                    <span class="mt-3 text-[11px] font-semibold text-red-600 flex items-center gap-1">
                        <i class="fas fa-check-circle text-xs"></i> عناية فائقة
                    </span>
                </div>
            </div>

            <!-- Slot 5 -->
            <div class="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 flex flex-col hover:shadow-xl transition-all group">
                <div class="bg-gradient-to-br from-gray-100 to-gray-200 aspect-[4/3] flex flex-col items-center justify-center p-6 text-center border-b border-gray-100 relative group-hover:scale-105 transition-transform duration-300">
                    <div class="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-2 text-xl">
                        <i class="fas fa-dolly-flatbed"></i>
                    </div>
                    <span class="text-gray-400 font-mono text-xs font-bold">[[PHOTO_5]]</span>
                    <span class="text-[11px] text-gray-500 mt-1">صورة ونش هيدروليكي</span>
                </div>
                <div class="p-4 flex-grow flex flex-col justify-between">
                    <div>
                        <h3 class="font-bold text-gray-900 text-base mb-1">ونش رفع الأثاث الهيدروليكي</h3>
                        <p class="text-xs text-gray-500 leading-relaxed">تنزيل ورفع العفش الثقيل للأدوار العليا دون ملامسة الدرج أو تعريض المداخل للضيق.</p>
                    </div>
                    <span class="mt-3 text-[11px] font-semibold text-indigo-600 flex items-center gap-1">
                        <i class="fas fa-check-circle text-xs"></i> يصل للأدوار العليا
                    </span>
                </div>
            </div>

            <!-- Slot 6 -->
            <div class="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 flex flex-col hover:shadow-xl transition-all group">
                <div class="bg-gradient-to-br from-gray-100 to-gray-200 aspect-[4/3] flex flex-col items-center justify-center p-6 text-center border-b border-gray-100 relative group-hover:scale-105 transition-transform duration-300">
                    <div class="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-2 text-xl">
                        <i class="fas fa-boxes"></i>
                    </div>
                    <span class="text-gray-400 font-mono text-xs font-bold">[[PHOTO_6]]</span>
                    <span class="text-[11px] text-gray-500 mt-1">صورة ترتيب الشاحنة</span>
                </div>
                <div class="p-4 flex-grow flex flex-col justify-between">
                    <div>
                        <h3 class="font-bold text-gray-900 text-base mb-1">ترتيب ورص الأثاث بالشاحنة</h3>
                        <p class="text-xs text-gray-500 leading-relaxed">تثبيت احترافي بأحزمة ربط خاصة تمنع حركة الأثاث أو احتكاكه أثناء المنعطفات والمطبات.</p>
                    </div>
                    <span class="mt-3 text-[11px] font-semibold text-purple-600 flex items-center gap-1">
                        <i class="fas fa-check-circle text-xs"></i> تثبيت آمن
                    </span>
                </div>
            </div>

            <!-- Slot 7 -->
            <div class="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 flex flex-col hover:shadow-xl transition-all group">
                <div class="bg-gradient-to-br from-gray-100 to-gray-200 aspect-[4/3] flex flex-col items-center justify-center p-6 text-center border-b border-gray-100 relative group-hover:scale-105 transition-transform duration-300">
                    <div class="w-12 h-12 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center mb-2 text-xl">
                        <i class="fas fa-building"></i>
                    </div>
                    <span class="text-gray-400 font-mono text-xs font-bold">[[PHOTO_7]]</span>
                    <span class="text-[11px] text-gray-500 mt-1">صورة نقل مكاتب</span>
                </div>
                <div class="p-4 flex-grow flex flex-col justify-between">
                    <div>
                        <h3 class="font-bold text-gray-900 text-base mb-1">نقل الشركات والمكاتب</h3>
                        <p class="text-xs text-gray-500 leading-relaxed">فك وتركيب محطات العمل وقواطع المكاتب ونقل الأجهزة الإلكترونية والأرشيف بدقة.</p>
                    </div>
                    <span class="mt-3 text-[11px] font-semibold text-teal-600 flex items-center gap-1">
                        <i class="fas fa-check-circle text-xs"></i> بدون تعطيل العمل
                    </span>
                </div>
            </div>

            <!-- Slot 8 -->
            <div class="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 flex flex-col hover:shadow-xl transition-all group">
                <div class="bg-gradient-to-br from-gray-100 to-gray-200 aspect-[4/3] flex flex-col items-center justify-center p-6 text-center border-b border-gray-100 relative group-hover:scale-105 transition-transform duration-300">
                    <div class="w-12 h-12 bg-cyan-100 text-cyan-600 rounded-xl flex items-center justify-center mb-2 text-xl">
                        <i class="fas fa-warehouse"></i>
                    </div>
                    <span class="text-gray-400 font-mono text-xs font-bold">[[PHOTO_8]]</span>
                    <span class="text-[11px] text-gray-500 mt-1">صورة مستودع تخزين</span>
                </div>
                <div class="p-4 flex-grow flex flex-col justify-between">
                    <div>
                        <h3 class="font-bold text-gray-900 text-base mb-1">مستودعات تخزين الأثاث</h3>
                        <p class="text-xs text-gray-500 leading-relaxed">مستودعات معزولة ومؤمنة لحفظ الأثاث السكني والتجاري لفترات قصيرة أو طويلة بعقود رسمية.</p>
                    </div>
                    <span class="mt-3 text-[11px] font-semibold text-cyan-600 flex items-center gap-1">
                        <i class="fas fa-check-circle text-xs"></i> غرف مستقلة ومؤمنة
                    </span>
                </div>
            </div>
        </div>

        <!-- Call to action block -->
        <div class="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-3xl p-8 sm:p-12 text-center shadow-xl relative overflow-hidden">
            <div class="relative z-10 max-w-2xl mx-auto">
                <h2 class="text-2xl sm:text-3xl font-black mb-4">جاهزون لنقل عفشك بكل احترافية وأمان؟</h2>
                <p class="text-blue-100 text-sm sm:text-base mb-8 leading-relaxed">تواصل مع فريق القصر السعودي اليوم للحصول على استشارة مجانية وعرض سعر يناسب حجم منقولاتك وميزانيتك.</p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="tel:+966540026747" class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-2xl transition shadow-lg hover:shadow-xl text-base">
                        <i class="fas fa-phone-alt"></i>
                        <span>اتصل بنا: 0540026747</span>
                    </a>
                    <a href="/contact/" class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl transition backdrop-blur-sm border border-white/20 text-base">
                        <i class="fas fa-envelope-open-text"></i>
                        <span>نموذج طلب الخدمة والأسعار</span>
                    </a>
                </div>
            </div>
            <div class="absolute -right-16 -top-16 w-64 h-64 bg-green-500/10 rounded-full blur-3xl pointer-events-none"></div>
        </div>
    </main>

    <!-- Footer Container -->
    <div id="site-footer"></div>
    <script src="/assets/js/footer.js" defer></script>

    <!-- الأزرار العائمة (Floating CTA) -->
    <div class="floating-buttons">
        <a href="tel:+966540026747" class="floating-call shadow-lg" aria-label="اتصال هاتفي سريع">
            <i class="fas fa-phone-alt text-xl"></i>
        </a>
        <a href="https://wa.me/966540026747?text=%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%20%D9%86%D9%82%D9%84%20%D8%A7%D9%84%D8%B9%D9%81%D8%B4%20%D8%A8%D8%AC%D8%AF%D8%A9" target="_blank" rel="noopener noreferrer" class="floating-whatsapp shadow-lg" aria-label="محادثة واتساب">
            <i class="fab fa-whatsapp text-2xl"></i>
        </a>
    </div>

    <script>
      const mobileMenuBtn = document.getElementById('mobile-menu-btn');
      const mobileMenu = document.getElementById('mobile-menu');
      if (mobileMenuBtn && mobileMenu) {
          mobileMenuBtn.addEventListener('click', function () {
              mobileMenu.classList.toggle('hidden');
          });
      }
    </script>
    <script src="/assets/js/navbar.js" defer></script>
</body>
</html>`;

fs.writeFileSync(path.resolve(__dirname, '../gallery/index.html'), galleryHtml, 'utf8');
console.log('gallery/index.html created with full header and responsive layout!');

