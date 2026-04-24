import { useEffect, useState, useMemo } from "react";
import { useDeviceCapability } from "@/hooks/use-device-capability";

// ===== Realistic SVG creatures =====
const Jellyfish = ({ size = 120, hue = 280 }) => {
  const w = size;
  const h = size * 1.6;
  return (
    <svg width={w} height={h} viewBox="0 0 120 200" style={{ filter: `drop-shadow(0 0 18px hsla(${hue}, 90%, 65%, 0.55))` }}>
      <defs>
        <radialGradient id={`jf-bell-${hue}`} cx="50%" cy="35%">
          <stop offset="0%" stopColor={`hsla(${hue}, 100%, 88%, 0.95)`} />
          <stop offset="50%" stopColor={`hsla(${hue}, 85%, 65%, 0.7)`} />
          <stop offset="100%" stopColor={`hsla(${hue}, 80%, 30%, 0.35)`} />
        </radialGradient>
        <radialGradient id={`jf-inner-${hue}`} cx="50%" cy="50%">
          <stop offset="0%" stopColor={`hsla(${hue}, 100%, 90%, 0.6)`} />
          <stop offset="100%" stopColor={`hsla(${hue}, 100%, 70%, 0)`} />
        </radialGradient>
      </defs>
      {/* Long flowing tentacles */}
      {[15, 28, 42, 60, 78, 92, 105].map((x, i) => (
        <path
          key={i}
          d={`M${x},80 Q${x + (i % 2 ? 10 : -10)},120 ${x + (i % 2 ? -6 : 6)},150 Q${x + (i % 2 ? -12 : 12)},175 ${x},198`}
          stroke={`hsla(${hue}, 90%, 80%, 0.55)`}
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
        />
      ))}
      {/* Frilly oral arms */}
      {[35, 50, 70, 85].map((x, i) => (
        <path
          key={`o-${i}`}
          d={`M${x},78 Q${x + 2},95 ${x - 2},115 Q${x + 4},130 ${x},145`}
          stroke={`hsla(${hue}, 100%, 85%, 0.7)`}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      ))}
      {/* Bell */}
      <path d="M8,80 Q8,15 60,10 Q112,15 112,80 Q90,92 60,88 Q30,92 8,80 Z" fill={`url(#jf-bell-${hue})`} />
      {/* Inner glow */}
      <ellipse cx="60" cy="50" rx="38" ry="22" fill={`url(#jf-inner-${hue})`} />
      <ellipse cx="48" cy="38" rx="14" ry="7" fill="rgba(255,255,255,0.55)" />
      {/* Bell rim highlights */}
      <path d="M15,78 Q60,95 105,78" stroke={`hsla(${hue}, 100%, 90%, 0.4)`} strokeWidth="1.5" fill="none" />
    </svg>
  );
};

