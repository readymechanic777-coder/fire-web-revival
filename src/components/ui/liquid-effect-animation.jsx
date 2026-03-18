import { useEffect, useRef } from "react";

export function LiquidEffectAnimation() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let animationFrameId = 0;
    let width = 0;
    let height = 0;
    let reducedMotion = false;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion = mediaQuery.matches;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      width = parent?.clientWidth || window.innerWidth;
      height = parent?.clientHeight || window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const waves = [
      { amplitude: 18, wavelength: 0.012, speed: 0.9, offset: 0, alpha: 0.22 },
      { amplitude: 28, wavelength: 0.008, speed: 0.55, offset: Math.PI / 2, alpha: 0.16 },
      { amplitude: 12, wavelength: 0.02, speed: 1.3, offset: Math.PI, alpha: 0.1 },
    ];

    const draw = (time) => {
      const t = time * 0.001;
      context.clearRect(0, 0, width, height);

      const baseGradient = context.createLinearGradient(0, 0, 0, height);
      baseGradient.addColorStop(0, "hsla(191, 85%, 62%, 0.16)");
      baseGradient.addColorStop(0.45, "hsla(198, 90%, 52%, 0.1)");
      baseGradient.addColorStop(1, "hsla(222, 70%, 10%, 0.02)");
      context.fillStyle = baseGradient;
      context.fillRect(0, 0, width, height);

      waves.forEach((wave, index) => {
        context.beginPath();
        context.moveTo(0, height * (0.2 + index * 0.16));

        for (let x = 0; x <= width; x += 8) {
          const motion = reducedMotion ? 0 : t * wave.speed;
          const y =
            height * (0.2 + index * 0.16) +
            Math.sin(x * wave.wavelength + motion + wave.offset) * wave.amplitude +
            Math.cos(x * wave.wavelength * 0.45 + motion * 0.8) * wave.amplitude * 0.35;
          context.lineTo(x, y);
        }

        context.lineTo(width, height + 40);
        context.lineTo(0, height + 40);
        context.closePath();
        context.fillStyle = `hsla(190, 95%, 70%, ${wave.alpha})`;
        context.fill();
      });

      for (let i = 0; i < 10; i += 1) {
        const progress = ((reducedMotion ? i / 10 : (t * 0.08 + i * 0.11)) % 1);
        const y = height - progress * (height + 120);
        const x = width * (0.08 + i * 0.09) + Math.sin(t + i) * 16;
        const radius = 3 + (i % 3);

        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fillStyle = "hsla(191, 100%, 92%, 0.18)";
        context.fill();
        context.strokeStyle = "hsla(191, 100%, 92%, 0.28)";
        context.lineWidth = 1;
        context.stroke();
      }

      animationFrameId = window.requestAnimationFrame(draw);
    };

    const handleMotionChange = (event) => {
      reducedMotion = event.matches;
    };

    resizeCanvas();
    animationFrameId = window.requestAnimationFrame(draw);
    window.addEventListener("resize", resizeCanvas);
    mediaQuery.addEventListener?.("change", handleMotionChange);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      mediaQuery.removeEventListener?.("change", handleMotionChange);
      context.clearRect(0, 0, width, height);
    };
  }, []);

  return (
    <div className="absolute inset-0 m-0 h-full w-full touch-none overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}

