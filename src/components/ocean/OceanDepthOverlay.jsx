import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useMemo } from "react";

// Rising bubbles CSS animation
const Bubble = ({ style }) => (
  <div
    className="absolute rounded-full"
    style={{
      ...style,
      animation: `bubbleFloat ${style.duration}s ease-in infinite`,
      animationDelay: `${style.delay}s`,
    }}
  />
);

const OceanDepthOverlay = ({ scrollProgress = 0 }) => {
  // Interpolate colors from surface to deep ocean
  const depthPhase = Math.min(scrollProgress, 1);
  
  // Surface: bright cyan -> mid: deep blue -> bottom: dark abyss
  const bgColor = useMemo(() => {
    if (depthPhase < 0.3) {
      // Surface waters - bright blue/cyan
      const t = depthPhase / 0.3;
      return `hsl(${195 - t * 10}, ${80 - t * 10}%, ${8 + (1 - t) * 4}%)`;
    } else if (depthPhase < 0.7) {
      // Mid waters - deeper blue
      const t = (depthPhase - 0.3) / 0.4;
      return `hsl(${210 + t * 10}, ${60 - t * 20}%, ${6 - t * 2}%)`;
    } else {
      // Deep waters - almost black with hints of dark blue
      const t = (depthPhase - 0.7) / 0.3;
      return `hsl(${220 + t * 5}, ${40 - t * 20}%, ${4 - t * 2}%)`;
    }
  }, [depthPhase]);

  // Vignette increases with depth
  const vignetteOpacity = 0.3 + depthPhase * 0.5;

  // Light rays fade as we go deeper
  const lightRayOpacity = Math.max(0, 0.15 - depthPhase * 0.2);

  // Generate bubbles
  const bubbles = useMemo(() => 
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${5 + Math.random() * 90}%`,
      width: 4 + Math.random() * 12,
      duration: 6 + Math.random() * 8,
      delay: Math.random() * 10,
      opacity: 0.1 + Math.random() * 0.2,
    })), []
  );

  return (
    <>
      {/* Background color transition */}
      <div
        className="fixed inset-0 z-[-1] transition-colors duration-700"
        style={{ backgroundColor: bgColor }}
      />

      {/* Underwater vignette */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at center, transparent 30%, hsl(220, 30%, 3% / ${vignetteOpacity}) 100%)`,
        }}
      />

      {/* Light rays from surface */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          opacity: lightRayOpacity,
          background: `
            linear-gradient(175deg, transparent 20%, hsl(190, 100%, 60% / 0.12) 35%, transparent 50%),
            linear-gradient(185deg, transparent 30%, hsl(175, 100%, 55% / 0.08) 45%, transparent 60%),
            linear-gradient(170deg, transparent 10%, hsl(200, 80%, 55% / 0.1) 25%, transparent 40%)
          `,
        }}
      />

      {/* Floating bubbles */}
      <div className="fixed inset-0 z-[2] pointer-events-none overflow-hidden">
        {bubbles.map((b) => (
          <Bubble
            key={b.id}
            style={{
              left: b.left,
              bottom: '-20px',
              width: b.width,
              height: b.width,
              background: `radial-gradient(circle at 35% 35%, hsl(190, 100%, 90% / ${b.opacity}), hsl(190, 100%, 60% / ${b.opacity * 0.3}))`,
              border: `1px solid hsl(190, 100%, 80% / ${b.opacity * 0.5})`,
              duration: b.duration,
              delay: b.delay,
            }}
          />
        ))}
      </div>

      {/* Depth indicator */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[15] hidden lg:flex flex-col items-center gap-2">
        <div className="w-[2px] h-32 rounded-full overflow-hidden glass-panel">
          <motion.div
            className="w-full rounded-full"
            style={{
              height: `${depthPhase * 100}%`,
              background: 'linear-gradient(180deg, hsl(190, 100%, 60%), hsl(220, 80%, 40%), hsl(240, 50%, 20%))',
            }}
          />
        </div>
        <span className="font-code text-[10px] text-primary/50 tracking-wider">
          {Math.round(depthPhase * 1000)}m
        </span>
      </div>
    </>
  );
};

export default OceanDepthOverlay;
