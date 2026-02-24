import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CursorRipple = () => {
  const [ripples, setRipples] = useState([]);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const lastRippleTime = useRef(0);

  const handleMouseMove = useCallback((e) => {
    setIsActive(true);
    setCursorPos({ x: e.clientX, y: e.clientY });

    const now = Date.now();
    if (now - lastRippleTime.current > 40) {
      lastRippleTime.current = now;
      const speed = Math.sqrt(
        Math.pow(e.movementX || 0, 2) + Math.pow(e.movementY || 0, 2)
      );
      if (speed > 2) {
        const size = Math.min(180, 50 + speed * 5);
        setRipples((prev) => {
          const next = [
            ...prev,
            { id: now + Math.random(), x: e.clientX, y: e.clientY, size, speed: Math.min(speed, 40) },
          ];
          return next.length > 20 ? next.slice(-20) : next;
        });
      }
    }
  }, []);

  const handleClick = useCallback((e) => {
    const now = Date.now();
    setRipples((prev) => [
      ...prev,
      { id: now + 0.1, x: e.clientX, y: e.clientY, size: 220, speed: 50, isClick: true },
      { id: now + 0.2, x: e.clientX, y: e.clientY, size: 150, speed: 30, isClick: true },
      { id: now + 0.3, x: e.clientX, y: e.clientY, size: 90, speed: 15, isClick: true },
    ]);
  }, []);

  const handleMouseLeave = useCallback(() => setIsActive(false), []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    window.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleClick, handleMouseLeave]);

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
    <div className="fixed inset-0 pointer-events-none z-[50] overflow-hidden">
      {/* Underwater glow following cursor */}
      {isActive && (
        <>
          <div
            className="absolute rounded-full transition-all duration-75"
            style={{
              left: cursorPos.x,
              top: cursorPos.y,
              width: 200,
              height: 200,
              transform: "translate(-50%, -50%)",
              background: `radial-gradient(circle, hsl(190, 100%, 60% / 0.12) 0%, transparent 60%)`,
            }}
          />
          <div
            className="absolute rounded-full transition-all duration-150"
            style={{
              left: cursorPos.x,
              top: cursorPos.y,
              width: 400,
              height: 400,
              transform: "translate(-50%, -50%)",
              background: `radial-gradient(circle, hsl(190, 100%, 50% / 0.06) 0%, transparent 70%)`,
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
            <div
              className="absolute inset-0 rounded-full"
              style={{
                border: `2px solid hsl(190, 100%, 65% / ${ripple.isClick ? 0.6 : 0.4})`,
                boxShadow: `0 0 20px hsl(190, 100%, 50% / 0.2), inset 0 0 15px hsl(190, 100%, 50% / 0.1)`,
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                inset: "20%",
                border: `1.5px solid hsl(190, 100%, 75% / ${ripple.isClick ? 0.35 : 0.2})`,
              }}
            />
            <div
              className="absolute rounded-full"
              style={{ inset: "40%", border: "1px solid hsl(190, 100%, 80% / 0.12)" }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CursorRipple;
