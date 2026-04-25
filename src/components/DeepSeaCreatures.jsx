import { useEffect, useId, useMemo, useState } from "react";
import { useDeviceCapability } from "@/hooks/use-device-capability";

/* ═══════════════════════════════════════════════════════════════════════
   REALISTIC SVG CREATURES — depth-zoned marine life
   Each silhouette uses layered gradients, fins, eyes and subtle blurs
   for a photoreal, painterly look.
   ═══════════════════════════════════════════════════════════════════════ */

/* —— SMALL TROPICAL FISH (surface) —— */
const SmallFish = ({ size = 60, hue = 28, flip = false, opacity = 0.85 }) => {
  const id = useId();
  return (
    <svg width={size} height={size * 0.55} viewBox="0 0 120 66" style={{ transform: flip ? "scaleX(-1)" : "none", opacity, filter: "drop-shadow(0 4px 8px hsla(210 80% 4% / 0.45))" }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={`hsl(${hue} 95% 70%)`} />
          <stop offset="55%" stopColor={`hsl(${hue} 88% 52%)`} />
          <stop offset="100%" stopColor={`hsl(${hue + 10} 80% 32%)`} />
        </linearGradient>
      </defs>
      <path d="M8 33 C 14 50 28 60 56 58 C 84 56 102 46 110 33 C 102 20 84 10 56 8 C 28 6 14 16 8 33 Z" fill={`url(#${id})`} />
      <path d="M0 12 L 18 33 L 0 54 C 4 42 4 24 0 12 Z" fill={`hsl(${hue} 80% 38%)`} />
      <path d="M52 12 C 58 4 70 6 72 14 L 64 24 Z" fill={`hsl(${hue} 70% 30%)`} opacity="0.7" />
      <path d="M52 54 C 58 62 70 60 72 52 L 64 42 Z" fill={`hsl(${hue} 70% 30%)`} opacity="0.7" />
      <path d="M30 28 C 50 22 78 22 96 28" stroke={`hsl(${hue} 95% 88%)`} strokeWidth="2" fill="none" opacity="0.5" />
      <circle cx="92" cy="28" r="3.6" fill="white" />
      <circle cx="93" cy="28" r="2.2" fill="#0a0f1a" />
    </svg>
  );
};

/* —— SCHOOL OF FISH (drawn as one SVG cluster) —— */
const FishSchool = ({ size = 220, hue = 200, flip = false, opacity = 0.55 }) => {
  const fish = useMemo(() => Array.from({ length: 9 }).map((_, i) => ({
    x: (i % 3) * 70 + Math.random() * 14,
    y: Math.floor(i / 3) * 32 + Math.random() * 12,
    s: 0.6 + Math.random() * 0.4,
  })), []);
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 240 120" style={{ transform: flip ? "scaleX(-1)" : "none", opacity, filter: "drop-shadow(0 6px 14px hsla(210 80% 4% / 0.4))" }}>
      {fish.map((f, i) => (
        <g key={i} transform={`translate(${f.x} ${f.y}) scale(${f.s})`}>
          <path d="M2 10 C 6 18 14 22 26 21 C 38 20 46 16 50 10 C 46 4 38 0 26 -1 C 14 0 6 4 2 10 Z" fill={`hsl(${hue} 70% ${50 + i * 2}%)`} />
          <path d="M-6 2 L 4 10 L -6 18 Z" fill={`hsl(${hue} 60% 32%)`} />
        </g>
      ))}
    </svg>
  );
};

