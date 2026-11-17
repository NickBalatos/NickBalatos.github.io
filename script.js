(() => {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- Theme toggle ----------
  const isDark = () =>
    root.dataset.theme ? root.dataset.theme === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;

  document.getElementById('themeToggle').addEventListener('click', () => {
    const next = isDark() ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  document.getElementById('year').textContent = new Date().getFullYear();

  // ---------- Scroll reveal + thesis bars ----------
  const revealTargets = document.querySelectorAll('.section__head, .about, .thesis, .tl, .skill-card, .certs li, .contact > *');
  revealTargets.forEach(el => el.classList.add('reveal'));
  const stats = document.getElementById('stats');

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  revealTargets.forEach(el => io.observe(el));
  io.observe(stats);

  // ---------- Hero "tracking" dot field ----------
  const canvas = document.getElementById('field');
  const ctx = canvas.getContext('2d');
  const GAP = 28;
  let w, h, dpr, dots = [];
  const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    dots = [];
    for (let y = GAP / 2; y < h; y += GAP)
      for (let x = GAP / 2; x < w; x += GAP) dots.push({ x, y });
    draw();
  }

  function colors() {
    const cs = getComputedStyle(root);
    return { dot: cs.getPropertyValue('--dot').trim(), accent: cs.getPropertyValue('--accent').trim() };
  }

  function draw() {
    const { dot, accent } = colors();
    ctx.clearRect(0, 0, w, h);
    const R = 160;
    for (const d of dots) {
      const dx = d.x - pointer.x, dy = d.y - pointer.y;
      const dist = Math.hypot(dx, dy);
      if (dist < R) {
        const k = 1 - dist / R;
        ctx.fillStyle = accent;
        ctx.globalAlpha = 0.15 + k * 0.85;
        ctx.beginPath();
        ctx.arc(d.x - dx * k * 0.18, d.y - dy * k * 0.18, 1.2 + k * 2.2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = dot;
        ctx.globalAlpha = 1;
        ctx.fillRect(d.x - 0.75, d.y - 0.75, 1.5, 1.5);
      }
    }
    ctx.globalAlpha = 1;

    // crosshair on the "tracked" point
    if (pointer.x > -1000) {
      ctx.strokeStyle = accent; ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(pointer.x, pointer.y, 14, 0, Math.PI * 2);
      ctx.moveTo(pointer.x - 22, pointer.y); ctx.lineTo(pointer.x - 8, pointer.y);
      ctx.moveTo(pointer.x + 8, pointer.y); ctx.lineTo(pointer.x + 22, pointer.y);
      ctx.moveTo(pointer.x, pointer.y - 22); ctx.lineTo(pointer.x, pointer.y - 8);
      ctx.moveTo(pointer.x, pointer.y + 8); ctx.lineTo(pointer.x, pointer.y + 22);
      ctx.stroke();
      ctx.font = '11px "JetBrains Mono", monospace';
      ctx.fillStyle = accent;
      ctx.fillText(`x:${Math.round(pointer.x)} y:${Math.round(pointer.y)}`, pointer.x + 20, pointer.y - 18);
    }
  }

  let raf = null;
  function loop() {
    pointer.x += (pointer.tx - pointer.x) * 0.18;
    pointer.y += (pointer.ty - pointer.y) * 0.18;
    draw();
    if (Math.abs(pointer.tx - pointer.x) > 0.3 || Math.abs(pointer.ty - pointer.y) > 0.3) raf = requestAnimationFrame(loop);
    else raf = null;
  }

  const hero = canvas.parentElement;
  hero.addEventListener('pointermove', e => {
    const r = canvas.getBoundingClientRect();
    pointer.tx = e.clientX - r.left; pointer.ty = e.clientY - r.top;
    if (reduceMotion || pointer.x < -1000) { pointer.x = pointer.tx; pointer.y = pointer.ty; draw(); return; }
    if (!raf) raf = requestAnimationFrame(loop);
  });
  hero.addEventListener('pointerleave', () => {
    pointer.x = pointer.y = pointer.tx = pointer.ty = -9999;
    if (raf) { cancelAnimationFrame(raf); raf = null; }
    draw();
  });

  window.addEventListener('resize', resize);
  new MutationObserver(draw).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', draw);
  resize();
})();
