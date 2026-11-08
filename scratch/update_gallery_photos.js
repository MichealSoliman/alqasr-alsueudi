const fs = require('fs');
const path = require('path');

const rootHeader = fs.readFileSync(path.resolve(__dirname, 'root_header.html'), 'utf8');

// Build gallery/index.html with real images from assets/img/gallery/
const galleryHtml = `<!DOCTYPE html>
<html lang="ar-SA" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>معرض صور نقل العفش | القصر السعودي جدة</title>
    <meta name="description" content="معرض صور أعمال شركة القصر السعودي: دينا نقل عفش مقفلة بجدة، تغليف الأثاث، فك وتركيب غرف النوم، ونش رفع هيدروليكي.">
    <meta name="robots" content="index, follow">
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

    <style>
      .gallery-grid {
        display: grid;
        grid-template-columns: repeat(1, minmax(0, 1fr));
        gap: 1.5rem;
      }
      @media (min-width: 640px) {
        .gallery-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }
      @media (min-width: 1024px) {
        .gallery-grid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
      }
      .gallery-card {
        background: #ffffff;
        border-radius: 1.25rem;
        overflow: hidden;
        box-shadow: 0 4px 15px -1px rgba(0, 0, 0, 0.06);
        border: 1px solid #f1f5f9;
        transition: transform 0.25s ease, box-shadow 0.25s ease;
        display: flex;
        flex-direction: column;
      }
      .gallery-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 25px -4px rgba(0, 0, 0, 0.12);
      }
      .gallery-img-wrap {
        position: relative;
        width: 100%;
        height: 240px;
        overflow: hidden;
        background-color: #f8fafc;
      }
      .gallery-img-wrap img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.4s ease;
      }
      .gallery-card:hover .gallery-img-wrap img {
        transform: scale(1.05);
      }
    </style>

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
                <span class="inline-block bg-green-500 text-white text-xs font-bold px-3.5 py-1.5 rounded-full mb-3 shadow">توثيق ميداني لأعمالنا</span>
                <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 tracking-tight">معرض صور شركة القصر السعودي لنقل العفش</h1>
                <p class="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">شاهد بنفسك جودة العمل: شاحنات دينا مجهزة، مواد تغليف مستوردة، ورافعات هيدروليكية تضمن وصول أثاثك بدون أي خدش.</p>
            </div>
            <div class="absolute -right-10 -bottom-10 w-48 h-48 bg-blue-700/30 rounded-full blur-2xl pointer-events-none"></div>
            <div class="absolute -left-10 -top-10 w-48 h-48 bg-green-500/20 rounded-full blur-2xl pointer-events-none"></div>
        </div>

        <!-- Gallery Grid (9 Real Photos) -->
        <div class="gallery-grid mb-16">
            <!-- Photo 1 -->
            <div class="gallery-card">
                <div class="gallery-img-wrap">
                    <img src="/assets/img/gallery/1 (1).jpeg" alt="شاحنة دينا نقل عفش مقفلة بجدة - شركة القصر السعودي" loading="lazy" width="400" height="240">
                </div>
                <div class="p-5 flex-grow flex flex-col justify-between">
                    <div>
                        <h3 class="font-bold text-gray-900 text-base mb-1.5">أسطول سيارات دينا مقفلة</h3>
                        <p class="text-xs text-gray-500 leading-relaxed">شاحنات مجهزة ومبطنة من الداخل لحماية الأثاث أثناء النقل السريع بجميع أحياء جدة.</p>
                    </div>
                    <span class="mt-4 text-xs font-bold text-blue-600 flex items-center gap-1.5">
                        <i class="fas fa-check-circle text-green-500"></i> دينا مغلقة ومجهزة
                    </span>
                </div>
            </div>

            <!-- Photo 2 -->
            <div class="gallery-card">
                <div class="gallery-img-wrap">
                    <img src="/assets/img/gallery/1 (2).jpeg" alt="تغليف وحماية الأثاث والمجالس - القصر السعودي جدة" loading="lazy" width="400" height="240">
                </div>
                <div class="p-5 flex-grow flex flex-col justify-between">
                    <div>
                        <h3 class="font-bold text-gray-900 text-base mb-1.5">تغليف الصالونات والمجالس</h3>
                        <p class="text-xs text-gray-500 leading-relaxed">استخدام الرول الفقاعي والاسترتش البلاستيكي متعدد الطبقات لمنع الغبار والخدش.</p>
                    </div>
                    <span class="mt-4 text-xs font-bold text-blue-600 flex items-center gap-1.5">
                        <i class="fas fa-check-circle text-green-500"></i> مواد تغليف مستوردة
                    </span>
                </div>
            </div>

            <!-- Photo 3 -->
            <div class="gallery-card">
                <div class="gallery-img-wrap">
                    <img src="/assets/img/gallery/1 (3).jpeg" alt="فك وتركيب غرف النوم والدواليب بجدة" loading="lazy" width="400" height="240">
                </div>
                <div class="p-5 flex-grow flex flex-col justify-between">
                    <div>
                        <h3 class="font-bold text-gray-900 text-base mb-1.5">فك وتركيب غرف النوم</h3>
                        <p class="text-xs text-gray-500 leading-relaxed">نجارون متخصصون في فك غرف النوم الإيطالية والوطنية وايكيا مع إعادة تركيبها بدقة.</p>
                    </div>
                    <span class="mt-4 text-xs font-bold text-blue-600 flex items-center gap-1.5">
                        <i class="fas fa-check-circle text-green-500"></i> فنيون ونجارون محترفون
                    </span>
                </div>
            </div>

            <!-- Photo 4 -->
            <div class="gallery-card">
                <div class="gallery-img-wrap">
                    <img src="/assets/img/gallery/1 (4).jpeg" alt="تعبئة وتغليف أدوات المطبخ والزجاجيات الحساسة" loading="lazy" width="400" height="240">
                </div>
                <div class="p-5 flex-grow flex flex-col justify-between">
                    <div>
                        <h3 class="font-bold text-gray-900 text-base mb-1.5">تعبئة المطبخ والزجاجيات</h3>
                        <p class="text-xs text-gray-500 leading-relaxed">كراتين مقواة مخصصة وفواصل ورقية وإسفنجية لحماية الأواني الحساسة من الكسر.</p>
                    </div>
                    <span class="mt-4 text-xs font-bold text-blue-600 flex items-center gap-1.5">
                        <i class="fas fa-check-circle text-green-500"></i> كراتين مضلعة خاصة
                    </span>
                </div>
            </div>

            <!-- Photo 5 -->
            <div class="gallery-card">
                <div class="gallery-img-wrap">
                    <img src="/assets/img/gallery/1 (5).jpeg" alt="ونش رفع وتنزيل الأثاث الهيدروليكي بجدة" loading="lazy" width="400" height="240">
                </div>
                <div class="p-5 flex-grow flex flex-col justify-between">
                    <div>
                        <h3 class="font-bold text-gray-900 text-base mb-1.5">ونش رفع الأثاث الهيدروليكي</h3>
                        <p class="text-xs text-gray-500 leading-relaxed">تنزيل ورفع العفش الثقيل للأدوار العليا دون ملامسة الدرج أو تعريض المداخل للضيق.</p>
                    </div>
                    <span class="mt-4 text-xs font-bold text-blue-600 flex items-center gap-1.5">
                        <i class="fas fa-check-circle text-green-500"></i> للأدوار العالية والمداخل الضيقة
                    </span>
                </div>
            </div>

            <!-- Photo 6 -->
            <div class="gallery-card">
                <div class="gallery-img-wrap">
                    <img src="/assets/img/gallery/1 (6).jpeg" alt="رص وترتيب العفش داخل سيارات النقل" loading="lazy" width="400" height="240">
                </div>
                <div class="p-5 flex-grow flex flex-col justify-between">
                    <div>
                        <h3 class="font-bold text-gray-900 text-base mb-1.5">ترتيب ورص الأثاث بالشاحنة</h3>
                        <p class="text-xs text-gray-500 leading-relaxed">تثبيت احترافي بأحزمة ربط تمنع حركة الأثاث أو احتكاكه أثناء المنعطفات والمطبات.</p>
                    </div>
                    <span class="mt-4 text-xs font-bold text-blue-600 flex items-center gap-1.5">
                        <i class="fas fa-check-circle text-green-500"></i> حزام ربط وتثبيت آمن
                    </span>
                </div>
            </div>

            <!-- Photo 7 -->
            <div class="gallery-card">
                <div class="gallery-img-wrap">
                    <img src="/assets/img/gallery/1 (7).jpeg" alt="نقل أثاث الشركات والمكاتب بجدة" loading="lazy" width="400" height="240">
                </div>
                <div class="p-5 flex-grow flex flex-col justify-between">
                    <div>
                        <h3 class="font-bold text-gray-900 text-base mb-1.5">نقل الشركات والمكاتب</h3>
                        <p class="text-xs text-gray-500 leading-relaxed">فك وتركيب محطات العمل وقواطع المكاتب ونقل الأجهزة الإلكترونية والأرشيف بدقة.</p>
                    </div>
                    <span class="mt-4 text-xs font-bold text-blue-600 flex items-center gap-1.5">
                        <i class="fas fa-check-circle text-green-500"></i> بدون أي تعطيل للعمل
                    </span>
                </div>
            </div>

            <!-- Photo 8 -->
            <div class="gallery-card">
                <div class="gallery-img-wrap">
                    <img src="/assets/img/gallery/1 (8).jpeg" alt="مستودعات تخزين الأثاث المؤمنة بجدة" loading="lazy" width="400" height="240">
                </div>
                <div class="p-5 flex-grow flex flex-col justify-between">
                    <div>
                        <h3 class="font-bold text-gray-900 text-base mb-1.5">مستودعات تخزين الأثاث</h3>
                        <p class="text-xs text-gray-500 leading-relaxed">مستودعات معزولة ومؤمنة لحفظ الأثاث لفترات قصيرة أو طويلة بعقود رسمية معتمدة.</p>
                    </div>
                    <span class="mt-4 text-xs font-bold text-blue-600 flex items-center gap-1.5">
                        <i class="fas fa-check-circle text-green-500"></i> تخزين آمن ومؤمن
                    </span>
                </div>
            </div>

            <!-- Photo 9 -->
            <div class="gallery-card">
                <div class="gallery-img-wrap">
                    <img src="/assets/img/gallery/1 (9).jpeg" alt="فريق عمل شركة القصر السعودي لنقل الأثاث" loading="lazy" width="400" height="240">
                </div>
                <div class="p-5 flex-grow flex flex-col justify-between">
                    <div>
                        <h3 class="font-bold text-gray-900 text-base mb-1.5">طاقم عمل مدرب ومحترف</h3>
                        <p class="text-xs text-gray-500 leading-relaxed">فريق عمل متكامل من الفنيين والمشرفين الميدانيين لضمان تنفيذ خدمة النقل بأعلى كفاءة.</p>
                    </div>
                    <span class="mt-4 text-xs font-bold text-blue-600 flex items-center gap-1.5">
                        <i class="fas fa-check-circle text-green-500"></i> طاقم سعودي ومقيم متمرس
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
        <a href="https://wa.me/966540026747?text=%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D9%86%D9%82%D9%84%20%D8%A7%D9%84%D8%B9%D9%81%D8%B4%20%D8%A8%D8%AC%D8%AF%D8%A9" target="_blank" rel="noopener noreferrer" class="floating-whatsapp shadow-lg" aria-label="محادثة واتساب">
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
console.log('gallery/index.html updated with real photos from assets/img/gallery/!');

