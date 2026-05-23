/* Product data — Resin Dreams full catalog */
const CATALOG_CATEGORIES = [
  {
    id: 'main',
    title: 'Main Collection',
    subtitle: 'Handpicked signature resin art pieces',
    icon: '✨',
    from: 1,
    to: 14,
  },
  {
    id: 'favorites',
    title: 'Everyday Favorites',
    subtitle: 'Beautiful pieces for daily wear & gifting',
    icon: '💎',
    from: 15,
    to: 25,
  },
  {
    id: 'plaques',
    title: 'Large Plaques & Boards',
    subtitle: 'Premium sized custom plaques & trays',
    icon: '🖼️',
    from: 26,
    to: 32,
  },
  {
    id: 'mini',
    title: 'Keychains & Mini Gifts',
    subtitle: 'Affordable charms and small resin gifts',
    icon: '🔑',
    from: 33,
    to: 42,
  },
  {
    id: 'special',
    title: 'Special Picks',
    subtitle: 'Limited and unique one-of-a-kind pieces',
    icon: '⭐',
    from: 43,
    to: 46,
  },
];

const CATALOG_PRODUCTS = [
  { n: 1, price: 2500 },
  { n: 2, price: 2850 },
  { n: 3, price: 2850 },
  { n: 4, price: 3299 },
  { n: 5, price: 2899 },
  { n: 6, price: 2800 },
  { n: 7, price: 3999 },
  { n: 8, price: 2599 },
  { n: 9, price: 2899 },
  { n: 10, price: 4999 },
  { n: 11, price: 3199 },
  { n: 12, price: 2599 },
  { n: 13, price: 3299 },
  { n: 14, price: 3299 },
  { n: 15, price: 1299 },
  { n: 16, price: 1299 },
  { n: 17, price: 1499 },
  { n: 18, price: 1799 },
  { n: 19, price: 1599 },
  { n: 20, price: 1399 },
  { n: 21, price: 1300 },
  { n: 22, price: 1699 },
  { n: 23, price: 1499 },
  { n: 24, price: 1999 },
  { n: 25, price: 1699 },
  { n: 26, price: 5999, size: '8 inches' },
  { n: 27, price: 9999, size: '8" × 12"' },
  { n: 28, price: 8999, size: '8" with pen' },
  { n: 29, price: 7999, size: '8 inches' },
  { n: 30, price: 5999, size: '8 inches' },
  { n: 31, price: 8999, size: '8" × 12"' },
  { n: 32, price: 8999, size: '8" × 12"' },
  { n: 33, price: 750 },
  { n: 34, price: 1200 },
  { n: 35, price: 999 },
  { n: 36, price: 599 },
  { n: 37, price: 599 },
  { n: 38, price: 599 },
  { n: 39, price: 599 },
  { n: 40, price: 599 },
  { n: 41, price: 499 },
  { n: 42, price: 499 },
  { n: 43, price: 1199 },
  { n: 44, price: 780 },
  { n: 45, price: 599, note: 'Only one piece' },
  { n: 46, price: 1199 },
];

function catalogImagePath(n) {
  return n <= 14 ? `images/product${n}.jpg` : `images/product${n}.jpeg`;
}

function catalogProductName(p) {
  return `Resin Art Piece ${p.n}`;
}

function catalogDisplayLabel(p) {
  const base = catalogProductName(p);
  if (p.size) return `${base} · ${p.size}`;
  if (p.note) return `${base} · ${p.note}`;
  return base;
}

function catalogWhatsAppName(p) {
  let name = catalogProductName(p);
  if (p.size) name += ` (${p.size})`;
  if (p.note) name += ` — ${p.note}`;
  return name;
}

function formatRs(price) {
  return `Rs ${Number(price).toLocaleString('en-PK')}`;
}
