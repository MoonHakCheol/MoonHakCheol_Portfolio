// 의존성 없는 캔버스 컨페티. 잠깐 뿌리고 스스로 정리한다.
const COLORS = ['#2563eb', '#16a34a', '#dc2626', '#f59e0b', '#7c3aed', '#ec4899'];

export function launchConfetti() {
  if (typeof window === 'undefined') return;

  // 모션 최소화 설정을 존중한다.
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  const canvas = document.createElement('canvas');
  canvas.style.cssText =
    'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const resize = () => {
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();

  const W = () => window.innerWidth;
  const count = 140;
  const particles = Array.from({ length: count }, () => ({
    x: W() / 2 + (Math.random() - 0.5) * 200,
    y: window.innerHeight / 3,
    vx: (Math.random() - 0.5) * 12,
    vy: Math.random() * -14 - 4,
    size: Math.random() * 8 + 4,
    color: COLORS[(Math.random() * COLORS.length) | 0],
    rot: Math.random() * Math.PI,
    vr: (Math.random() - 0.5) * 0.3,
  }));

  const gravity = 0.35;
  const start = performance.now();
  const DURATION = 3500;

  function frame(now) {
    const elapsed = now - start;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      p.vy += gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = Math.max(0, 1 - elapsed / DURATION);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    });

    if (elapsed < DURATION) {
      requestAnimationFrame(frame);
    } else {
      window.removeEventListener('resize', resize);
      canvas.remove();
    }
  }

  window.addEventListener('resize', resize);
  requestAnimationFrame(frame);
}
