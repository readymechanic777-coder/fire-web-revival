import { useEffect, useRef, useId } from "react";

export function LiquidEffectAnimation() {
  const canvasRef = useRef(null);
  const uid = useId().replace(/:/g, "");
  const canvasId = `liquid-canvas-${uid}`;

  useEffect(() => {
    if (!canvasRef.current) return;

    // To prevent re-running if already mounted in strict mode or same id
    if (canvasRef.current.dataset.initialized) return;
    canvasRef.current.dataset.initialized = "true";

    const script = document.createElement("script");
    script.type = "module";
    script.textContent = `
      import LiquidBackground from "https://cdn.jsdelivr.net/npm/threejs-components@0.0.22/build/backgrounds/liquid1.min.js";

      const canvas = document.getElementById("${canvasId}");

      if (canvas) {
        const app = LiquidBackground(canvas);

        app.loadImage("https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80");
        app.liquidPlane.material.metalness = 0.4;
        app.liquidPlane.material.roughness = 0.4;
        app.liquidPlane.uniforms.displacementScale.value = 5;
        app.setRain(false);
      }
    `;

    document.body.appendChild(script);

    return () => {
      // cleanup script if needed
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [canvasId]);


  return (
    <div
      className="absolute inset-0 m-0 w-full h-full touch-none overflow-hidden pointer-events-none"
    >
      <canvas
        ref={canvasRef}
        id={canvasId}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}

