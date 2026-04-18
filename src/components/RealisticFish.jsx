import { useMemo } from "react";
import { useDeviceCapability } from "@/hooks/use-device-capability";

// Highly detailed realistic tropical fish SVGs
const FishSVG = ({ type, size = 60, flip = false }) => {
  const w = size;
  const h = size * 0.55;
  const transform = flip ? "scaleX(-1)" : "none";

  if (type === "clownfish") {
    return (
      <svg width={w} height={h} viewBox="0 0 200 110" style={{ transform, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.4))" }}>
        <defs>
          <radialGradient id="cf-body" cx="40%" cy="40%">
            <stop offset="0%" stopColor="#FF8C42" />
            <stop offset="60%" stopColor="#E55B1F" />
            <stop offset="100%" stopColor="#8B2E0A" />
          </radialGradient>
          <linearGradient id="cf-shine" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.5" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Tail */}
        <path d="M30,55 Q5,25 0,15 Q15,55 0,95 Q5,85 30,55 Z" fill="url(#cf-body)" opacity="0.9" />
        <path d="M28,55 Q10,35 8,28 Q18,55 8,82 Q10,75 28,55 Z" fill="#222" opacity="0.6" />
        {/* Body */}
        <ellipse cx="110" cy="55" rx="80" ry="32" fill="url(#cf-body)" />
        {/* White stripes */}
        <path d="M75,28 Q72,55 78,82 L92,80 Q88,55 92,30 Z" fill="white" />
        <path d="M135,30 Q130,55 138,82 L152,80 Q145,55 150,32 Z" fill="white" />
        {/* Black outlines on stripes */}
        <path d="M72,28 Q69,55 75,82" stroke="#1a1a1a" strokeWidth="2" fill="none" />
        <path d="M95,30 Q92,55 98,80" stroke="#1a1a1a" strokeWidth="2" fill="none" />
        <path d="M132,30 Q128,55 135,82" stroke="#1a1a1a" strokeWidth="2" fill="none" />
        <path d="M155,32 Q150,55 156,80" stroke="#1a1a1a" strokeWidth="2" fill="none" />
        {/* Top fin */}
        <path d="M85,25 Q110,5 145,25 L140,40 Q110,30 90,40 Z" fill="url(#cf-body)" opacity="0.85" />
        <path d="M85,25 Q110,5 145,25" stroke="#1a1a1a" strokeWidth="1.5" fill="none" />
        {/* Belly fin */}
        <path d="M95,80 Q105,98 120,82 Z" fill="#E55B1F" opacity="0.8" />
        {/* Shine */}
        <ellipse cx="100" cy="42" rx="60" ry="14" fill="url(#cf-shine)" />
        {/* Eye */}
        <circle cx="175" cy="50" r="7" fill="white" />
        <circle cx="175" cy="50" r="5" fill="#1a1a1a" />
        <circle cx="177" cy="48" r="2" fill="white" />
      </svg>
    );
  }

  if (type === "tang") {
    return (
      <svg width={w} height={h} viewBox="0 0 200 110" style={{ transform, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.4))" }}>
        <defs>
          <radialGradient id="tg-body" cx="40%" cy="40%">
            <stop offset="0%" stopColor="#4FB8FF" />
            <stop offset="50%" stopColor="#1E6BD6" />
            <stop offset="100%" stopColor="#0B2E6B" />
          </radialGradient>
          <linearGradient id="tg-shine" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.5" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Tail */}
        <path d="M25,55 Q0,20 5,10 Q20,40 5,100 Q0,90 25,55 Z" fill="#FFD700" />
        <path d="M28,55 Q12,30 15,22 Q25,45 15,88 Q12,80 28,55 Z" fill="#1a1a1a" opacity="0.4" />
        {/* Body - oval/disk shape */}
        <ellipse cx="110" cy="55" rx="78" ry="38" fill="url(#tg-body)" />
        {/* Black palette pattern */}
        <path d="M60,40 Q70,30 130,32 Q145,40 140,55 Q120,48 100,55 Q80,60 65,70 Q55,55 60,40 Z" fill="#0a1a3a" opacity="0.7" />
        {/* Top fin */}
        <path d="M70,22 Q110,5 160,28 L155,42 Q110,28 75,38 Z" fill="#0a1a3a" />
        {/* Bottom fin */}
        <path d="M70,88 Q110,105 160,82 L155,72 Q110,82 75,75 Z" fill="#0a1a3a" />
        {/* Yellow edge */}
        <path d="M75,30 Q110,15 155,32" stroke="#FFD700" strokeWidth="2" fill="none" />
        {/* Shine */}
        <ellipse cx="100" cy="40" rx="55" ry="14" fill="url(#tg-shine)" />
        {/* Eye */}
        <circle cx="170" cy="48" r="6" fill="white" />
        <circle cx="170" cy="48" r="4" fill="#1a1a1a" />
        <circle cx="171" cy="47" r="1.5" fill="white" />
        {/* Mouth */}
        <path d="M185,55 Q190,52 188,58" stroke="#FFD700" strokeWidth="2" fill="none" />
      </svg>
    );
  }

  if (type === "angelfish") {
    return (
      <svg width={w} height={h * 1.4} viewBox="0 0 200 150" style={{ transform, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.4))" }}>
        <defs>
          <linearGradient id="af-body" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFE76B" />
            <stop offset="40%" stopColor="#F4A523" />
            <stop offset="100%" stopColor="#7A3E00" />
          </linearGradient>
        </defs>
        {/* Top long fin */}
        <path d="M90,55 Q100,5 130,15 L120,55 Z" fill="url(#af-body)" opacity="0.9" />
        {/* Bottom long fin */}
        <path d="M90,95 Q100,145 130,135 L120,95 Z" fill="url(#af-body)" opacity="0.9" />
        {/* Tail */}
        <path d="M30,75 Q5,45 0,40 Q15,75 0,110 Q5,105 30,75 Z" fill="url(#af-body)" />
        {/* Disc body */}
        <ellipse cx="110" cy="75" rx="75" ry="42" fill="url(#af-body)" />
        {/* Vertical stripes */}
        <path d="M70,40 L75,110" stroke="#3A1A00" strokeWidth="4" opacity="0.7" />
        <path d="M105,35 L110,115" stroke="#3A1A00" strokeWidth="4" opacity="0.7" />
        <path d="M140,40 L145,110" stroke="#3A1A00" strokeWidth="4" opacity="0.7" />
        {/* Shine */}
        <ellipse cx="100" cy="55" rx="50" ry="12" fill="white" opacity="0.3" />
        {/* Eye */}
        <circle cx="165" cy="68" r="6" fill="white" />
        <circle cx="165" cy="68" r="4" fill="#1a1a1a" />
        <circle cx="166" cy="67" r="1.5" fill="white" />
      </svg>
    );
  }

  if (type === "butterfly") {
    return (
      <svg width={w} height={h} viewBox="0 0 200 110" style={{ transform, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.4))" }}>
        <defs>
          <radialGradient id="bf-body" cx="40%" cy="40%">
            <stop offset="0%" stopColor="#FFF59D" />
            <stop offset="60%" stopColor="#FFC107" />
            <stop offset="100%" stopColor="#8B6508" />
          </radialGradient>
        </defs>
        {/* Tail */}
        <path d="M30,55 Q8,28 12,18 Q22,45 12,92 Q8,82 30,55 Z" fill="white" />
        <path d="M30,55 Q14,32 18,24 Q26,48 18,86 Q14,78 30,55 Z" fill="#1a1a1a" opacity="0.6" />
        {/* Disc body */}
        <ellipse cx="110" cy="55" rx="75" ry="36" fill="url(#bf-body)" />
        {/* Diagonal stripes */}
        <path d="M55,30 L80,85" stroke="#5C3A00" strokeWidth="3" opacity="0.6" />
        <path d="M75,28 L100,88" stroke="#5C3A00" strokeWidth="3" opacity="0.6" />
        <path d="M95,26 L120,90" stroke="#5C3A00" strokeWidth="3" opacity="0.6" />
        <path d="M115,28 L140,88" stroke="#5C3A00" strokeWidth="3" opacity="0.6" />
        {/* Top fin */}
        <path d="M75,25 Q110,8 150,25 L145,38 Q110,28 80,38 Z" fill="#FFC107" />
        <path d="M75,25 Q110,8 150,25" stroke="#1a1a1a" strokeWidth="1.5" fill="none" />
        {/* Black eye band */}
        <ellipse cx="170" cy="50" rx="10" ry="20" fill="#1a1a1a" opacity="0.85" />
        {/* Eye */}
        <circle cx="170" cy="50" r="4" fill="white" />
        <circle cx="170" cy="50" r="2.5" fill="#000" />
        {/* Shine */}
        <ellipse cx="105" cy="42" rx="50" ry="10" fill="white" opacity="0.35" />
      </svg>
    );
  }

  // jellyfish
  return (
    <svg width={w} height={h * 1.6} viewBox="0 0 120 180" style={{ transform, filter: "drop-shadow(0 0 12px rgba(255, 100, 200, 0.5))" }}>
      <defs>
        <radialGradient id="jf-bell" cx="50%" cy="40%">
          <stop offset="0%" stopColor="rgba(255,182,255,0.85)" />
          <stop offset="60%" stopColor="rgba(186,104,200,0.6)" />
          <stop offset="100%" stopColor="rgba(74,20,140,0.3)" />
        </radialGradient>
      </defs>
      {/* Tentacles */}
      {[20, 35, 50, 65, 80, 95].map((x, i) => (
        <path key={i} d={`M${x},75 Q${x + (i % 2 ? 8 : -8)},110 ${x},140 Q${x - (i % 2 ? 8 : -8)},160 ${x},178`}
          stroke="rgba(255,182,255,0.5)" strokeWidth="1.5" fill="none" />
      ))}
      {/* Bell */}
      <path d="M10,75 Q10,15 60,12 Q110,15 110,75 Q90,85 60,82 Q30,85 10,75 Z" fill="url(#jf-bell)" />
      {/* Inner glow */}
      <ellipse cx="60" cy="50" rx="35" ry="20" fill="rgba(255,255,255,0.25)" />
      <ellipse cx="50" cy="40" rx="15" ry="8" fill="rgba(255,255,255,0.5)" />
    </svg>
  );
};

