const fs = require('fs');
const path = require('path');

const desktopMegaMenu = `                        <!-- Dropdown -->
                        <li class="relative group">
                            <button class="flex items-center gap-1 hover:text-green-700 transition-colors focus:outline-none" aria-haspopup="true" aria-expanded="false">
                                <span>خدماتنا</span>
                                <i class="fas fa-chevron-down text-xs transition-transform duration-200 group-hover:rotate-180"></i>
                            </button>
                            <!-- Mega Menu Dropdown -->
                            <div class="absolute top-full right-0 mt-2 w-[580px] bg-white border border-gray-100 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50 p-4">
                                <div class="px-2 pb-2.5 mb-2.5 border-b border-gray-100 flex items-center justify-between">
                                    <span class="text-xs font-black text-blue-900 flex items-center gap-1.5">
                                        <i class="fas fa-truck-moving text-green-600"></i> خدمات شركة القصر السعودي المتخصصة
                                    </span>
                                    <a href="/services/" class="text-xs text-green-700 hover:text-green-800 font-bold flex items-center gap-1 hover:underline">
                                        <span>عرض الدليل الشامل</span>
                                        <i class="fas fa-chevron-left text-[10px]"></i>
                                    </a>
                                </div>
                                <div class="grid grid-cols-2 gap-x-3 gap-y-1">
                                    <!-- العمود الأول: النقل والشاحنات -->
                                    <div class="space-y-1">
                                        <div class="px-2.5 py-1 text-[11px] font-bold text-gray-400">خدمات النقل والسيارات</div>
                                        <a href="/moving-furniture-inside-jeddah/" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm text-gray-700 hover:bg-green-50 hover:text-green-800 transition-colors"><i class="fas fa-truck-moving text-green-600 w-4 text-center"></i> نقل العفش داخل جدة</a>
                                        <a href="/dyna-furniture-moving-jeddah/" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm text-gray-700 hover:bg-green-50 hover:text-green-800 transition-colors"><i class="fas fa-truck text-green-600 w-4 text-center"></i> دينا نقل عفش جدة</a>
                                        <a href="/hydraulic-winch-moving/" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm text-gray-700 hover:bg-green-50 hover:text-green-800 transition-colors"><i class="fas fa-truck-pickup text-green-600 w-4 text-center"></i> ونش رفع عفش هيدروليكي</a>
                                        <a href="/moving-villas-apartments-offices/" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm text-gray-700 hover:bg-green-50 hover:text-green-800 transition-colors"><i class="fas fa-building text-green-600 w-4 text-center"></i> نقل شقق سكنية بجدة</a>
                                        <a href="/villa-moving-jeddah/" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm text-gray-700 hover:bg-green-50 hover:text-green-800 transition-colors"><i class="fas fa-home text-green-600 w-4 text-center"></i> نقل الفلل والقصور</a>
                                        <a href="/moving-offices-in-jeddah/" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm text-gray-700 hover:bg-green-50 hover:text-green-800 transition-colors"><i class="fas fa-briefcase text-green-600 w-4 text-center"></i> نقل المكاتب والشركات</a>
                                        <a href="/north-jeddah-furniture-moving/" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm text-gray-700 hover:bg-green-50 hover:text-green-800 transition-colors"><i class="fas fa-compass text-green-600 w-4 text-center"></i> نقل عفش شمال جدة</a>
                                        <a href="/furniture-moving-between-jeddah-cities/" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm text-gray-700 hover:bg-green-50 hover:text-green-800 transition-colors"><i class="fas fa-road text-green-600 w-4 text-center"></i> نقل عفش بين المدن</a>
                                    </div>
                                    <!-- العمود الثاني: الفك والتركيب والتغليف -->
                                    <div class="space-y-1">
                                        <div class="px-2.5 py-1 text-[11px] font-bold text-gray-400">الفك والتغليف والتخزين</div>
                                        <a href="/furniture-dismantling-and-assembly-in-jeddah/" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm text-gray-700 hover:bg-green-50 hover:text-green-800 transition-colors"><i class="fas fa-tools text-green-600 w-4 text-center"></i> فك وتركيب العفش</a>
                                        <a href="/disassembly-and-assembly-of-bedrooms/" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm text-gray-700 hover:bg-green-50 hover:text-green-800 transition-colors"><i class="fas fa-bed text-green-600 w-4 text-center"></i> فك وتركيب غرف النوم</a>
                                        <a href="/furniture-packing-in-jeddah/" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm text-gray-700 hover:bg-green-50 hover:text-green-800 transition-colors"><i class="fas fa-box text-green-600 w-4 text-center"></i> تغليف العفش الاحترافي</a>
                                        <a href="/furniture-storage-in-jeddah/" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm text-gray-700 hover:bg-green-50 hover:text-green-800 transition-colors"><i class="fas fa-warehouse text-green-600 w-4 text-center"></i> تخزين العفش بجدة</a>
                                        <a href="/moving-electrical-appliances-in-jeddah/" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm text-gray-700 hover:bg-green-50 hover:text-green-800 transition-colors"><i class="fas fa-plug text-green-600 w-4 text-center"></i> نقل الأجهزة والمكيفات</a>
                                        <a href="/furniture-moving-prices-in-jeddah/" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm text-gray-700 hover:bg-green-50 hover:text-green-800 transition-colors"><i class="fas fa-tags text-green-600 w-4 text-center"></i> أسعار نقل العفش 2026</a>
                                        <a href="/areas/" class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm text-gray-700 hover:bg-green-50 hover:text-green-800 transition-colors"><i class="fas fa-map-marker-alt text-green-600 w-4 text-center"></i> أحياء ومناطق جدة</a>
                                    </div>
                                </div>
                                <div class="mt-3 pt-2.5 border-t border-gray-100">
                                    <a href="/services/" class="flex items-center justify-between px-3 py-2 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 text-green-900 font-bold transition-colors">
                                        <span class="text-xs flex items-center gap-1.5"><i class="fas fa-star text-green-600"></i> دليل كافة خدمات نقل العفش ومواصفاتها</span>
                                        <span class="text-xs text-green-800 flex items-center gap-1">تصفح الخدمات <i class="fas fa-arrow-left text-[10px]"></i></span>
                                    </a>
                                </div>
                            </div>
                        </li>`;

