/* Catalog: render products, order modal, WhatsApp, intro animation */
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

function openOrderModal({ name, price, image, label }) {
  if (!modal) return;
  lastFocus = document.activeElement;
  modalImg.src = image;
  modalImg.alt = name;
  modalTitle.textContent = label || name;
  modalPrice.textContent = formatRs(price);
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

function renderProductCard(p, itemIndex, catIndex) {
  const img = catalogImagePath(p.n);
  const name = catalogProductName(p);
  const label = catalogDisplayLabel(p);
  const badge = p.size || p.note || '';
  const badgeHtml = badge
    ? `<span class="catalog-item-badge">${badge}</span>`
    : '';

  return `
    <button
      type="button"
      class="catalog-item"
      data-n="${p.n}"
      style="--item-i: ${itemIndex}; --cat-i: ${catIndex}"
      aria-label="View ${label}, ${formatRs(p.price)}"
    >
      <span class="catalog-item-img-wrap">
        <img src="${img}" alt="${name}" width="400" height="400" loading="lazy" decoding="async" />
      </span>
      <span class="catalog-item-body">
        ${badgeHtml}
        <span class="catalog-item-name">${name}</span>
        <span class="catalog-item-price">${formatRs(p.price)}</span>
        <span class="catalog-item-hint">Tap to order</span>
      </span>
    </button>
  `;
}

function renderCatalog() {
  const sectionsRoot = document.getElementById('catalog-sections');
  const navRoot = document.getElementById('catalog-cats-nav');
  if (!sectionsRoot || typeof CATALOG_PRODUCTS === 'undefined') return;

  const productMap = new Map(CATALOG_PRODUCTS.map((p) => [p.n, p]));
  const countEl = document.querySelector('.catalog-count');
  if (countEl) countEl.textContent = `${CATALOG_PRODUCTS.length} handmade pieces`;

  const navHtml = [];
  const sectionsHtml = [];

  CATALOG_CATEGORIES.forEach((cat, catIndex) => {
    const products = CATALOG_PRODUCTS.filter((p) => p.n >= cat.from && p.n <= cat.to);
    if (!products.length) return;

    navHtml.push(
      `<a href="#cat-${cat.id}" class="catalog-cat-pill">${cat.icon} ${cat.title}</a>`
    );

    const cards = products
      .map((p, i) => renderProductCard(p, i, catIndex))
      .join('');

    sectionsHtml.push(`
      <section class="catalog-category" id="cat-${cat.id}" style="--cat-i: ${catIndex}">
        <header class="catalog-category-head">
          <span class="catalog-category-icon" aria-hidden="true">${cat.icon}</span>
          <div>
            <h2 class="catalog-category-title">${cat.title}</h2>
            <p class="catalog-category-sub">${cat.subtitle} · ${products.length} pieces</p>
          </div>
        </header>
        <div class="catalog-grid">${cards}</div>
      </section>
    `);
  });

  if (navRoot) navRoot.innerHTML = navHtml.join('');
  sectionsRoot.innerHTML = sectionsHtml.join('');

  sectionsRoot.querySelectorAll('.catalog-item').forEach((btn) => {
    btn.addEventListener('click', () => {
      const n = Number(btn.dataset.n);
      const p = productMap.get(n);
      if (!p) return;
      openOrderModal({
        name: catalogWhatsAppName(p),
        price: p.price,
        image: catalogImagePath(n),
        label: catalogDisplayLabel(p),
      });
    });
  });
}

renderCatalog();

if (modalClose) modalClose.addEventListener('click', closeOrderModal);
if (modalBackdrop) modalBackdrop.addEventListener('click', closeOrderModal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal?.classList.contains('is-open')) closeOrderModal();
});

/* Opening page animation */
(function initCatalogIntro() {
  const body = document.body;
  if (!body.classList.contains('page-catalog')) return;

  if (prefersReducedMotion) {
    body.classList.add('catalog-intro-done', 'catalog-ready');
    return;
  }

  requestAnimationFrame(() => {
    body.classList.add('catalog-intro-play');
  });

  window.setTimeout(() => {
    body.classList.add('catalog-intro-done', 'catalog-ready');
  }, 850);
})();
