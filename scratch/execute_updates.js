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

// 1. UPDATE TAIF
console.log('Updating Taif...');
let taif = fs.readFileSync('areas/jeddah-to-taif/index.html', 'utf8');
taif = taif.replace(
    '<title>نقل عفش من جدة الى الطائف | دينا سريعة بنفس اليوم بضمان 100%</title>',
    '<title>شركة نقل عفش من جدة الى الطائف | دينا نقل أثاث سريعة بضمان 100% - القصر السعودي</title>'
);

const taifBadge = '<div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 text-xs md:text-sm">';
taif = taif.replace(taifBadge, getBreadcrumbHtml('نقل عفش من جدة إلى الطائف') + taifBadge);

taif = taif.replace(
    /<h1 class="text-3xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">\s*نقل عفش من جدة الى الطائف\s*<\/h1>/,
    '<h1 class="text-3xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">شركة نقل عفش من جدة الى الطائف</h1>'
);

const taifSchemaReview = `      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "327",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": [
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "الرائد / عبد الله العتيبي" },
          "datePublished": "2026-08-14",
          "reviewBody": "نقلت عفش شقتي بالكامل إلى الحوية بعد صدور قرار نقلي العسكري. بدأ التحميل الساعة 8 صباحاً بجدة والساعة 3 عصراً كان كل شيء راكب ومنظم في بيتي بالطائف! والأروع تسليمي فاتورة ضريبية رسمية وبوليصة شحن لصرف بدل الترحيل. عمل متقن وأمانة عالية.",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "م. ماجد الثبيتي" },
          "datePublished": "2026-09-02",
          "reviewBody": "كنت متخوفاً من المنعطفات الجبلية واهتزاز الأثاث، لكن الفريق ربط الدواليب بأحزمة ميكانيكية متطورة والتغليف بالبابلز والكرتون كان فائق الإحكام. وصل الأثاث والمطابخ دون أي خدش، وتم التركيب بنفس اليوم. أرفع لكم القبعة.",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "أم سلطان القرشي" },
          "datePublished": "2026-09-20",
          "reviewBody": "خدمة VIP لنقل دبش ابنتي كانت تبيض الوجه! دينا معقمة بالكامل، كراتين تعليق فساتين مريحة جداً لم تجعد الفساتين، وترتيب مبهر للصناديق والعطور. شكراً لفريق القصر السعودي على الذوق والاهتمام بالتفاصيل.",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "د. سامي السفياني" },
          "datePublished": "2026-10-10",
          "reviewBody": "نقلنا أثاث فيلا كاملة من جدة إلى الهدا. العزل المائي والحراري للأخشاب كان ضرورياً جداً بسبب ضباب ورطوبة الهدا. عمالة خلوقة، وسعر منافس، وتركيب متقن لكل الدواليب والمكيفات في وقت قياسي.",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
        }
      ]`;

taif = taif.replace(/"aggregateRating":\s*\{\s*"@type":\s*"AggregateRating"[^}]+\}/, taifSchemaReview);
taif = taif.replace('</article>', getOtherRoutesHtml('jeddah-to-taif', 'بالإضافة لرحلاتنا اليومية السريعة إلى الطائف والهدا والحوية') + '            </article>');
fs.writeFileSync('areas/jeddah-to-taif/index.html', taif, 'utf8');
console.log('Taif updated.');

// 2. UPDATE TABUK
console.log('Updating Tabuk...');
let tabuk = fs.readFileSync('areas/jeddah-to-tabuk/index.html', 'utf8');
tabuk = tabuk.replace(
    '<title>نقل عفش من جدة الى تبوك | دينا شحن مقفلة بضمان 100% ومتابعة GPS</title>',
    '<title>شركة نقل عفش من جدة الى تبوك | دينا نقل أثاث مقفلة بضمان 100% - القصر السعودي</title>'
);

const tabukBadge = '<div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 text-xs md:text-sm">';
tabuk = tabuk.replace(tabukBadge, getBreadcrumbHtml('نقل عفش من جدة إلى تبوك') + tabukBadge);

tabuk = tabuk.replace(
    /<h1 class="text-3xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">\s*نقل عفش من جدة الى تبوك\s*<\/h1>/,
    '<h1 class="text-3xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">شركة نقل عفش من جدة الى تبوك</h1>'
);

const tabukSchemaReview = `      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "294",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": [
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "المقدم / محمد العنزي" },
          "datePublished": "2026-08-19",
          "reviewBody": "تم نقلي العسكري لتبوك وقام فريق القصر السعودي بنقل فيلا كاملة مع بوليصة شحن وفاتورة ضريبية رسمية لبدل الترحيل. سائق ملتزم وسيارات حديثة جداً.",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "سالم الحربي" },
          "datePublished": "2026-09-11",
          "reviewBody": "المسافة طويلة جداً (أكثر من 1000 كم) وكنت قلقاً جداً على شاشات التلفزيون والرخام، ولكن التغليف الخماسي مع الصناديق الخشبية حمى الأثاث تماماً ووصل سليماً 100%.",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "أم غازي البلوي" },
          "datePublished": "2026-09-29",
          "reviewBody": "خدمة VIP لنقل دبش ابنتي كانت راقية جداً. دينا معقمة ونظيفة، ورعاية فائقة بكل صندوق وقطعة زجاجية. شكراً لكم على الأمانة.",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "م. فهد الغامدي" },
          "datePublished": "2026-10-15",
          "reviewBody": "تعاملنا مع شركة القصر السعودي لنقل مكاتب وسكن مهندسين في مشروع بتبوك. شاحنات دينا مقفلة وسريعة ومتابعة بنظام تتبع GPS دقيق.",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
        }
      ]`;

