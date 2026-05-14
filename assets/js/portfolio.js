/* ===== TYPEWRITER ===== */
const phrases = [
    'ML-driven automation',
    'YOLO vision inspection',
    'lights-out manufacturing',
    'PLC control systems',
    'cloud-connected factories',
    'industrial software',
];
let pi = 0, ci = 0, del = false;
const tw = document.getElementById('typewriter');

function tick() {
    const p = phrases[pi];
    if (del) { tw.textContent = p.slice(0, --ci); }
    else      { tw.textContent = p.slice(0, ++ci); }
    let ms = del ? 45 : 75;
    if (!del && ci === p.length) { ms = 2200; del = true; }
    else if (del && ci === 0)    { del = false; pi = (pi+1) % phrases.length; ms = 350; }
    setTimeout(tick, ms);
}
tick();

/* ===== NAVBAR SCROLL ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ===== ACTIVE NAV ON SCROLL ===== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            navLinks.forEach(l => {
                l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id);
            });
        }
    });
}, { rootMargin: '-30% 0px -70% 0px' });
sections.forEach(s => io.observe(s));

/* ===== MOBILE NAV ===== */
const toggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
toggle.addEventListener('click', () => navMenu.classList.toggle('open'));
navLinks.forEach(l => l.addEventListener('click', () => navMenu.classList.remove('open')));

/* ===== PROJECT FILTER ===== */
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.dataset.filter;
        cards.forEach(card => {
            const match = f === 'all' || card.dataset.cat.split(' ').includes(f);
            card.classList.toggle('hidden', !match);
        });
    });
});

/* ===== SCROLL REVEAL ===== */
const ro = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); ro.unobserve(e.target); } });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => ro.observe(el));
