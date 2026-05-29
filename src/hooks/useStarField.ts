import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  brightness: number;
  twinkle: number;
  twinkleSpeed: number;
  originalX: number;
  originalY: number;
  angle: number;
  rotationSpeed: number;
}

function initStars(width: number, height: number): Star[] {
  return Array.from({ length: 200 }, () => {
    const x = Math.random() * width;
    const y = Math.random() * height;
    return {
      x, y,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      size: Math.random() * 3 + 0.5,
      brightness: Math.random() * 0.9 + 0.1,
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      originalX: x,
      originalY: y,
      angle: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.003,
    };
  });
}

function drawStars(ctx: CanvasRenderingContext2D, stars: Star[], time: number) {
  stars.forEach((star, index) => {
    star.angle += star.rotationSpeed;
    const orbitRadius = 30 + Math.sin(time + index * 0.1) * 15;
    star.x = star.originalX + Math.cos(star.angle) * orbitRadius + star.vx * time * 40;
    star.y = star.originalY + Math.sin(star.angle) * orbitRadius + star.vy * time * 40;

    // Wrap around edges
    const canvas = ctx.canvas;
    if (star.x < -50) star.originalX = canvas.width + 50;
    if (star.x > canvas.width + 50) star.originalX = -50;
    if (star.y < -50) star.originalY = canvas.height + 50;
    if (star.y > canvas.height + 50) star.originalY = -50;

    star.twinkle += star.twinkleSpeed;
    const twinkleFactor = Math.sin(star.twinkle) * 0.4 + 0.6;
    const pulseFactor = Math.sin(time * 2 + index * 0.5) * 0.1 + 0.9;
    const opacity = star.brightness * twinkleFactor * pulseFactor;

    // Halo
    if (star.size > 1.5) {
      const halo = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 4);
      halo.addColorStop(0, `rgba(135, 206, 250, ${opacity * 0.3})`);
      halo.addColorStop(1, 'rgba(135, 206, 250, 0)');
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size * 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Étoile
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
    ctx.fill();

    // Croix pour les grandes étoiles
    if (star.size > 2) {
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(star.x - star.size * 3, star.y);
      ctx.lineTo(star.x + star.size * 3, star.y);
      ctx.moveTo(star.x, star.y - star.size * 3);
      ctx.lineTo(star.x, star.y + star.size * 3);
      ctx.stroke();
    }
  });
}

function drawConstellations(ctx: CanvasRenderingContext2D, stars: Star[], time: number) {
  for (let i = 0; i < stars.length; i++) {
    for (let j = i + 1; j < stars.length; j++) {
      const dx = stars[i].x - stars[j].x;
      const dy = stars[i].y - stars[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 150) {
        const opacity = (1 - distance / 150) * 0.2 * Math.sin(time + i * 0.1) * 0.5 + 0.1;
        if (opacity > 0) {
          ctx.strokeStyle = `rgba(135, 206, 250, ${opacity})`;
          ctx.lineWidth = opacity * 2;
          ctx.beginPath();
          ctx.moveTo(stars[i].x, stars[i].y);
          ctx.lineTo(stars[j].x, stars[j].y);
          ctx.stroke();
        }
      }
    }
  }
}

function drawBackground(ctx: CanvasRenderingContext2D, time: number) {
  const canvas = ctx.canvas;
  const gradient = ctx.createRadialGradient(
    canvas.width / 2 + Math.sin(time * 0.5) * 100,
    canvas.height / 2 + Math.cos(time * 0.3) * 50,
    0,
    canvas.width / 2,
    canvas.height / 2,
    Math.max(canvas.width, canvas.height) * 0.8
  );
  gradient.addColorStop(0, `hsl(220, 60%, ${15 + Math.sin(time) * 3}%)`);
  gradient.addColorStop(0.4, `hsl(230, 50%, ${8 + Math.sin(time * 0.7) * 2}%)`);
  gradient.addColorStop(1, '#0d1b2a');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawMeteor(ctx: CanvasRenderingContext2D) {
  if (Math.random() >= 0.005) return;

  const meteorX = Math.random() * ctx.canvas.width;
  const meteorY = Math.random() * ctx.canvas.height * 0.3;
  const length = 80 + Math.random() * 40;
  const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.5;
  const endX = meteorX + Math.cos(angle) * length;
  const endY = meteorY + Math.sin(angle) * length;

  const meteorGradient = ctx.createLinearGradient(meteorX, meteorY, endX, endY);
  meteorGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
  meteorGradient.addColorStop(0.3, 'rgba(135, 206, 250, 0.6)');
  meteorGradient.addColorStop(1, 'rgba(135, 206, 250, 0)');

  ctx.strokeStyle = meteorGradient;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(meteorX, meteorY);
  ctx.lineTo(endX, endY);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(meteorX, meteorY, 3, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.fill();
}

export function useStarField(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let stars: Star[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = initStars(canvas.width, canvas.height);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let time = 0;
    let animationId: number;

    const animate = () => {
      time += 0.005;
      drawBackground(ctx, time);
      drawStars(ctx, stars, time);
      drawConstellations(ctx, stars, time);
      drawMeteor(ctx);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [canvasRef]);
}