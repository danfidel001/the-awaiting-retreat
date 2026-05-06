// ===== COUNTDOWN TIMER =====
function initCountdown() {
  const targetDate = new Date('2026-06-11T00:00:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const diff = targetDate - now;
    if (diff <= 0) return;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    const pad = n => String(n).padStart(2, '0');

    // Main countdown
    const cdDays = document.getElementById('cd-days');
    const cdHours = document.getElementById('cd-hours');
    const cdMins = document.getElementById('cd-mins');
    const cdSecs = document.getElementById('cd-secs');
    if (cdDays) { cdDays.textContent = pad(days); cdHours.textContent = pad(hours); cdMins.textContent = pad(mins); cdSecs.textContent = pad(secs); }

    // All countdown numbers on page
    document.querySelectorAll('.g-timer .num, .c-timer .num').forEach(el => {
      const type = el.getAttribute('data-type') || el.parentElement.querySelector('.lbl')?.textContent?.toLowerCase()?.trim();
      if (type === 'days') el.textContent = pad(days);
      else if (type === 'hours') el.textContent = pad(hours);
      else if (type === 'mins') el.textContent = pad(mins);
      else if (type === 'secs') el.textContent = pad(secs);
    });
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ===== NAVBAR SCROLL =====
function initNavbar() {
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const scrollY = window.scrollY;
    if (scrollY > 100) {
      navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
    } else {
      navbar.style.boxShadow = 'none';
    }
    lastScroll = scrollY;
  });
}

// ===== CITY FILTERS =====
function initCityFilters() {
  const filters = document.querySelectorAll('.city-filter');
  const cards = document.querySelectorAll('.city-card');

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(f => f.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-status') === filter) {
          card.style.display = '';
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const id = this.getAttribute('href');
      if (id === '#') return;
      e.preventDefault();
      const target = document.querySelector(id);
      if (target) {
        const offset = 76;
        const pos = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: pos, behavior: 'smooth' });
        // Close mobile nav
        document.getElementById('navLinks')?.classList.remove('active');
      }
    });
  });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initScrollAnimations();
  initNavbar();
  initCityFilters();
  initSmoothScroll();
});
