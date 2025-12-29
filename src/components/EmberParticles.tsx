import { motion } from "framer-motion";
import { useMemo } from "react";

const EmberParticles = () => {
  // Memoize ember data to prevent recalculation on re-renders
  const embers = useMemo(() => 
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 4,
      size: 2 + Math.random() * 3,
    })), []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none contain-paint">
      {embers.map((ember) => (
        <motion.div
          key={ember.id}
          className="absolute rounded-full bg-gradient-fire will-animate"
          style={{
            left: `${ember.x}%`,
            bottom: 0,
            width: ember.size,
            height: ember.size,
            willChange: 'transform, opacity',
          }}
          animate={{
            y: [0, -400, -600],
            opacity: [1, 0.6, 0],
            scale: [1, 0.5, 0],
          }}
          transition={{
            duration: ember.duration,
            delay: ember.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

export default EmberParticles;
