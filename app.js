/* ============================================================
   app.js — Resume Website Scripts (Apple-inspired Redesign)
   ============================================================ */

// ── Navbar scroll effect ──────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Active nav link highlight on scroll ──────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const activeSectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => activeSectionObserver.observe(s));

// ── Mobile hamburger menu ─────────────────────────────────────
const hamburger = document.getElementById('navHamburger');
const mobileMenu = document.getElementById('navMobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target) && !mobileMenu.contains(e.target)) {
    mobileMenu.classList.remove('open');
  }
});

// ── Typed title animation ─────────────────────────────────────
const titles = [
  'Quality Assurance Engineer',
  'Mobile Banking Tester',
  'Test Automation Engineer',
  'VTM & Card Specialist',
  'Software Quality Expert',
];
let titleIdx = 0, charIdx = 0, isDeleting = false;
const typedEl = document.getElementById('typedTitle');

function typeLoop() {
  const current = titles[titleIdx];
  if (!isDeleting) {
    typedEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      isDeleting = true;
      setTimeout(typeLoop, 2000);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      isDeleting = false;
      titleIdx = (titleIdx + 1) % titles.length;
    }
  }
  setTimeout(typeLoop, isDeleting ? 40 : 70);
}
typeLoop();

// ── Scroll reveal animations ──────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 70);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

const revealEls = document.querySelectorAll(
  '.reveal, .reveal-left, .reveal-right'
);
revealEls.forEach(el => revealObserver.observe(el));

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
    btn.textContent = 'Send Message';
    btn.style.opacity = '1';
    success.style.display = 'block';
    document.getElementById('contact-form').reset();
    setTimeout(() => success.style.display = 'none', 5000);
  }, 1200);
}

// ── Footer year ───────────────────────────────────────────────
document.getElementById('footer-year').textContent = new Date().getFullYear();

// ── Smooth scroll for anchor links ───────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
