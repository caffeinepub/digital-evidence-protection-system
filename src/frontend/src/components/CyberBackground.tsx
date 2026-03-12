import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  glitching: boolean;
  glitchTimer: number;
}

interface BinaryDrop {
  x: number;
  y: number;
  speed: number;
  chars: string[];
  alpha: number;
  fontSize: number;
}

export default function CyberBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: Particle[] = [];
    const drops: BinaryDrop[] = [];
    const PARTICLE_COUNT = 60;
    const DROP_COUNT = 30;
    const CONNECTION_DIST = 120;
    const BINARY_CHARS = "01";
    let scanY = 0;
    let scanX = 0;
    let frame = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1,
        color: Math.random() > 0.5 ? "#DC2626" : "#16A34A",
        alpha: Math.random() * 0.5 + 0.3,
        glitching: false,
        glitchTimer: 0,
      });
    }

    const fontSize = 13;
    for (let i = 0; i < DROP_COUNT; i++) {
      drops.push({
        x: Math.random() * 1920,
        y: Math.random() * -600,
        speed: Math.random() * 1.2 + 0.4,
        chars: Array.from(
          { length: Math.floor(Math.random() * 12) + 6 },
          () => BINARY_CHARS[Math.floor(Math.random() * BINARY_CHARS.length)],
        ),
        alpha: Math.random() * 0.18 + 0.05,
        fontSize,
      });
    }

    function drawHexGrid() {
      if (!ctx || !canvas) return;
      const hexSize = 40;
      const hexWidth = hexSize * 2;
      const hexHeight = Math.sqrt(3) * hexSize;
      const cols = Math.ceil(canvas.width / hexWidth) + 2;
      const rows = Math.ceil(canvas.height / hexHeight) + 2;

      ctx.strokeStyle = "rgba(220,38,38,0.04)";
      ctx.lineWidth = 0.5;

      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
          const xOffset = (row % 2) * hexSize;
          const cx = col * hexWidth + xOffset;
          const cy = row * hexHeight;
          ctx.beginPath();
          for (let side = 0; side < 6; side++) {
            const angle = (Math.PI / 3) * side - Math.PI / 6;
            const px = cx + hexSize * Math.cos(angle);
            const py = cy + hexSize * Math.sin(angle);
            if (side === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.stroke();
        }
      }
    }

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      // Hex grid
      drawHexGrid();

      // Particle connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const opacity = (1 - dist / CONNECTION_DIST) * 0.2;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(220,38,38,${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Particles with glitch effect
      for (const p of particles) {
        // Random glitch trigger
        if (!p.glitching && Math.random() < 0.0008) {
          p.glitching = true;
          p.glitchTimer = Math.floor(Math.random() * 8) + 3;
        }
        if (p.glitching) {
          p.glitchTimer--;
          if (p.glitchTimer <= 0) p.glitching = false;
        }

        const displayAlpha = p.glitching ? Math.random() * 0.9 + 0.1 : p.alpha;

        ctx.beginPath();
        const isRed = p.color === "#DC2626";
        ctx.fillStyle = isRed
          ? `rgba(220,38,38,${displayAlpha})`
          : `rgba(22,163,74,${displayAlpha})`;

        if (p.glitching) {
          // Glitch: draw as a rectangle flash
          ctx.fillRect(p.x - p.size * 2, p.y - p.size, p.size * 4, p.size * 2);
        } else {
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      }

      // Binary drops
      for (const drop of drops) {
        ctx.font = `${drop.fontSize}px 'JetBrains Mono', monospace`;
        for (let idx = 0; idx < drop.chars.length; idx++) {
          const ch = drop.chars[idx];
          const fadeAlpha = drop.alpha * (1 - idx / drop.chars.length);
          ctx.fillStyle = `rgba(22,163,74,${fadeAlpha})`;
          ctx.fillText(ch, drop.x, drop.y + idx * drop.fontSize);
        }
        drop.y += drop.speed;
        if (drop.y > canvas.height + 200) {
          drop.y = -drop.chars.length * drop.fontSize - Math.random() * 200;
          drop.x = Math.random() * canvas.width;
          drop.chars = drop.chars.map(
            () => BINARY_CHARS[Math.floor(Math.random() * BINARY_CHARS.length)],
          );
        }
      }

      // Horizontal scan line (pulsing)
      const hScanAlpha = 0.25 + 0.15 * Math.sin(frame * 0.03);
      const hGrad = ctx.createLinearGradient(0, scanY, 0, scanY + 3);
      hGrad.addColorStop(0, "rgba(220,38,38,0)");
      hGrad.addColorStop(0.5, `rgba(220,38,38,${hScanAlpha})`);
      hGrad.addColorStop(1, "rgba(220,38,38,0)");
      ctx.fillStyle = hGrad;
      ctx.fillRect(0, scanY, canvas.width, 3);
      scanY += 1.2;
      if (scanY > canvas.height) scanY = 0;

      // Vertical scan line
      const vScanAlpha = 0.15 + 0.08 * Math.sin(frame * 0.02 + Math.PI);
      const vGrad = ctx.createLinearGradient(scanX, 0, scanX + 2, 0);
      vGrad.addColorStop(0, "rgba(22,163,74,0)");
      vGrad.addColorStop(0.5, `rgba(22,163,74,${vScanAlpha})`);
      vGrad.addColorStop(1, "rgba(22,163,74,0)");
      ctx.fillStyle = vGrad;
      ctx.fillRect(scanX, 0, 2, canvas.height);
      scanX += 0.7;
      if (scanX > canvas.width) scanX = 0;

      animId = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity: 0.4,
        zIndex: 1,
      }}
    />
  );
}