/* —— SEA TURTLE —— */
const SeaTurtle = ({ size = 180, flip = false, opacity = 0.85 }) => {
  const shellId = useId();
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 220 154" style={{ transform: flip ? "scaleX(-1)" : "none", opacity, filter: "drop-shadow(0 10px 20px hsla(210 60% 4% / 0.55))" }}>
      <defs>
        <radialGradient id={shellId} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="hsl(86 45% 42%)" />
          <stop offset="50%" stopColor="hsl(96 50% 28%)" />
          <stop offset="100%" stopColor="hsl(120 40% 14%)" />
        </radialGradient>
      </defs>
      {/* flippers */}
      <path d="M40 60 C 10 50 0 70 14 92 C 30 96 50 84 56 72 Z" fill="hsl(96 35% 26%)" />
      <path d="M44 110 C 22 124 18 138 38 146 C 56 142 64 130 64 116 Z" fill="hsl(96 35% 24%)" />
      <path d="M168 60 C 198 52 206 70 196 92 C 178 96 160 86 154 74 Z" fill="hsl(96 35% 28%)" />
      <path d="M164 110 C 184 122 188 138 168 146 C 152 142 144 130 144 116 Z" fill="hsl(96 35% 24%)" />
      {/* head */}
      <ellipse cx="180" cy="64" rx="26" ry="20" fill="hsl(96 30% 32%)" />
      <circle cx="194" cy="58" r="3" fill="#0a0f1a" />
      <circle cx="195" cy="57" r="1" fill="white" opacity="0.9" />
      {/* shell */}
      <ellipse cx="105" cy="80" rx="78" ry="52" fill={`url(#${shellId})`} />
      {/* shell scutes */}
      <g stroke="hsl(96 50% 18%)" strokeWidth="1.5" fill="none" opacity="0.7">
        <path d="M55 80 C 80 60 130 60 155 80" />
        <path d="M55 82 C 80 100 130 100 155 82" />
        <path d="M85 50 L 85 110 M 105 46 L 105 114 M 125 50 L 125 110" />
      </g>
      <ellipse cx="92" cy="64" rx="22" ry="10" fill="hsl(86 60% 60%)" opacity="0.25" />
    </svg>
  );
};

