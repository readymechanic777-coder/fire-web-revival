import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CursorRipple = () => {
  const [ripples, setRipples] = useState([]);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isInHero, setIsInHero] = useState(false);
  const lastRippleTime = useRef(0);

  const handleMouseMove = useCallback((e) => {
    const heroSection = document.getElementById('hero-section');
    if (!heroSection) return;

    const rect = heroSection.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
      setIsInHero(true);
      setCursorPos({ x, y });

      const now = Date.now();
      if (now - lastRippleTime.current > 80) {
        lastRippleTime.current = now;
        const speed = Math.sqrt(
          Math.pow(e.movementX || 0, 2) + Math.pow(e.movementY || 0, 2)
        );
        const size = Math.min(120, 40 + speed * 3);
        setRipples((prev) => {
          const next = [
            ...prev,
            { id: now + Math.random(), x, y, size, speed: Math.min(speed, 30) },
          ];
          return next.length > 12 ? next.slice(-12) : next;
        });
      }
    } else {
      setIsInHero(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRipples((prev) => {
        const now = Date.now();
        return prev.filter((r) => now - r.id < 1800);
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-[5] overflow-hidden">
      {/* Realistic water surface distortion around cursor */}
      {isInHero && (
        <>
          {/* Primary refraction lens */}
          <div
            className="absolute rounded-full transition-all duration-75"
            style={{
              left: cursorPos.x,
              top: cursorPos.y,
              width: 200,
              height: 200,
              transform: "translate(-50%, -50%)",
              background: `
                radial-gradient(circle at 40% 35%, hsl(190, 100%, 70% / 0.08) 0%, transparent 40%),
                radial-gradient(circle, hsl(190, 100%, 50% / 0.05) 0%, transparent 60%)
              `,
              filter: 'url(#ripple-distort)',
            }}
          />
          {/* Light caustic following cursor */}
          <div
            className="absolute rounded-full transition-all duration-150"
            style={{
              left: cursorPos.x,
              top: cursorPos.y,
              width: 300,
              height: 300,
              transform: "translate(-50%, -50%)",
              background: `
                radial-gradient(ellipse 60% 50% at 45% 40%, hsl(190, 100%, 60% / 0.06) 0%, transparent 50%),
                radial-gradient(circle, hsl(190, 100%, 50% / 0.03) 0%, transparent 70%)
              `,
            }}
          />
        </>
      )}

      {/* Water ripple rings with realistic refraction */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="absolute"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{ scale: 0, opacity: 0.7 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Outer water ring with refraction highlight */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                border: "1.5px solid hsl(190, 100%, 65% / 0.35)",
                boxShadow: `
                  0 0 12px hsl(190, 100%, 50% / 0.15),
                  inset 0 0 12px hsl(190, 100%, 50% / 0.08),
                  0 0 4px hsl(190, 100%, 70% / 0.2)
                `,
              }}
            />
            {/* Inner refraction ring */}
            <div
              className="absolute rounded-full"
              style={{
                inset: "15%",
                border: "1px solid hsl(190, 100%, 75% / 0.2)",
                boxShadow: "inset 0 0 8px hsl(190, 100%, 50% / 0.06)",
              }}
            />
            {/* Surface tension ring */}
            <div
              className="absolute rounded-full"
              style={{
                inset: "35%",
                border: "0.5px solid hsl(190, 100%, 80% / 0.12)",
              }}
            />
            {/* Light spot on ripple */}
            <div
              className="absolute rounded-full"
              style={{
                top: '10%',
                left: '20%',
                width: '30%',
                height: '20%',
                background: 'radial-gradient(ellipse, hsl(190, 100%, 85% / 0.1) 0%, transparent 70%)',
                transform: 'rotate(-30deg)',
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CursorRipple;