const mobileServicesMenu = `                <!-- Mobile Dropdown -->
                <li>
                    <button id="mobile-services-btn" class="w-full flex items-center justify-between hover:text-green-700 hover:bg-green-50 p-3 rounded-lg transition-colors focus:outline-none">
                        <span>خدماتنا</span>
                        <i class="fas fa-chevron-down transition-transform duration-300"></i>
                    </button>
                    <ul id="mobile-services-list" class="hidden pl-2 pr-4 py-2 space-y-1 border-r-2 border-green-200 mr-2 mt-1 max-h-[50vh] overflow-y-auto text-sm">
                        <li><a href="/moving-furniture-inside-jeddah/" class="flex items-center gap-2 p-2 rounded hover:text-green-700"><i class="fas fa-truck-moving text-green-600 w-5 text-center"></i> نقل العفش داخل جدة</a></li>
                        <li><a href="/dyna-furniture-moving-jeddah/" class="flex items-center gap-2 p-2 rounded hover:text-green-700"><i class="fas fa-truck text-green-600 w-5 text-center"></i> دينا نقل عفش جدة</a></li>
                        <li><a href="/hydraulic-winch-moving/" class="flex items-center gap-2 p-2 rounded hover:text-green-700"><i class="fas fa-truck-pickup text-green-600 w-5 text-center"></i> ونش رفع عفش هيدروليكي</a></li>
                        <li><a href="/moving-villas-apartments-offices/" class="flex items-center gap-2 p-2 rounded hover:text-green-700"><i class="fas fa-building text-green-600 w-5 text-center"></i> نقل شقق سكنية بجدة</a></li>
                        <li><a href="/villa-moving-jeddah/" class="flex items-center gap-2 p-2 rounded hover:text-green-700"><i class="fas fa-home text-green-600 w-5 text-center"></i> نقل الفلل والقصور</a></li>
                        <li><a href="/moving-offices-in-jeddah/" class="flex items-center gap-2 p-2 rounded hover:text-green-700"><i class="fas fa-briefcase text-green-600 w-5 text-center"></i> نقل المكاتب والشركات</a></li>
                        <li><a href="/furniture-dismantling-and-assembly-in-jeddah/" class="flex items-center gap-2 p-2 rounded hover:text-green-700"><i class="fas fa-tools text-green-600 w-5 text-center"></i> فك وتركيب العفش</a></li>
                        <li><a href="/disassembly-and-assembly-of-bedrooms/" class="flex items-center gap-2 p-2 rounded hover:text-green-700"><i class="fas fa-bed text-green-600 w-5 text-center"></i> فك وتركيب غرف النوم</a></li>
                        <li><a href="/furniture-packing-in-jeddah/" class="flex items-center gap-2 p-2 rounded hover:text-green-700"><i class="fas fa-box text-green-600 w-5 text-center"></i> تغليف العفش الاحترافي</a></li>
                        <li><a href="/furniture-storage-in-jeddah/" class="flex items-center gap-2 p-2 rounded hover:text-green-700"><i class="fas fa-warehouse text-green-600 w-5 text-center"></i> تخزين العفش بجدة</a></li>
                        <li><a href="/moving-electrical-appliances-in-jeddah/" class="flex items-center gap-2 p-2 rounded hover:text-green-700"><i class="fas fa-tv text-green-600 w-5 text-center"></i> نقل الأجهزة والمكيفات</a></li>
                        <li><a href="/furniture-moving-between-jeddah-cities/" class="flex items-center gap-2 p-2 rounded hover:text-green-700"><i class="fas fa-city text-green-600 w-5 text-center"></i> نقل عفش بين المدن</a></li>
                        <li><a href="/north-jeddah-furniture-moving/" class="flex items-center gap-2 p-2 rounded hover:text-green-700"><i class="fas fa-compass text-green-600 w-5 text-center"></i> نقل عفش شمال جدة</a></li>
                        <li><a href="/furniture-moving-prices-in-jeddah/" class="flex items-center gap-2 p-2 rounded hover:text-green-700"><i class="fas fa-tags text-green-600 w-5 text-center"></i> أسعار نقل العفش 2026</a></li>
                        <li><a href="/areas/" class="flex items-center gap-2 p-2 rounded hover:text-green-700"><i class="fas fa-map-marker-alt text-green-600 w-5 text-center"></i> أحياء ومناطق جدة</a></li>
                        <li class="pt-1.5 border-t border-gray-100 font-bold"><a href="/services/" class="flex items-center justify-between p-2 text-green-800 bg-green-50 rounded"><span>دليل كافة الخدمات الشامل</span><i class="fas fa-arrow-left text-xs"></i></a></li>
                    </ul>
                </li>`;

