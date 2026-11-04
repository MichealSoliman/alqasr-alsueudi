const fs = require('fs');
let n = fs.readFileSync('assets/js/navbar.js', 'utf8');

const target = "window.__ALQASR_NAVBAR_INITIALIZED__ = true;";
const addition = `window.__ALQASR_NAVBAR_INITIALIZED__ = true;

        // تحديث aria-expanded لزر خدماتنا في الهيدر (Desktop)
        const desktopDropdownGroup = header ? header.querySelector('li.group') : null;
        if (desktopDropdownGroup) {
            const desktopBtn = desktopDropdownGroup.querySelector('button');
            if (desktopBtn) {
                desktopDropdownGroup.addEventListener('mouseenter', function() {
                    desktopBtn.setAttribute('aria-expanded', 'true');
                });
                desktopDropdownGroup.addEventListener('mouseleave', function() {
                    desktopBtn.setAttribute('aria-expanded', 'false');
                });
                desktopBtn.addEventListener('focus', function() {
                    desktopBtn.setAttribute('aria-expanded', 'true');
                });
                desktopDropdownGroup.addEventListener('focusout', function(e) {
                    if (!desktopDropdownGroup.contains(e.relatedTarget)) {
                        desktopBtn.setAttribute('aria-expanded', 'false');
                    }
                });
            }
        }`;

if (n.includes(target) && !n.includes('تحديث aria-expanded لزر خدماتنا')) {
    n = n.replace(target, addition);
    fs.writeFileSync('assets/js/navbar.js', n, 'utf8');
    console.log('navbar.js updated with desktop aria-expanded support.');
} else {
    console.log('Already updated or target not found.');
}

