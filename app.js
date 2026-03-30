/* ============================================================
   app.js — Resume Website Scripts
   ============================================================ */

// ── Navbar scroll effect ──────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Typed title animation ─────────────────────────────────────
const titles = [
  'Quality Assurance Tester',
  'Software Tester',
  'Mobile App Tester',
  'Automation Tester',
  'VTM Card Tester',
];
let titleIdx = 0, charIdx = 0, isDeleting = false;
const typedEl = document.getElementById('typedTitle');

function typeLoop() {
  const current = titles[titleIdx];
  if (!isDeleting) {
    typedEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      isDeleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      isDeleting = false;
      titleIdx = (titleIdx + 1) % titles.length;
    }
  }
  setTimeout(typeLoop, isDeleting ? 45 : 75);
}
typeLoop();

// ── Background particles ──────────────────────────────────────
const colors = ['#4f8ef7', '#f5c842', '#9b6af0', '#22d4f5', '#34d399'];
const container = document.getElementById('bgParticles');

function createParticle() {
  const el = document.createElement('div');
  el.classList.add('particle');
  const size = Math.random() * 4 + 2;
  el.style.cssText = `
    width:${size}px; height:${size}px;
    left:${Math.random() * 100}%;
    background:${colors[Math.floor(Math.random() * colors.length)]};
    animation-duration:${Math.random() * 12 + 8}s;
    animation-delay:${Math.random() * 8}s;
    filter:blur(${Math.random() * 1}px);
  `;
  container.appendChild(el);
}
for (let i = 0; i < 40; i++) createParticle();

// ── Scroll reveal ─────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

const revealEls = document.querySelectorAll(
  '.skill-card, .timeline-card, .project-card, .edu-card, .contact-item, .contact-form, .stat-item'
);
revealEls.forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ── Proficiency bar animation ─────────────────────────────────
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.prof-fill').forEach(bar => {
        bar.classList.add('animated');
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const profSection = document.querySelector('.proficiency-section');
if (profSection) barObserver.observe(profSection);

// ── Contact form ──────────────────────────────────────────────
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('btn-send');
  const success = document.getElementById('form-success');
  btn.textContent = 'Sending...';
  btn.style.opacity = '0.7';
  setTimeout(() => {
    btn.textContent = 'Send Message 🚀';
    btn.style.opacity = '1';
    success.style.display = 'block';
    document.getElementById('contact-form').reset();
    setTimeout(() => success.style.display = 'none', 4000);
  }, 1200);
}

// ── Footer year ───────────────────────────────────────────────
document.getElementById('footer-year').textContent = new Date().getFullYear();

// ── Smooth active nav highlight ───────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--gold)';
        }
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => sectionObserver.observe(s));
