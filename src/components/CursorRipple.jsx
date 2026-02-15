import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CursorRipple = () => {
  const [ripples, setRipples] = useState([]);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isInHero, setIsInHero] = useState(false);
  const lastRippleTime = useRef(0);
  const frameRef = useRef(null);

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
      // Spawn a ripple every 120ms while moving
      if (now - lastRippleTime.current > 120) {
        lastRippleTime.current = now;
        setRipples((prev) => {
          const next = [
            ...prev,
            { id: now + Math.random(), x, y, size: 60 + Math.random() * 40 },
          ];
          return next.length > 8 ? next.slice(-8) : next;
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

  // Clean up old ripples
  useEffect(() => {
    const interval = setInterval(() => {
      setRipples((prev) => {
        const now = Date.now();
        return prev.filter((r) => now - r.id < 1200);
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-[5] overflow-hidden">
      {/* Subtle cursor glow */}
      {isInHero && (
        <div
          className="absolute w-48 h-48 rounded-full transition-all duration-100"
          style={{
            left: cursorPos.x,
            top: cursorPos.y,
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, hsl(190, 100%, 50% / 0.06) 0%, transparent 70%)",
          }}
        />
      )}

      {/* Ripple rings */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="absolute rounded-full"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 2.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {/* Outer ring */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                border: "1px solid hsl(190, 100%, 60% / 0.3)",
                boxShadow:
                  "0 0 8px hsl(190, 100%, 50% / 0.15), inset 0 0 8px hsl(190, 100%, 50% / 0.05)",
              }}
            />
            {/* Inner ring */}
            <div
              className="absolute rounded-full"
              style={{
                inset: "20%",
                border: "1px solid hsl(190, 100%, 70% / 0.15)",
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CursorRipple;
