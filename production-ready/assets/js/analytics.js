/**
 * analytics.js - تتبع Google Analytics 4 والأحداث التفاعلية
 * شركة القصر السعودي لنقل العفش بجدة
 */
(function() {
    'use strict';

    // 1. ثابت معرف القياس (GA4_ID)
    // استبدل القيمة أدناه بمعرف GA4 الحقيقي (مثال: 'G-XXXXXXXXXX') عند توفره
    const GA4_ID = '[[GA4_ID]]';

    // 2. التحقق من صحة المعرف: لا يتم تحميل سكربت gtag إلا إذا كان معرفاً صالحاً يبدأ بـ G-
    if (!GA4_ID || GA4_ID.startsWith('[[') || !GA4_ID.startsWith('G-')) {
        // المعرف placeholder أو غير متوفر حالياً؛ عدم تحميل gtag لحماية الأداء ومنع أخطاء الشبكة
        return;
    }

    // 3. تحميل gtag.js بشكل غير متزامن
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA4_ID);
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', GA4_ID, { send_page_view: true });

    // 4. تتبع أحداث النقر المخصصة (Call & WhatsApp)
    function getLinkLocation(el) {
        if (el.closest('header, .site-header, nav')) return 'header';
        if (el.closest('.floating-buttons, .floating-call, .floating-whatsapp')) return 'floating';
        if (el.closest('#hero, .hero')) return 'hero';
        if (el.closest('#pricing, .pricing-table')) return 'pricing';
        if (el.closest('footer, #contact')) return 'footer';
        if (window.location.pathname.includes('/contact/')) return 'contact_page';
        return 'body';
    }

    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (!link) return;

        const href = link.getAttribute('href') || '';

        // تتبع النقر على أرقام الهاتف
        if (href.startsWith('tel:')) {
            gtag('event', 'click_call', {
                event_category: 'engagement',
                link_location: getLinkLocation(link),
                phone_number: '+966540026747'
            });
        }

        // تتبع النقر على روابط واتساب
        if (href.includes('wa.me') || href.includes('whatsapp.com')) {
            gtag('event', 'click_whatsapp', {
                event_category: 'engagement',
                link_location: getLinkLocation(link),
                phone_number: '+966540026747'
            });
        }
    });
})();

