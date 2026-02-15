import { motion } from "framer-motion";
import { useMemo } from "react";

const WaterSurface = () => {
  const causticLayers = useMemo(() => [
    { id: 0, size: 900, x: '20%', y: '30%', hue: 190, duration: 8, delay: 0 },
    { id: 1, size: 700, x: '60%', y: '50%', hue: 175, duration: 10, delay: 1 },
    { id: 2, size: 600, x: '40%', y: '70%', hue: 200, duration: 7, delay: 2 },
    { id: 3, size: 800, x: '75%', y: '25%', hue: 185, duration: 9, delay: 0.5 },
    { id: 4, size: 500, x: '15%', y: '60%', hue: 195, duration: 11, delay: 1.5 },
    { id: 5, size: 650, x: '50%', y: '40%', hue: 188, duration: 13, delay: 3 },
  ], []);

  return (
    <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
      {/* Animated caustic light network — more visible */}
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
              radial-gradient(ellipse 60% 40% at 30% 40%, hsl(${layer.hue}, 100%, 55% / 0.2) 0%, transparent 60%),
              radial-gradient(ellipse 40% 60% at 70% 60%, hsl(${layer.hue}, 80%, 50% / 0.14) 0%, transparent 50%)
            `,
            filter: 'url(#water-distortion)',
          }}
          animate={{
            x: [0, 40 * (layer.id % 2 ? 1 : -1), -30, 0],
            y: [0, -30, 35 * (layer.id % 2 ? -1 : 1), 0],
            scale: [1, 1.2, 0.85, 1],
            opacity: [0.7, 1, 0.6, 0.7],
          }}
          transition={{
            duration: layer.duration,
            repeat: Infinity,
            delay: layer.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Underwater light rays — stronger */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(175deg, transparent 25%, hsl(190, 100%, 50% / 0.07) 40%, transparent 55%),
            linear-gradient(185deg, transparent 35%, hsl(175, 100%, 50% / 0.05) 50%, transparent 65%),
            linear-gradient(170deg, transparent 15%, hsl(200, 80%, 50% / 0.05) 30%, transparent 45%)
          `,
        }}
        animate={{
          opacity: [0.6, 1, 0.6],
          x: [0, 20, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Surface shimmer — stronger */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[50%]"
        style={{
          background: `
            linear-gradient(180deg, 
              hsl(190, 100%, 50% / 0.1) 0%, 
              hsl(190, 100%, 50% / 0.04) 40%,
              transparent 100%
            )
          `,
        }}
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Moving water caustic pattern overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 100px 60px at 20% 30%, hsl(190, 100%, 60% / 0.08) 0%, transparent 100%),
            radial-gradient(ellipse 80px 120px at 60% 70%, hsl(175, 100%, 55% / 0.06) 0%, transparent 100%),
            radial-gradient(ellipse 120px 80px at 80% 20%, hsl(200, 90%, 55% / 0.07) 0%, transparent 100%),
            radial-gradient(ellipse 90px 90px at 40% 50%, hsl(190, 100%, 50% / 0.05) 0%, transparent 100%)
          `,
        }}
        animate={{
          backgroundPosition: ['0% 0%', '5% 3%', '-3% 5%', '0% 0%'],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

export default WaterSurface;
