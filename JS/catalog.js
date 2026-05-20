/* Catalog: order modal + WhatsApp redirect */
const WA_PHONE = '923181267800';
const WA_MSG = (name, price) =>
  encodeURIComponent(
    `Assalamualaikum! I would like to order *${name}* (Rs ${price.toLocaleString('en-PK')}) from Resin Dreams. Please confirm availability and delivery details. Shukriya!`
  );

const modal = document.getElementById('order-modal');
const modalBackdrop = document.getElementById('order-modal-backdrop');
const modalClose = document.getElementById('order-modal-close');
const modalImg = document.getElementById('order-modal-img');
const modalTitle = document.getElementById('order-modal-title');
const modalPrice = document.getElementById('order-modal-price');
const modalWa = document.getElementById('order-modal-wa');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lastFocus = null;

function openOrderModal({ name, price, image }) {
  if (!modal) return;
  lastFocus = document.activeElement;
  modalImg.src = image;
  modalImg.alt = name;
  modalTitle.textContent = name;
  modalPrice.textContent = `Rs ${Number(price).toLocaleString('en-PK')}`;
  modalWa.href = `https://wa.me/${WA_PHONE}?text=${WA_MSG(name, Number(price))}`;
  modal.setAttribute('aria-hidden', 'false');
  modal.classList.add('is-open');
  document.body.classList.add('menu-open');
  if (!prefersReducedMotion) {
    requestAnimationFrame(() => modal.classList.add('is-visible'));
  } else {
    modal.classList.add('is-visible');
  }
  modalClose.focus();
}

function closeOrderModal() {
  if (!modal) return;
  modal.classList.remove('is-visible');
  modal.setAttribute('aria-hidden', 'true');
  const end = () => {
    modal.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    modal.removeEventListener('transitionend', end);
  };
  if (prefersReducedMotion) {
    end();
  } else {
    modal.addEventListener('transitionend', end, { once: true });
    setTimeout(end, 400);
  }
  if (lastFocus) lastFocus.focus();
}

document.querySelectorAll('.catalog-item').forEach((btn) => {
  btn.addEventListener('click', () => {
    openOrderModal({
      name: btn.dataset.name,
      price: btn.dataset.price,
      image: btn.dataset.image,
    });
  });
});

if (modalClose) modalClose.addEventListener('click', closeOrderModal);
if (modalBackdrop) modalBackdrop.addEventListener('click', closeOrderModal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal?.classList.contains('is-open')) closeOrderModal();
});

document.documentElement.classList.add('js-reveal');

const catalogCards = document.querySelectorAll('.catalog-item.reveal-scale, .catalog-hero.reveal, .catalog-toolbar.reveal');
if (catalogCards.length && 'IntersectionObserver' in window) {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0, rootMargin: '80px 0px 80px 0px' }
  );

  const revealInView = (el) => {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  };

  catalogCards.forEach((el) => {
    if (revealInView(el)) {
      el.classList.add('active');
    } else {
      obs.observe(el);
    }
  });

  window.addEventListener('load', () => {
    catalogCards.forEach((el) => {
      if (revealInView(el)) el.classList.add('active');
    });
  }, { once: true });
}
