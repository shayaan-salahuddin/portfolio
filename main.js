// ============================================
// SHAYAAN SALAHUDDIN — Shared JS
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // Custom cursor
  const cursor     = document.querySelector('.cursor');
  const cursorRing = document.querySelector('.cursor-ring');

  if (cursor && cursorRing) {
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
    });

    const animRing = () => {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      cursorRing.style.left = rx + 'px';
      cursorRing.style.top  = ry + 'px';
      requestAnimationFrame(animRing);
    };
    animRing();
  }

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        const delay = e.target.dataset.delay || 0;
        setTimeout(() => e.target.classList.add('visible'), delay);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => obs.observe(el));

  // Stagger children with data-stagger parent
  document.querySelectorAll('[data-stagger]').forEach(parent => {
    parent.querySelectorAll('.reveal').forEach((child, i) => {
      child.dataset.delay = i * 80;
    });
  });

  // Typing effect for elements with data-type
  document.querySelectorAll('[data-type]').forEach(el => {
    const text  = el.dataset.type;
    const speed = parseInt(el.dataset.speed || 45);
    el.textContent = '';
    let i = 0;
    const cursor = document.createElement('span');
    cursor.style.cssText = 'animation: blink 1s step-end infinite; color: var(--green);';
    cursor.textContent = '_';
    el.appendChild(cursor);
    const type = () => {
      if (i < text.length) {
        el.insertBefore(document.createTextNode(text[i++]), cursor);
        setTimeout(type, speed);
      } else {
        setTimeout(() => cursor.remove(), 1200);
      }
    };
    setTimeout(type, 400);
  });

  // Active nav link
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + current
        ? 'var(--white)' : '';
    });
  }, { passive: true });

});
