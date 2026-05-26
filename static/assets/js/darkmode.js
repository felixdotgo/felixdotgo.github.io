function toggleDarkMode() {
    const DARK_CLASS = 'dark';

    var body = document.querySelector("body");
    if (body.classList.contains(DARK_CLASS)) {
        setCookie('theme', 'light');
        body.classList.remove(DARK_CLASS);
    } else {
        setCookie('theme', 'dark');
        body.classList.add(DARK_CLASS);
    }
}

function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}

function setCookie(name, value, days) {
    var maxAgeDays = days || 365;
    var d = new Date();
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * maxAgeDays);
    document.cookie = name + "=" + value + ";path=/;SameSite=strict;expires=" + d.toUTCString();
}

const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
var theme = getCookie('theme');
if ((theme === null && userPrefersDark) || theme === 'dark') {
    var checkDarkDone = false;
    function checkDark() {
        if (!checkDarkDone) {
            toggleDarkMode();
        }
        checkDarkDone = true;
    }

    function toggleSwitch() {
        document.querySelectorAll('.dark-mode-toggle').forEach(function (ti) {
            ti.checked = true;
        });
    }

    if (window.requestAnimationFrame) window.requestAnimationFrame(checkDark);
    window.addEventListener('DOMContentLoaded', checkDark);
    window.addEventListener('DOMContentLoaded', toggleSwitch);
}