const defaultConfigs = [
  { y: "12%", type: "clownfish", size: 70, duration: 32, delay: 0, flip: false },
  { y: "30%", type: "tang", size: 60, duration: 38, delay: 6, flip: true },
  { y: "55%", type: "angelfish", size: 75, duration: 42, delay: 14, flip: false },
  { y: "75%", type: "butterfly", size: 55, duration: 36, delay: 4, flip: true },
  { y: "40%", type: "jellyfish", size: 65, duration: 50, delay: 10, flip: false },
];

// CSS keyframes injected once
const fishStyles = `
@keyframes fishSwimRight { 0%{transform:translateX(-180px)} 100%{transform:translateX(calc(100vw + 180px))} }
@keyframes fishSwimLeft  { 0%{transform:translateX(calc(100vw + 180px))} 100%{transform:translateX(-180px)} }
@keyframes fishBob { 0%,100%{transform:translateY(0) rotate(0)} 25%{transform:translateY(-10px) rotate(2deg)} 75%{transform:translateY(8px) rotate(-2deg)} }
@keyframes jellyPulse { 0%,100%{transform:scaleY(1)} 50%{transform:scaleY(0.88)} }
`;

const RealisticFish = ({ configs = defaultConfigs, className = "" }) => {
  const { isLowEnd, ready } = useDeviceCapability();
  const fish = useMemo(() => {
    if (!ready) return [];
    return isLowEnd ? configs.slice(0, 2) : configs;
  }, [configs, isLowEnd, ready]);

  if (!ready) return null;

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <style>{fishStyles}</style>
      {fish.map((f, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: f.y,
            left: 0,
            willChange: "transform",
            animation: `${f.flip ? "fishSwimLeft" : "fishSwimRight"} ${f.duration}s linear ${f.delay}s infinite`,
          }}
        >
          <div
            style={{
              willChange: "transform",
              animation: f.type === "jellyfish"
                ? `jellyPulse 4s ease-in-out infinite`
                : `fishBob 5s ease-in-out infinite`,
            }}
          >
            <FishSVG type={f.type} size={f.size} flip={f.flip} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default RealisticFish;

