/* Shared: navbar, mobile menu, smooth scroll (same-page anchors) */
const NAVBAR_HEIGHT = () => {
  const bar = document.getElementById('navbar');
  return bar ? Math.ceil(bar.getBoundingClientRect().height) : 88;
};

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT();
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

const navbar = document.getElementById('navbar');
if (navbar) {
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
}

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileBackdrop = document.getElementById('mobile-backdrop');
const mobileClose = document.getElementById('mobile-menu-close');
const mobileMenuBrand = document.querySelector('.mobile-menu-brand');

if (hamburger && mobileMenu && mobileBackdrop) {
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
  mobileBackdrop.addEventListener('click', closeMenu);
  if (mobileMenuBrand) mobileMenuBrand.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMenu();
      hamburger.focus();
    }
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    if (link === mobileMenuBrand) return;
    link.addEventListener('click', closeMenu);
  });
}

/* Catalog page: highlight Catalog nav link */
(function setNavActive() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  if (path !== 'catalog.html') return;
  document.querySelectorAll('.nav-link[href="catalog.html"], .mobile-link[href="catalog.html"]').forEach((l) => {
    l.classList.add('active');
  });
})();
