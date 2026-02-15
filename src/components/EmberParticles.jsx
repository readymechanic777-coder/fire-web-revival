import { motion } from "framer-motion";
import { useMemo } from "react";

const EmberParticles = () => {
  const bubbles = useMemo(() => 
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 4,
      size: 4 + Math.random() * 8,
      hue: 175 + Math.random() * 45,
    })), []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none contain-paint">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full will-animate"
          style={{
            left: `${bubble.x}%`,
            bottom: 0,
            width: bubble.size,
            height: bubble.size,
            background: `radial-gradient(circle at 30% 30%, hsl(${bubble.hue}, 100%, 80% / 0.6), hsl(${bubble.hue}, 100%, 50% / 0.3))`,
            border: `1px solid hsl(${bubble.hue}, 100%, 70% / 0.3)`,
            willChange: 'transform, opacity',
          }}
          animate={{
            y: [0, -400, -600],
            opacity: [0.6, 0.4, 0],
            scale: [1, 0.7, 0],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

export default EmberParticles;
