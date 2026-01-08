// function SetLanguage(lang) {
//     document.documentElement.lang = lang;

//     const elements = document.querySelectorAll("[textLang]");
//     elements.forEach(function(el) {
//         const key = el.getAttribute("textLang");

//         if (LANGS[lang] && LANGS[lang][key] !== undefined) {
//             el.innerHTML = LANGS[lang][key];
//         }
//     });
// }

function SetMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');

    menuToggle.addEventListener('click', () => {
        const navEl = document.querySelector('#main-nav');
        const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', String(!expanded));
        navEl.classList.toggle('open');

        if (expanded) {
            document.querySelectorAll('.sub').forEach(s => s.style.display = '');
            document.querySelectorAll('.submenu-toggle').forEach(b => {
                b.setAttribute('aria-expanded', 'false');
                b.classList.remove('open');
            });
        }
    });
}

function StatsCounter(){
    const statsEl = document.querySelector('.stats');
    if (!statsEl) return;

    const animateNumber = (el, target) => {
        const start = 0;
        const duration = 1200;
        let startTime = null;

        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const value = Math.floor(progress * (target - start) + start);
            el.textContent = value.toLocaleString('bg-BG');
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.stat-number').forEach(n => {
                    const target = parseInt(n.getAttribute('data-target'), 10) || 0;
                    if (n.dataset.animated) return;
                    animateNumber(n, target);
                    n.dataset.animated = '1';
                });
                obs.disconnect();
            }
        });
    }, { threshold: 0.25 });

    observer.observe(statsEl);
}

document.addEventListener("DOMContentLoaded", function () {
    // SetLanguage("bg");
    SetMobileMenu();
    StatsCounter();
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox?.querySelector('img');
const closeBtn = lightbox?.querySelector('.lightbox-close');
document.querySelectorAll('.gallery img, .grid img').forEach(img => {
    img.addEventListener('click', () => {
        lightboxImg.src = img.dataset.large || img.src;
        lightboxImg.alt = img.alt || '';
        lightbox.style.display = 'flex';
        lightbox.setAttribute('aria-hidden', 'false');
    })
});
closeBtn?.addEventListener('click', () => { lightbox.style.display = 'none'; lightbox.setAttribute('aria-hidden', 'true'); });
lightbox?.addEventListener('click', (e) => { if (e.target === lightbox) { lightbox.style.display = 'none'; lightbox.setAttribute('aria-hidden', 'true'); } });