const Shark = ({ size = 280, flip = false }) => {
  const w = size;
  const h = size * 0.45;
  return (
    <svg width={w} height={h} viewBox="0 0 400 180" style={{ transform: flip ? "scaleX(-1)" : "none", filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.6))" }}>
      <defs>
        <linearGradient id="shark-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5a6b7d" />
          <stop offset="55%" stopColor="#3a4856" />
          <stop offset="56%" stopColor="#d8dde2" />
          <stop offset="100%" stopColor="#aab2bb" />
        </linearGradient>
        <linearGradient id="shark-shine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.3" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Tail fin (caudal) */}
      <path d="M40,90 Q5,20 0,10 Q15,55 10,90 Q15,125 0,170 Q5,160 40,90 Z" fill="#3a4856" />
      <path d="M42,90 Q15,35 12,28 Q22,60 18,90 Q22,120 12,152 Q15,145 42,90 Z" fill="#5a6b7d" />
      {/* Main body — torpedo shape */}
      <path d="M40,90 Q90,40 200,50 Q310,55 380,85 Q385,92 380,98 Q310,128 200,132 Q90,138 40,90 Z" fill="url(#shark-body)" />
      {/* Belly highlight */}
      <path d="M60,108 Q180,135 360,100 Q300,128 200,130 Q100,128 60,108 Z" fill="#c8d0d8" opacity="0.85" />
      {/* Dorsal fin */}
      <path d="M180,52 Q210,5 250,55 L240,68 Q210,55 185,68 Z" fill="#2c3742" />
      <path d="M180,52 Q210,5 250,55" stroke="#1a232c" strokeWidth="1.5" fill="none" />
      {/* Pectoral fin */}
      <path d="M150,118 Q170,160 230,135 L210,118 Z" fill="#2c3742" />
      {/* Second dorsal */}
      <path d="M290,62 Q305,40 320,62 L315,72 Q305,65 295,72 Z" fill="#3a4856" />
      {/* Anal fin */}
      <path d="M280,122 Q295,145 315,125 L305,118 Z" fill="#3a4856" />
      {/* Gill slits */}
      <path d="M325,75 Q323,90 327,105" stroke="#1a232c" strokeWidth="1.5" fill="none" opacity="0.6" />
      <path d="M335,75 Q333,90 337,105" stroke="#1a232c" strokeWidth="1.5" fill="none" opacity="0.6" />
      <path d="M345,75 Q343,90 347,105" stroke="#1a232c" strokeWidth="1.5" fill="none" opacity="0.6" />
      {/* Shine */}
      <ellipse cx="200" cy="68" rx="120" ry="10" fill="url(#shark-shine)" />
      {/* Eye */}
      <circle cx="370" cy="82" r="4" fill="#1a1a1a" />
      <circle cx="371" cy="81" r="1.2" fill="white" />
      {/* Mouth — menacing curve with teeth */}
      <path d="M360,98 Q375,104 385,96" stroke="#1a1a1a" strokeWidth="1.5" fill="none" />
      <path d="M365,99 L367,103 L369,99 L371,103 L373,99 L375,103 L377,99" stroke="white" strokeWidth="0.8" fill="none" />
    </svg>
  );
};

const Whale = ({ size = 460, flip = false }) => {
  const w = size;
  const h = size * 0.5;
  return (
    <svg width={w} height={h} viewBox="0 0 600 300" style={{ transform: flip ? "scaleX(-1)" : "none", filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.7))" }}>
      <defs>
        <linearGradient id="whale-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3d4a5c" />
          <stop offset="50%" stopColor="#1e2733" />
          <stop offset="51%" stopColor="#a8b3bf" />
          <stop offset="100%" stopColor="#7c8693" />
        </linearGradient>
        <linearGradient id="whale-shine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.25" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Massive tail fluke */}
      <path d="M60,150 Q10,30 5,15 Q30,90 25,150 Q30,210 5,285 Q10,270 60,150 Z" fill="#1e2733" />
      <path d="M65,150 Q25,55 22,42 Q40,100 35,150 Q40,200 22,258 Q25,245 65,150 Z" fill="#3d4a5c" />
      {/* Body — large and rounded */}
      <path d="M60,150 Q120,55 280,60 Q460,65 570,140 Q580,150 570,160 Q460,235 280,240 Q120,245 60,150 Z" fill="url(#whale-body)" />
      {/* White belly — humpback style */}
      <path d="M90,180 Q280,235 560,165 Q450,225 280,235 Q140,228 90,180 Z" fill="#c5cdd6" opacity="0.95" />
      {/* Long pectoral fin (humpback signature) */}
      <path d="M220,200 Q260,290 360,250 L320,205 Z" fill="#2a3441" />
      <path d="M225,202 Q265,285 355,250" stroke="#a8b3bf" strokeWidth="1.5" fill="none" opacity="0.4" />
      {/* Small dorsal fin */}
      <path d="M380,72 Q400,50 425,80 L418,90 Q400,80 388,88 Z" fill="#2a3441" />
      {/* Mouth line — long baleen */}
      <path d="M510,165 Q545,180 575,158" stroke="#1a1a1a" strokeWidth="2" fill="none" />
      <path d="M515,167 Q545,178 570,162" stroke="#1a1a1a" strokeWidth="1" fill="none" opacity="0.5" />
      {/* Eye */}
      <circle cx="540" cy="135" r="5" fill="#1a1a1a" />
      <circle cx="541" cy="134" r="1.5" fill="white" />
      {/* Tubercles (humpback bumps on head) */}
      <circle cx="500" cy="120" r="3" fill="#1a232c" opacity="0.5" />
      <circle cx="515" cy="128" r="2.5" fill="#1a232c" opacity="0.5" />
      <circle cx="525" cy="118" r="2" fill="#1a232c" opacity="0.5" />
      <circle cx="490" cy="130" r="2.5" fill="#1a232c" opacity="0.5" />
      {/* Throat grooves */}
      <path d="M380,200 L500,195" stroke="#7c8693" strokeWidth="0.8" fill="none" opacity="0.4" />
      <path d="M380,210 L500,205" stroke="#7c8693" strokeWidth="0.8" fill="none" opacity="0.4" />
      <path d="M380,220 L495,215" stroke="#7c8693" strokeWidth="0.8" fill="none" opacity="0.4" />
      {/* Shine */}
      <ellipse cx="300" cy="100" rx="200" ry="18" fill="url(#whale-shine)" />
    </svg>
  );
};

