import { useEffect, useId, useMemo, useState } from "react";
import { useDeviceCapability } from "@/hooks/use-device-capability";

const Jellyfish = ({ size = 150, hue = 284, opacity = 0.8 }) => {
  const bellId = useId();
  const glowId = useId();
  const organId = useId();

  return (
    <svg
      width={size}
      height={size * 1.8}
      viewBox="0 0 180 300"
      style={{
        opacity,
        overflow: "visible",
        filter: `drop-shadow(0 0 18px hsla(${hue} 90% 72% / 0.28))`,
      }}
    >
      <defs>
        <radialGradient id={bellId} cx="50%" cy="28%" r="65%">
          <stop offset="0%" stopColor={`hsla(${hue} 95% 92% / 0.96)`} />
          <stop offset="38%" stopColor={`hsla(${hue} 80% 78% / 0.72)`} />
          <stop offset="78%" stopColor={`hsla(${hue} 72% 58% / 0.28)`} />
          <stop offset="100%" stopColor={`hsla(${hue} 78% 42% / 0.08)`} />
        </radialGradient>
        <radialGradient id={glowId} cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor={`hsla(${hue} 100% 96% / 0.52)`} />
          <stop offset="100%" stopColor={`hsla(${hue} 100% 96% / 0)`} />
        </radialGradient>
        <linearGradient id={organId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={`hsla(${hue} 90% 86% / 0.65)`} />
          <stop offset="100%" stopColor={`hsla(${hue} 80% 70% / 0.18)`} />
        </linearGradient>
      </defs>

      {[18, 34, 52, 70, 88, 106, 124, 142, 160].map((x, index) => (
        <path
          key={`tentacle-${x}`}
          d={`M${x} 125 C ${x + (index % 2 === 0 ? -14 : 12)} 168 ${x + (index % 3 === 0 ? 24 : -18)} 222 ${x + (index % 2 === 0 ? -6 : 8)} 294`}
          stroke={`hsla(${hue} 92% 86% / ${index % 2 === 0 ? 0.42 : 0.28})`}
          strokeWidth={index % 3 === 0 ? 3.2 : 2}
          fill="none"
          strokeLinecap="round"
        />
      ))}

      {[62, 82, 100, 118].map((x, index) => (
        <path
          key={`arm-${x}`}
          d={`M${x} 116 C ${x + 4} 142 ${x - 10} 178 ${x + 8} 222 C ${x + 2} 236 ${x - 8} 248 ${x + 4} 268`}
          stroke={`hsla(${hue} 96% 92% / 0.46)`}
          strokeWidth={6 - index * 0.5}
          fill="none"
          strokeLinecap="round"
        />
      ))}

      <path
        d="M16 118 C 16 38 48 12 90 12 C 132 12 164 38 164 118 C 140 134 118 140 90 138 C 62 140 40 134 16 118 Z"
        fill={`url(#${bellId})`}
      />
      <ellipse cx="90" cy="84" rx="54" ry="38" fill={`url(#${glowId})`} />
      <path
        d="M52 78 C 60 104 74 116 90 120 C 106 116 120 104 128 78"
        stroke={`url(#${organId})`}
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx="68" cy="66" rx="18" ry="9" fill="hsla(0 0% 100% / 0.28)" />
      <path
        d="M22 116 C 54 132 126 132 158 116"
        stroke={`hsla(${hue} 100% 96% / 0.26)`}
        strokeWidth="3"
        fill="none"
      />
    </svg>
  );
};

const SharkSilhouette = ({ size = 340, flip = false, opacity = 0.36 }) => {
  const bodyId = useId();

  return (
    <svg
      width={size}
      height={size * 0.38}
      viewBox="0 0 440 170"
      style={{
        transform: flip ? "scaleX(-1)" : "none",
        opacity,
        filter: "blur(0.2px) drop-shadow(0 14px 28px hsla(210 55% 4% / 0.55))",
      }}
    >
      <defs>
        <linearGradient id={bodyId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsla(205 26% 42% / 0.95)" />
          <stop offset="45%" stopColor="hsla(206 28% 24% / 0.94)" />
          <stop offset="72%" stopColor="hsla(205 20% 14% / 0.95)" />
          <stop offset="100%" stopColor="hsla(205 14% 8% / 0.95)" />
        </linearGradient>
      </defs>

      <path d="M42 84 C 18 38 6 24 0 18 C 10 48 14 68 10 84 C 14 100 10 120 0 150 C 6 144 18 130 42 84 Z" fill="hsla(206 28% 20% / 0.96)" />
      <path d="M42 84 C 86 42 162 34 262 42 C 334 46 388 58 434 82 C 438 88 438 92 434 98 C 388 122 334 136 262 140 C 162 148 86 140 42 84 Z" fill={`url(#${bodyId})`} />
      <path d="M186 40 C 202 6 228 4 254 48 L 238 60 C 222 48 204 46 190 60 Z" fill="hsla(206 30% 18% / 0.98)" />
      <path d="M156 112 C 182 152 236 146 262 120 L 236 114 C 206 118 182 118 156 112 Z" fill="hsla(207 28% 15% / 0.92)" />
      <path d="M332 70 C 340 58 350 56 362 72 L 356 82 C 348 76 340 76 334 84 Z" fill="hsla(205 26% 20% / 0.94)" />
      <ellipse cx="196" cy="62" rx="98" ry="12" fill="hsla(0 0% 100% / 0.08)" />
      <circle cx="394" cy="78" r="3.6" fill="hsla(0 0% 6% / 0.78)" />
    </svg>
  );
};

const WhaleSilhouette = ({ size = 520, flip = false, opacity = 0.3 }) => {
  const bodyId = useId();

  return (
    <svg
      width={size}
      height={size * 0.44}
      viewBox="0 0 620 270"
      style={{
        transform: flip ? "scaleX(-1)" : "none",
        opacity,
        filter: "blur(0.25px) drop-shadow(0 18px 36px hsla(214 65% 3% / 0.62))",
      }}
    >
      <defs>
        <linearGradient id={bodyId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsla(208 24% 34% / 0.94)" />
          <stop offset="52%" stopColor="hsla(210 24% 16% / 0.96)" />
          <stop offset="100%" stopColor="hsla(210 20% 8% / 0.96)" />
        </linearGradient>
      </defs>

      <path d="M58 132 C 22 68 8 40 0 28 C 18 78 22 104 18 132 C 22 160 18 188 0 238 C 8 226 22 196 58 132 Z" fill="hsla(211 22% 14% / 0.96)" />
      <path d="M58 132 C 126 62 240 46 376 58 C 478 66 554 90 606 126 C 614 132 614 138 606 144 C 554 180 478 204 376 212 C 240 224 126 202 58 132 Z" fill={`url(#${bodyId})`} />
      <path d="M246 180 C 280 246 350 250 394 206 L 348 184 C 314 190 284 190 246 180 Z" fill="hsla(210 24% 12% / 0.94)" />
      <path d="M404 62 C 418 44 436 44 452 72 L 442 82 C 430 74 418 74 406 84 Z" fill="hsla(210 22% 14% / 0.9)" />
      <ellipse cx="282" cy="88" rx="162" ry="14" fill="hsla(0 0% 100% / 0.06)" />
      <path d="M512 148 C 542 160 572 156 598 140" stroke="hsla(0 0% 5% / 0.5)" strokeWidth="3" fill="none" />
      <circle cx="548" cy="118" r="4" fill="hsla(0 0% 6% / 0.72)" />
    </svg>
  );
};

const styles = `
@keyframes jellyRise {
  0% { transform: translate3d(0, 118vh, 0) scale(0.94); opacity: 0; }
  10% { opacity: 1; }
  52% { transform: translate3d(26px, 52vh, 0) scale(1); opacity: 1; }
  100% { transform: translate3d(-18px, -24vh, 0) scale(1.02); opacity: 0; }
}
@keyframes jellyPulse {
  0%, 100% { transform: scale(1, 1); }
  35% { transform: scale(1.08, 0.84); }
  70% { transform: scale(0.95, 1.06); }
}
@keyframes jellyCurrent {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(18px); }
}
@keyframes sharkCruiseRight {
  0% { transform: translate3d(-35vw, 0, 0); }
  50% { transform: translate3d(48vw, -16px, 0); }
  100% { transform: translate3d(130vw, 0, 0); }
}
@keyframes sharkCruiseLeft {
  0% { transform: translate3d(130vw, 0, 0); }
  50% { transform: translate3d(48vw, 18px, 0); }
  100% { transform: translate3d(-35vw, 0, 0); }
}
@keyframes whaleCruise {
  0% { transform: translate3d(-42vw, 0, 0); }
  50% { transform: translate3d(44vw, -12px, 0); }
  100% { transform: translate3d(136vw, 0, 0); }
}
@keyframes creatureSway {
  0%, 100% { transform: rotate(-1.6deg) translateY(0); }
  50% { transform: rotate(1.8deg) translateY(8px); }
}
`;

const buildDepthCreatures = (progress, isLowEnd) => {
  if (progress < 0.18) {
    return [];
  }

  if (progress < 0.42) {
    return [
      { kind: "jellyfish", left: "12%", size: 120, hue: 286, bottomOffset: -16, duration: 30, delay: 0, top: "56%" },
      { kind: "jellyfish", left: "72%", size: 96, hue: 266, bottomOffset: -20, duration: 34, delay: 8, top: "48%" },
    ];
  }

  if (progress < 0.74) {
    return [
      { kind: "jellyfish", left: "10%", size: isLowEnd ? 122 : 138, hue: 284, bottomOffset: -20, duration: 28, delay: 0, top: "62%" },
      { kind: "jellyfish", left: "42%", size: isLowEnd ? 102 : 118, hue: 258, bottomOffset: -24, duration: 32, delay: 6, top: "52%" },
      { kind: "jellyfish", left: "76%", size: isLowEnd ? 92 : 106, hue: 208, bottomOffset: -18, duration: 35, delay: 11, top: "58%" },
      { kind: "shark", top: "36%", size: isLowEnd ? 260 : 320, duration: 42, delay: 4, flip: progress > 0.58 },
    ];
  }

  return [
    { kind: "jellyfish", left: "8%", size: isLowEnd ? 132 : 150, hue: 292, bottomOffset: -18, duration: 28, delay: 0, top: "66%" },
    { kind: "jellyfish", left: "28%", size: isLowEnd ? 108 : 124, hue: 274, bottomOffset: -24, duration: 31, delay: 5, top: "58%" },
    { kind: "jellyfish", left: "62%", size: isLowEnd ? 96 : 114, hue: 212, bottomOffset: -22, duration: 34, delay: 9, top: "50%" },
    { kind: "jellyfish", left: "82%", size: isLowEnd ? 88 : 102, hue: 198, bottomOffset: -26, duration: 36, delay: 13, top: "62%" },
    { kind: "shark", top: "44%", size: isLowEnd ? 260 : 320, duration: 44, delay: 6, flip: true },
    { kind: "whale", top: "24%", size: isLowEnd ? 380 : 500, duration: 58, delay: 2, flip: false },
  ];
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
      {creatures.map((creature, index) => {
        if (creature.kind === "jellyfish") {
          return (
            <div
              key={`${creature.kind}-${index}`}
              className="absolute"
              style={{
                left: creature.left,
                bottom: `${creature.bottomOffset}%`,
                willChange: "transform, opacity",
                animation: `jellyRise ${creature.duration}s linear ${creature.delay}s infinite`,
              }}
            >
              <div style={{ animation: "jellyCurrent 8s ease-in-out infinite", willChange: "transform" }}>
                <div style={{ animation: "jellyPulse 2.8s ease-in-out infinite", transformOrigin: "50% 26%", willChange: "transform" }}>
                  <Jellyfish size={creature.size} hue={creature.hue} opacity={0.82} />
                </div>
              </div>
            </div>
          );
        }

        if (creature.kind === "shark") {
          return (
            <div
              key={`${creature.kind}-${index}`}
              className="absolute left-0"
              style={{
                top: creature.top,
                animation: `${creature.flip ? "sharkCruiseLeft" : "sharkCruiseRight"} ${creature.duration}s linear ${creature.delay}s infinite`,
                willChange: "transform",
              }}
            >
              <div style={{ animation: "creatureSway 5.2s ease-in-out infinite", transformOrigin: "68% 50%", willChange: "transform" }}>
                <SharkSilhouette size={creature.size} flip={creature.flip} />
              </div>
            </div>
          );
        }

        return (
          <div
            key={`${creature.kind}-${index}`}
            className="absolute left-0"
            style={{
              top: creature.top,
              animation: `whaleCruise ${creature.duration}s linear ${creature.delay}s infinite`,
              willChange: "transform",
            }}
          >
            <div style={{ animation: "creatureSway 7s ease-in-out infinite", transformOrigin: "60% 50%", willChange: "transform" }}>
              <WhaleSilhouette size={creature.size} flip={creature.flip} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DeepSeaCreatures;
