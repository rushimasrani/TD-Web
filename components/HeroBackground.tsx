import React, { useEffect, useRef } from 'react';

const HeroBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: AnimationParticle[] = [];
    let animationFrameId: number;
    let mouse = { x: -1000, y: -1000 };

    class AnimationParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        // Very slow random movement
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 2 + 1; // Size 1-3
      }

      update(w: number, h: number) {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
        if (!canvas) return;
        particles = [];
        const w = canvas.width;
        const h = canvas.height;
        // Adjust density: fewer particles on mobile for performance
        const density = window.innerWidth < 768 ? 9000 : 13000;
        const numberOfParticles = Math.floor((w * h) / density);
        
        for (let i = 0; i < numberOfParticles; i++) {
            particles.push(new AnimationParticle(w, h));
        }
    };

    const handleResize = () => {
        if (!canvas) return;
        const parent = canvas.parentElement;
        if (parent) {
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;
        }
        initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    };
    
    // Initial setup
    handleResize();

    const animate = () => {
        if (!ctx || !canvas) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.update(canvas.width, canvas.height);
            p.draw();
        });

        // Draw connections
        particles.forEach((a, i) => {
            // Mouse connection (Interactive part)
            const dxM = a.x - mouse.x;
            const dyM = a.y - mouse.y;
            const distM = Math.sqrt(dxM * dxM + dyM * dyM);
            const mouseInteractionDist = 180;
            
            if (distM < mouseInteractionDist) {
                // Brand red color for mouse interaction, fading out
                ctx.strokeStyle = `rgba(220, 38, 38, ${0.4 * (1 - distM / mouseInteractionDist)})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }

            // Particle-to-Particle connection
            for (let j = i + 1; j < particles.length; j++) {
                const b = particles[j];
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                const connectionDist = 130;

                if (dist < connectionDist) {
                    // White subtle lines
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.08 * (1 - dist / connectionDist)})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                }
            }
        });

        animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
        cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-[1]" />;
};

export default HeroBackground;