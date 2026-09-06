const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', e => {
  glow.style.transform = `translate(${e.clientX - 240}px, ${e.clientY - 240}px)`;
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav nav');
toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('open', !open);
});
