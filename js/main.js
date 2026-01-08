function SetLanguage(lang) {
    document.documentElement.lang = lang;

    const elements = document.querySelectorAll("[textLang]");
    elements.forEach(function(el) {
        const key = el.getAttribute("textLang");

        if (LANGS[lang] && LANGS[lang][key] !== undefined) {
            el.innerHTML = LANGS[lang][key];
        }
    });
}

function SetMobileMenu(){
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

document.addEventListener("DOMContentLoaded", function() {
    SetLanguage("bg");
    SetMobileMenu();
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