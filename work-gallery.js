const workTitles = [
  'Spider-Man visual edit', 'Theera Theera visual edit', 'Stylehub Furniture social campaign', 'Baluni Classes social campaign', 'Education billboard concept', 'Five Star Chicken outdoor campaign', 'Hybrid ANC billboard concept', 'Product visual explorations', 'Food packaging series', 'Restaurant menu design', 'Hot Grill brochure system', 'Food menu editorial set', 'Restaurant menu poster', 'Bliss Life brand identity', 'Social media design series', 'Ganesa FM — Unnal Mudiyum', 'Adi Poli 5.0 event creative', 'Think Before You Design',
  'Ganesa FM election awareness', 'Ganesa FM countdown — 5 days', 'Ganesa FM countdown — 4 days', 'Ganesa FM countdown — 3 days', 'Ganesa FM countdown — 1 day', 'Ganesa FM goes on air', 'Ganesa FM Info Box — launch', 'Ganesa FM Unnal Mudiyum — launch', 'Ganesa FM Info Box — environment', 'Ganesa FM Unnal Mudiyum — Paytm', 'Ganesa FM Unnal Mudiyum — Android', 'Ganesa FM Info Box — law', 'Ganesa FM Unnal Mudiyum — Jeff Bezos', 'Ganesa FM Unnal Mudiyum — Vanishree', 'Ganesa FM Info Box — road safety', 'Ganesa FM Info Box — sleep health', 'Ganesa FM Unnal Mudiyum — 90s stories', 'Ganesa FM Info Box — rights', 'Ganesa FM Unnal Mudiyum — Netflix', 'Ganesa FM Unnal Mudiyum — Uber', 'Ganesa FM Unnal Mudiyum — Kevin Systrom', 'Ganesa FM Info Box — phone health', 'Ganesa FM Info Box — literature', 'Ganesa FM Unnal Mudiyum — Zen', 'Ganesa FM Janaki Amma tribute', 'Ganesa FM Janaki Amma remembrance', 'Ganesa FM Janaki Amma — special broadcast', 'Ganesa FM story design'
];
workTitles.push('Ganesa FM Janaki Amma tribute', 'Ganesa FM Janaki Amma remembrance');

const categoryFor = index => {
  if ([3, 4, 15].includes(index)) return 'social';
  if (index >= 5 && index <= 14) return 'brand';
  if ([1, 2, 17, 18].includes(index)) return 'creative';
  return 'radio';
};
const displayCategory = { brand: 'Brand identity', social: 'Social media', radio: 'Ganesa FM 88.8', creative: 'Creative direction' };
const gallery = document.querySelector('#showcase-grid');
const assetPath = n => `assets/showcase/work-${String(n).padStart(2, '0')}${n <= 2 ? '.webp' : n === 17 ? '.png' : '.jpg'}`;

workTitles.forEach((title, position) => {
  const number = position + 1;
  const category = categoryFor(number);
  const figure = document.createElement('figure');
  figure.className = 'showcase-item';
  figure.dataset.category = category;
  figure.innerHTML = `<img src="${assetPath(number)}" alt="${title}" loading="lazy"><figcaption><span>${displayCategory[category]}</span><strong>${title}</strong></figcaption>`;
  figure.addEventListener('click', () => openLightbox(assetPath(number), title));
  gallery.appendChild(figure);
});

const lightbox = document.createElement('div');
lightbox.className = 'gallery-lightbox';
lightbox.innerHTML = '<button aria-label="Close preview">×</button><img alt="">';
document.body.appendChild(lightbox);
const lightboxImage = lightbox.querySelector('img');
function openLightbox(src, alt) { lightboxImage.src = src; lightboxImage.alt = alt; lightbox.classList.add('open'); }
function closeLightbox() { lightbox.classList.remove('open'); lightboxImage.src = ''; }
lightbox.addEventListener('click', event => { if (event.target === lightbox || event.target.tagName === 'BUTTON') closeLightbox(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeLightbox(); });

const workObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('in'); workObserver.unobserve(entry.target); }
}), { threshold: .06 });
document.querySelectorAll('.showcase-item').forEach((item, index) => { item.style.transitionDelay = `${(index % 5) * 45}ms`; workObserver.observe(item); });

document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  const filter = button.dataset.filter;
  document.querySelectorAll('.showcase-item').forEach(item => item.classList.toggle('hidden', filter !== 'all' && item.dataset.category !== filter));
}));