/* —— JELLYFISH (refined) —— */
const Jellyfish = ({ size = 150, hue = 284, opacity = 0.85 }) => {
  const bellId = useId();
  const glowId = useId();
  const organId = useId();
  return (
    <svg width={size} height={size * 1.9} viewBox="0 0 180 320" style={{ opacity, overflow: "visible", filter: `drop-shadow(0 0 22px hsla(${hue} 90% 72% / 0.35))` }}>
      <defs>
        <radialGradient id={bellId} cx="50%" cy="30%" r="65%">
          <stop offset="0%" stopColor={`hsla(${hue} 100% 96% / 0.98)`} />
          <stop offset="40%" stopColor={`hsla(${hue} 85% 80% / 0.78)`} />
          <stop offset="80%" stopColor={`hsla(${hue} 75% 56% / 0.32)`} />
          <stop offset="100%" stopColor={`hsla(${hue} 80% 40% / 0.06)`} />
        </radialGradient>
        <radialGradient id={glowId} cx="50%" cy="42%" r="55%">
          <stop offset="0%" stopColor={`hsla(${hue} 100% 96% / 0.6)`} />
          <stop offset="100%" stopColor={`hsla(${hue} 100% 96% / 0)`} />
        </radialGradient>
        <linearGradient id={organId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={`hsla(${hue} 92% 88% / 0.7)`} />
          <stop offset="100%" stopColor={`hsla(${hue} 80% 70% / 0.15)`} />
        </linearGradient>
      </defs>

      {[14, 30, 48, 66, 84, 102, 120, 138, 156, 168].map((x, i) => (
        <path
          key={x}
          d={`M${x} 130 C ${x + (i % 2 ? 16 : -14)} 180 ${x + (i % 3 ? -22 : 26)} 240 ${x + (i % 2 ? 10 : -8)} 314`}
          stroke={`hsla(${hue} 95% 88% / ${i % 2 ? 0.32 : 0.48})`}
          strokeWidth={i % 3 === 0 ? 3.4 : 1.8}
          fill="none"
          strokeLinecap="round"
        />
      ))}

      {[58, 78, 98, 118].map((x, i) => (
        <path
          key={`a${x}`}
          d={`M${x} 120 C ${x + 6} 150 ${x - 12} 188 ${x + 10} 232 C ${x} 250 ${x - 8} 268 ${x + 6} 290`}
          stroke={`hsla(${hue} 100% 94% / 0.55)`}
          strokeWidth={6 - i * 0.6}
          fill="none"
          strokeLinecap="round"
        />
      ))}

      <path d="M14 122 C 14 36 48 8 90 8 C 132 8 166 36 166 122 C 140 138 118 144 90 142 C 62 144 40 138 14 122 Z" fill={`url(#${bellId})`} />
      <ellipse cx="90" cy="86" rx="56" ry="40" fill={`url(#${glowId})`} />
      <path d="M50 80 C 60 108 76 120 90 124 C 104 120 120 108 130 80" stroke={`url(#${organId})`} strokeWidth="9" fill="none" strokeLinecap="round" />
      <ellipse cx="66" cy="64" rx="20" ry="10" fill="hsla(0 0% 100% / 0.32)" />
      <path d="M20 118 C 54 134 126 134 160 118" stroke={`hsla(${hue} 100% 96% / 0.32)`} strokeWidth="3" fill="none" />
    </svg>
  );
};

/* —— EEL (ribbon/serpentine) —— */
const Eel = ({ size = 360, hue = 50, flip = false, opacity = 0.7 }) => {
  const id = useId();
  return (
    <svg width={size} height={size * 0.4} viewBox="0 0 480 192" style={{ transform: flip ? "scaleX(-1)" : "none", opacity, filter: "drop-shadow(0 8px 16px hsla(210 70% 4% / 0.55))" }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={`hsl(${hue} 70% 22%)`} />
          <stop offset="50%" stopColor={`hsl(${hue} 60% 38%)`} />
          <stop offset="100%" stopColor={`hsl(${hue} 50% 18%)`} />
        </linearGradient>
      </defs>
      {/* serpentine body */}
      <path d="M10 96 C 60 40 120 150 180 90 C 240 30 300 160 360 96 C 400 56 440 110 470 96 L 470 110 C 440 124 400 70 360 110 C 300 174 240 44 180 104 C 120 164 60 54 10 110 Z"
        fill={`url(#${id})`} />
      {/* head */}
      <ellipse cx="466" cy="100" rx="14" ry="12" fill={`hsl(${hue} 60% 28%)`} />
      <circle cx="472" cy="96" r="2.4" fill="#0a0f1a" />
      <path d="M460 104 C 466 110 474 110 478 104" stroke="hsl(0 0% 5%)" strokeWidth="1.2" fill="none" />
      {/* dorsal fin highlight */}
      <path d="M40 90 C 100 50 160 110 220 80 C 280 50 340 120 400 88" stroke={`hsl(${hue} 80% 64%)`} strokeWidth="1.5" fill="none" opacity="0.5" />
    </svg>
  );
};

/* —— MANTA RAY —— */
const MantaRay = ({ size = 320, flip = false, opacity = 0.55 }) => {
  const id = useId();
  return (
    <svg width={size} height={size * 0.55} viewBox="0 0 400 220" style={{ transform: flip ? "scaleX(-1)" : "none", opacity, filter: "drop-shadow(0 14px 28px hsla(220 80% 3% / 0.6))" }}>
      <defs>
        <radialGradient id={id} cx="50%" cy="35%" r="70%">
          <stop offset="0%" stopColor="hsl(218 30% 38%)" />
          <stop offset="55%" stopColor="hsl(218 30% 18%)" />
          <stop offset="100%" stopColor="hsl(218 30% 8%)" />
        </radialGradient>
      </defs>
      {/* wings */}
      <path d="M200 110 C 120 30 30 50 8 110 C 30 130 100 130 200 130 C 300 130 370 130 392 110 C 370 50 280 30 200 110 Z" fill={`url(#${id})`} />
      {/* wingtip curl */}
      <path d="M8 110 C 24 96 44 96 60 110" stroke="hsl(218 35% 8%)" strokeWidth="2" fill="none" opacity="0.6" />
      <path d="M340 110 C 356 96 376 96 392 110" stroke="hsl(218 35% 8%)" strokeWidth="2" fill="none" opacity="0.6" />
      {/* body */}
      <ellipse cx="200" cy="112" rx="46" ry="22" fill="hsl(218 30% 14%)" />
      {/* cephalic horns */}
      <path d="M180 92 C 174 74 178 64 188 72 Z M220 92 C 226 74 222 64 212 72 Z" fill="hsl(218 30% 14%)" />
      {/* tail */}
      <path d="M200 132 C 210 160 214 200 218 218" stroke="hsl(218 30% 12%)" strokeWidth="3" fill="none" />
      {/* eye highlights */}
      <circle cx="178" cy="108" r="2.5" fill="#0a0f1a" />
      <circle cx="222" cy="108" r="2.5" fill="#0a0f1a" />
      {/* light belly hint */}
      <ellipse cx="200" cy="118" rx="80" ry="6" fill="hsla(0 0% 100% / 0.06)" />
    </svg>
  );
};

/* —— SHARK (refined hammerhead-style) —— */
const Shark = ({ size = 360, flip = false, opacity = 0.55 }) => {
  const id = useId();
  return (
    <svg width={size} height={size * 0.4} viewBox="0 0 460 184" style={{ transform: flip ? "scaleX(-1)" : "none", opacity, filter: "drop-shadow(0 16px 28px hsla(210 60% 3% / 0.65))" }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(208 22% 46%)" />
          <stop offset="42%" stopColor="hsl(208 24% 28%)" />
          <stop offset="68%" stopColor="hsl(210 22% 16%)" />
          <stop offset="100%" stopColor="hsl(210 18% 9%)" />
        </linearGradient>
      </defs>
      {/* tail */}
      <path d="M44 92 C 18 38 4 22 0 14 C 12 50 16 72 12 92 C 16 112 12 134 0 168 C 4 160 18 142 44 92 Z" fill="hsl(208 24% 22%)" />
      {/* body */}
      <path d="M44 92 C 90 46 168 36 270 44 C 344 50 400 64 450 90 C 454 96 454 100 450 106 C 400 132 344 146 270 152 C 168 160 90 146 44 92 Z" fill={`url(#${id})`} />
      {/* dorsal fin */}
      <path d="M194 42 C 212 4 240 2 268 50 L 250 64 C 232 50 214 48 198 64 Z" fill="hsl(208 28% 18%)" />
      {/* pectoral fin */}
      <path d="M164 122 C 192 168 250 162 280 130 L 250 122 C 220 128 194 128 164 122 Z" fill="hsl(210 26% 14%)" />
      {/* second small fin */}
      <path d="M340 78 C 350 64 362 62 376 80 L 368 90 C 358 84 348 84 342 92 Z" fill="hsl(208 24% 20%)" />
      {/* belly highlight */}
      <ellipse cx="208" cy="68" rx="110" ry="14" fill="hsla(0 0% 100% / 0.09)" />
      {/* gills */}
      <g stroke="hsl(210 30% 8%)" strokeWidth="1.5" fill="none" opacity="0.7">
        <path d="M380 78 C 386 80 388 96 384 100" />
        <path d="M390 78 C 396 80 398 96 394 100" />
        <path d="M400 80 C 406 82 408 96 404 100" />
      </g>
      {/* eye */}
      <circle cx="416" cy="84" r="3.8" fill="#050a14" />
      <circle cx="417" cy="83" r="1.2" fill="hsla(0 0% 100% / 0.6)" />
      {/* mouth */}
      <path d="M398 104 C 416 112 432 112 446 102" stroke="hsl(210 40% 6%)" strokeWidth="1.6" fill="none" />
    </svg>
  );
};

/* —— OCTOPUS —— */
const Octopus = ({ size = 200, hue = 320, opacity = 0.7 }) => {
  const id = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 220 220" style={{ opacity, filter: "drop-shadow(0 12px 22px hsla(290 60% 4% / 0.55))" }}>
      <defs>
        <radialGradient id={id} cx="50%" cy="35%" r="60%">
          <stop offset="0%" stopColor={`hsl(${hue} 70% 60%)`} />
          <stop offset="60%" stopColor={`hsl(${hue} 65% 36%)`} />
          <stop offset="100%" stopColor={`hsl(${hue} 60% 16%)`} />
        </radialGradient>
      </defs>
      {/* tentacles */}
      {[
        "M70 110 C 40 140 30 180 50 210 C 60 200 64 180 70 160",
        "M88 118 C 70 160 64 200 88 220 C 92 200 92 178 92 158",
        "M110 122 C 110 170 110 210 110 220 C 116 200 118 176 118 158",
        "M132 118 C 150 160 156 200 132 220 C 128 200 128 178 128 158",
        "M150 110 C 180 140 190 180 170 210 C 160 200 156 180 150 160",
      ].map((d, i) => (
        <path key={i} d={d} stroke={`hsl(${hue} 65% ${30 + i * 2}%)`} strokeWidth={11} fill="none" strokeLinecap="round" />
      ))}
      {/* head */}
      <ellipse cx="110" cy="80" rx="62" ry="56" fill={`url(#${id})`} />
      {/* eyes */}
      <ellipse cx="88" cy="78" rx="10" ry="12" fill="white" />
      <ellipse cx="132" cy="78" rx="10" ry="12" fill="white" />
      <ellipse cx="89" cy="80" rx="4" ry="6" fill="#0a0f1a" />
      <ellipse cx="133" cy="80" rx="4" ry="6" fill="#0a0f1a" />
      <ellipse cx="100" cy="56" rx="32" ry="10" fill={`hsla(${hue} 80% 80% / 0.3)`} />
    </svg>
  );
};

/* —— ANGLERFISH (deep abyss) —— */
const Anglerfish = ({ size = 220, flip = false, opacity = 0.85 }) => {
  const id = useId();
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 260 182" style={{ transform: flip ? "scaleX(-1)" : "none", opacity, filter: "drop-shadow(0 10px 24px hsla(0 0% 0% / 0.7))" }}>
      <defs>
        <radialGradient id={id} cx="40%" cy="50%" r="60%">
          <stop offset="0%" stopColor="hsl(218 25% 22%)" />
          <stop offset="60%" stopColor="hsl(218 30% 10%)" />
          <stop offset="100%" stopColor="hsl(218 35% 4%)" />
        </radialGradient>
      </defs>
      {/* tail */}
      <path d="M230 88 C 254 72 256 56 252 50 C 252 70 250 88 254 100 C 250 112 252 130 252 152 C 256 146 254 130 230 100 Z" fill="hsl(218 30% 10%)" />
      {/* body */}
      <path d="M40 96 C 30 50 80 22 140 28 C 200 34 230 60 232 96 C 230 132 200 158 140 164 C 80 170 30 142 40 96 Z" fill={`url(#${id})`} />
      {/* mouth */}
      <path d="M40 96 L 30 90 L 50 88 L 40 80 L 60 80 L 50 72 L 70 74 L 60 66 L 80 70" stroke="hsl(0 0% 92%)" strokeWidth="2" fill="none" />
      <path d="M40 96 L 30 102 L 50 104 L 40 112 L 60 112 L 50 120 L 70 118" stroke="hsl(0 0% 92%)" strokeWidth="2" fill="none" />
      {/* lure stalk */}
      <path d="M120 28 C 130 -10 170 -20 180 0" stroke="hsl(218 30% 14%)" strokeWidth="3" fill="none" />
      {/* glowing lure */}
      <circle cx="184" cy="2" r="10" fill="hsl(50 100% 70%)" opacity="0.95" />
      <circle cx="184" cy="2" r="20" fill="hsl(50 100% 70%)" opacity="0.25" />
      <circle cx="184" cy="2" r="30" fill="hsl(50 100% 70%)" opacity="0.1" />
      {/* eye */}
      <circle cx="78" cy="80" r="6" fill="hsl(50 100% 70%)" />
      <circle cx="78" cy="80" r="2.4" fill="#0a0f1a" />
    </svg>
  );
};

/* —— WHALE (more anatomy) —— */
const Whale = ({ size = 540, flip = false, opacity = 0.45 }) => {
  const id = useId();
  return (
    <svg width={size} height={size * 0.42} viewBox="0 0 640 270" style={{ transform: flip ? "scaleX(-1)" : "none", opacity, filter: "drop-shadow(0 22px 40px hsla(214 70% 2% / 0.7))" }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(208 24% 38%)" />
          <stop offset="50%" stopColor="hsl(210 24% 18%)" />
          <stop offset="100%" stopColor="hsl(210 22% 8%)" />
        </linearGradient>
      </defs>
      {/* tail flukes */}
      <path d="M48 132 C 6 60 -2 32 0 18 C 18 70 22 102 18 132 C 22 162 18 192 0 248 C -2 232 6 204 48 132 Z" fill="hsl(211 22% 12%)" />
      {/* body */}
      <path d="M48 132 C 124 56 240 40 380 52 C 484 60 562 84 614 122 C 622 130 622 136 614 144 C 562 184 484 208 380 216 C 240 228 124 204 48 132 Z" fill={`url(#${id})`} />
      {/* ventral grooves */}
      <g stroke="hsl(210 30% 6%)" strokeWidth="1.5" fill="none" opacity="0.45">
        <path d="M120 200 L 480 196" />
        <path d="M130 210 L 470 206" />
        <path d="M140 218 L 460 214" />
        <path d="M150 222 L 450 220" />
      </g>
      {/* belly highlight */}
      <ellipse cx="280" cy="92" rx="180" ry="16" fill="hsla(0 0% 100% / 0.07)" />
      {/* pectoral fin */}
      <path d="M236 184 C 274 252 348 256 396 210 L 348 188 C 312 196 280 196 236 184 Z" fill="hsl(210 24% 12%)" />
      {/* dorsal fin */}
      <path d="M408 64 C 422 44 442 44 458 76 L 444 88 C 432 78 420 78 410 90 Z" fill="hsl(210 22% 14%)" />
      {/* eye */}
      <circle cx="556" cy="120" r="4.2" fill="#040810" />
      <circle cx="557" cy="119" r="1.4" fill="hsla(0 0% 100% / 0.5)" />
      {/* mouth line */}
      <path d="M510 156 C 542 168 580 162 608 144" stroke="hsl(210 40% 4%)" strokeWidth="2.6" fill="none" />
    </svg>
  );
};

/* ═══════════════════════════════════════════════════════════════════════
   ANIMATIONS — pure CSS, GPU-accelerated
   ═══════════════════════════════════════════════════════════════════════ */
const styles = `
@keyframes jellyRise {
  0% { transform: translate3d(0, 118vh, 0) scale(0.94); opacity: 0; }
  10% { opacity: 1; }
  52% { transform: translate3d(26px, 52vh, 0) scale(1); opacity: 1; }
  100% { transform: translate3d(-18px, -28vh, 0) scale(1.02); opacity: 0; }
}
@keyframes jellyPulse {
  0%, 100% { transform: scale(1, 1); }
  35% { transform: scale(1.08, 0.84); }
  70% { transform: scale(0.95, 1.06); }
}
@keyframes jellyDrift {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(22px); }
}
@keyframes cruiseRight {
  0% { transform: translate3d(-40vw, 0, 0); }
  100% { transform: translate3d(140vw, 0, 0); }
}
@keyframes cruiseLeft {
  0% { transform: translate3d(140vw, 0, 0); }
  100% { transform: translate3d(-40vw, 0, 0); }
}
@keyframes finSway {
  0%, 100% { transform: rotate(-1.6deg) translateY(0); }
  50% { transform: rotate(1.8deg) translateY(8px); }
}
@keyframes eelWiggle {
  0%, 100% { transform: rotate(-2deg) translateY(0); }
  25% { transform: rotate(1.5deg) translateY(-12px); }
  50% { transform: rotate(2.5deg) translateY(0); }
  75% { transform: rotate(-1deg) translateY(10px); }
}
@keyframes mantaFlap {
  0%, 100% { transform: scaleY(1) translateY(0); }
  50% { transform: scaleY(0.86) translateY(-6px); }
}
@keyframes octopusBob {
  0%, 100% { transform: translateY(0) rotate(-2deg); }
  50% { transform: translateY(-22px) rotate(2deg); }
}
@keyframes lureGlow {
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(1.4); }
}
@keyframes turtlePaddle {
  0%, 100% { transform: rotate(-2deg) translateY(0); }
  50% { transform: rotate(2deg) translateY(-10px); }
}
@keyframes schoolDart {
  0%, 100% { transform: translateY(0) skewX(0); }
  25% { transform: translateY(-8px) skewX(2deg); }
  75% { transform: translateY(6px) skewX(-2deg); }
}
`;

/* ═══════════════════════════════════════════════════════════════════════
   DEPTH ZONES — 5 zones with progressively richer marine life
   ═══════════════════════════════════════════════════════════════════════ */
const buildDepthCreatures = (progress, isLowEnd) => {
  const creatures = [];

  // ZONE 1 — SUNLIT (0–18%): small tropical fish, school
  if (progress >= 0.05 && progress < 0.22) {
    creatures.push(
      { kind: "smallFish", top: "32%", size: 60, hue: 28, duration: 38, delay: 0, flip: false },
      { kind: "smallFish", top: "58%", size: 50, hue: 16, duration: 44, delay: 8, flip: true },
      { kind: "school", top: "44%", size: isLowEnd ? 180 : 240, hue: 198, duration: 46, delay: 4, flip: false },
    );
  }

  // ZONE 2 — TWILIGHT (18–40%): turtle, more fish, first jellyfish
  if (progress >= 0.18 && progress < 0.42) {
    creatures.push(
      { kind: "turtle", top: "38%", size: isLowEnd ? 150 : 200, duration: 60, delay: 2, flip: false },
      { kind: "smallFish", top: "62%", size: 56, hue: 200, duration: 42, delay: 10, flip: true },
      { kind: "jellyfish", left: "16%", size: 110, hue: 286, bottomOffset: -16, duration: 32, delay: 0, top: "auto" },
      { kind: "jellyfish", left: "72%", size: 96, hue: 268, bottomOffset: -20, duration: 36, delay: 8, top: "auto" },
      { kind: "school", top: "30%", size: isLowEnd ? 180 : 230, hue: 188, duration: 50, delay: 12, flip: true },
    );
  }

  // ZONE 3 — DEEP MID (40–62%): manta ray, eel, more jellyfish, shark appears
  if (progress >= 0.38 && progress < 0.64) {
    creatures.push(
      { kind: "manta", top: "26%", size: isLowEnd ? 240 : 320, duration: 56, delay: 0, flip: false },
      { kind: "eel", top: "70%", size: isLowEnd ? 280 : 360, hue: 50, duration: 48, delay: 6, flip: true },
      { kind: "jellyfish", left: "10%", size: isLowEnd ? 122 : 138, hue: 284, bottomOffset: -20, duration: 30, delay: 0, top: "auto" },
      { kind: "jellyfish", left: "48%", size: isLowEnd ? 102 : 118, hue: 258, bottomOffset: -24, duration: 34, delay: 6, top: "auto" },
      { kind: "jellyfish", left: "82%", size: isLowEnd ? 92 : 106, hue: 208, bottomOffset: -18, duration: 36, delay: 11, top: "auto" },
      { kind: "shark", top: "44%", size: isLowEnd ? 280 : 340, duration: 44, delay: 4, flip: false },
    );
  }

  // ZONE 4 — DEEP (62–82%): octopus, eels, sharks, whale appears
  if (progress >= 0.6 && progress < 0.84) {
    creatures.push(
      { kind: "octopus", left: "70%", top: "58%", size: isLowEnd ? 160 : 210, hue: 320, duration: 18 },
      { kind: "eel", top: "32%", size: isLowEnd ? 300 : 380, hue: 38, duration: 50, delay: 2, flip: false },
      { kind: "eel", top: "76%", size: isLowEnd ? 260 : 340, hue: 200, duration: 56, delay: 14, flip: true },
      { kind: "shark", top: "40%", size: isLowEnd ? 280 : 360, duration: 46, delay: 0, flip: true },
      { kind: "jellyfish", left: "20%", size: isLowEnd ? 130 : 150, hue: 200, bottomOffset: -22, duration: 30, delay: 2, top: "auto" },
      { kind: "jellyfish", left: "55%", size: isLowEnd ? 110 : 128, hue: 280, bottomOffset: -26, duration: 33, delay: 8, top: "auto" },
      { kind: "whale", top: "20%", size: isLowEnd ? 380 : 520, duration: 70, delay: 4, flip: false },
    );
  }

  // ZONE 5 — ABYSS (82–100%): anglerfish, big whale, dense bioluminescent jellies
  if (progress >= 0.78) {
    creatures.push(
      { kind: "anglerfish", top: "36%", size: isLowEnd ? 180 : 240, duration: 54, delay: 0, flip: false },
      { kind: "anglerfish", top: "68%", size: isLowEnd ? 150 : 200, duration: 60, delay: 18, flip: true },
      { kind: "whale", top: "26%", size: isLowEnd ? 420 : 580, duration: 68, delay: 6, flip: true },
      { kind: "shark", top: "52%", size: isLowEnd ? 280 : 340, duration: 48, delay: 12, flip: false },
      { kind: "jellyfish", left: "8%", size: isLowEnd ? 132 : 152, hue: 188, bottomOffset: -18, duration: 28, delay: 0, top: "auto" },
      { kind: "jellyfish", left: "32%", size: isLowEnd ? 108 : 124, hue: 274, bottomOffset: -24, duration: 31, delay: 5, top: "auto" },
      { kind: "jellyfish", left: "62%", size: isLowEnd ? 96 : 114, hue: 196, bottomOffset: -22, duration: 34, delay: 9, top: "auto" },
      { kind: "jellyfish", left: "84%", size: isLowEnd ? 88 : 102, hue: 168, bottomOffset: -26, duration: 36, delay: 13, top: "auto" },
    );
  }

  return creatures;
};

const DeepSeaCreatures = () => {
  const { isLowEnd, ready } = useDeviceCapability();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!ready) return undefined;
    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      setProgress(window.scrollY / maxScroll);
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateProgress);
    };
    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ready]);

  const creatures = useMemo(() => {
    if (!ready) return [];
    return buildDepthCreatures(progress, isLowEnd);
  }, [isLowEnd, progress, ready]);

  if (!ready || creatures.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[4]" aria-hidden="true">
      <style>{styles}</style>
      {creatures.map((c, index) => {
        const key = `${c.kind}-${index}`;

        if (c.kind === "jellyfish") {
          return (
            <div
              key={key}
              className="absolute"
              style={{
                left: c.left,
                bottom: `${c.bottomOffset}%`,
                willChange: "transform, opacity",
                animation: `jellyRise ${c.duration}s linear ${c.delay}s infinite`,
              }}
            >
              <div style={{ animation: "jellyDrift 8s ease-in-out infinite", willChange: "transform" }}>
                <div style={{ animation: "jellyPulse 2.8s ease-in-out infinite", transformOrigin: "50% 26%", willChange: "transform" }}>
                  <Jellyfish size={c.size} hue={c.hue} opacity={0.85} />
                </div>
              </div>
            </div>
          );
        }

        if (c.kind === "smallFish") {
          return (
            <div
              key={key}
              className="absolute left-0"
              style={{ top: c.top, animation: `${c.flip ? "cruiseLeft" : "cruiseRight"} ${c.duration}s linear ${c.delay}s infinite`, willChange: "transform" }}
            >
              <div style={{ animation: "finSway 1.4s ease-in-out infinite", transformOrigin: "60% 50%" }}>
                <SmallFish size={c.size} hue={c.hue} flip={c.flip} />
              </div>
            </div>
          );
        }

        if (c.kind === "school") {
          return (
            <div
              key={key}
              className="absolute left-0"
              style={{ top: c.top, animation: `${c.flip ? "cruiseLeft" : "cruiseRight"} ${c.duration}s linear ${c.delay}s infinite`, willChange: "transform" }}
            >
              <div style={{ animation: "schoolDart 3.2s ease-in-out infinite" }}>
                <FishSchool size={c.size} hue={c.hue} flip={c.flip} />
              </div>
            </div>
          );
        }

        if (c.kind === "turtle") {
          return (
            <div
              key={key}
              className="absolute left-0"
              style={{ top: c.top, animation: `${c.flip ? "cruiseLeft" : "cruiseRight"} ${c.duration}s linear ${c.delay}s infinite`, willChange: "transform" }}
            >
              <div style={{ animation: "turtlePaddle 3.6s ease-in-out infinite", transformOrigin: "50% 60%" }}>
                <SeaTurtle size={c.size} flip={c.flip} />
              </div>
            </div>
          );
        }

        if (c.kind === "manta") {
          return (
            <div
              key={key}
              className="absolute left-0"
              style={{ top: c.top, animation: `${c.flip ? "cruiseLeft" : "cruiseRight"} ${c.duration}s linear ${c.delay}s infinite`, willChange: "transform" }}
            >
              <div style={{ animation: "mantaFlap 3.8s ease-in-out infinite", transformOrigin: "50% 50%" }}>
                <MantaRay size={c.size} flip={c.flip} />
              </div>
            </div>
          );
        }

        if (c.kind === "eel") {
          return (
            <div
              key={key}
              className="absolute left-0"
              style={{ top: c.top, animation: `${c.flip ? "cruiseLeft" : "cruiseRight"} ${c.duration}s linear ${c.delay}s infinite`, willChange: "transform" }}
            >
              <div style={{ animation: "eelWiggle 2.4s ease-in-out infinite", transformOrigin: "50% 50%" }}>
                <Eel size={c.size} hue={c.hue} flip={c.flip} />
              </div>
            </div>
          );
        }

        if (c.kind === "shark") {
          return (
            <div
              key={key}
              className="absolute left-0"
              style={{ top: c.top, animation: `${c.flip ? "cruiseLeft" : "cruiseRight"} ${c.duration}s linear ${c.delay}s infinite`, willChange: "transform" }}
            >
              <div style={{ animation: "finSway 5.2s ease-in-out infinite", transformOrigin: "68% 50%" }}>
                <Shark size={c.size} flip={c.flip} />
              </div>
            </div>
          );
        }

        if (c.kind === "octopus") {
          return (
            <div
              key={key}
              className="absolute"
              style={{ top: c.top, left: c.left, animation: `octopusBob ${c.duration}s ease-in-out infinite`, willChange: "transform" }}
            >
              <Octopus size={c.size} hue={c.hue} />
            </div>
          );
        }

        if (c.kind === "anglerfish") {
          return (
            <div
              key={key}
              className="absolute left-0"
              style={{ top: c.top, animation: `${c.flip ? "cruiseLeft" : "cruiseRight"} ${c.duration}s linear ${c.delay}s infinite`, willChange: "transform" }}
            >
              <div style={{ animation: "lureGlow 2.4s ease-in-out infinite" }}>
                <Anglerfish size={c.size} flip={c.flip} />
              </div>
            </div>
          );
        }

        if (c.kind === "whale") {
          return (
            <div
              key={key}
              className="absolute left-0"
              style={{ top: c.top, animation: `${c.flip ? "cruiseLeft" : "cruiseRight"} ${c.duration}s linear ${c.delay}s infinite`, willChange: "transform" }}
            >
              <div style={{ animation: "finSway 7s ease-in-out infinite", transformOrigin: "60% 50%" }}>
                <Whale size={c.size} flip={c.flip} />
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