// ===== Animation styles =====
const styles = `
@keyframes jfRise {
  0%   { transform: translate3d(0, 110vh, 0); opacity: 0; }
  8%   { opacity: 1; }
  50%  { transform: translate3d(35px, 50vh, 0); opacity: 1; }
  92%  { opacity: 1; }
  100% { transform: translate3d(-25px, -25vh, 0); opacity: 0; }
}
@keyframes jfDrift {
  0%, 100% { transform: translateX(0); }
  50%      { transform: translateX(20px); }
}
@keyframes jfBell {
  0%, 100% { transform: scale(1, 1); }
  40%      { transform: scale(1.1, 0.78); }
  70%      { transform: scale(0.92, 1.08); }
}
@keyframes sharkSwimRight {
  0%   { transform: translate3d(-30vw, 0, 0); }
  50%  { transform: translate3d(50vw, -30px, 0); }
  100% { transform: translate3d(130vw, 0, 0); }
}
@keyframes sharkSwimLeft {
  0%   { transform: translate3d(130vw, 0, 0); }
  50%  { transform: translate3d(50vw, 25px, 0); }
  100% { transform: translate3d(-30vw, 0, 0); }
}
@keyframes sharkSway {
  0%, 100% { transform: rotate(-2deg); }
  50%      { transform: rotate(3deg); }
}
@keyframes whaleSwim {
  0%   { transform: translate3d(-40vw, 0, 0); }
  50%  { transform: translate3d(50vw, -20px, 0); }
  100% { transform: translate3d(140vw, 0, 0); }
}
@keyframes whaleGlide {
  0%, 100% { transform: rotate(-1.5deg) translateY(0); }
  50%      { transform: rotate(2deg)   translateY(8px); }
}
`;

// ===== Depth zones (vh-based) =====
// Each zone defines what creatures appear at what scroll depth.
// `top` is the absolute pixel position based on document height.
const buildCreatures = (docHeight, isLowEnd) => {
  const vh = window.innerHeight;
  const items = [];

  // Helper to push creatures
  const add = (c) => items.push(c);

  // === Zone 1: Surface (0–25%) — a few jellyfish drifting ===
  const z1Count = isLowEnd ? 1 : 2;
  for (let i = 0; i < z1Count; i++) {
    add({
      kind: "jellyfish",
      top: docHeight * 0.05 + i * vh * 0.8,
      x: `${15 + i * 35}%`,
      size: 90 + i * 10,
      hue: 285 + i * 15,
      duration: 26 + i * 4,
      delay: i * 6,
    });
  }

  // === Zone 2: Mid (25–50%) — sharks start appearing + more jellies ===
  const z2Jellies = isLowEnd ? 2 : 4;
  for (let i = 0; i < z2Jellies; i++) {
    add({
      kind: "jellyfish",
      top: docHeight * 0.28 + i * vh * 0.6,
      x: `${10 + i * 22}%`,
      size: 100 + i * 8,
      hue: 200 + i * 25,
      duration: 28 + i * 3,
      delay: i * 4,
    });
  }
  // Sharks
  const z2Sharks = isLowEnd ? 1 : 2;
  for (let i = 0; i < z2Sharks; i++) {
    add({
      kind: "shark",
      top: docHeight * (0.32 + i * 0.08),
      size: 240 + i * 30,
      flip: i % 2 === 0,
      duration: 38 + i * 6,
      delay: i * 8,
    });
  }

  // === Zone 3: Deep (50–75%) — whales appear, dense jellies ===
  const z3Jellies = isLowEnd ? 3 : 6;
  for (let i = 0; i < z3Jellies; i++) {
    add({
      kind: "jellyfish",
      top: docHeight * 0.52 + i * vh * 0.45,
      x: `${5 + i * 16}%`,
      size: 110 + (i % 3) * 18,
      hue: 250 + i * 20,
      duration: 26 + (i % 4) * 3,
      delay: i * 3,
    });
  }
  // Whale
  add({
    kind: "whale",
    top: docHeight * 0.58,
    size: isLowEnd ? 360 : 480,
    flip: false,
    duration: 55,
    delay: 5,
  });
  // Shark
  add({
    kind: "shark",
    top: docHeight * 0.66,
    size: 270,
    flip: true,
    duration: 42,
    delay: 12,
  });

  // === Zone 4: Abyss (75–100%) — multiple whales + dense bioluminescent jellies ===
  const z4Jellies = isLowEnd ? 4 : 8;
  for (let i = 0; i < z4Jellies; i++) {
    add({
      kind: "jellyfish",
      top: docHeight * 0.78 + i * vh * 0.35,
      x: `${4 + i * 12}%`,
      size: 120 + (i % 3) * 20,
      // Bioluminescent cyans/purples deep down
      hue: i % 2 === 0 ? 180 + (i * 8) : 290 + (i * 6),
      duration: 24 + (i % 3) * 4,
      delay: i * 2.5,
    });
  }
  // Whales
  add({
    kind: "whale",
    top: docHeight * 0.82,
    size: isLowEnd ? 380 : 520,
    flip: true,
    duration: 60,
    delay: 0,
  });
  if (!isLowEnd) {
    add({
      kind: "whale",
      top: docHeight * 0.92,
      size: 440,
      flip: false,
      duration: 65,
      delay: 18,
    });
  }
  // Deep shark
  add({
    kind: "shark",
    top: docHeight * 0.88,
    size: 300,
    flip: false,
    duration: 45,
    delay: 8,
  });

  return items;
};

