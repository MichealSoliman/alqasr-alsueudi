const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const routes = [
    {
        dir: 'jeddah-to-al-ahsa', origin: 'جدة', destination: 'الأحساء',
        distance: 'حوالي 1,150 كم', duration: '10 - 12 ساعة',
        roads: 'طريق مكة - الرياض السريع (المسار 40) ثم الاتجاه شرقاً عبر المسار 10/40',
        content: 'يتطلب نقل الأثاث إلى الأحساء تجهيزات خاصة للرحلات الطويلة، حيث نقوم بتغليف العفش بمواد مقاومة للاحتكاك والحرارة لضمان وصوله بحالة ممتازة إلى المنطقة الشرقية.',
        faq: [
            { q: 'كم تستغرق رحلة النقل من جدة إلى الأحساء؟', a: 'تستغرق الرحلة عادة بين 10 إلى 12 ساعة، وتخضع لظروف الطريق وتوقفات الاستراحة.' },
            { q: 'كيف يتم حماية الأثاث خلال المسافة الطويلة للأحساء؟', a: 'نستخدم تغليفاً متعدد الطبقات (نايلون، فقاعات، كرتون) وتثبيتاً داخلياً في دينا النقل لمنع اهتزاز القطع.' },
            { q: 'هل توفرون سيارات مغلقة بالكامل؟', a: 'نعم، جميع شاحناتنا ودينات النقل المتجهة للأحساء مغلقة بالكامل لحماية العفش من الأتربة وعوامل الطقس.' }
        ]
    },
    {
        dir: 'jeddah-to-dammam', origin: 'جدة', destination: 'الدمام',
        distance: 'حوالي 1,350 كم', duration: '12 - 14 ساعة',
        roads: 'طريق مكة - الرياض - الدمام السريع (المسار 40)',
        content: 'نقل العفش إلى الدمام هو أحد أطول المسارات التي نخدمها بانتظام. نعتمد على شاحنات حديثة ومغلقة وسائقين متمرسين لضمان سلامة الأثاث ووصوله في الوقت المتفق عليه.',
        faq: [
            { q: 'كم تستغرق رحلة النقل البري من جدة إلى الدمام؟', a: 'تتراوح المدة المتوقعة بين 12 إلى 14 ساعة حسب حركة المرور في محيط الرياض والمنطقة الشرقية.' },
            { q: 'هل تقدمون خدمة فك وتركيب الأثاث في الدمام؟', a: 'بالتأكيد، فريقنا يرافق العفش ليقوم بعملية التركيب والتنزيل في موقعك الجديد بالدمام.' },
            { q: 'هل يمكن شحن أجهزة كهربائية حساسة للدمام؟', a: 'نعم، نقوم بتغليف الأجهزة بالفلين والفقاعات ووضعها في زوايا آمنة داخل الشاحنة لضمان عدم تضررها.' }
        ]
    },
    {
        dir: 'jeddah-to-jazan', origin: 'جدة', destination: 'جازان',
        distance: 'حوالي 700 كم', duration: '7 - 8 ساعات',
        roads: 'طريق الساحل الدولي (جدة - جازان) (المسار 5)',
        content: 'الطريق الساحلي نحو جازان يتطلب مركبات تتحمل الأجواء الرطبة والحرارة المرتفعة. نضمن لك نقل عفشك بأمان تام مع الاهتمام بالتغليف المضاد للرطوبة.',
        faq: [
            { q: 'كم يستغرق نقل العفش إلى جازان؟', a: 'تستغرق الرحلة في المتوسط 7 إلى 8 ساعات سالكة عبر طريق الساحل.' },
            { q: 'هل تقومون بتغليف الأثاث ضد رطوبة الجو؟', a: 'نعم، نستخدم تغليفاً بلاستيكياً محكماً لمنع تسرب الرطوبة خاصة للكنب والمجالس والأجهزة.' },
            { q: 'ما هي مواعيد انطلاق دينات النقل إلى جازان؟', a: 'نوفر رحلات شبه يومية ونقوم بجدولة الانطلاق ليتناسب مع وقت العميل وتجنب أوقات الذروة.' }
        ]
    },
    {
        dir: 'jeddah-to-jubail', origin: 'جدة', destination: 'الجبيل',
        distance: 'حوالي 1,450 كم', duration: '13 - 15 ساعة',
        roads: 'طريق مكة - الرياض ثم طريق الظهران - الجبيل السريع',
        content: 'نقل العفش إلى مدينة الجبيل الصناعية يحتاج لتنظيم دقيق. نستخدم مواد تغليف صناعية عالية المتانة لتحمل المسافة الطويلة جداً عبر المملكة.',
        faq: [
            { q: 'ما هي تكلفة نقل العفش من جدة إلى الجبيل؟', a: 'التكلفة تعتمد على حجم العفش وعدد الغرف المطلوبة. يرجى التواصل معنا للحصول على تسعيرة دقيقة ومخفضة.' },
            { q: 'كم مدة الرحلة المتوقعة للجبيل؟', a: 'تتراوح بين 13 إلى 15 ساعة، ويتم إطلاع العميل على مسار الشاحنة بانتظام.' },
            { q: 'هل توفرون ضماناً على العفش المنقول للجبيل؟', a: 'نحن نلتزم بتوصيل العفش سليماً ونتحمل مسؤولية أي ضرر ناتج عن تقصيرنا في التغليف أو التحميل.' }
        ]
    },
    {
        dir: 'jeddah-to-khamis-mushait', origin: 'جدة', destination: 'خميس مشيط',
        distance: 'حوالي 650 كم', duration: '7 - 9 ساعات',
        roads: 'طريق الساحل ثم طريق أبها - خميس مشيط',
        content: 'نقل الأثاث إلى المنطقة الجنوبية يتطلب التعامل مع الطرق الجبلية والمنعطفات بحذر. سائقونا مدربون جيداً على قيادة شاحنات النقل في المرتفعات.',
        faq: [
            { q: 'كيف يتم تأمين الأثاث عند صعود المرتفعات لخميس مشيط؟', a: 'يتم ربط جميع قطع الأثاث الكبيرة وتثبيتها بأحزمة مخصصة داخل الدينا لمنع حركتها أثناء الصعود والمنعطفات.' },
            { q: 'كم من الوقت يستغرق وصول العفش؟', a: 'في الظروف الطبيعية تصل الدينا خلال 7 إلى 9 ساعات.' },
            { q: 'هل تعملون في جميع أحياء خميس مشيط؟', a: 'نعم، نغطي جميع أحياء المدينة ونوفر عمالة لتنزيل وتركيب الأثاث في الموقع الجديد.' }
        ]
    },
    {
        dir: 'jeddah-to-khobar', origin: 'جدة', destination: 'الخبر',
        distance: 'حوالي 1,360 كم', duration: '12 - 14 ساعة',
        roads: 'طريق مكة - الرياض - الدمام السريع',
        content: 'خدماتنا اللوجستية لنقل العفش للخبر تتميز بالسرعة والموثوقية. نعطي أولوية قصوى لحماية الأثاث المكتبي والمنزلي للعملاء المنتقلين حديثاً.',
        faq: [
            { q: 'كم المدة بين تحميل العفش في جدة وتنزيله في الخبر؟', a: 'نعمل على أن يتم التنزيل خلال 24 ساعة من التحميل حسب التنسيق مع العميل.' },
            { q: 'هل يتم الفك في جدة والتركيب في الخبر؟', a: 'بالتأكيد، الخدمة شاملة فك الأثاث بالكامل في جدة وإعادة تركيبه في منزلك بالخبر.' },
            { q: 'كيف أحجز خدمة النقل إلى الخبر؟', a: 'يمكنك التواصل معنا عبر الهاتف أو الواتساب لتحديد موعد المعاينة المجانية والاتفاق.' }
        ]
    },
    {
        dir: 'jeddah-to-makkah', origin: 'جدة', destination: 'مكة المكرمة',
        distance: 'حوالي 80 كم', duration: 'ساعة واحدة تقريباً',
        roads: 'طريق الحرمين السريع / طريق مكة - جدة السريع',
        content: 'نظراً لقرب المسافة، نتمكن من إتمام عملية نقل العفش إلى مكة المكرمة في نفس اليوم بكل يسر وسهولة، مع توفير كل العمالة والمواد اللازمة.',
        faq: [
            { q: 'هل يمكن نقل العفش من جدة إلى مكة في نفس اليوم؟', a: 'نعم، المسافة القصيرة تتيح لنا فك وتغليف ونقل وتركيب العفش بالكامل في يوم واحد.' },
            { q: 'ما هي تكلفة نقل العفش لمكة؟', a: 'نظراً لقرب المسافة، أسعار النقل لمكة تعتبر اقتصادية جداً مقارنة بباقي المدن. اتصل لمعرفة السعر.' },
            { q: 'هل توفرون تصاريح دخول للشاحنات في أوقات الذروة لمكة؟', a: 'نحن نلتزم بجدولة العمل في الأوقات المصرح بها لتجنب أي تأخيرات مرورية.' }
        ]
    },
    {
        dir: 'jeddah-to-medina', origin: 'جدة', destination: 'المدينة المنورة',
        distance: 'حوالي 400 كم', duration: '4 - 5 ساعات',
        roads: 'طريق الهجرة السريع (المسار 15)',
        content: 'يُعد خط جدة - المدينة المنورة من المسارات النشطة لدينا. نوفر سيارات مخصصة تسافر بشكل دوري لتلبية طلبات النقل السكني والتجاري بسلاسة.',
        faq: [
            { q: 'كم ساعة تستغرق سيارة نقل العفش للمدينة المنورة؟', a: 'الرحلة تستغرق حوالي 4 إلى 5 ساعات عبر طريق الهجرة السريع.' },
            { q: 'هل تنقلون الأثاث المكتبي للمدينة؟', a: 'نعم، ننقل كافة أنواع الأثاث المنزلي والمكتبي والتجاري مع التغليف والتركيب.' },
            { q: 'كيف أضمن عدم خدش الأثاث أثناء النقل؟', a: 'نقوم بتغليف كامل القطع باستخدام البطانيات المخصصة والنيلون لتوفير حماية تامة ضد الخدوش.' }
        ]
    },
    {
        dir: 'jeddah-to-riyadh', origin: 'جدة', destination: 'الرياض',
        distance: 'حوالي 950 كم', duration: '9 - 10 ساعات',
        roads: 'طريق مكة - الرياض السريع (المسار 40)',
        content: 'الرياض هي الوجهة الأكثر طلباً لنقل العفش. نمتلك أسطولاً يربط جدة بالرياض بشكل منتظم مما يمكننا من تقديم أسعار تنافسية وخدمة موثوقة يومياً.',
        faq: [
            { q: 'هل يتوفر لديكم نقل عفش يومي من جدة للرياض؟', a: 'نعم، لدينا رحلات مجدولة بانتظام ويمكننا تلبية طلبك في أقرب وقت.' },
            { q: 'كم يستغرق الطريق من جدة للرياض بالدينا؟', a: 'تستغرق دينا نقل العفش حوالي 9 إلى 10 ساعات حسب حالة الطريق.' },
            { q: 'هل تغلفون الأثاث الزجاجي بشكل خاص للرياض؟', a: 'بالتأكيد، القطع القابلة للكسر يتم تغليفها بفقاعات هوائية مزدوجة ووضعها في صناديق كرتونية آمنة.' }
        ]
    },
    {
        dir: 'jeddah-to-tabuk', origin: 'جدة', destination: 'تبوك',
        distance: 'حوالي 1,000 كم', duration: '10 - 11 ساعة',
        roads: 'طريق الساحل الشمالي / طريق جدة - تبوك السريع',
        content: 'الطريق إلى المنطقة الشمالية وتبوك يتطلب تجهيزاً خاصاً للدينا لضمان تحمل الطريق الطويل. نحرص على الفحص الفني الدوري للسيارات قبل كل رحلة.',
        faq: [
            { q: 'ما هي مدة النقل البري إلى تبوك؟', a: 'يستغرق الطريق حوالي 10 إلى 11 ساعة بمتوسط سرعة آمنة لشاحنات النقل.' },
            { q: 'هل يمكنكم نقل غرف النوم فقط لتبوك؟', a: 'نعم، نقدم خدمات النقل الجزئي أو الكلي حسب احتياجك مع ضمان الفك والتركيب.' },
            { q: 'هل يوجد تأمين على الأثاث المنقول لتبوك؟', a: 'نحن نضمن لك سلامة الأثاث ونتحمل مسؤولية أي خطأ في التحميل والتنزيل.' }
        ]
    },
    {
        dir: 'jeddah-to-taif', origin: 'جدة', destination: 'الطائف',
        distance: 'حوالي 170 كم', duration: 'ساعتان إلى 2.5 ساعة',
        roads: 'طريق مكة - جدة ثم طريق السيل الكبير أو طريق الهدا',
        content: 'المرتفعات الجبلية نحو الطائف تستدعي الانتباه الشديد أثناء القيادة. سياراتنا مجهزة بمكابح قوية وعمالتنا خبيرة في رص العفش ليتحمل الصعود والهبوط.',
        faq: [
            { q: 'أيهما أفضل للنقل للطائف، طريق السيل أم الهدا؟', a: 'عادة ما نستخدم طريق السيل الكبير لشاحنات النقل كونه أكثر أماناً واتساعاً للمركبات الثقيلة.' },
            { q: 'هل تكلفة النقل للطائف مرتفعة؟', a: 'لا، تعتبر الأسعار مناسبة لقرب المسافة مقارنة بالمدن الأخرى.' },
            { q: 'كم من الوقت نحتاج لإتمام النقل للطائف؟', a: 'يتم الانتهاء من الفك والتحميل والنقل والتركيب في نفس اليوم.' }
        ]
    },
    {
        dir: 'riyadh-to-jeddah', origin: 'الرياض', destination: 'جدة',
        distance: 'حوالي 950 كم', duration: '9 - 10 ساعات',
        roads: 'طريق الرياض - مكة السريع (المسار 40)',
        content: 'كجزء من شبكة خدماتنا، نقدم خدمة نقل العفش العكسية من العاصمة الرياض إلى جدة بنفس معايير الجودة والاحترافية.',
        faq: [
            { q: 'هل توفرون سيارات من الرياض لجدة؟', a: 'نعم، أسطولنا يخدم الاتجاهين ونقوم بترتيب النقل من الرياض إلى جدة باحترافية تامة.' },
            { q: 'كيف يتم التنسيق لعملية النقل في الرياض؟', a: 'يتم إرسال مندوبنا لمعاينة العفش في الرياض، ثم تصل الدينا في الوقت المحدد للفك والتحميل.' },
            { q: 'ما هو الوقت المتوقع لوصول العفش لجدة؟', a: 'يستغرق السفر حوالي 9 إلى 10 ساعات، ويتم التنزيل والتركيب مباشرة عند الوصول.' }
        ]
    }
];

