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
      if (now - lastRippleTime.current > 50) {
        lastRippleTime.current = now;
        const speed = Math.sqrt(
          Math.pow(e.movementX || 0, 2) + Math.pow(e.movementY || 0, 2)
        );
        const size = Math.min(160, 60 + speed * 4);
        setRipples((prev) => {
          const next = [
            ...prev,
            { id: now + Math.random(), x, y, size, speed: Math.min(speed, 40) },
          ];
          return next.length > 15 ? next.slice(-15) : next;
        });
      }
    } else {
      setIsInHero(false);
    }
  }, []);

  const handleClick = useCallback((e) => {
    const heroSection = document.getElementById('hero-section');
    if (!heroSection) return;
    const rect = heroSection.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
      const now = Date.now();
      // Big splash ripple on click
      setRipples((prev) => [
        ...prev,
        { id: now + 0.1, x, y, size: 200, speed: 50, isClick: true },
        { id: now + 0.2, x, y, size: 140, speed: 30, isClick: true },
        { id: now + 0.3, x, y, size: 80, speed: 15, isClick: true },
      ]);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, [handleMouseMove, handleClick]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRipples((prev) => {
        const now = Date.now();
        return prev.filter((r) => now - r.id < 2000);
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-[5] overflow-hidden">
      {/* Glow following cursor */}
      {isInHero && (
        <>
          <div
            className="absolute rounded-full transition-all duration-100"
            style={{
              left: cursorPos.x,
              top: cursorPos.y,
              width: 250,
              height: 250,
              transform: "translate(-50%, -50%)",
              background: `
                radial-gradient(circle at 40% 35%, hsl(190, 100%, 70% / 0.15) 0%, transparent 40%),
                radial-gradient(circle, hsl(190, 100%, 50% / 0.1) 0%, transparent 60%)
              `,
            }}
          />
          <div
            className="absolute rounded-full transition-all duration-200"
            style={{
              left: cursorPos.x,
              top: cursorPos.y,
              width: 400,
              height: 400,
              transform: "translate(-50%, -50%)",
              background: `
                radial-gradient(ellipse 60% 50% at 45% 40%, hsl(190, 100%, 60% / 0.1) 0%, transparent 50%),
                radial-gradient(circle, hsl(175, 100%, 50% / 0.06) 0%, transparent 70%)
              `,
            }}
          />
        </>
      )}

      {/* Water ripple rings */}
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
            initial={{ scale: 0, opacity: 0.9 }}
            animate={{ scale: ripple.isClick ? 4 : 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: ripple.isClick ? 2.2 : 1.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Outer ring — bright & visible */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                border: `2px solid hsl(190, 100%, 65% / ${ripple.isClick ? 0.6 : 0.45})`,
                boxShadow: `
                  0 0 20px hsl(190, 100%, 50% / 0.25),
                  inset 0 0 15px hsl(190, 100%, 50% / 0.12),
                  0 0 6px hsl(190, 100%, 70% / 0.3)
                `,
              }}
            />
            {/* Inner ring */}
            <div
              className="absolute rounded-full"
              style={{
                inset: "20%",
                border: `1.5px solid hsl(190, 100%, 75% / ${ripple.isClick ? 0.4 : 0.25})`,
                boxShadow: "inset 0 0 10px hsl(190, 100%, 50% / 0.08)",
              }}
            />
            {/* Third ring */}
            <div
              className="absolute rounded-full"
              style={{
                inset: "40%",
                border: "1px solid hsl(190, 100%, 80% / 0.15)",
              }}
            />
            {/* Caustic highlight on ripple */}
            <div
              className="absolute rounded-full"
              style={{
                top: '8%',
                left: '15%',
                width: '35%',
                height: '25%',
                background: 'radial-gradient(ellipse, hsl(190, 100%, 85% / 0.18) 0%, transparent 70%)',
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
