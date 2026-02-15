import { motion } from "framer-motion";
import { useMemo } from "react";

/**
 * Renders animated water caustic light patterns on the hero background.
 * Uses layered radial gradients with independent motion for organic feel.
 */
const WaterSurface = () => {
  const causticLayers = useMemo(() => [
    { id: 0, size: 800, x: '20%', y: '30%', hue: 190, duration: 8, delay: 0 },
    { id: 1, size: 600, x: '60%', y: '50%', hue: 175, duration: 10, delay: 1 },
    { id: 2, size: 500, x: '40%', y: '70%', hue: 200, duration: 7, delay: 2 },
    { id: 3, size: 700, x: '75%', y: '25%', hue: 185, duration: 9, delay: 0.5 },
    { id: 4, size: 400, x: '15%', y: '60%', hue: 195, duration: 11, delay: 1.5 },
  ], []);

  return (
    <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
      {/* Animated caustic light network */}
      {causticLayers.map((layer) => (
        <motion.div
          key={layer.id}
          className="absolute rounded-full mix-blend-screen"
          style={{
            width: layer.size,
            height: layer.size,
            left: layer.x,
            top: layer.y,
            transform: 'translate(-50%, -50%)',
            background: `
              radial-gradient(ellipse 60% 40% at 30% 40%, hsl(${layer.hue}, 100%, 55% / 0.12) 0%, transparent 60%),
              radial-gradient(ellipse 40% 60% at 70% 60%, hsl(${layer.hue}, 80%, 50% / 0.08) 0%, transparent 50%)
            `,
            filter: 'url(#water-distortion)',
          }}
          animate={{
            x: [0, 30 * (layer.id % 2 ? 1 : -1), -20, 0],
            y: [0, -20, 25 * (layer.id % 2 ? -1 : 1), 0],
            scale: [1, 1.15, 0.9, 1],
            opacity: [0.6, 0.9, 0.5, 0.6],
          }}
          transition={{
            duration: layer.duration,
            repeat: Infinity,
            delay: layer.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Underwater light rays */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(175deg, transparent 30%, hsl(190, 100%, 50% / 0.04) 45%, transparent 60%),
            linear-gradient(185deg, transparent 40%, hsl(175, 100%, 50% / 0.03) 55%, transparent 70%),
            linear-gradient(170deg, transparent 20%, hsl(200, 80%, 50% / 0.03) 35%, transparent 50%)
          `,
        }}
        animate={{
          opacity: [0.5, 1, 0.5],
          x: [0, 15, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Surface shimmer */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[40%]"
        style={{
          background: `
            linear-gradient(180deg, 
              hsl(190, 100%, 50% / 0.06) 0%, 
              hsl(190, 100%, 50% / 0.02) 30%,
              transparent 100%
            )
          `,
        }}
        animate={{
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

export default WaterSurface;
