# tracking.md — خطة وتوثيق تتبع Google Analytics 4
# شركة القصر السعودي لنقل العفش بجدة

تم نقل كود التتبع كاملاً إلى ملف موحد ونظيف: [`/assets/js/analytics.js`](file:///c:/Users/HP/Desktop/my-work/day-2/alqasr/assets/js/analytics.js) ويتم تحميله مع السمة `defer` في جميع صفحات الموقع.

---

## 1. ضبط معرّف GA4 (Measurement ID)

يحتوي ملف `assets/js/analytics.js` على ثابت مركزي:
```javascript
const GA4_ID = '[[GA4_ID]]';
```

> **آلية الأمان والأداء:**
> لا يقوم السكربت بتحميل مكتبة Google Analytics (`gtag.js`) إلا إذا تم استبدال القيمة بمعرف قياس صالح يبدأ بـ `G-`، وذلك لمنع أخطاء الشبكة وضمان أعلى سرعة تحميل للصفحة للمستخدمين ومحركات البحث.

---

## 2. الأحداث المخصصة التي يتم تتبعها تلقائياً

### حدث الاتصال الهاتفي: `click_call`
- **الشرط:** أي نقر على رابط يبدأ بـ `tel:`
- **المعلمات (Parameters):**
  - `event_category`: `engagement`
  - `link_location`: يحدد بدقة مكان الرابط المنقور (`header`، `floating`، `hero`، `pricing`، `footer`، `contact_page`، `body`).
  - `phone_number`: `+966540026747`

### حدث محادثة واتساب: `click_whatsapp`
- **الشرط:** أي نقر على رابط واتساب (`wa.me` أو `whatsapp.com`)
- **المعلمات (Parameters):**
  - `event_category`: `engagement`
  - `link_location`: مكان الزر المنقور (`floating`، `header`، `contact_page`، `hero`، إلخ).
  - `phone_number`: `+966540026747`

---

## 3. طريقة اختبار الأحداث عبر GA4 DebugView خطوة بخطوة

للتأكد من وصول بيانات النقرات والاتصال في الوقت الحقيقي عبر GA4 DebugView:

### الخطوة 1: تثبيت إضافة المتصفح
- ثبّت إضافة **Google Analytics Debugger** الرسمية لمتصفح Chrome (أو افتح الموقع عبر Google Tag Assistant: `tagassistant.google.com`).

### الخطوة 2: تفعيل وضع الفحص (Debug Mode)
- انقر على أيقونة الإضافة لتصبح بحالة **ON**.
- أو افتح الموقع مع إضافة المعلمة: `https://alqasr-alsueudi.com/?_dbg=1`

### الخطوة 3: فتح لوحة GA4 DebugView
1. سجّل الدخول إلى [Google Analytics](https://analytics.google.com/).
2. اختر الحساب والخاصية (Property) الخاصة بموقع القصر السعودي.
3. من القائمة الجانبية، انتقل إلى: **Admin (المسؤول)** ← **Data display (عرض البيانات)** ← **DebugView**.

### الخطوة 4: تجربة النقرات على الموقع
- انقر على زر الاتصال بالهيدر: ستظهر إشارة بالحدث `click_call` مع المعلمة `link_location = header`.
- انقر على زر الواتساب العائم بأسفل الصفحة: سيظهر الحدث `click_whatsapp` مع المعلمة `link_location = floating`.
- أرسل نموذج صفحة التواصل: ستظهر إشارة الحدث فور توجيه الرسالة.

### الخطوة 5: تعيين الأحداث كـ تحويلات (Key Events / Conversions)
- في لوحة تحكم GA4: انتقل إلى **Admin** ← **Key Events (الأحداث الرئيسية)**.
- فعّل كلاً من: `click_call` و`click_whatsapp` كأحداث رئيسية (Conversions) لقياس العائد الإعلاني ومعدل التحويل بدقة.
