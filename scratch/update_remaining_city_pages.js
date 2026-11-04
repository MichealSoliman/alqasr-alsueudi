const fs = require('fs');
const path = require('path');

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
                </nav>`;
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

    return `                    <!-- ==============================================
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
                    </section>`;
}

const reviewCardCss = `        .review-card {
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
        }`;

console.log('Template generator ready.');

