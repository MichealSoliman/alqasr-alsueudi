const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'furniture-storage-in-jeddah', 'index.html');
const existingHtml = fs.readFileSync(filePath, 'utf8');

// Extract current header & footer partial injections if any, or retain them
const headerStart = existingHtml.indexOf('<!-- @header -->');
const headerEnd = existingHtml.indexOf('<!-- /@header -->');
const footerStart = existingHtml.indexOf('<!-- @footer -->');
const footerEnd = existingHtml.indexOf('<!-- /@footer -->');

const introText = 'سواء كنت بصدد الانتقال إلى سكن جديد مع وجود فارق زمني بين استلام الوحدتين، أو تجري أعمال ترميم وصيانة لمنزلك، أو مقبلاً على سفر طويل، توفر شركة القصر السعودي خدمات تخزين عفش وأثاث آمنة بجدة. نعتمد على مستودعات مكيفة ومحمية بالكامل ومزودة بكاميرات مراقبة على مدار 24 ساعة، مع توفير مساحة تخزين مخصصة ومستقلة لكل عميل لمنع اختلاط المنقولات، وتُحدد الأسعار والتكلفة بكل وضوح حسب حجم الأثاث والمساحة ومدة التخزين، مع استقبال طلباتكم على مدار الساعة.';

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://alqasr-alsueudi.com/furniture-storage-in-jeddah/#webpage",
      "url": "https://alqasr-alsueudi.com/furniture-storage-in-jeddah/",
      "name": "شركة تخزين عفش بجدة | تخزين الأثاث لمدد قصيرة أو طويلة",
      "inLanguage": "ar-SA",
      "dateModified": "2026-11-11",
      "isPartOf": {
        "@id": "https://alqasr-alsueudi.com/#website"
      },
      "breadcrumb": {
        "@id": "https://alqasr-alsueudi.com/furniture-storage-in-jeddah/#breadcrumb"
      },
      "mainEntity": {
        "@id": "https://alqasr-alsueudi.com/furniture-storage-in-jeddah/#service"
      }
    },
    {
      "@type": "Service",
      "@id": "https://alqasr-alsueudi.com/furniture-storage-in-jeddah/#service",
      "name": "تخزين العفش والأثاث بجدة",
      "serviceType": "تخزين أثاث",
      "description": introText,
      "url": "https://alqasr-alsueudi.com/furniture-storage-in-jeddah/",
      "areaServed": {
        "@type": "City",
        "name": "جدة"
      },
      "provider": {
        "@type": "MovingCompany",
        "@id": "https://alqasr-alsueudi.com/#movingcompany",
        "name": "شركة القصر السعودي لنقل العفش بجدة",
        "url": "https://alqasr-alsueudi.com/"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://alqasr-alsueudi.com/furniture-storage-in-jeddah/#breadcrumb",
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
          "name": "الخدمات",
          "item": "https://alqasr-alsueudi.com/services/"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "تخزين العفش بجدة",
          "item": "https://alqasr-alsueudi.com/furniture-storage-in-jeddah/"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://alqasr-alsueudi.com/furniture-storage-in-jeddah/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "كم تكلفة تخزين الأثاث في جدة؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "تختلف حسب مساحة التخزين وحجم الأثاث ومدة التخزين وما إذا كنت تحتاج النقل والتغليف. أرسل لنا حجم أثاثك والمدة المتوقعة على واتساب ونرد بتقدير مناسب."
          }
        },
        {
          "@type": "Question",
          "name": "كيف يتم تخزين الأثاث؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "نجرد القطع ونغلفها ثم نخزنها في مساحة مخصصة لك لمنع اختلاطها بمنقولات الآخرين."
          }
        },
        {
          "@type": "Question",
          "name": "هل المستودعات مكيفة وعليها مراقبة؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "نعم، المستودعات مكيفة وعليها كاميرات مراقبة."
          }
        },
        {
          "@type": "Question",
          "name": "ما أقصى مدة تخزين؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "نوفر التخزين لمدد قصيرة أو طويلة، وتُحدد المدة بالاتفاق معك قبل بدء التخزين."
          }
        },
        {
          "@type": "Question",
          "name": "هل يمكنني زيارة أثاثي أو سحب قطع منه؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "تواصل معنا عند الحجز لمعرفة آلية الزيارة والاسترجاع المتاحة."
          }
        },
        {
          "@type": "Question",
          "name": "ما الأشياء التي لا يُنصح بتخزينها؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "ننصح بعدم تخزين المواد القابلة للاشتعال والأطعمة والمواد الكيميائية والنقود والمجوهرات."
          }
        },
        {
          "@type": "Question",
          "name": "هل يشمل السعر النقل والتغليف؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "قد يُضاف النقل والتغليف حسب حالتك، ونوضح لك ما يشمله السعر قبل الاتفاق."
          }
        }
      ]
    }
  ]
};

