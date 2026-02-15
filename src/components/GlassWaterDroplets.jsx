import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Realistic water droplets that slide down glass surfaces.
 * Simulates gravity, surface tension, acceleration, trail streaks, and merging.
 */

const DROPLET_COUNT = 8;
const SPAWN_INTERVAL = 2200;

const createDroplet = (id) => {
  const x = 8 + Math.random() * 84; // % from left
  const size = 3 + Math.random() * 6; // px radius
  const speed = 0.3 + Math.random() * 0.5; // base speed multiplier
  const wobble = (Math.random() - 0.5) * 12; // horizontal drift
  return {
    id,
    x,
    y: -2 - Math.random() * 8,
    size,
    speed,
    wobble,
    opacity: 0.5 + Math.random() * 0.4,
    trailLength: 20 + size * 8,
    pauseAt: Math.random() < 0.3 ? 20 + Math.random() * 50 : null, // some droplets pause briefly
    paused: false,
    pauseTimer: 0,
  };
};

const GlassWaterDroplets = ({ className = "" }) => {
  const [droplets, setDroplets] = useState([]);
  const frameRef = useRef(null);
  const lastSpawn = useRef(Date.now());
  const idCounter = useRef(0);

  useEffect(() => {
    // Seed initial droplets
    const initial = Array.from({ length: 4 }, () => {
      idCounter.current++;
      const d = createDroplet(idCounter.current);
      d.y = 10 + Math.random() * 60;
      return d;
    });
    setDroplets(initial);
  }, []);

  useEffect(() => {
    const tick = () => {
      const now = Date.now();

      setDroplets((prev) => {
        let next = prev.map((d) => {
          if (d.paused) {
            d.pauseTimer++;
            if (d.pauseTimer > 60) {
              d.paused = false;
            }
            return { ...d };
          }

          // Gravity acceleration — faster as it falls
          const gravity = 0.15 + (d.y / 100) * 0.25;
          const newY = d.y + d.speed * gravity;
          // Slight horizontal wobble (surface tension)
          const newX = d.x + Math.sin(d.y * 0.08) * 0.08 + d.wobble * 0.005;

          // Check for pause point (surface tension sticking)
          if (d.pauseAt && !d.paused && Math.abs(newY - d.pauseAt) < 1) {
            return { ...d, y: newY, x: newX, paused: true, pauseTimer: 0, pauseAt: null };
          }

          return { ...d, y: newY, x: newX };
        });

        // Remove off-screen droplets
        next = next.filter((d) => d.y < 110);

        // Spawn new droplets
        if (now - lastSpawn.current > SPAWN_INTERVAL && next.length < DROPLET_COUNT) {
          lastSpawn.current = now;
          idCounter.current++;
          next.push(createDroplet(idCounter.current));
        }

        return next;
      });

      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden z-[2] ${className}`}>
      <AnimatePresence>
        {droplets.map((drop) => (
          <div key={drop.id} className="absolute" style={{ left: `${drop.x}%`, top: `${drop.y}%` }}>
            {/* Water trail streak */}
            <div
              className="absolute rounded-full"
              style={{
                width: drop.size * 0.6,
                height: drop.trailLength,
                bottom: drop.size,
                left: '50%',
                transform: 'translateX(-50%)',
                background: `linear-gradient(to top, 
                  hsl(190, 100%, 70% / ${drop.opacity * 0.25}) 0%, 
                  hsl(190, 100%, 70% / ${drop.opacity * 0.08}) 40%,
                  transparent 100%
                )`,
                borderRadius: '50% 50% 0 0',
              }}
            />
            {/* Main droplet body */}
            <div
              style={{
                width: drop.size * 2,
                height: drop.size * 2.4,
                borderRadius: '45% 45% 50% 50%',
                background: `
                  radial-gradient(ellipse 70% 50% at 35% 30%, hsl(190, 100%, 90% / ${drop.opacity * 0.7}) 0%, transparent 50%),
                  radial-gradient(ellipse at 50% 60%, hsl(200, 80%, 50% / ${drop.opacity * 0.4}) 0%, hsl(210, 60%, 30% / ${drop.opacity * 0.15}) 80%)
                `,
                boxShadow: `
                  inset 0 -1px 2px hsl(190, 100%, 80% / ${drop.opacity * 0.2}),
                  inset 0 1px 1px hsl(190, 100%, 95% / ${drop.opacity * 0.5}),
                  0 1px 3px hsl(220, 60%, 10% / ${drop.opacity * 0.4}),
                  0 0 6px hsl(190, 100%, 50% / ${drop.opacity * 0.15})
                `,
                transform: 'translate(-50%, -50%)',
              }}
            />
            {/* Highlight spec (light refraction) */}
            <div
              className="absolute rounded-full"
              style={{
                width: drop.size * 0.5,
                height: drop.size * 0.35,
                top: -drop.size * 0.4,
                left: -drop.size * 0.15,
                background: `radial-gradient(ellipse, hsl(190, 100%, 95% / ${drop.opacity * 0.8}) 0%, transparent 70%)`,
              }}
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default GlassWaterDroplets;
