import { useEffect, useRef } from "react";

export default function CyberAnimatedBG() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      color: Math.random() > 0.5 ? "#DC2626" : "#3B82F6",
      alpha: Math.random() * 0.5 + 0.2,
    }));

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function draw() {
      const w = canvas!.width;
      const h = canvas!.height;
      ctx!.clearRect(0, 0, w, h);

      ctx!.fillStyle = "#0a0a0f";
      ctx!.fillRect(0, 0, w, h);

      const horizon = h * 0.42;
      const numLines = 12;
      const speed = 0.0004;
      const phase = (t * speed) % (1 / numLines);

      ctx!.strokeStyle = "rgba(220,38,38,0.12)";
      ctx!.lineWidth = 0.8;

      for (let i = 0; i <= numLines; i++) {
        const progress = (i / numLines + phase) % 1;
        const perspective = progress ** 2.5;
        const y = horizon + (h - horizon) * perspective;
        const xLeft = w / 2 - (w / 2) * perspective * 1.8;
        const xRight = w / 2 + (w / 2) * perspective * 1.8;
        ctx!.beginPath();
        ctx!.moveTo(xLeft, y);
        ctx!.lineTo(xRight, y);
        ctx!.stroke();
      }

      const numVLines = 10;
      for (let i = 0; i <= numVLines; i++) {
        const xRatio = i / numVLines;
        const vanishX = w / 2;
        const baseX = xRatio * w;
        ctx!.beginPath();
        ctx!.moveTo(vanishX + (baseX - vanishX) * 0.01, horizon);
        ctx!.lineTo(baseX, h);
        ctx!.stroke();
      }

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = p.color;
        ctx!.globalAlpha = p.alpha * (0.7 + 0.3 * Math.sin(t * 0.002 + p.x));
        ctx!.fill();
        ctx!.globalAlpha = 1;
      }

      const scanY = (t * 0.05) % h;
      ctx!.fillStyle = "rgba(220,38,38,0.03)";
      ctx!.fillRect(0, scanY, w, 2);

      t++;
      animId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        display: "block",
      }}
    />
  );
}
