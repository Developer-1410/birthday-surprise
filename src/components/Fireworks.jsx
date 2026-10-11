
import { useEffect, useRef } from "react";

const COLORS = [
  "#ff4fa3",
  "#ffdd66",
  "#b77aff",
  "#66e5ff",
  "#ff7777",
  "#ffffff",
];

export default function Fireworks({ active = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    let width;
    let height;
    let animationId;
    let lastLaunch = 0;
    let lastFrame = 0;

    const rockets = [];
    const particles = [];

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * ratio;
      canvas.height = height * ratio;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const launchRocket = () => {
      const x = width * (0.15 + Math.random() * 0.7);
      const targetY = height * (0.12 + Math.random() * 0.38);

      rockets.push({
        x,
        y: height + 20,
        targetY,
        speed: 7 + Math.random() * 3,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        trail: [],
      });
    };

    const explode = (x, y, color) => {
      const count = width < 500 ? 30 : 65;
      const offset = Math.random() * Math.PI * 2;

      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + offset;
        const speed = 1.4 + Math.random() * 3.6;

        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          decay: 0.009 + Math.random() * 0.009,
          color,
          size: 1 + Math.random() * 1.7,
          trail: [],
        });
      }
    };

    const draw = (time) => {
      animationId = requestAnimationFrame(draw);

      if (time - lastFrame < 1000 / 30) return;
      lastFrame = time;

      ctx.clearRect(0, 0, width, height);

      const launchDelay = width < 500 ? 1500 : 1000;

      if (time - lastLaunch > launchDelay) {
        launchRocket();
        lastLaunch = time;
      }

      for (let i = rockets.length - 1; i >= 0; i--) {
        const rocket = rockets[i];

        rocket.trail.push({ x: rocket.x, y: rocket.y });
        if (rocket.trail.length > 7) rocket.trail.shift();

        rocket.y -= rocket.speed;

        ctx.beginPath();
        ctx.moveTo(rocket.trail[0].x, rocket.trail[0].y);

        rocket.trail.forEach((point) => {
          ctx.lineTo(point.x, point.y);
        });

        ctx.strokeStyle = rocket.color;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 6;
        ctx.shadowColor = rocket.color;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(rocket.x, rocket.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        if (rocket.y <= rocket.targetY) {
          explode(rocket.x, rocket.y, rocket.color);
          rockets.splice(i, 1);
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 4) p.trail.shift();

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.025;
        p.vx *= 0.99;
        p.alpha -= p.decay;

        ctx.save();
        ctx.globalAlpha = Math.max(p.alpha, 0);
        ctx.strokeStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 0;
        ctx.lineWidth = p.size;

        ctx.beginPath();

        if (p.trail.length > 0) {
          ctx.moveTo(p.trail[0].x, p.trail[0].y);

          p.trail.forEach((point) => {
            ctx.lineTo(point.x, point.y);
          });
        }

        ctx.lineTo(p.x, p.y);
        ctx.stroke();

        ctx.restore();

        if (p.alpha <= 0) {
          particles.splice(i, 1);
        }
      }

      ctx.shadowBlur = 0;
    };

    launchRocket();
    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="fireworks-canvas"
      aria-hidden="true"
    />
  );
}