const areasDir = path.join(__dirname, 'areas');
let stats = {
    updated: [],
    failed: []
};

routes.forEach(route => {
    const indexPath = path.join(areasDir, route.dir, 'index.html');
    if (!fs.existsSync(indexPath)) {
        stats.failed.push(route.dir);
        return;
    }

    let html = fs.readFileSync(indexPath, 'utf-8');
    const $ = cheerio.load(html, { decodeEntities: false });
    const $article = $('.article-content');
    if ($article.length === 0) return;

    // Remove existing day 4 sections if re-running
    $('#intercity-info-box, #intercity-map, #intercity-trust, #intercity-faq').remove();
    $('.intercity-section').remove();

    // 1. Logistics Info Box
    const infoBoxHtml = `
    <div id="intercity-info-box" class="intercity-section my-8 p-6 bg-gradient-to-l from-blue-50 to-white border border-blue-200 rounded-xl shadow-sm">
        <h2 class="text-2xl font-bold text-blue-900 mb-6 border-r-4 border-primary pr-3 flex items-center">
            <i class="fas fa-truck-loading ml-2 text-primary"></i> معلومات رحلة النقل: ${route.origin} إلى ${route.destination}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <div class="flex items-start">
                <i class="fas fa-map-marker-alt text-green-600 mt-1 ml-2"></i>
                <div>
                    <strong class="block text-gray-900">نقطة الانطلاق:</strong>
                    <span>${route.origin}</span>
                </div>
            </div>
            <div class="flex items-start">
                <i class="fas fa-flag-checkered text-green-600 mt-1 ml-2"></i>
                <div>
                    <strong class="block text-gray-900">الوجهة:</strong>
                    <span>${route.destination}</span>
                </div>
            </div>
            <div class="flex items-start">
                <i class="fas fa-road text-green-600 mt-1 ml-2"></i>
                <div>
                    <strong class="block text-gray-900">المسافة التقريبية:</strong>
                    <span>${route.distance}</span>
                </div>
            </div>
            <div class="flex items-start">
                <i class="fas fa-clock text-green-600 mt-1 ml-2"></i>
                <div>
                    <strong class="block text-gray-900">مدة الرحلة المتوقعة:</strong>
                    <span>${route.duration}</span>
                    <p class="text-xs text-gray-500 mt-1">* المدة قد تختلف حسب حركة المرور والتوقفات وظروف الطريق.</p>
                </div>
            </div>
            <div class="flex items-start md:col-span-2">
                <i class="fas fa-route text-green-600 mt-1 ml-2"></i>
                <div>
                    <strong class="block text-gray-900">الطرق الرئيسية المستخدمة:</strong>
                    <span>${route.roads}</span>
                </div>
            </div>
        </div>
    </div>
    `;

    // 2. Local Logistics Content & Trust
    const logisticsContentHtml = `
    <div class="intercity-section my-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
        <h2 class="text-2xl font-bold text-blue-900 mb-4 border-r-4 border-primary pr-3">تفاصيل وتجهيزات مسار ${route.origin} - ${route.destination}</h2>
        <p class="mb-4 text-gray-700 leading-relaxed">${route.content}</p>
        <p class="mb-4 text-gray-700 leading-relaxed">
            اختيار المركبة المناسبة وتثبيت المنقولات بشكل صحيح هما سر نجاح النقل بين المدن. نضمن توفير سيارات دينا أو شاحنات مغلقة تناسب حجم عفشك لحمايته من العوامل الجوية على الطرق السريعة.
        </p>
    </div>
    <div id="intercity-trust" class="intercity-section my-8 p-6 bg-green-50 border border-green-200 rounded-xl shadow-sm text-center">
        <i class="fas fa-shield-alt text-4xl text-green-600 mb-3"></i>
        <h2 class="text-xl font-bold text-green-900 mb-3">ضمان وحماية المنقولات</h2>
        <p class="text-gray-700 leading-relaxed">
            نحن في <strong>شركة القصر السعودي</strong> نلتزم بأعلى معايير الحماية. نقوم بتغليف العفش بأفضل المواد وتثبيته بعناية داخل الشاحنة لتقليل مخاطر التلف والاهتزاز أثناء الرحلة الطويلة. نحن مسؤولون عن تسليم أثاثك سليماً كما استلمناه.
        </p>
    </div>
    `;

    // 3. Route Map
    // We use standard Google Maps directions from origin to destination
    const mapHtml = `
    <div id="intercity-map" class="intercity-section my-8">
        <h2 class="text-2xl font-bold text-blue-900 mb-4 border-r-4 border-primary pr-3">مسار النقل البري من ${route.origin} إلى ${route.destination}</h2>
        <div class="w-full h-80 rounded-xl overflow-hidden shadow-md border border-gray-200">
            <iframe 
                title="مسار النقل البري من ${route.origin} إلى ${route.destination}"
                src="https://www.google.com/maps?saddr=${encodeURIComponent(route.origin + ' السعودية')}&daddr=${encodeURIComponent(route.destination + ' السعودية')}&output=embed" 
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

    // 4. FAQ specific to route
    let faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": route.faq.map(item => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.a
            }
        }))
    };

    let faqHtml = `
    <div id="intercity-faq" class="intercity-section my-8">
        <h2 class="text-2xl font-bold text-blue-900 mb-6 border-r-4 border-primary pr-3">أسئلة شائعة حول مسار ${route.origin} - ${route.destination}</h2>
        <div class="space-y-4">
    `;
    
    route.faq.forEach((item, idx) => {
        faqHtml += `
            <div class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <button class="w-full text-right p-4 font-bold text-gray-800 bg-gray-50 hover:bg-gray-100 flex justify-between items-center transition-colors focus:outline-none focus:ring-2 focus:ring-primary" onclick="this.nextElementSibling.classList.toggle('hidden'); this.querySelector('.fa-chevron-down').classList.toggle('rotate-180')">
                    <span>${item.q}</span>
                    <i class="fas fa-chevron-down text-gray-500 transition-transform duration-300"></i>
                </button>
                <div class="p-4 text-gray-700 bg-white leading-relaxed hidden">
                    ${item.a}
                </div>
            </div>
        `;
    });
    
    faqHtml += `
        </div>
        <script type="application/ld+json">
        ${JSON.stringify(faqSchema)}
        </script>
    </div>
    `;

    // Insert sections
    // Put Info Box right after intro
    const introP = $article.find('p').first();
    introP.after(infoBoxHtml);
    
    // Put map and content before the first existing H2
    const firstH2 = $article.find('h2').first();
    if (firstH2.length) {
        firstH2.before(logisticsContentHtml + mapHtml);
    } else {
        $article.append(logisticsContentHtml + mapHtml);
    }

    // Replace old FAQ if it exists, otherwise append
    const existingFaq = $article.find('h2:contains("أسئلة"), h2:contains("الاسئلة")').parent();
    if (existingFaq.length && existingFaq.hasClass('faq-section')) {
        existingFaq.replaceWith(faqHtml);
    } else {
        $article.append(faqHtml);
    }

    // Clean up old FAQ schemas if any
    let cleanHtml = $.html();
    
    // Write back
    fs.writeFileSync(indexPath, cleanHtml, 'utf-8');
    
    stats.updated.push({
        route: `${route.origin} -> ${route.destination}`,
        distance: route.distance,
        time: route.duration,
        mapAdded: true,
        faqQuestions: route.faq.length,
        schemaUpdated: true
    });
});

console.log(JSON.stringify(stats, null, 2));
