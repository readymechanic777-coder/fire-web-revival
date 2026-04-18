import { useMemo } from "react";
import { useDeviceCapability } from "@/hooks/use-device-capability";

// CSS-driven floating particles - much cheaper than Framer Motion JS animations
const FloatingParticles = ({ count = 20 }) => {
  const { isLowEnd, ready } = useDeviceCapability();

  const particles = useMemo(() => {
    if (!ready) return [];
    const actual = isLowEnd ? Math.min(8, count) : Math.min(20, count);
    return Array.from({ length: actual }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 4 + Math.random() * 3,
      delay: Math.random() * 5,
      hue: 195 + Math.random() * 20,
    }));
  }, [count, isLowEnd, ready]);

  if (!ready) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <style>{`
        @keyframes particleRise {
          0% { transform: translateY(0) scale(0.5); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; transform: translateY(-120px) scale(1); }
          100% { transform: translateY(-180px) scale(0.5); opacity: 0; }
        }
      `}</style>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            background: `hsl(${p.hue}, 100%, 60%)`,
            boxShadow: `0 0 6px hsl(${p.hue}, 100%, 50%)`,
            animation: `particleRise ${p.duration}s ease-out ${p.delay}s infinite`,
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