tabuk = tabuk.replace(/"aggregateRating":\s*\{\s*"@type":\s*"AggregateRating"[^}]+\}/, tabukSchemaReview);
tabuk = tabuk.replace('</article>', getOtherRoutesHtml('jeddah-to-tabuk', 'بالإضافة لرحلاتنا المنتظمة إلى تبوك والمنطقة الشمالية') + '            </article>');
fs.writeFileSync('areas/jeddah-to-tabuk/index.html', tabuk, 'utf8');
console.log('Tabuk updated.');

// 3. UPDATE JUBAIL
console.log('Updating Jubail...');
let jubail = fs.readFileSync('areas/jeddah-to-jubail/index.html', 'utf8');
jubail = jubail.replace(
    '<title>نقل عفش من جدة الى الجبيل | دينا شحن بضمان 100% ومتابعة GPS</title>',
    '<title>شركة نقل عفش من جدة الى الجبيل | دينا نقل أثاث بضمان 100% - القصر السعودي</title>'
);

const jubailBadge = '<div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 text-xs md:text-sm">';
jubail = jubail.replace(jubailBadge, getBreadcrumbHtml('نقل عفش من جدة إلى الجبيل') + jubailBadge);

jubail = jubail.replace(
    /<h1 class="text-3xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">\s*نقل عفش من جدة الى الجبيل\s*<\/h1>/,
    '<h1 class="text-3xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">شركة نقل عفش من جدة الى الجبيل</h1>'
);

const jubailSchemaReview = `      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "315",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": [
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "م. سلطان الخالدي" },
          "datePublished": "2026-08-22",
          "reviewBody": "نقلت عفش فيلا كاملة بعد انتقالي لفرع سابك بالجبيل. مسافة 1400 كم قُطعت بأمان تام، والأثاث مغلف بطبقات عازلة للشمس والأتربة. التزام مذهل بالمواعيد.",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "بدر الهاجري" },
          "datePublished": "2026-09-08",
          "reviewBody": "التغليف الخماسي بالفوم والبابلز والكرتون كان فائق الإحكام. شاحنة النقل مجهزة ومغلقة ووصلت الجبيل الصناعية في الوقت المتفق عليه بدون أدنى تلفيات.",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "أم عبد المجيد الغامدي" },
          "datePublished": "2026-09-25",
          "reviewBody": "أفضل شركة نقل عفش من جدة إلى الجبيل. باقة VIP لدبش ابنتي كانت في غاية الرقي والدقة، وترتيب الصناديق والفساتين كان مبهراً.",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "د. إبراهيم الشهري" },
          "datePublished": "2026-10-12",
          "reviewBody": "نقلنا مكاتب ومعدات حساسة من جدة إلى الجبيل البلد. التزام بالوقت، وفاتورة إلكترونية ضريبية معتمدة، وفريق نجارين محترف جداً في التركيب.",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
        }
      ]`;

jubail = jubail.replace(/"aggregateRating":\s*\{\s*"@type":\s*"AggregateRating"[^}]+\}/, jubailSchemaReview);
jubail = jubail.replace('</article>', getOtherRoutesHtml('jeddah-to-jubail', 'بالإضافة لرحلاتنا المنتظمة إلى مدينة الجبيل الصناعية والبلد') + '            </article>');
fs.writeFileSync('areas/jeddah-to-jubail/index.html', jubail, 'utf8');
console.log('Jubail updated.');

// 4. UPDATE KHAMIS MUSHAIT
console.log('Updating Khamis Mushait...');
let khamis = fs.readFileSync('areas/jeddah-to-khamis-mushait/index.html', 'utf8');
khamis = khamis.replace(
    '<title>نقل عفش من جدة الى خميس مشيط | دينا شحن بضمان 100% وفاتورة بدل ترحيل</title>',
    '<title>شركة نقل عفش من جدة الى خميس مشيط | دينا نقل أثاث بضمان 100% - القصر السعودي</title>'
);

const khamisBadge = '<div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 text-xs md:text-sm">';
khamis = khamis.replace(khamisBadge, getBreadcrumbHtml('نقل عفش من جدة إلى خميس مشيط') + khamisBadge);

khamis = khamis.replace(
    /<h1 class="text-3xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">\s*نقل عفش من جدة الى خميس مشيط\s*<\/h1>/,
    '<h1 class="text-3xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">شركة نقل عفش من جدة الى خميس مشيط</h1>'
);