const DeepSeaCreatures = () => {
  const { isLowEnd, ready } = useDeviceCapability();
  const [docHeight, setDocHeight] = useState(0);

  useEffect(() => {
    if (!ready) return;
    const measure = () => {
      setDocHeight(Math.max(document.documentElement.scrollHeight, window.innerHeight));
    };
    measure();
    // Re-measure after content loads
    const t = setTimeout(measure, 1500);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, [ready]);

  const creatures = useMemo(() => {
    if (!ready || docHeight === 0) return [];
    return buildCreatures(docHeight, isLowEnd);
  }, [ready, docHeight, isLowEnd]);

  if (!ready || docHeight === 0) return null;

  return (
    <div
      className="absolute inset-x-0 top-0 pointer-events-none overflow-hidden"
      style={{ height: docHeight, zIndex: 4 }}
    >
      <style>{styles}</style>
      {creatures.map((c, i) => {
        if (c.kind === "jellyfish") {
          return (
            <div
              key={i}
              className="absolute"
              style={{
                top: c.top,
                left: c.x,
                width: 0,
                height: 0,
                willChange: "transform, opacity",
                animation: `jfRise ${c.duration}s linear ${c.delay}s infinite`,
              }}
            >
              <div style={{ animation: `jfDrift 7s ease-in-out infinite`, willChange: "transform" }}>
                <div style={{ animation: `jfBell 2.6s ease-in-out infinite`, transformOrigin: "50% 30%", willChange: "transform" }}>
                  <Jellyfish size={c.size} hue={c.hue} />
                </div>
              </div>
            </div>
          );
        }
        if (c.kind === "shark") {
          return (
            <div
              key={i}
              className="absolute left-0"
              style={{
                top: c.top,
                willChange: "transform",
                animation: `${c.flip ? "sharkSwimLeft" : "sharkSwimRight"} ${c.duration}s linear ${c.delay}s infinite`,
              }}
            >
              <div style={{ animation: `sharkSway 3.5s ease-in-out infinite`, transformOrigin: "70% 50%", willChange: "transform" }}>
                <Shark size={c.size} flip={c.flip} />
              </div>
            </div>
          );
        }
        if (c.kind === "whale") {
          return (
            <div
              key={i}
              className="absolute left-0"
              style={{
                top: c.top,
                willChange: "transform",
                animation: `whaleSwim ${c.duration}s linear ${c.delay}s infinite`,
                transform: c.flip ? "scaleX(-1)" : "none",
              }}
            >
              <div style={{ animation: `whaleGlide 6s ease-in-out infinite`, transformOrigin: "60% 50%", willChange: "transform" }}>
                <Whale size={c.size} flip={false} />
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default DeepSeaCreatures;
