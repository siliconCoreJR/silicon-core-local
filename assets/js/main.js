/* ============================================================
   SILICONCORE LOCAL — Main JavaScript
   Hamburger nav, sliders, sticky header, smooth interactions
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Sticky Header ───────────────────────────────────────── */
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Hamburger Menu ──────────────────────────────────────── */
  const hamburger  = document.querySelector('.hamburger');
  const navOverlay = document.querySelector('.nav-overlay');

  if (hamburger && navOverlay) {
    hamburger.addEventListener('click', () => {
      const isOpen = navOverlay.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  /* Close nav on link click */
  document.querySelectorAll('.nav-overlay a').forEach(link => {
    link.addEventListener('click', () => {
      navOverlay.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* Close nav on Escape */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navOverlay && navOverlay.classList.contains('open')) {
      navOverlay.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  /* ── Nav Folder Dropdowns ────────────────────────────────── */
  document.querySelectorAll('.nav-folder-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const folder = toggle.closest('.nav-folder');
      if (folder) folder.classList.toggle('open');
    });
  });

  /* ── Hero Slider ─────────────────────────────────────────── */
  initSlider('.hero-slider', '.hero-slide', 5000);

  /* ── Features Slider ─────────────────────────────────────── */
  initSlider('.features-slider-wrap', '.features-slide', 0, '[data-prev="features"]', '[data-next="features"]');

  /* ── Experience Slider ───────────────────────────────────── */
  initSlider('.experience-slider', '.experience-slide', 0, '[data-prev="exp"]', '[data-next="exp"]');

  /* ── Displays Slider ─────────────────────────────────────── */
  initSlider('.displays-slider', '.displays-slide', 0, '[data-prev="disp"]', '[data-next="disp"]');

  /* ── Generic Slider Factory ──────────────────────────────── */
  function initSlider(wrapSel, slideSel, autoInterval, prevSel, nextSel) {
    const wrap = document.querySelector(wrapSel);
    if (!wrap) return;
    const slides = wrap.querySelectorAll(slideSel);
    if (!slides.length) return;

    let current = 0;
    let timer = null;

    const show = (idx) => {
      slides.forEach((s, i) => s.classList.toggle('active', i === idx));
      current = idx;
    };

    const next = () => show((current + 1) % slides.length);
    const prev = () => show((current - 1 + slides.length) % slides.length);

    show(0);

    if (autoInterval) {
      timer = setInterval(next, autoInterval);
      wrap.addEventListener('mouseenter', () => clearInterval(timer));
      wrap.addEventListener('mouseleave', () => { timer = setInterval(next, autoInterval); });
    }

    if (prevSel) {
      document.querySelectorAll(prevSel).forEach(btn => btn.addEventListener('click', prev));
    }
    if (nextSel) {
      document.querySelectorAll(nextSel).forEach(btn => btn.addEventListener('click', next));
    }

    /* arrow buttons inside the slider */
    wrap.querySelectorAll('.slider-prev, .prev-btn, [data-dir="prev"]').forEach(b => b.addEventListener('click', prev));
    wrap.querySelectorAll('.slider-next, .next-btn, [data-dir="next"]').forEach(b => b.addEventListener('click', next));
  }

  /* ── Hero arrows ─────────────────────────────────────────── */
  const heroSlider = document.querySelector('.hero-slider');
  if (heroSlider) {
    heroSlider.querySelector('.hero-prev')?.addEventListener('click', () => {
      const slides = heroSlider.querySelectorAll('.hero-slide');
      const cur = [...slides].findIndex(s => s.classList.contains('active'));
      slides.forEach(s => s.classList.remove('active'));
      slides[(cur - 1 + slides.length) % slides.length].classList.add('active');
    });
    heroSlider.querySelector('.hero-next')?.addEventListener('click', () => {
      const slides = heroSlider.querySelectorAll('.hero-slide');
      const cur = [...slides].findIndex(s => s.classList.contains('active'));
      slides.forEach(s => s.classList.remove('active'));
      slides[(cur + 1) % slides.length].classList.add('active');
    });
  }

  /* ── Scroll to section (Sign Up link) ───────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── Active nav link ─────────────────────────────────────── */
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-sub a, .nav-item > a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === path || (href !== '/' && path.startsWith(href))) {
      a.style.color = 'var(--color-red)';
    }
  });

});