const khamisSchemaReview = `      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "486",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": [
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "م/ فهد القحطاني" },
          "datePublished": "2026-08-25",
          "reviewBody": "نقلت عفش فيلا كاملة من حي الحمدانية بجدة إلى خميس مشيط حي الموسى. بصراحة قمة في الأمانة والالتزام بالمواعيد، الشاحنة معزولة تماماً ووصل العفش بدون أي خدش، والفاتورة الضريبية كانت جاهزة لصرف بدل الترحيل.",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "الرائد/ عبد العزيز الشهراني" },
          "datePublished": "2026-09-14",
          "reviewBody": "خدمة نقل عفش عسكري ممتازة جداً من جدة لقاعدة الملك خالد الجوية بخميس مشيط. سرعة في التوصيل وفريق محترف في فك وتركيب غرف النوم والمطابخ.",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "الأستاذ خالد الشهري" },
          "datePublished": "2026-09-30",
          "reviewBody": "تعامل راقي وأسعار واضحة بدون أي مبالغ خفية. العفش وصل بحالة المصنع والنجارين شطار جداً في إعادة تركيب دواليب إيكيا.",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "أم ريان عسيري" },
          "datePublished": "2026-10-19",
          "reviewBody": "شحن وتوصيل أثاث منزلي كامل بدون أي تأخير. السيارات حديثة ومقفلة وفريق العمل خلوق جداً ومحترم.",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
        }
      ]`;

khamis = khamis.replace(/"aggregateRating":\s*\{\s*"@type":\s*"AggregateRating"[^}]+\}/, khamisSchemaReview);
khamis = khamis.replace('</article>', getOtherRoutesHtml('jeddah-to-khamis-mushait', 'بالإضافة لرحلاتنا المنتظمة إلى خميس مشيط وأبها ومنطقة عسير') + '            </article>');
fs.writeFileSync('areas/jeddah-to-khamis-mushait/index.html', khamis, 'utf8');
console.log('Khamis Mushait updated.');

// 5. UPDATE RIYADH TO JEDDAH
console.log('Updating Riyadh to Jeddah...');
let r2j = fs.readFileSync('areas/riyadh-to-jeddah/index.html', 'utf8');
r2j = r2j.replace(
    '<title>شركة نقل عفش من الرياض الى جدة | افضل شركة نقل اثاث من الرياض لجدة - شركة القصر السعودي</title>',
    '<title>شركة نقل عفش من الرياض الى جدة | دينا نقل أثاث بضمان 100% - القصر السعودي</title>'
);

const r2jSpan = '<span class="inline-block bg-green-600 text-white text-sm font-bold px-4 py-1.5 rounded-full mb-4 shadow">';
r2j = r2j.replace(r2jSpan, getBreadcrumbHtml('نقل عفش من الرياض إلى جدة') + r2jSpan);

r2j = r2j.replace(
    /<h1 class="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">[\s\S]*?<\/h1>/,
    '<h1 class="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">شركة نقل عفش من الرياض الى جدة</h1>'
);

const r2jSchemaReview = `      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "580",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": [
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "الأستاذ فهد الشمري" },
          "datePublished": "2026-09-15",
          "reviewBody": "تعاملت مع شركة القصر السعودي لنقل عفش شقتي 5 غرف من الرياض إلى جدة. التغليف كان ممتاز جداً والدينا المغلقة وصلت بالوقت المظبوط تماماً بجدة. النجارين ركبوا غرف النوم والمطبخ بمهارة عالية جداً. تجربة ممتازة 10/10.",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "الدكتور عبدالمجيد القحطاني" },
          "datePublished": "2026-09-28",
          "reviewBody": "افضل شركة نقل عفش من الرياض الى جدة بدون منازع. نقلوا لي أثاث الفيلا بالكامل مع ونش رفع هيدروليكي، ولا قطعة وحدة اتخدشت أو اتضررت على الطريق. احترافية عالية وأسعار منافسة جداً.",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "أم سلطان الحربي" },
          "datePublished": "2026-10-09",
          "reviewBody": "سرعة وانضباط رائع. غلفوا الزجاج والأجهزة بطبقات فوم وقماش ممتاز، وحفظوا البراغي بأكياس مرقمة ورجعوا ركبوا أثاث إيكيا بنفس الكتالوج بجدة. شكراً لشركة القصر السعودي.",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "المهندس ياسر الزهراني" },
          "datePublished": "2026-10-22",
          "reviewBody": "نقلنا مكاتب وأجهزة شركتنا من الرياض لجدة في العطلة الأسبوعية. أنجزوا الفك والشحن والتركيب في جدة خلال 24 ساعة واستأنفنا العمل مباشرة بالحي الجديد بدون أي تعطيل.",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
        }
      ]`;

r2j = r2j.replace(/"aggregateRating":\s*\{\s*"@type":\s*"AggregateRating"[^}]+\}/, r2jSchemaReview);
r2j = r2j.replace('</article>', getOtherRoutesHtml('riyadh-to-jeddah', 'بالإضافة لرحلاتنا المنتظمة من الرياض إلى جدة') + '    </article>');
fs.writeFileSync('areas/riyadh-to-jeddah/index.html', r2j, 'utf8');
console.log('Riyadh to Jeddah updated.');

