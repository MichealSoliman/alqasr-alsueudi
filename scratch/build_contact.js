const fs = require('fs');
const path = require('path');

const rootHeader = fs.readFileSync(path.resolve(__dirname, 'root_header.html'), 'utf8');

// Build contact/index.html
const contactHtml = `<!DOCTYPE html>
<html lang="ar-SA" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="index, follow">
    <title>تواصل معنا | شركة القصر السعودي لنقل العفش بجدة</title>
    <meta name="description" content="تواصل مع شركة القصر السعودي لنقل العفش بجدة عبر الهاتف أو واتساب. نخدم جميع أحياء جدة والمدن السعودية. اتصل الآن 0540026747">
    <link rel="canonical" href="https://alqasr-alsueudi.com/contact/">
    
    <meta property="og:title" content="تواصل معنا | شركة القصر السعودي لنقل العفش بجدة">
    <meta property="og:description" content="تواصل مع شركة القصر السعودي لنقل العفش بجدة عبر الهاتف أو واتساب. نخدم جميع أحياء جدة والمدن السعودية.">
    <meta property="og:url" content="https://alqasr-alsueudi.com/contact/">
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
          "@type": "ContactPage",
          "@id": "https://alqasr-alsueudi.com/contact/#webpage",
          "url": "https://alqasr-alsueudi.com/contact/",
          "name": "اتصل بشركة القصر السعودي لنقل العفش بجدة",
          "description": "صفحة التواصل وحجز خدمات نقل وتغليف وفك وتركيب الأثاث في جدة.",
          "inLanguage": "ar-SA"
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://alqasr-alsueudi.com/contact/#breadcrumb",
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
              "name": "اتصل بنا",
              "item": "https://alqasr-alsueudi.com/contact/"
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
                <li class="text-blue-900 font-semibold" aria-current="page">اتصل بنا</li>
            </ol>
        </nav>

        <!-- Hero Header -->
        <div class="text-center mb-10 bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-12 px-6 rounded-3xl shadow-lg relative overflow-hidden">
            <div class="relative z-10">
                <span class="inline-block bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 shadow">خدمة 24/7 بجميع أحياء جدة</span>
                <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 tracking-tight">تواصل مع شركة القصر السعودي لنقل العفش</h1>
                <p class="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">يسعدنا تلقي طلباتكم واستفساراتكم على مدار الساعة. احصل على أفضل سعر لنقل الأثاث مع ضمان الفك والتركيب والتغليف الشامل.</p>
            </div>
            <div class="absolute -right-10 -bottom-10 w-48 h-48 bg-blue-700/30 rounded-full blur-2xl pointer-events-none"></div>
            <div class="absolute -left-10 -top-10 w-48 h-48 bg-green-500/20 rounded-full blur-2xl pointer-events-none"></div>
        </div>

        <!-- Quick Contact Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <!-- Phone Card -->
            <div class="bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex flex-col items-center text-center hover:shadow-xl transition-all group">
                <div class="w-14 h-14 bg-blue-50 text-blue-700 rounded-2xl flex items-center justify-center mb-4 text-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">
                    <i class="fas fa-phone-alt"></i>
                </div>
                <h2 class="text-xl font-bold text-gray-900 mb-2">اتصال هاتفي مباشر</h2>
                <p class="text-gray-500 text-sm mb-5">خدمة عملاء جاهزة للرد الفوري وتقديم عروض الأسعار</p>
                <a href="tel:+966540026747" class="mt-auto inline-flex items-center justify-center gap-2 w-full px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition shadow hover:shadow-md">
                    <i class="fas fa-phone-volume"></i>
                    <span>0540026747</span>
                </a>
            </div>

            <!-- WhatsApp Card -->
            <div class="bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex flex-col items-center text-center hover:shadow-xl transition-all group">
                <div class="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-4 text-2xl group-hover:bg-green-600 group-hover:text-white transition-colors shadow-sm">
                    <i class="fab fa-whatsapp"></i>
                </div>
                <h2 class="text-xl font-bold text-gray-900 mb-2">محادثة واتساب سريعة</h2>
                <p class="text-gray-500 text-sm mb-5">أرسل صور العفش وحدد موقعك لنرسل لك التكلفة فوراً</p>
                <a href="https://wa.me/966540026747?text=%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%A7%D9%84%D8%AA%D9%88%D8%A7%D8%B5%D9%84%20%D9%84%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A9%20%D9%86%D9%82%D9%84%20%D8%A7%D9%84%D8%B9%D9%81%D8%B4" target="_blank" rel="noopener noreferrer" class="mt-auto inline-flex items-center justify-center gap-2 w-full px-5 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition shadow hover:shadow-md">
                    <i class="fab fa-whatsapp text-lg"></i>
                    <span>تواصل عبر واتساب</span>
                </a>
            </div>

            <!-- Address Card -->
            <div class="bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex flex-col items-center text-center hover:shadow-xl transition-all group">
                <div class="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-4 text-2xl group-hover:bg-amber-600 group-hover:text-white transition-colors shadow-sm">
                    <i class="fas fa-map-marker-alt"></i>
                </div>
                <h2 class="text-xl font-bold text-gray-900 mb-2">منطقة التغطية والخدمة</h2>
                <p class="text-gray-700 font-semibold text-sm mb-1">[[STREET_ADDRESS]]</p>
                <p class="text-gray-500 text-xs mt-2">نغطي كافة أحياء شمال، وسط، وجنوب جدة، ونقدم رحلات يومية بين المدن (الرياض، مكة، المدينة، الشرقية).</p>
            </div>
        </div>

        <!-- Form and Map Section Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            <!-- Form: 7 cols on lg -->
            <div class="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-gray-100">
                <div class="mb-6">
                    <h2 class="text-2xl font-bold text-gray-900 mb-2">طلب عرض سعر مخصص وفوري</h2>
                    <p class="text-sm text-gray-500">املأ البيانات أدناه وسيتم فتح محادثة واتساب تلقائياً بالطلب كاملاً ومفصلاً</p>
                </div>
                <form id="contact-form" class="space-y-5">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label for="cf-name" class="block text-sm font-bold text-gray-700 mb-2">الاسم الكريم *</label>
                            <input type="text" id="cf-name" required placeholder="أدخل اسمك" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition text-sm">
                        </div>
                        <div>
                            <label for="cf-phone" class="block text-sm font-bold text-gray-700 mb-2">رقم الجوال *</label>
                            <input type="tel" id="cf-phone" required placeholder="05xxxxxxxx" dir="ltr" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none text-right transition text-sm">
                        </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label for="cf-from" class="block text-sm font-bold text-gray-700 mb-2">مكان النقل (من حي/مدينة) *</label>
                            <input type="text" id="cf-from" required placeholder="مثال: جدة - حي الروضة" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition text-sm">
                        </div>
                        <div>
                            <label for="cf-to" class="block text-sm font-bold text-gray-700 mb-2">مكان الوصول (إلى حي/مدينة) *</label>
                            <input type="text" id="cf-to" required placeholder="مثال: جدة - حي أبحر أو الرياض" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition text-sm">
                        </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label for="cf-size" class="block text-sm font-bold text-gray-700 mb-2">حجم الأثاث / المنقولات</label>
                            <select id="cf-size" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition bg-white text-sm">
                                <option value="غرفة واحدة / أغراض محدودة">غرفة واحدة / أغراض محدودة</option>
                                <option value="شقة صغيرة (2-3 غرف)">شقة صغيرة (2-3 غرف)</option>
                                <option value="شقة كبيرة (4-5 غرف)" selected>شقة كبيرة (4-5 غرف)</option>
                                <option value="فيلا / دور كامل">فيلا / دور كامل</option>
                                <option value="مكتب / مقر شركة">مكتب / مقر شركة</option>
                                <option value="أخرى">أخرى</option>
                            </select>
                        </div>
                        <div>
                            <label for="cf-date" class="block text-sm font-bold text-gray-700 mb-2">الموعد التقريبي للنقل</label>
                            <input type="date" id="cf-date" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition bg-white text-sm">
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-3">الخدمات الإضافية المطلوبة</label>
                        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            <label class="flex items-center gap-2 p-2.5 rounded-lg border border-gray-100 bg-gray-50 hover:bg-gray-100 cursor-pointer text-xs sm:text-sm font-medium">
                                <input type="checkbox" name="services" value="فك وتركيب غرف نوم ومطابخ" checked class="rounded text-blue-600 focus:ring-blue-500 w-4 h-4">
                                <span>فك وتركيب</span>
                            </label>
                            <label class="flex items-center gap-2 p-2.5 rounded-lg border border-gray-100 bg-gray-50 hover:bg-gray-100 cursor-pointer text-xs sm:text-sm font-medium">
                                <input type="checkbox" name="services" value="تغليف أثاث شامل بالفقاعات" checked class="rounded text-blue-600 focus:ring-blue-500 w-4 h-4">
                                <span>تغليف شامل</span>
                            </label>
                            <label class="flex items-center gap-2 p-2.5 rounded-lg border border-gray-100 bg-gray-50 hover:bg-gray-100 cursor-pointer text-xs sm:text-sm font-medium">
                                <input type="checkbox" name="services" value="دينا مقفلة مجهزة" checked class="rounded text-blue-600 focus:ring-blue-500 w-4 h-4">
                                <span>دينا مقفلة</span>
                            </label>
                            <label class="flex items-center gap-2 p-2.5 rounded-lg border border-gray-100 bg-gray-50 hover:bg-gray-100 cursor-pointer text-xs sm:text-sm font-medium">
                                <input type="checkbox" name="services" value="ونش هيدروليكي للأدوار العليا" class="rounded text-blue-600 focus:ring-blue-500 w-4 h-4">
                                <span>ونش رفع</span>
                            </label>
                            <label class="flex items-center gap-2 p-2.5 rounded-lg border border-gray-100 bg-gray-50 hover:bg-gray-100 cursor-pointer text-xs sm:text-sm font-medium">
                                <input type="checkbox" name="services" value="مستودعات تخزين أثاث" class="rounded text-blue-600 focus:ring-blue-500 w-4 h-4">
                                <span>تخزين أثاث</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label for="cf-notes" class="block text-sm font-bold text-gray-700 mb-2">ملاحظات إضافية (أرقام الأدوار، مصعد... إلخ)</label>
                        <textarea id="cf-notes" rows="3" placeholder="اكتب أي تفاصيل إضافية لتحديد التكلفة بدقة..." class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition text-sm"></textarea>
                    </div>

                    <button type="submit" class="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-2xl text-base sm:text-lg flex items-center justify-center gap-3 transition shadow-lg hover:shadow-xl active:scale-[0.99]">
                        <i class="fab fa-whatsapp text-2xl"></i>
                        <span>إرسال الطلب فوراً عبر واتساب</span>
                    </button>
                </form>
            </div>

            <!-- Map & Guarantees: 5 cols on lg -->
            <div class="lg:col-span-5 flex flex-col gap-6">
                <!-- Location Map Box -->
                <div class="bg-white rounded-3xl p-6 shadow-md border border-gray-100 flex-grow flex flex-col">
                    <h2 class="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <i class="fas fa-map-marked-alt text-blue-600"></i>
                        <span>خريطة الموقع والمقر</span>
                    </h2>
                    <div class="rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 flex-grow min-h-[260px] flex items-center justify-center text-gray-500 text-sm relative">
                        <div class="p-6 text-center">
                            <i class="fas fa-map-marker-alt text-3xl text-gray-400 mb-2 block"></i>
                            <span class="font-mono text-xs">[[GOOGLE_MAPS_EMBED_URL]]</span>
                            <p class="text-xs text-gray-400 mt-2">سيتم إدراج خريطة Google التفاعلية هنا</p>
                        </div>
                    </div>
                </div>

                <!-- Trust Guarantee Box -->
                <div class="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-3xl p-6 shadow-md">
                    <h3 class="text-lg font-bold mb-4 flex items-center gap-2 text-green-400">
                        <i class="fas fa-shield-alt"></i>
                        <span>ضمانات القصر السعودي</span>
                    </h3>
                    <ul class="space-y-3 text-sm text-gray-200">
                        <li class="flex items-center gap-2">
                            <i class="fas fa-check-circle text-green-400 text-xs"></i>
                            <span>ضمان سلامة المنقولات بنسبة 100%</span>
                        </li>
                        <li class="flex items-center gap-2">
                            <i class="fas fa-check-circle text-green-400 text-xs"></i>
                            <span>طاقم فني ونجارون متخصصون في الفك والتركيب</span>
                        </li>
                        <li class="flex items-center gap-2">
                            <i class="fas fa-check-circle text-green-400 text-xs"></i>
                            <span>شاحنات دينا مغلقة ومبطنة مخصصة للأثاث</span>
                        </li>
                        <li class="flex items-center gap-2">
                            <i class="fas fa-check-circle text-green-400 text-xs"></i>
                            <span>التزام دقيق بالمواعيد وسرعة في الإنجاز</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </main>

    <!-- Footer Container (will be rendered via footer.js) -->
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

    <!-- Script for Contact Form -->
    <script>
      document.getElementById('contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('cf-name').value;
        const phone = document.getElementById('cf-phone').value;
        const from = document.getElementById('cf-from').value;
        const to = document.getElementById('cf-to').value;
        const size = document.getElementById('cf-size').value;
        const date = document.getElementById('cf-date').value;
        const notes = document.getElementById('cf-notes').value;
        const services = Array.from(document.querySelectorAll('input[name="services"]:checked')).map(c => c.value).join('، ');

        const msg = \`مرحباً شركة القصر السعودي، أود الاستفسار وحجز خدمة نقل العفش:\\n👤 الاسم: \${name}\\n📞 رقم الجوال: \${phone}\\n📍 من: \${from}\\n📍 إلى: \${to}\\n📦 حجم العفش: \${size}\\n🛠️ الخدمات المطلوبة: \${services || 'غير محدد'}\\n📅 الموعد: \${date || 'غير محدد'}\\n📝 ملاحظات: \${notes || 'لا يوجد'}\`;

        window.open('https://wa.me/966540026747?text=' + encodeURIComponent(msg), '_blank');
      });

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

fs.writeFileSync(path.resolve(__dirname, '../contact/index.html'), contactHtml, 'utf8');
console.log('contact/index.html created with full header and responsive layout!');

