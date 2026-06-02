/* ================================================
   DIGITALCRAFT — MAIN JS
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── PAGE LOADER ───
  const loader = document.querySelector('.page-loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('done'), 400);
    });
    // Fallback
    setTimeout(() => loader.classList.add('done'), 2000);
  }

  // ─── NAVBAR SCROLL ───
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 40);
    const btt = document.querySelector('.back-to-top');
    btt?.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  // ─── HAMBURGER / MOBILE MENU ───
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.nav-mobile-menu');
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu?.classList.toggle('open');
  });
  // Close on link click
  mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  // ─── BACK TO TOP ───
  document.querySelector('.back-to-top')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ─── SCROLL REVEAL ───
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => revealObserver.observe(el));

  // ─── COUNTER ANIMATION ───
  function animateCounter(el, target, duration = 1500) {
    const start = performance.now();
    const startVal = 0;
    const update = (time) => {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(startVal + (target - startVal) * eased);
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        animateCounter(el, target);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.count-up').forEach(el => counterObserver.observe(el));

  // ─── FAQ ACCORDION ───
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-question')?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      // Open clicked if wasn't open
      if (!isOpen) item.classList.add('open');
    });
  });

  // ─── ACTIVE NAV LINK (current page) ───
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // ─── GENERATE FLOATING DOTS ───
  const heroDots = document.querySelector('.hero-dots');
  if (heroDots) {
    for (let i = 0; i < 16; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot';
      dot.style.cssText = `
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        --dur: ${3 + Math.random() * 4}s;
        --delay: ${Math.random() * 5}s;
      `;
      heroDots.appendChild(dot);
    }
  }

  // ─── CONTACT FORM ───
  const form = document.querySelector('.contact-form-main');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = '✓ Message Sent!';
    btn.disabled = true;
    btn.style.background = '#2d7a47';
    setTimeout(() => {
      btn.textContent = orig;
      btn.disabled = false;
      btn.style.background = '';
      form.reset();
    }, 3000);
  });

});
