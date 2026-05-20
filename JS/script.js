/* Home page only — scroll reveal + section nav highlight */
document.documentElement.classList.add('js-reveal');

const navLinks = document.querySelectorAll('.nav-link');
const mobLinks = document.querySelectorAll('.mobile-link');

function setActive(id) {
  navLinks.forEach((l) => {
    const href = l.getAttribute('href') || '';
    const match =
      href === '#' + id ||
      (id === 'products' && (href === 'catalog.html' || href.endsWith('/catalog.html')));
    l.classList.toggle('active', match);
  });
  mobLinks.forEach((l) => {
    const href = l.getAttribute('href') || '';
    const match =
      href === '#' + id ||
      href === `index.html#${id}` ||
      (id === 'products' && (href === 'catalog.html' || href.endsWith('/catalog.html')));
    l.classList.toggle('active', match);
  });
}

const NAVBAR_HEIGHT = () => {
  const bar = document.getElementById('navbar');
  return bar ? Math.ceil(bar.getBoundingClientRect().height) : 88;
};

const sections = document.querySelectorAll('section[id]');
if (sections.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: `-${NAVBAR_HEIGHT()}px 0px -55% 0px`, threshold: 0 }
  );
  sections.forEach((s) => sectionObserver.observe(s));
}

const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
if (revealEls.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0, rootMargin: '0px 0px -8% 0px' }
  );

  const revealInView = (el) => {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
  };

  revealEls.forEach((el) => {
    if (revealInView(el)) {
      el.classList.add('active');
    } else {
      revealObserver.observe(el);
    }
  });
}