const newMainContent = `    <main id="main-content" class="flex-grow py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <!-- Hero & Intro -->
        <div class="text-center mb-10">
            <span class="inline-block bg-blue-100 text-blue-900 text-xs font-bold px-3 py-1 rounded-full mb-3">مستودعات مكيفة ومحمية بجدة</span>
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 tracking-tight">شركة تخزين عفش بجدة: تخزين الأثاث لفترات قصيرة وطويلة</h1>
            <p class="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6">
                ${introText}
            </p>
            <div class="flex flex-wrap gap-4 justify-center">
                <a href="tel:+966540026747" class="inline-flex items-center gap-2 px-6 py-3 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-xl transition shadow">
                    <i class="fas fa-phone-alt"></i>
                    <span>اتصل الآن: 0540026747</span>
                </a>
                <a href="https://wa.me/966540026747?text=%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%AE%D8%AF%D9%85%D8%A9%20%D8%AA%D8%AE%D8%B2%D9%8A%D9%86%20%D8%A7%D9%84%D8%B9%D9%81%D8%B4%20%D8%A8%D8%AC%D8%AF%D8%A9" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition shadow">
                    <i class="fab fa-whatsapp"></i>
                    <span>حجز مساحة تخزين عبر واتساب</span>
                </a>
            </div>
        </div>

        <!-- 1) ماذا تحصل عليه -->
        <div class="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-10">
            <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <i class="fas fa-warehouse text-blue-600"></i>
                <span>ماذا تحصل عليه مع خدمة تخزين العفش بجدة؟</span>
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
                <div class="flex items-center gap-3 p-3.5 bg-gray-50 rounded-xl">
                    <i class="fas fa-check-circle text-green-600 text-lg"></i>
                    <span class="font-medium">مساحة مخصصة ومستقلة لكل عميل تمنع اختلاط المنقولات</span>
                </div>
                <div class="flex items-center gap-3 p-3.5 bg-gray-50 rounded-xl">
                    <i class="fas fa-check-circle text-green-600 text-lg"></i>
                    <span class="font-medium">مستودعات مكيفة ومحمية لحفظ الأثاث من درجات الحرارة المرتفعة</span>
                </div>
                <div class="flex items-center gap-3 p-3.5 bg-gray-50 rounded-xl">
                    <i class="fas fa-check-circle text-green-600 text-lg"></i>
                    <span class="font-medium">كاميرات مراقبة وحراسة مستمرة على مدار الساعة</span>
                </div>
                <div class="flex items-center gap-3 p-3.5 bg-gray-50 rounded-xl">
                    <i class="fas fa-check-circle text-green-600 text-lg"></i>
                    <span class="font-medium">تغليف وقائي احترافي للأثاث والأجهزة قبل الإيداع بالمستودع</span>
                </div>
                <div class="flex items-center gap-3 p-3.5 bg-gray-50 rounded-xl">
                    <i class="fas fa-check-circle text-green-600 text-lg"></i>
                    <span class="font-medium">مرونة تامة في مدد التخزين القصيرة والطويلة حسب رغبتك</span>
                </div>
                <div class="flex items-center gap-3 p-3.5 bg-gray-50 rounded-xl">
                    <i class="fas fa-check-circle text-green-600 text-lg"></i>
                    <span class="font-medium">تخزين محمي مع رفع الأثاث عن الأرضيات لحمايته من أي رطوبة</span>
                </div>
            </div>
        </div>

        <!-- 2) متى تحتاج إلى تخزين الأثاث -->
        <div class="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-10">
            <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-4">متى تحتاج إلى تخزين الأثاث؟</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                <div class="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <h3 class="font-bold text-blue-900 mb-1">الانتقال بين مسكنين بفارق زمني</h3>
                    <p class="leading-relaxed">عند انتهاء عقد الإيجار الحالي قبل موعد استلام المنزل الجديد، يوفر التخزين حلاً مثالياً لحفظ العفش بأمان حتى موعد السكن.</p>
                </div>
                <div class="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <h3 class="font-bold text-blue-900 mb-1">أعمال الترميم والصيانة المنزلية</h3>
                    <p class="leading-relaxed">أثناء أعمال الدهانات، أو تجديد الأرضيات والديكورات لحماية غرف النوم والمجالس من الغبار وتطاير مواد البناء والطلاء.</p>
                </div>
                <div class="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <h3 class="font-bold text-blue-900 mb-1">السفر الطويل أو الانتداب الخارجي</h3>
                    <p class="leading-relaxed">في حال السفر خارج المملكة للعمل أو الدراسة أو السياحة لعدة أشهر والرغبة في تسليم الوحدة السكنية لحفظ المصاريف.</p>
                </div>
                <div class="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <h3 class="font-bold text-blue-900 mb-1">الفترة الانتقالية بين عقدي إيجار</h3>
                    <p class="leading-relaxed">حفظ الأثاث المكتبي أو السكني لحين العثور على مقر أو شقة مناسبة بالمواصفات المطلوبة دون استعجال.</p>
                </div>
            </div>
        </div>

        <!-- 3) كيف نجهز أثاثك للتخزين -->
        <div class="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-10">
            <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">كيف نجهز أثاثك للتخزين؟</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                <div class="p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <span class="w-8 h-8 rounded-full bg-blue-900 text-white font-bold inline-flex items-center justify-center mb-3">1</span>
                    <h3 class="font-bold text-gray-800 text-sm mb-1">جرد القطع</h3>
                    <p class="text-xs text-gray-500 leading-relaxed">حصر كامل المنقولات والقطع المراد تخزينها لتحديد المساحة المطلوبة بدقة.</p>
                </div>
                <div class="p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <span class="w-8 h-8 rounded-full bg-blue-900 text-white font-bold inline-flex items-center justify-center mb-3">2</span>
                    <h3 class="font-bold text-gray-800 text-sm mb-1">تغليف الأثاث</h3>
                    <p class="text-xs text-gray-500 leading-relaxed">تغليف بالكرتون المقوى والفقاعات والنايلون لحماية طويلة الأمد من الأتربة.</p>
                </div>
                <div class="p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <span class="w-8 h-8 rounded-full bg-blue-900 text-white font-bold inline-flex items-center justify-center mb-3">3</span>
                    <h3 class="font-bold text-gray-800 text-sm mb-1">الترتيب بالمستودع</h3>
                    <p class="text-xs text-gray-500 leading-relaxed">ترتيب القطع الثقيلة بالأسفل وتجنب أي ضغط على الأجزاء الحساسة والزجاجية.</p>
                </div>
                <div class="p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <span class="w-8 h-8 rounded-full bg-blue-900 text-white font-bold inline-flex items-center justify-center mb-3">4</span>
                    <h3 class="font-bold text-gray-800 text-sm mb-1">الاسترجاع عند الطلب</h3>
                    <p class="text-xs text-gray-500 leading-relaxed">إعادة تسليم الأثاث ونقله إلى وجهتك الجديدة بمجرد انتهاء فترة التخزين.</p>
                </div>
            </div>
        </div>

        <!-- 4) كم تبلغ تكلفة التخزين في جدة؟ -->
        <div class="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-10">
            <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-3">كم تبلغ تكلفة التخزين في جدة؟</h2>
            <p class="text-sm text-gray-600 leading-relaxed mb-4">
                تتفاوت تكلفة تخزين الأثاث في جدة وفق مجموعة من العوامل الأساسية:
            </p>
            <ul class="space-y-2 text-sm text-gray-600 mb-6 list-disc list-inside">
                <li><strong>حجم الأثاث والمساحة:</strong> مساحة الغرفة أو الحيز الذي تشغله القطع داخل المستودع.</li>
                <li><strong>مدة التخزين:</strong> عدد الأسابيع أو الشهور، مع مرونة المدد القصيرة أو الطويلة.</li>
                <li><strong>خدمات التغليف:</strong> نوع وكمية مواد التغليف المقوى والفقاعي المستخدمة لحماية المنقولات.</li>
                <li><strong>النقل من وإلى المستودع:</strong> توفير سيارات دينا لنقل العفش من منزلك إلى المستودع وإعادته عند الطلب.</li>
            </ul>

            <!-- جدول الأسعار المسبق لتأكيد المالك -->
            <div class="overflow-x-auto mb-6">
                <table class="w-full text-right text-sm border-collapse">
                    <thead>
                        <tr class="bg-blue-900 text-white">
                            <th class="p-3.5 rounded-tr-xl font-bold">المساحة وحجم التخزين</th>
                            <th class="p-3.5 font-bold">السعر التقديري السابق</th>
                            <th class="p-3.5 rounded-tl-xl font-bold">المناسب لـ</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        <tr class="hover:bg-gray-50">
                            <td class="p-3.5 font-bold text-gray-800">مساحة تخزين صغيرة (محدودة)</td>
                            <td class="p-3.5 text-green-700 font-bold">تبدأ من 250 ريال / شهر</td>
                            <td class="p-3.5 text-gray-600">كراتين، حقائب، أجهزة كهربائية فردية، غرف نوم مفككة</td>
                        </tr>
                        <tr class="hover:bg-gray-50">
                            <td class="p-3.5 font-bold text-gray-800">غرفة تخزين شقة متوسطة (2-3 غرف)</td>
                            <td class="p-3.5 text-green-700 font-bold">حسب المعاينة والمساحة</td>
                            <td class="p-3.5 text-gray-600">أثاث شقة كامل يشمل الصالونات والمطابخ والغرف</td>
                        </tr>
                        <tr class="hover:bg-gray-50">
                            <td class="p-3.5 font-bold text-gray-800">مستودع فيلا أو مكاتب شركات</td>
                            <td class="p-3.5 text-green-700 font-bold">عقود سنوية مخصصة</td>
                            <td class="p-3.5 text-gray-600">أثاث الفلل الكبيرة والشركات والمعدات المكتبية</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="bg-blue-50 p-4 rounded-xl border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span class="text-sm text-blue-950 font-semibold">أرسل حجم أثاثك والمدة المتوقعة لنقدّر لك التكلفة مباشرة:</span>
                <a href="https://wa.me/966540026747?text=%D8%A3%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%AA%D9%82%D8%AF%D9%8A%D8%B1%20%D8%AA%D9%83%D9%84%D9%81%D8%A9%20%D8%AA%D8%AE%D8%B2%D9%8A%D9%86%20%D8%A7%D9%84%D8%A3%D8%AB%D8%A7%D8%AB%20%D8%AD%D8%B3%D8%A8%20%D8%A7%D9%84%D8%AD%D8%AC%D9%85%20%D9%88%D8%A7%D9%84%D9%85%D8%AF%D8%A9" target="_blank" rel="noopener noreferrer" class="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg text-sm transition shrink-0 flex items-center gap-2">
                    <i class="fab fa-whatsapp"></i>
                    <span>طلب تقدير التكلفة عبر واتساب</span>
                </a>
            </div>

            <p class="text-xs text-gray-400 mt-4 text-left">
                آخر تحديث للصفحة: <time datetime="2026-11-11">نوفمبر 2026</time>
            </p>
        </div>

        <!-- 5) ما الذي لا يُنصح بتخزينه؟ -->
        <div class="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-10">
            <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <i class="fas fa-exclamation-triangle text-amber-500"></i>
                <span>ما الذي لا يُنصح بتخزينه؟</span>
            </h2>
            <p class="text-sm text-gray-600 leading-relaxed mb-4">
                للحفاظ على السلامة العامة والوقاية داخل المستودعات، ننصح بعدم تخزين المواد التالية:
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
                <div class="p-3 bg-amber-50/60 rounded-xl border border-amber-100 flex items-center gap-2.5">
                    <i class="fas fa-ban text-amber-600"></i>
                    <span>المواد القابلة للاشتعال وأسطوانات الغاز والوقود.</span>
                </div>
                <div class="p-3 bg-amber-50/60 rounded-xl border border-amber-100 flex items-center gap-2.5">
                    <i class="fas fa-ban text-amber-600"></i>
                    <span>الأطعمة والمواد الغذائية المعرضة للتلف أو جذب الحشرات.</span>
                </div>
                <div class="p-3 bg-amber-50/60 rounded-xl border border-amber-100 flex items-center gap-2.5">
                    <i class="fas fa-ban text-amber-600"></i>
                    <span>المواد الكيميائية والأصباغ والمذيبات السائلة.</span>
                </div>
                <div class="p-3 bg-amber-50/60 rounded-xl border border-amber-100 flex items-center gap-2.5">
                    <i class="fas fa-ban text-amber-600"></i>
                    <span>النقود، والمجوهرات، والوثائق الرسمية الثمينة.</span>
                </div>
            </div>
        </div>

        <!-- صور المستودعات ونقل الأثاث -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <div class="rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-white">
                <img src="/assets/img/gallery/1%20(8).jpeg" alt="مستودعات تخزين أثاث وعفش بجدة مكيفة ومحمية" class="w-full h-48 object-cover" width="400" height="240" loading="lazy">
                <p class="p-2.5 text-xs text-center text-gray-600 font-medium">مستودعات مكيفة ومحمية بجدة</p>
            </div>
            <div class="rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-white">
                <img src="/assets/img/gallery/1%20(2).jpeg" alt="تغليف أثاث ومجالس للتخزين طويل الأجل بجدة" class="w-full h-48 object-cover" width="400" height="240" loading="lazy">
                <p class="p-2.5 text-xs text-center text-gray-600 font-medium">تغليف وقائي محكم ضد الغبار</p>
            </div>
            <div class="rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-white">
                <img src="/assets/img/gallery/1%20(1).jpeg" alt="سيارات دينا لنقل الأثاث مباشرة إلى مستودعات التخزين بجدة" class="w-full h-48 object-cover" width="400" height="240" loading="lazy">
                <p class="p-2.5 text-xs text-center text-gray-600 font-medium">نقل مباشر من وإلى المستودع</p>
            </div>
        </div>

        <!-- 6) الأسئلة الشائعة FAQ (مطابقة تماماً للـ Schema) -->
        <div class="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-10">
            <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">الأسئلة الشائعة حول تخزين الأثاث بجدة</h2>
            <div class="space-y-4">
                <div class="border border-gray-100 rounded-xl p-4 bg-gray-50">
                    <h3 class="font-bold text-blue-900 text-sm sm:text-base mb-2">كم تكلفة تخزين الأثاث في جدة؟</h3>
                    <p class="text-xs sm:text-sm text-gray-600 leading-relaxed">تختلف حسب مساحة التخزين وحجم الأثاث ومدة التخزين وما إذا كنت تحتاج النقل والتغليف. أرسل لنا حجم أثاثك والمدة المتوقعة على واتساب ونرد بتقدير مناسب.</p>
                </div>
                <div class="border border-gray-100 rounded-xl p-4 bg-gray-50">
                    <h3 class="font-bold text-blue-900 text-sm sm:text-base mb-2">كيف يتم تخزين الأثاث؟</h3>
                    <p class="text-xs sm:text-sm text-gray-600 leading-relaxed">نجرد القطع ونغلفها ثم نخزنها في مساحة مخصصة لك لمنع اختلاطها بمنقولات الآخرين.</p>
                </div>
                <div class="border border-gray-100 rounded-xl p-4 bg-gray-50">
                    <h3 class="font-bold text-blue-900 text-sm sm:text-base mb-2">هل المستودعات مكيفة وعليها مراقبة؟</h3>
                    <p class="text-xs sm:text-sm text-gray-600 leading-relaxed">نعم، المستودعات مكيفة وعليها كاميرات مراقبة.</p>
                </div>
                <div class="border border-gray-100 rounded-xl p-4 bg-gray-50">
                    <h3 class="font-bold text-blue-900 text-sm sm:text-base mb-2">ما أقصى مدة تخزين؟</h3>
                    <p class="text-xs sm:text-sm text-gray-600 leading-relaxed">نوفر التخزين لمدد قصيرة أو طويلة، وتُحدد المدة بالاتفاق معك قبل بدء التخزين.</p>
                </div>
                <div class="border border-gray-100 rounded-xl p-4 bg-gray-50">
                    <h3 class="font-bold text-blue-900 text-sm sm:text-base mb-2">هل يمكنني زيارة أثاثي أو سحب قطع منه؟</h3>
                    <p class="text-xs sm:text-sm text-gray-600 leading-relaxed">تواصل معنا عند الحجز لمعرفة آلية الزيارة والاسترجاع المتاحة.</p>
                </div>
                <div class="border border-gray-100 rounded-xl p-4 bg-gray-50">
                    <h3 class="font-bold text-blue-900 text-sm sm:text-base mb-2">ما الأشياء التي لا يُنصح بتخزينها؟</h3>
                    <p class="text-xs sm:text-sm text-gray-600 leading-relaxed">ننصح بعدم تخزين المواد القابلة للاشتعال والأطعمة والمواد الكيميائية والنقود والمجوهرات.</p>
                </div>
                <div class="border border-gray-100 rounded-xl p-4 bg-gray-50">
                    <h3 class="font-bold text-blue-900 text-sm sm:text-base mb-2">هل يشمل السعر النقل والتغليف؟</h3>
                    <p class="text-xs sm:text-sm text-gray-600 leading-relaxed">قد يُضاف النقل والتغليف حسب حالتك، ونوضح لك ما يشمله السعر قبل الاتفاق.</p>
                </div>
            </div>
        </div>

        <!-- 7) خدمات ذات صلة -->
        <div class="bg-blue-50 rounded-2xl p-6 border border-blue-100 mb-10">
            <h3 class="text-lg font-bold text-blue-950 mb-3">خدمات متعلقة بنقل وتجهيز الأثاث:</h3>
            <div class="flex flex-wrap gap-3 text-sm">
                <a href="/services/" class="px-4 py-2 bg-white text-blue-900 rounded-lg hover:bg-blue-100 transition shadow-sm font-semibold">دليل كافة الخدمات</a>
                <a href="/moving-furniture-inside-jeddah/" class="px-4 py-2 bg-white text-blue-900 rounded-lg hover:bg-blue-100 transition shadow-sm font-semibold">نقل العفش داخل أحياء جدة</a>
                <a href="/furniture-packing-in-jeddah/" class="px-4 py-2 bg-white text-blue-900 rounded-lg hover:bg-blue-100 transition shadow-sm font-semibold">تغليف العفش بجدة</a>
                <a href="/furniture-moving-prices-in-jeddah/" class="px-4 py-2 bg-white text-blue-900 rounded-lg hover:bg-blue-100 transition shadow-sm font-semibold">أسعار نقل العفش بجدة</a>
                <a href="/furniture-dismantling-and-assembly-in-jeddah/" class="px-4 py-2 bg-white text-blue-900 rounded-lg hover:bg-blue-100 transition shadow-sm font-semibold">فك وتركيب أثاث جدة</a>
                <a href="/moving-electrical-appliances-in-jeddah/" class="px-4 py-2 bg-white text-blue-900 rounded-lg hover:bg-blue-100 transition shadow-sm font-semibold">نقل الأجهزة الكهربائية بجدة</a>
            </div>
        </div>

        <!-- 8) Final CTA -->
        <div class="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-3xl p-8 text-center shadow-lg">
            <h2 class="text-2xl sm:text-3xl font-black mb-3">احجز مساحة تخزين لأثاثك بأمان واطمئنان اليوم</h2>
            <p class="text-blue-100 text-sm sm:text-base mb-6 max-w-xl mx-auto">تواصل معنا لمعاينة حجم العفش واختيار غرفة التخزين المناسبة لحاجتك مع تحديد مدة التخزين بكل مرونة.</p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:+966540026747" class="px-8 py-3.5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition shadow">
                    اتصل بنا: 0540026747
                </a>
                <a href="/contact/" class="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition border border-white/20">
                    طلب عرض سعر التخزين
                </a>
            </div>
        </div>
    </main>`;