// Regex patterns to match existing dropdowns
const desktopDropdownRegex = /<!--\s*Dropdown\s*-->[\s\S]*?<\/li>/i;
const mobileDropdownRegex = /<!--\s*Mobile Dropdown\s*-->[\s\S]*?<\/li>/i;

function updateNavbarAndTitles(filePath) {
  if (!fs.existsSync(filePath)) return false;
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // 1. Clean Title if it contains phone number 0540026747 or similar
  const titleMatch = content.match(/<title>([\s\S]*?)<\/title>/i);
  if (titleMatch) {
    let originalTitle = titleMatch[1];
    if (/05\d{8}/.test(originalTitle)) {
      let cleanTitle = originalTitle
        .replace(/05\d{8}/g, '')
        .replace(/\s*\|\s*\|/g, ' |')
        .replace(/\|\s*$/g, '')
        .replace(/^\s*\|/g, '')
        .replace(/\s{2,}/g, ' ')
        .trim();
      // Ensure proper pipe spacing if needed
      cleanTitle = cleanTitle.replace(/\s*\|\s*/g, ' | ');
      content = content.replace(titleMatch[0], `<title>${cleanTitle}</title>`);
      console.log(`[Title Cleaned] ${filePath}: "${cleanTitle}"`);
      changed = true;
    }
  }

  // 2. Update Desktop Dropdown
  if (desktopDropdownRegex.test(content)) {
    content = content.replace(desktopDropdownRegex, desktopMegaMenu);
    changed = true;
  }

  // 3. Update Mobile Dropdown
  if (mobileDropdownRegex.test(content)) {
    content = content.replace(mobileDropdownRegex, mobileServicesMenu);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  return false;
}

// Collect all relevant HTML files
const filesToProcess = [];

// Root files
filesToProcess.push('index.html');

// Services
const services = [
  'services',
  'disassembly-and-assembly-of-bedrooms',
  'dyna-furniture-moving-jeddah',
  'furniture-dismantling-and-assembly-in-jeddah',
  'furniture-moving-between-jeddah-cities',
  'furniture-moving-prices-in-jeddah',
  'furniture-packing-in-jeddah',
  'furniture-storage-in-jeddah',
  'hydraulic-winch-moving',
  'moving-electrical-appliances-in-jeddah',
  'moving-furniture-inside-jeddah',
  'moving-offices-in-jeddah',
  'moving-villas-apartments-offices',
  'north-jeddah-furniture-moving',
  'villa-moving-jeddah'
];
services.forEach(s => filesToProcess.push(path.join(s, 'index.html')));

// Areas
const areasDir = 'areas';
filesToProcess.push(path.join(areasDir, 'index.html'));
const areas = fs.readdirSync(areasDir).filter(f => fs.statSync(path.join(areasDir, f)).isDirectory());
areas.forEach(a => filesToProcess.push(path.join(areasDir, a, 'index.html')));

// Blogs
const blogsDir = 'blogs';
filesToProcess.push(path.join(blogsDir, 'index.html'));
const activeBlogs = [
  'tips-before-moving-furniture-in-jeddah',
  'best-furniture-packaging-materials',
  'choosing-a-furniture-moving-company',
  'how-to-move-heavy-furniture-without-damage'
];
activeBlogs.forEach(b => filesToProcess.push(path.join(blogsDir, b, 'index.html')));

// Static Pages
['about', 'privacy-policy', 'terms-of-service'].forEach(p => {
  filesToProcess.push(path.join(p, 'index.html'));
});

console.log(`Processing ${filesToProcess.length} total pages...`);
let updatedCount = 0;
filesToProcess.forEach(f => {
  if (updateNavbarAndTitles(f)) {
    updatedCount++;
  }
});
console.log(`Successfully updated ${updatedCount} files.`);
