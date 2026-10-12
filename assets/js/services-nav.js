/**
 * Services Navigation Dropdown
 * ملف مركزي لإدارة قائمة الخدمات في الـ navbar
 * لإضافة خدمة جديدة، أضفها فقط في مصفوفة servicesLinks أدناه
 */

const servicesLinks = [
    {
        title: "شركة نقل عفش جدة (الرئيسية)",
        url: "/",
        icon: "fas fa-truck"
    },
    {
        title: "عن شركة القصر السعودي بجدة",
        url: "/about/",
        icon: "fas fa-award"
    },
    {
        title: "فك وتركيب العفش بجدة",
        url: "/furniture-dismantling-and-assembly-in-jeddah/",
        icon: "fas fa-tools"
    },
    {
        title: "تغليف العفش بجدة",
        url: "/furniture-packing-in-jeddah/",
        icon: "fas fa-box"
    },
    {
        title: "نقل الفلل بجدة",
        url: "/villa-moving-jeddah/",
        icon: "fas fa-home"
    },
    {
        title: "تخزين العفش بجدة",
        url: "/furniture-storage-in-jeddah/",
        icon: "fas fa-warehouse"
    },
    {
        title: "نقل المكاتب في جدة",
        url: "/moving-offices-in-jeddah/",
        icon: "fas fa-briefcase"
    },
    {
        title: "نقل فلل وشقق ومكاتب بجدة",
        url: "/moving-villas-apartments-offices/",
        icon: "fas fa-building"
    },
    {
        title: "نقل الأجهزة الكهربائية بجدة",
        url: "/moving-electrical-appliances-in-jeddah/",
        icon: "fas fa-tv"
    },
    {
        title: "نقل عفش شمال جدة",
        url: "/north-jeddah-furniture-moving/",
        icon: "fas fa-map-marker-alt"
    },
    {
        title: "فك وتركيب غرف النوم بجدة",
        url: "/disassembly-and-assembly-of-bedrooms/",
        icon: "fas fa-bed"
    },
    {
        title: "أسعار نقل العفش في جدة",
        url: "/furniture-moving-prices-in-jeddah/",
        icon: "fas fa-tags"
    },
    {
        title: "نقل عفش بين المدن",
        url: "/furniture-moving-between-jeddah-cities/",
        icon: "fas fa-city"
    },
    {
        title: "نقل عفش بين جدة والرياض",
        url: "/areas/jeddah-to-riyadh/",
        icon: "fas fa-truck-moving"
    },
    {
        title: "ونش رفع عفش بجدة",
        url: "/hydraulic-winch-moving/",
        icon: "fas fa-cogs"
    },
    {
        title: "دينا نقل عفش جدة",
        url: "/dyna-furniture-moving-jeddah/",
        icon: "fas fa-shuttle-van"
    },
    {
        title: "نقل العفش داخل جدة",
        url: "/moving-furniture-inside-jeddah/",
        icon: "fas fa-th-large"
    },

];


