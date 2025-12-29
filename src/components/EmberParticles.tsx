import { motion } from "framer-motion";

const EmberParticles = () => {
  const embers = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 4 + Math.random() * 4,
    size: 2 + Math.random() * 4,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {embers.map((ember) => (
        <motion.div
          key={ember.id}
          className="absolute rounded-full bg-gradient-fire"
          style={{
            left: `${ember.x}%`,
            bottom: 0,
            width: ember.size,
            height: ember.size,
          }}
          animate={{
            y: [0, -500, -800],
            x: [0, (Math.random() - 0.5) * 100],
            opacity: [1, 0.8, 0],
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