// Build complete HTML
const newHtml = `<!DOCTYPE html>
<html lang="ar-SA" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
    <title>شركة تخزين عفش بجدة | تخزين الأثاث لمدد قصيرة أو طويلة</title>
    <meta name="description" content="شركة تخزين عفش بجدة: مستودعات مكيفة وكاميرات مراقبة لتخزين الأثاث لمدد قصيرة أو طويلة. اتصل 0540026747 لمعرفة المساحات والأسعار">
    <link rel="canonical" href="https://alqasr-alsueudi.com/furniture-storage-in-jeddah/">
    
    <meta property="og:title" content="شركة تخزين عفش بجدة | تخزين الأثاث لمدد قصيرة أو طويلة">
    <meta property="og:description" content="شركة تخزين عفش بجدة: مستودعات مكيفة وكاميرات مراقبة لتخزين الأثاث لمدد قصيرة أو طويلة. اتصل 0540026747 لمعرفة المساحات والأسعار">
    <meta property="og:url" content="https://alqasr-alsueudi.com/furniture-storage-in-jeddah/">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="ar_SA">
    <meta property="og:site_name" content="شركة القصر السعودي">
    <meta property="og:image" content="https://alqasr-alsueudi.com/assets/img/furniture-moving-jeddah.webp">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="تخزين الأثاث والعفش بجدة - القصر السعودي">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="شركة تخزين عفش بجدة | تخزين الأثاث لمدد قصيرة أو طويلة">
    <meta name="twitter:description" content="شركة تخزين عفش بجدة: مستودعات مكيفة وكاميرات مراقبة لتخزين الأثاث لمدد قصيرة أو طويلة. اتصل 0540026747 لمعرفة المساحات والأسعار">
    <meta name="twitter:image" content="https://alqasr-alsueudi.com/assets/img/furniture-moving-jeddah.webp">

    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    <link rel="preload" href="/assets/fonts/cairo-arabic.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="stylesheet" href="/assets/css/all.min.css" media="print" onload="this.media='all'">
    <noscript><link rel="stylesheet" href="/assets/css/all.min.css"></noscript>
    <link rel="stylesheet" href="/assets/css/main.min.css">

    <script src="/assets/js/analytics.js" defer></script>

    <script type="application/ld+json">
${JSON.stringify(jsonLd, null, 4)}
    </script>
</head>
<body class="bg-gray-50 text-gray-800 font-sans antialiased min-h-screen flex flex-col justify-between">
    <a href="#main-content" class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:right-4 focus:z-50 focus:bg-blue-700 focus:text-white focus:px-4 focus:py-2 focus:rounded focus:text-sm focus:font-bold" id="skip-to-content">تخطى إلى المحتوى الرئيسي</a>

    <!-- @header -->
<!-- /@header -->

    <!-- Breadcrumb -->
    <nav aria-label="مسار التنقل" class="py-3 px-4 bg-gray-50 border-b border-gray-100 text-xs sm:text-sm text-gray-500">
        <div class="container mx-auto">
            <ol class="flex items-center space-x-2 space-x-reverse">
                <li><a href="/" class="hover:text-blue-900 transition-colors">الرئيسية</a></li>
                <li><span class="text-gray-400">/</span></li>
                <li><a href="/services/" class="hover:text-blue-900 transition-colors">الخدمات</a></li>
                <li><span class="text-gray-400">/</span></li>
                <li class="text-blue-900 font-semibold" aria-current="page">تخزين العفش بجدة</li>
            </ol>
        </div>
    </nav>

${newMainContent}

    <!-- @footer -->
<!-- /@footer -->

    <!-- الأزرار العائمة -->
    <div class="fixed bottom-6 left-6 z-50 flex flex-col gap-4">
        <a href="tel:+966540026747" aria-label="اتصل بنا الآن" class="bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition">
            <i class="fas fa-phone-alt text-xl"></i>
        </a>
        <a href="https://wa.me/966540026747?text=%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%AE%D8%AF%D9%85%D8%A9%20%D8%AA%D8%AE%D8%B2%D9%8A%D9%86%20%D8%A7%D9%84%D8%B9%D9%81%D8%B4%20%D8%A8%D8%AC%D8%AF%D8%A9" target="_blank" rel="noopener noreferrer" aria-label="تواصل معنا عبر واتساب" class="bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition">
            <i class="fab fa-whatsapp text-2xl"></i>
        </a>
    </div>

    <script src="/assets/js/navbar.js" defer></script>
</body>
</html>
`;

fs.writeFileSync(filePath, newHtml, 'utf8');
console.log('furniture-storage-in-jeddah/index.html updated successfully.');