(function () {
    'use strict';

    /**
     * بناء HTML الـ dropdown للديسك توب
     */
    function buildDesktopDropdown() {
        const itemsHTML = servicesLinks.map(service => `
            <li>
                <a href="${service.url}" class="services-dropdown-link">
                    <i class="${service.icon} services-dropdown-icon"></i>
                    <span>${service.title}</span>
                </a>
            </li>
        `).join('');

        return `
            <li class="services-nav-item" id="services-desktop-item">
                <button class="services-nav-btn" aria-haspopup="true" aria-expanded="false" id="services-desktop-btn">
                    <span>الخدمات</span>
                    <i class="fas fa-chevron-down services-chevron" id="services-desktop-chevron"></i>
                </button>
                <div class="services-dropdown" id="services-desktop-dropdown" role="menu">
                    <ul class="services-dropdown-list">
                        ${itemsHTML}
                    </ul>
                </div>
            </li>
        `;
    }

    /**
     * بناء HTML الـ dropdown للموبايل
     */
    function buildMobileDropdown() {
        const itemsHTML = servicesLinks.map(service => `
            <li>
                <a href="${service.url}" class="mobile-services-link">
                    <i class="${service.icon}"></i>
                    <span>${service.title}</span>
                </a>
            </li>
        `).join('');

        return `
            <li class="mobile-services-nav-item" id="services-mobile-item">
                <button class="mobile-services-btn" id="services-mobile-btn" aria-expanded="false">
                    <span class="flex items-center gap-2">
                        <i class="fas fa-concierge-bell"></i>
                        <span>الخدمات</span>
                    </span>
                    <i class="fas fa-chevron-down mobile-services-chevron" id="services-mobile-chevron"></i>
                </button>
                <ul class="mobile-services-dropdown" id="services-mobile-dropdown">
                    ${itemsHTML}
                </ul>
            </li>
        `;
    }

    /**
     * إيجاد الـ desktop nav ul داخل header
     */
    function findDesktopNavUl() {
        // البحث في header عن nav ul
        const header = document.querySelector('header');
        if (!header) return null;

        // طريقة 1: nav داخل hidden md:block
        const navEl = header.querySelector('nav');
        if (navEl) {
            const ul = navEl.querySelector('ul');
            if (ul) return ul;
        }

        // طريقة 2: أي ul داخل header
        const headerUls = header.querySelectorAll('ul');
        for (const ul of headerUls) {
            // تأكد أنه ul الـ nav الرئيسي (ليس mobile menu)
            if (!ul.closest('#mobile-menu')) {
                return ul;
            }
        }
        return null;
    }

    /**
     * إدراج الـ dropdown في الـ navbar
     */
    function injectServicesDropdown() {
        // ===== Desktop Nav =====
        const desktopNavUl = findDesktopNavUl();
        if (desktopNavUl) {
            // البحث عن لينك "خدماتنا" أو "الخدمات" الحالي وحذفه
            const existingLinks = desktopNavUl.querySelectorAll('li');
            existingLinks.forEach(li => {
                const link = li.querySelector('a');
                if (link) {
                    const text = link.textContent.trim();
                    if (text === 'خدماتنا' || text === 'الخدمات') {
                        li.remove();
                    }
                }
            });

            // البحث عن لينك "من نحن" أو "الرئيسية" للإدراج بعده
            const allItems = desktopNavUl.querySelectorAll('li');
            let insertAfterItem = null;
            allItems.forEach(item => {
                const link = item.querySelector('a');
                if (link) {
                    const text = link.textContent.trim();
                    if (text === 'من نحن' || text === 'الرئيسية') {
                        insertAfterItem = item;
                    }
                }
            });

            const dropdownHTML = buildDesktopDropdown();
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = dropdownHTML.trim();
            const newItem = tempDiv.firstElementChild;

            if (insertAfterItem) {
                insertAfterItem.insertAdjacentElement('afterend', newItem);
            } else {
                // إضافة في البداية
                const firstItem = desktopNavUl.querySelector('li');
                if (firstItem) {
                    firstItem.insertAdjacentElement('afterend', newItem);
                } else {
                    desktopNavUl.appendChild(newItem);
                }
            }
        }

        // ===== Mobile Nav =====
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) {
            const mobileList = mobileMenu.querySelector('ul');
            if (mobileList) {
                // حذف لينك "خدماتنا" أو "الخدمات" الحالي من الموبايل
                const existingMobileItems = mobileList.querySelectorAll('li');
                existingMobileItems.forEach(li => {
                    const link = li.querySelector('a');
                    if (link) {
                        const text = link.textContent.trim();
                        if (text === 'خدماتنا' || text === 'الخدمات') {
                            li.remove();
                        }
                    }
                });

                // إيجاد "من نحن" أو "الرئيسية" للإدراج بعدها
                const mobileItems = mobileList.querySelectorAll('li');
                let mobileInsertAfter = null;
                mobileItems.forEach(item => {
                    const link = item.querySelector('a');
                    if (link) {
                        const text = link.textContent.trim();
                        if (text.includes('من نحن') || text.includes('الرئيسية')) {
                            mobileInsertAfter = item;
                        }
                    }
                });

                const mobileDropdownHTML = buildMobileDropdown();
                if (mobileInsertAfter) {
                    mobileInsertAfter.insertAdjacentHTML('afterend', mobileDropdownHTML);
                } else {
                    const firstMobileItem = mobileList.querySelector('li');
                    if (firstMobileItem) {
                        firstMobileItem.insertAdjacentHTML('afterend', mobileDropdownHTML);
                    } else {
                        mobileList.insertAdjacentHTML('afterbegin', mobileDropdownHTML);
                    }
                }
            }
        }
    }

    /**
     * تفعيل منطق الـ dropdown (hover للديسك توب - كليك للموبايل)
     */
    function initDropdownEvents() {
        // ===== Desktop: Hover =====
        const desktopItem = document.getElementById('services-desktop-item');
        const desktopDropdown = document.getElementById('services-desktop-dropdown');
        const desktopChevron = document.getElementById('services-desktop-chevron');
        const desktopBtn = document.getElementById('services-desktop-btn');

        if (desktopItem && desktopDropdown) {
            let hideTimer;

            desktopItem.addEventListener('mouseenter', function () {
                clearTimeout(hideTimer);
                desktopDropdown.classList.add('services-dropdown-open');
                if (desktopChevron) desktopChevron.style.transform = 'rotate(180deg)';
                if (desktopBtn) desktopBtn.setAttribute('aria-expanded', 'true');
            });

            desktopItem.addEventListener('mouseleave', function () {
                hideTimer = setTimeout(() => {
                    desktopDropdown.classList.remove('services-dropdown-open');
                    if (desktopChevron) desktopChevron.style.transform = 'rotate(0deg)';
                    if (desktopBtn) desktopBtn.setAttribute('aria-expanded', 'false');
                }, 150);
            });

            // أيضاً كليك للمس (موبايل بشاشة كبيرة)
            desktopBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                const isOpen = desktopDropdown.classList.contains('services-dropdown-open');
                if (isOpen) {
                    desktopDropdown.classList.remove('services-dropdown-open');
                    if (desktopChevron) desktopChevron.style.transform = 'rotate(0deg)';
                    desktopBtn.setAttribute('aria-expanded', 'false');
                } else {
                    desktopDropdown.classList.add('services-dropdown-open');
                    if (desktopChevron) desktopChevron.style.transform = 'rotate(180deg)';
                    desktopBtn.setAttribute('aria-expanded', 'true');
                }
            });
        }

        // ===== Mobile: Click Toggle =====
        const mobileBtn = document.getElementById('services-mobile-btn');
        const mobileDropdownEl = document.getElementById('services-mobile-dropdown');
        const mobileCh = document.getElementById('services-mobile-chevron');

        if (mobileBtn && mobileDropdownEl) {
            mobileBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                const isOpen = mobileDropdownEl.classList.contains('mobile-services-dropdown-open');
                if (isOpen) {
                    mobileDropdownEl.classList.remove('mobile-services-dropdown-open');
                    if (mobileCh) mobileCh.style.transform = 'rotate(0deg)';
                    mobileBtn.setAttribute('aria-expanded', 'false');
                } else {
                    mobileDropdownEl.classList.add('mobile-services-dropdown-open');
                    if (mobileCh) mobileCh.style.transform = 'rotate(180deg)';
                    mobileBtn.setAttribute('aria-expanded', 'true');
                }
            });
        }

        // إغلاق الـ dropdown عند الكليك خارجه
        document.addEventListener('click', function (e) {
            if (desktopItem && !desktopItem.contains(e.target)) {
                if (desktopDropdown) desktopDropdown.classList.remove('services-dropdown-open');
                if (desktopChevron) desktopChevron.style.transform = 'rotate(0deg)';
                if (desktopBtn) desktopBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    /**
     * إضافة CSS الـ dropdown ديناميكياً
     */
    function injectStyles() {
        const style = document.createElement('style');
        style.id = 'services-nav-styles';
        style.textContent = `
            /* ===== Desktop Dropdown ===== */
            .services-nav-item {
                position: relative;
                list-style: none;
            }

            .services-nav-btn {
                display: flex;
                align-items: center;
                gap: 5px;
                background: none;
                border: none;
                cursor: pointer;
                font-weight: 600;
                font-size: inherit;
                font-family: inherit;
                color: inherit;
                padding: 0;
                transition: color 0.2s;
                white-space: nowrap;
            }

            .services-nav-btn:hover {
                color: #00843D;
            }

            .services-chevron {
                font-size: 0.75rem;
                transition: transform 0.25s ease;
            }

            .services-dropdown {
                position: absolute;
                top: calc(100% + 12px);
                right: 0;
                background: #fff;
                border-radius: 12px;
                box-shadow: 0 10px 40px rgba(0, 32, 91, 0.15);
                min-width: 260px;
                max-width: 300px;
                padding: 10px 0;
                opacity: 0;
                visibility: hidden;
                transform: translateY(-8px);
                transition: opacity 0.25s ease, transform 0.25s ease, visibility 0.25s;
                z-index: 9999;
                border: 1px solid rgba(0, 32, 91, 0.08);
                max-height: 80vh;
                overflow-y: auto;
                scrollbar-width: thin;
                scrollbar-color: #00205B transparent;
            }

            .services-dropdown::-webkit-scrollbar {
                width: 4px;
            }

            .services-dropdown::-webkit-scrollbar-thumb {
                background: #00205B;
                border-radius: 4px;
            }

            .services-dropdown.services-dropdown-open {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }

            .services-dropdown-list {
                list-style: none;
                padding: 0;
                margin: 0;
            }

            .services-dropdown-link {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 10px 18px;
                color: #1e293b;
                text-decoration: none;
                font-size: 0.9rem;
                font-weight: 500;
                transition: background 0.15s, color 0.15s, padding-right 0.15s;
                white-space: nowrap;
                border-radius: 0;
            }

            .services-dropdown-link:hover {
                background: linear-gradient(90deg, #f0fdf4, #e8f5e9);
                color: #00205B;
                padding-right: 24px;
            }

            .services-dropdown-icon {
                width: 20px;
                text-align: center;
                color: #00843D;
                font-size: 0.9rem;
                flex-shrink: 0;
            }

            /* ===== Mobile Dropdown ===== */
            .mobile-services-nav-item {
                list-style: none;
            }

            .mobile-services-btn {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                background: none;
                border: none;
                cursor: pointer;
                font-family: inherit;
                font-weight: 600;
                font-size: inherit;
                color: inherit;
                padding: 8px 0;
                text-align: right;
            }

            .mobile-services-btn:hover {
                color: #00843D;
            }

            .mobile-services-chevron {
                font-size: 0.75rem;
                transition: transform 0.25s ease;
            }

            .mobile-services-dropdown {
                list-style: none;
                padding: 0;
                margin: 0;
                max-height: 0;
                overflow: hidden;
                transition: max-height 0.35s ease;
            }

            .mobile-services-dropdown.mobile-services-dropdown-open {
                max-height: 600px;
            }

            .mobile-services-link {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 8px 16px;
                color: #374151;
                text-decoration: none;
                font-size: 0.88rem;
                font-weight: 500;
                border-right: 3px solid transparent;
                transition: all 0.15s;
                margin: 2px 0;
                border-radius: 6px;
            }

            .mobile-services-link:hover {
                background: #f0fdf4;
                color: #00205B;
                border-right-color: #00843D;
            }

            .mobile-services-link i {
                color: #00843D;
                width: 18px;
                text-align: center;
                flex-shrink: 0;
            }

            /* تمييز الصفحة الحالية */
            .services-dropdown-link.active-service,
            .mobile-services-link.active-service {
                background: linear-gradient(90deg, #f0fdf4, #e8f5e9);
                color: #00205B;
                font-weight: 700;
                border-right: 3px solid #00843D;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * تمييز الخدمة الحالية بناءً على الـ URL
     */
    function highlightCurrentService() {
        const currentPath = window.location.pathname;
        document.querySelectorAll('.services-dropdown-link, .mobile-services-link').forEach(link => {
            try {
                const linkPath = new URL(link.href, window.location.origin).pathname;
                if (linkPath !== '/' && currentPath.startsWith(linkPath)) {
                    link.classList.add('active-service');
                }
            } catch (e) {}
        });
    }

    // ===== تشغيل كل شيء عند تحميل الصفحة =====
    document.addEventListener('DOMContentLoaded', function () {
        injectStyles();
        injectServicesDropdown();
        initDropdownEvents();
        highlightCurrentService();
    });

})();
