import { useEffect, useRef } from 'react';

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars(); // Recréer les étoiles après redimensionnement
    };

    // Étoiles pour les constellations avec mouvement plus fluide
    let stars: Array<{
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
    }> = [];

    const initStars = () => {
      stars = [];
      // Créer des constellations réalistes qui bougent
      for (let i = 0; i < 200; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        stars.push({
          x,
          y,
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
        });
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let time = 0;

    const animate = () => {
      time += 0.005;

      // Fond dégradé bleu nuit avec variations temporelles
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

      // Animer et dessiner les étoiles avec mouvement orbital
      stars.forEach((star, index) => {
        // Mouvement orbital autour de la position originale
        star.angle += star.rotationSpeed;
        const orbitRadius = 30 + Math.sin(time + index * 0.1) * 15;
        star.x = star.originalX + Math.cos(star.angle) * orbitRadius + star.vx * time * 40;
        star.y = star.originalY + Math.sin(star.angle) * orbitRadius + star.vy * time * 40;

        // Wrap around edges
        if (star.x < -50) star.originalX = canvas.width + 50;
        if (star.x > canvas.width + 50) star.originalX = -50;
        if (star.y < -50) star.originalY = canvas.height + 50;
        if (star.y > canvas.height + 50) star.originalY = -50;

        // Effet de scintillement plus dynamique
        star.twinkle += star.twinkleSpeed;
        const twinkleFactor = Math.sin(star.twinkle) * 0.4 + 0.6;
        const pulseFactor = Math.sin(time * 2 + index * 0.5) * 0.1 + 0.9;

        // Dessiner l'étoile avec halo
        const opacity = star.brightness * twinkleFactor * pulseFactor;
        
        // Halo externe
        if (star.size > 1.5) {
          const haloGradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 4);
          haloGradient.addColorStop(0, `rgba(135, 206, 250, ${opacity * 0.3})`);
          haloGradient.addColorStop(1, 'rgba(135, 206, 250, 0)');
          ctx.fillStyle = haloGradient;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 4, 0, Math.PI * 2);
          ctx.fill();
        }

        // Étoile principale
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();

        // Effet de croix scintillante pour les grandes étoiles
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

      // Dessiner les lignes de constellation dynamiques
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

      // Ajouter des météores plus fréquents et spectaculaires
      if (Math.random() < 0.005) {
        const meteorX = Math.random() * canvas.width;
        const meteorY = Math.random() * canvas.height * 0.3;
        const length = 80 + Math.random() * 40;
        const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.5;
        
        const endX = meteorX + Math.cos(angle) * length;
        const endY = meteorY + Math.sin(angle) * length;
        
        // Trail principal
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
        
        // Éclat à l'origine
        ctx.beginPath();
        ctx.arc(meteorX, meteorY, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fill();
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  );
}