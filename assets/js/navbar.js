/**
 * Al-Qasr Saudi Furniture Moving - Responsive Navbar & Dropdown Controller
 * متجاوب مع جميع الشاشات (الهواتف، الأجهزة اللوحية، والشاشات الكبيرة)
 */

(function () {
    'use strict';

    // 1. ضمان وجود التنسيقات المتجاوبة في أي صفحة مهما كانت بيئة التشغيل أو التخزين المؤقت
    function injectResponsiveNavbarCSS() {
        if (document.getElementById('navbar-core-styles')) return;

        const style = document.createElement('style');
        style.id = 'navbar-core-styles';
        style.textContent = `
            /* ===== الشاشات الكبيرة (Desktop >= 1024px) ===== */
            @media (min-width: 1024px) {
                .site-header nav,
                .site-header nav.hidden,
                .site-header .hidden.lg\\:block {
                    display: block !important;
                }
                .site-header #mobile-menu-btn,
                .site-header .lg\\:hidden {
                    display: none !important;
                }
                .site-header #mobile-menu {
                    display: none !important;
                }
                .site-header .hidden.sm\\:inline-flex {
                    display: inline-flex !important;
                }
            }

            /* ===== الشاشات الصغيرة والمتوسطة (Mobile & Tablet < 1024px) ===== */
            @media (max-width: 1023.98px) {
                .site-header nav.hidden,
                .site-header nav {
                    display: none !important;
                }
                .site-header #mobile-menu-btn,
                .site-header .lg\\:hidden {
                    display: inline-flex !important;
                }
                .site-header #mobile-menu:not(.hidden) {
                    display: block !important;
                    animation: navbarSlideDown 0.25s ease-out forwards;
                }
            }

            /* انيميشن فتح القائمة للموبايل */
            @keyframes navbarSlideDown {
                from {
                    opacity: 0;
                    transform: translateY(-8px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            /* تحسين مظهر القائمة المنسدلة للخدمات */
            .site-header .group:hover > div,
            .site-header .group:focus-within > div,
            .site-header .group.is-open > div {
                opacity: 1 !important;
                visibility: visible !important;
                transform: translateY(0) !important;
                pointer-events: auto !important;
            }

            /* زر القائمة */
            #mobile-menu-btn {
                cursor: pointer;
                transition: background-color 0.2s, transform 0.2s;
            }
            #mobile-menu-btn:active {
                transform: scale(0.95);
            }
        `;
        document.head.appendChild(style);
    }

    // تشغيل حقن التنسيقات فوراً
    if (document.head) {
        injectResponsiveNavbarCSS();
    } else {
        document.addEventListener('DOMContentLoaded', injectResponsiveNavbarCSS);
    }

    // 2. التحكم في تفاعلات النافبار (فتح وإغلاق القائمة والخدمات)
    function initNavbar() {
        injectResponsiveNavbarCSS();

        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const servicesBtn = document.getElementById('mobile-services-btn');
        const servicesList = document.getElementById('mobile-services-list');
        const header = document.querySelector('.site-header') || document.querySelector('header');

        // قائمة الموبايل الرئيسية
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                const isCurrentlyHidden = mobileMenu.classList.contains('hidden');
                
                if (isCurrentlyHidden) {
                    mobileMenu.classList.remove('hidden');
                    mobileMenuBtn.setAttribute('aria-expanded', 'true');
                    // تغيير الأيقونة إلى علامة إغلاق (X)
                    const icon = mobileMenuBtn.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-bars');
                        icon.classList.add('fa-times');
                    }
                } else {
                    mobileMenu.classList.add('hidden');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    // إرجاع الأيقونة إلى همبرغر
                    const icon = mobileMenuBtn.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            });

            // إغلاق القائمة عند الضغط على أي رابط داخلها (باستثناء أزرار القوائم الفرعية)
            const mobileLinks = mobileMenu.querySelectorAll('a');
            mobileLinks.forEach(link => {
                link.addEventListener('click', function () {
                    mobileMenu.classList.add('hidden');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    const icon = mobileMenuBtn.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                });
            });
        }

        // قائمة الخدمات الفرعية للموبايل
        if (servicesBtn && servicesList) {
            servicesBtn.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                const isHidden = servicesList.classList.contains('hidden');
                servicesList.classList.toggle('hidden');
                
                const chevron = servicesBtn.querySelector('.fa-chevron-down');
                if (chevron) {
                    chevron.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
                }
            });
        }

        // دعم النقر على "خدماتنا" للشاشات التي تعمل باللمس (Tablets / Laptops touch)
        const desktopDropdownGroup = document.querySelector('.site-header .group, header .group');
        if (desktopDropdownGroup) {
            const groupBtn = desktopDropdownGroup.querySelector('button');
            if (groupBtn) {
                groupBtn.addEventListener('click', function (e) {
                    // إذا كان الشاشة كبيرة، نتحكم بحالة الفتح عند النقر
                    if (window.innerWidth >= 1024) {
                        e.stopPropagation();
                        desktopDropdownGroup.classList.toggle('is-open');
                    }
                });
            }
        }

        // إغلاق أي قائمة مفتوحة عند النقر خارج الـ header
        document.addEventListener('click', function (e) {
            if (header && !header.contains(e.target)) {
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    if (mobileMenuBtn) {
                        mobileMenuBtn.setAttribute('aria-expanded', 'false');
                        const icon = mobileMenuBtn.querySelector('i');
                        if (icon) {
                            icon.classList.remove('fa-times');
                            icon.classList.add('fa-bars');
                        }
                    }
                }
                if (desktopDropdownGroup) {
                    desktopDropdownGroup.classList.remove('is-open');
                }
            }
        });

        // إغلاق القائمة عند الضغط على زر Escape
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    if (mobileMenuBtn) {
                        mobileMenuBtn.setAttribute('aria-expanded', 'false');
                        const icon = mobileMenuBtn.querySelector('i');
                        if (icon) {
                            icon.classList.remove('fa-times');
                            icon.classList.add('fa-bars');
                        }
                    }
                }
                if (desktopDropdownGroup) {
                    desktopDropdownGroup.classList.remove('is-open');
                }
            }
        });

        // عند تغيير حجم الشاشة وتجاوز 1024px، نعيد تهيئة حالة قائمة الموبايل
        window.addEventListener('resize', function () {
            if (window.innerWidth >= 1024) {
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    if (mobileMenuBtn) {
                        mobileMenuBtn.setAttribute('aria-expanded', 'false');
                        const icon = mobileMenuBtn.querySelector('i');
                        if (icon) {
                            icon.classList.remove('fa-times');
                            icon.classList.add('fa-bars');
                        }
                    }
                }
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavbar);
    } else {
        initNavbar();
    }
})();
