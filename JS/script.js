
/* ════════════════════════════════════════════════════════
   RESIN DREAMS — Optimised JS
   • Smooth scroll with offset for fixed navbar
   • Active link tracking via IntersectionObserver
   • Mobile menu (slide-in + backdrop)
   • Scroll reveal (single observer, unobserve after fire)
   • Light sparkles (deferred, reduced count)
   All listeners marked passive where possible.
════════════════════════════════════════════════════════ */

/* ── 0. SMOOTH SCROLL with navbar-height offset ── */
const NAVBAR_HEIGHT = () => {
    const bar = document.getElementById('navbar');
    return bar ? Math.ceil(bar.getBoundingClientRect().height) : 88;
};

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (!target) return;
        e.preventDefault();

        const top = target.getBoundingClientRect().top
            + window.scrollY
            - NAVBAR_HEIGHT();

        window.scrollTo({ top, behavior: 'smooth' });
    });
});

/* ── 1. NAVBAR: glassmorphism on scroll + active link ── */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const mobLinks = document.querySelectorAll('.mobile-link');

let scrollTicking = false;
const onScroll = () => {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(() => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
        scrollTicking = false;
    });
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

function setActive(id) {
    navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
    mobLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
}

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) setActive(entry.target.id);
    });
}, {
    rootMargin: `-${NAVBAR_HEIGHT()}px 0px -55% 0px`,
    threshold: 0
});

document.querySelectorAll('section[id]').forEach(s => sectionObserver.observe(s));

/* ── 2. MOBILE MENU — slide-in panel + backdrop ── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileBackdrop = document.getElementById('mobile-backdrop');
const mobileClose = document.getElementById('mobile-menu-close');
const mobileMenuBrand = document.querySelector('.mobile-menu-brand');

function openMenu() {
    mobileMenu.classList.add('open');
    mobileBackdrop.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Close menu');
    mobileMenu.setAttribute('aria-hidden', 'false');
    mobileBackdrop.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open');
}

function closeMenu() {
    mobileMenu.classList.remove('open');
    mobileBackdrop.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open menu');
    mobileMenu.setAttribute('aria-hidden', 'true');
    mobileBackdrop.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
}

hamburger.addEventListener('click', () => {
    mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
});

if (mobileClose) mobileClose.addEventListener('click', closeMenu);
if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMenu);
if (mobileMenuBrand) mobileMenuBrand.addEventListener('click', closeMenu);

document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        closeMenu();
        hamburger.focus();
    }
});

mobileMenu.querySelectorAll('a').forEach(link => {
    if (link === mobileMenuBrand) return;
    link.addEventListener('click', closeMenu);
});

/* ── 3. SCROLL REVEAL — single observer ── */
const revealEls = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .reveal-scale'
);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* ── 4. SPARKLES — deferred, fewer particles (perf) ── */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const sparkleContainer = document.getElementById('sparkle-container');
const MAX_SPARKLES = 8;
let sparkleCount = 0;
let sparkleIntervalId = null;

function createSparkle() {
    if (!sparkleContainer || sparkleCount >= MAX_SPARKLES) return;
    sparkleCount++;

    const s = document.createElement('div');
    const size = (Math.random() * 3 + 2) + 'px';
    const dur = (Math.random() * 6 + 6) + 's';

    s.className = 'sparkle';
    s.style.cssText = `
        left:               ${Math.random() * 100}%;
        bottom:             -10px;
        width:              ${size};
        height:             ${size};
        opacity:            ${(Math.random() * 0.4 + 0.15).toFixed(2)};
        animation-duration: ${dur};
        animation-delay:    ${(Math.random() * 1).toFixed(2)}s;
      `;

    sparkleContainer.appendChild(s);

    setTimeout(() => {
        s.remove();
        sparkleCount--;
    }, parseFloat(dur) * 1000 + 1500);
}

function startSparkles() {
    if (prefersReducedMotion || !sparkleContainer) return;
    for (let i = 0; i < 4; i++) setTimeout(createSparkle, i * 400);
    sparkleIntervalId = setInterval(createSparkle, 2800);
}

if (document.readyState === 'complete') {
    if ('requestIdleCallback' in window) {
        requestIdleCallback(startSparkles, { timeout: 2000 });
    } else {
        setTimeout(startSparkles, 1500);
    }
} else {
    window.addEventListener('load', () => {
        if ('requestIdleCallback' in window) {
            requestIdleCallback(startSparkles, { timeout: 2000 });
        } else {
            setTimeout(startSparkles, 1500);
        }
    }, { once: true });
}
