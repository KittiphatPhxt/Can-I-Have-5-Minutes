"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  alphaSpeed: number;
  vx: number;
  vy: number;
}

export default function AmbientDust() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Create particles
    const particleCount = Math.min(50, Math.floor((width * height) / 25000));
    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.6 + 0.6,
      baseAlpha: Math.random() * 0.4 + 0.15,
      alpha: Math.random() * 0.5 + 0.1,
      alphaSpeed: (Math.random() * 0.008 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
      vx: (Math.random() - 0.5) * 0.25,
      vy: -(Math.random() * 0.35 + 0.1), // Drift slowly upwards
    }));

    let isRunning = true;

    const render = () => {
      if (!isRunning) return;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Motion
        p.x += p.vx;
        p.y += p.vy;

        // Twinkle
        p.alpha += p.alphaSpeed;
        if (p.alpha > p.baseAlpha + 0.25 || p.alpha < 0.08) {
          p.alphaSpeed = -p.alphaSpeed;
        }

        // Wrap around boundaries
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(215, 185, 125, ${Math.max(0, Math.min(1, p.alpha))})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = "rgba(200, 169, 110, 0.4)";
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
      } else {
        isRunning = true;
        render();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    render();

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] opacity-70"
      aria-hidden="true"
    />
  );
}
