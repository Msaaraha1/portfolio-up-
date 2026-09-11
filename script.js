/* ── Navbar scroll + active link ── */
(function () {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
  });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  document.querySelectorAll('.mob-link').forEach(l => {
    l.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });
})();

/* ── Smooth scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

/* ── Reveal on scroll ── */
(function () {
  const targets = document.querySelectorAll(
    '.skill-card, .project-card, .about-grid, .contact-grid, .hero-content'
  );
  targets.forEach(el => el.classList.add('reveal'));

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(el => obs.observe(el));
})();

/* ── Skill bars ── */
(function () {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.skill-fill').forEach(bar => {
          bar.style.width = bar.dataset.width + '%';
        });
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.skills-grid').forEach(el => obs.observe(el));
})();

/* ── Counter animation ── */
(function () {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.stat-num').forEach(el => {
          const target = +el.dataset.target;
          let val = 0;
          const step = target / 50;
          const t = setInterval(() => {
            val = Math.min(val + step, target);
            el.textContent = Math.floor(val);
            if (val >= target) clearInterval(t);
          }, 28);
        });
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('.about-stats').forEach(el => obs.observe(el));
})();

/* ── Tilt effect on project cards ── */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ── Contact form ── */
const form = document.getElementById('contactForm');
form && form.addEventListener('submit', e => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.innerHTML = '✓ Message Sent! <i class="fas fa-check"></i>';
  btn.style.background = 'linear-gradient(135deg,#22c55e,#16a34a)';
  setTimeout(() => {
    btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
    btn.style.background = '';
    form.reset();
  }, 3000);
});

/* ── Typed text effect in hero ── */
(function () {
  const roles = ['Full Stack Developer', 'Creative Coder', 'UI/UX Enthusiast', 'Open Source Lover'];
  const el = document.querySelector('.hero-subtitle');
  if (!el) return;
  let ri = 0, ci = 0, deleting = false;

  function type() {
    const current = roles[ri];
    el.textContent = deleting ? current.slice(0, ci--) : current.slice(0, ci++);

    if (!deleting && ci > current.length) {
      setTimeout(() => { deleting = true; type(); }, 1800);
      return;
    }
    if (deleting && ci < 0) {
      deleting = false;
      ri = (ri + 1) % roles.length;
    }
    setTimeout(type, deleting ? 40 : 80);
  }
  type();
})();
