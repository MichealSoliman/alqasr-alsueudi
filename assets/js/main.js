// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when clicking a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Add lazy loading to images without loading attribute
    document.querySelectorAll('img:not([loading])').forEach(img => {
        img.setAttribute('loading', 'lazy');
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, observerOptions);

    // Observe all sections with animation class
    document.querySelectorAll('.section-animate').forEach(section => {
        observer.observe(section);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Services carousel functionality
document.addEventListener('DOMContentLoaded', function () {
    const allServices = [
        {
            imgSrc: "./assets/img/furniture-moving-jeddah.webp",
            imgAlt: "خدمة نقل عفش بجدة - سيارات نقل مجهزة",
            badge: '<span class="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold"><i class="fas fa-star mr-1"></i> الأكثر طلباً</span>',
            icon: "fas fa-truck",
            title: "نقل عفش بجدة",
            description: "خدمات نقل عفش داخل جدة بسيارات مجهزة وعمالة مدربة. نضمن وصول عفشك بسلامة وأمان مع أفضل شركة نقل عفش بجدة.",
            phone: "0540026747",
            link: "/furniture-moving-jeddah/",
            linkText: "تفاصيل خدمة نقل عفش جدة"
        },
        { imgSrc: "./assets/img/dismantling-and-installing-furniture.webp", imgAlt: "خدمة فك وتركيب الأثاث - فريق محترف", badge: null, icon: "fas fa-tools", title: "فك وتركيب العفش بجدة", description: "خدمات فك وتركيب اثاث بجدة باحترافية عالية. فريق مدرب على فك وتركيب جميع أنواع الأثاث المنزلي والمكتبي.", phone: "0540026747", link: "/furniture-dismantling-and-assembly-in-jeddah/", linkText: "قراءة المزيد" },
        { imgSrc: "./assets/img/furniture-packaging.webp", imgAlt: "خدمة تغليف الأثاث - مواد تغليف عالية الجودة", badge: null, icon: "fas fa-boxes", title: "تغليف العفش بجدة", description: "خدمات تغليف اثاث بجدة بمواد عالية الجودة تضمن حماية عفشك من الخدوش والتلف أثناء عملية النقل.", phone: "0540026747", link: "/furniture-packing-in-jeddah/", linkText: "قراءة المزيد" },
        { imgSrc: "./assets/img/furniture-moving-between-cities.webp", imgAlt: "خدمة نقل عفش بين المدن - شاحنات نقل كبيرة", badge: '<span class="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold"><i class="fas fa-road mr-1"></i> بين المدن</span>', icon: "fas fa-city", title: "نقل عفش بين المدن", description: "خدمات نقل عفش من جدة إلى الرياض والدمام وجميع مدن المملكة. نقدم خدمة نقل عفش بين المدن بأسعار تنافسية.", phone: "0540026747", link: "/furniture-moving-between-jeddah-cities/", linkText: "قراءة المزيد" },
        { imgSrc: "./assets/img/moving-villas-apartments-offices.webp", imgAlt: "خدمة نقل فلل وشقق ومكاتب - نقل عفش مؤسسي", badge: null, icon: "fas fa-building", title: "نقل فلل وشقق ومكاتب بجدة", description: "تخصصنا في نقل عفش الفلل والشقق والمكاتب والشركات مع فريق عمل محترف وخطط نقل مدروسة.", phone: "0540026747", link: "/moving-villas-apartments-offices/", linkText: "قراءة المزيد" },
        { imgSrc: "./assets/img/furniture-storage.webp", imgAlt: "خدمة تخزين العفش - مستودعات آمنة ومجهزة", badge: null, icon: "fas fa-warehouse", title: "تخزين العفش بجدة", description: "خدمات تخزين عفش بجدة في مستودعات آمنة ومجهزة بمواصفات عالية للحفاظ على عفشك.", phone: "0540026747", link: "/furniture-storage-in-jeddah/", linkText: "قراءة المزيد" },
        { imgSrc: "./assets/img/furniture-moving-company-in-jeddah-and-riyadh.webp", imgAlt: "نقل عفش بين جدة والرياض - خدمة نقل آمنة وسريعة", badge: null, icon: "fas fa-truck-moving", title: "نقل عفش بين جدة والرياض", description: "نقدم خدمة نقل عفش بين جدة والرياض باحترافية عالية تشمل فك وتركيب وتغليف كامل باستخدام مواد آمنة.", phone: "0540026747", link: "/furniture-moving-company-in-jeddah-and-riyadh/", linkText: "قراءة المزيد" },
        { imgSrc: "./assets/img/furniture-moving-jeddah.webp", imgAlt: "شركة نقل عفش جدة - أفضل خدمات نقل الأثاث والتغليف", badge: null, icon: "fas fa-building", title: "شركة نقل عفش جدة", description: "نقدم خدمات نقل العفش في جدة بأعلى معايير الجودة والأمان، مع فريق متخصص في فك وتركيب الأثاث.", phone: "0540026747", link: "/furniture-moving-jeddah/", linkText: "قراءة المزيد" },
        { imgSrc: "./assets/img/best-furniture-moving-company-in-jeddah.webp", imgAlt: "أفضل شركة نقل عفش في جدة بخدمات احترافية", badge: null, icon: "fas fa-award", title: "أفضل شركة نقل عفش في جدة", description: "نوفر لك خدمات متكاملة تشمل فك وتركيب الأثاث، والتغليف الاحترافي باستخدام أجود مواد الحماية.", phone: "0540026747", link: "/best-furniture-moving-company-in-jeddah/", linkText: "قراءة المزيد" },
        { imgSrc: "./assets/img/moving-offices-in-jeddah.webp", imgAlt: "نقل مكاتب جدة باحترافية", badge: null, icon: "fas fa-building", title: "نقل المكاتب في جدة", description: "خدمات نقل المكاتب في جدة باحترافية عالية تشمل فك وتركيب الأثاث المكتبي والمعدات الإدارية.", phone: "0540026747", link: "/moving-offices-in-jeddah/", linkText: "قراءة المزيد" },
        { imgSrc: "./assets/img/villa-moving-jeddah.webp", imgAlt: "نقل عفش وأثاث الفلل في جدة", badge: null, icon: "fas fa-home", title: "نقل عفش وأثاث الفلل بجدة", description: "خدمات متخصصة في نقل عفش وأثاث الفلل بجدة بأعلى مستويات الاحترافية والأمان.", phone: "0540026747", link: "/villa-moving-jeddah/", linkText: "قراءة المزيد" },
        { imgSrc: "./assets/img/moving-electrical-appliances-in-jeddah.webp", imgAlt: "نقل الأجهزة الكهربائية بجدة", badge: null, icon: "fas fa-tv", title: "نقل الأجهزة الكهربائية بجدة", description: "خدمات متخصصة في نقل الأجهزة الكهربائية بجدة بأعلى معايير الأمان والجودة.", phone: "0540026747", link: "/moving-electrical-appliances-in-jeddah/", linkText: "قراءة المزيد" },
        { imgSrc: "./assets/img/north-jeddah-furniture-moving.webp", imgAlt: "نقل عفش شمال جدة", badge: null, icon: "fas fa-map-marked-alt", title: "نقل عفش شمال جدة", description: "خدمات نقل عفش شمال جدة باحترافية عالية تشمل جميع مراحل النقل.", phone: "0540026747", link: "/north-jeddah-furniture-moving/", linkText: "قراءة المزيد" },
        { imgSrc: "./assets/img/villa-moving-jeddah.webp", imgAlt: "نقل الفلل بجدة", badge: null, icon: "fas fa-home", title: "نقل الفلل بجدة", description: "خدمات نقل الفلل بجدة بأعلى مستويات الاحترافية مع أحدث معدات الرفع.", phone: "0540026747", link: "/villa-moving-jeddah/", linkText: "قراءة المزيد" },
        { imgSrc: "./assets/img/furniture-moving-jeddah.webp", imgAlt: "نقل عفش جدة", badge: null, icon: "fas fa-truck-moving", title: "نقل عفش جدة", description: "خدمات نقل عفش جدة باحترافية عالية تضمن الحفاظ على جميع قطع الأثاث.", phone: "0540026747", link: "/furniture-moving-jeddah/", linkText: "قراءة المزيد" },
        { imgSrc: "./assets/img/disassembly-and-assembly-of-bedrooms.webp", imgAlt: "فك وتركيب غرف النوم بجدة", badge: null, icon: "fas fa-bed", title: "فك وتركيب غرف النوم بجدة", description: "خدمات فك وتركيب غرف النوم بجدة باحترافية عالية من خلال فريق فني متخصص.", phone: "0540026747", link: "/disassembly-and-assembly-of-bedrooms/", linkText: "قراءة المزيد" }
    ];

    let currentIndex = 0;
    const servicesPerClick = 3;
    const servicesGrid = document.getElementById('services-grid');
    const readMoreBtn = document.getElementById('readMoreBtn');
    const btnContainer = document.getElementById('btnContainer');

    if (!servicesGrid) return;

    function createServiceCard(service) {
        return `
            <div class="service-card bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div class="relative overflow-hidden h-56">
                    <div class="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent"></div>
                    <div class="absolute top-4 right-4">
                        ${service.badge ? service.badge : ''}
                    </div>
                </div>
                <div class="p-6">
                    <div class="flex items-center mb-4">
                        <div class="bg-blue-100 p-3 rounded-lg ml-4">
                            <i class="${service.icon} text-2xl text-blue-900"></i>
                        </div>
                        <h3 class="text-xl font-bold text-blue-900">${service.title}</h3>
                    </div>
                    <p class="text-gray-600 mb-6 leading-relaxed">
                        ${service.description}
                    </p>
                    <div class="grid grid-cols-2 gap-3">
                        <a href="tel:${service.phone}" aria-label="الاتصال بشركة القصر السعودي"
                            class="bg-blue-900 text-white py-3 rounded-lg text-center font-semibold hover:bg-blue-800 transition-colors duration-300 flex items-center justify-center">
                            <i class="fas fa-phone-alt ml-2"></i> اتصل الآن
                        </a>
                        <a href="${service.link}"
                            class="bg-gray-200 text-black py-3 rounded-lg border text-center font-semibold hover:bg-gray-300 transition-all duration-300 flex items-center justify-center">
                            ${service.linkText}
                            <i class="fas fa-arrow-left mr-2"></i>
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    function loadInitialServices() {
        const initialServices = allServices.slice(0, 6);
        currentIndex = 6;
        
        initialServices.forEach(service => {
            servicesGrid.innerHTML += createServiceCard(service);
        });
        
        if (currentIndex >= allServices.length) {
            btnContainer.style.display = 'none';
        }
    }

    function loadMoreServices() {
        const remainingServices = allServices.slice(currentIndex, currentIndex + servicesPerClick);
        
        if (remainingServices.length === 0) {
            btnContainer.style.display = 'none';
            return;
        }
        
        remainingServices.forEach(service => {
            servicesGrid.innerHTML += createServiceCard(service);
        });
        
        currentIndex += remainingServices.length;
        
        if (currentIndex >= allServices.length) {
            btnContainer.style.display = 'none';
        }
        
        setTimeout(() => {
            const newCards = document.querySelectorAll('.service-card');
            const lastCard = newCards[newCards.length - 1];
            if (lastCard) {
                lastCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }, 100);
    }

    if (readMoreBtn) {
        readMoreBtn.addEventListener('click', loadMoreServices);
    }
    
    loadInitialServices();
});


