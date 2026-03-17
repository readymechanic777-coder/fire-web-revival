import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

// ═══════════════════════════════════════════════════════════════
//  CONFIG
// ═══════════════════════════════════════════════════════════════
const FRAME_COUNT = 82; // frames 000 → 081
const FRAME_PREFIX = "/frames/Hackathon_website_video_effect_delpmaspu__";
const FRAME_EXT = ".png";
// How many viewport-heights of scrolling to scrub through all frames
const PIN_SCROLL_DISTANCE = 3.5; // 3.5× viewport height of scroll while pinned
// Hero content appears in last ~15% of scroll
const HERO_START = 0.85;
const HERO_FULL = 0.96;

const getFramePath = (index) => {
  const padded = String(index).padStart(3, "0");
  return `${FRAME_PREFIX}${padded}${FRAME_EXT}`;
};

// ═══════════════════════════════════════════════════════════════
//  FRAME PRELOADER
// ═══════════════════════════════════════════════════════════════
const preloadFrames = (onProgress) => {
  return new Promise((resolve) => {
    const images = new Array(FRAME_COUNT);
    let loaded = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = img.onerror = () => {
        loaded++;
        onProgress?.(loaded / FRAME_COUNT);
        if (loaded === FRAME_COUNT) resolve(images);
      };
      images[i] = img;
    }
  });
};

// ═══════════════════════════════════════════════════════════════
//  COMPONENT
// ═══════════════════════════════════════════════════════════════
const ScrollFrameAnimation = ({ children }) => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const framesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef(null);
  const heroOverlayRef = useRef(null);
  const dimOverlayRef = useRef(null);
  const heroRevealedRef = useRef(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [heroRevealed, setHeroRevealed] = useState(false);

  // ── Draw frame with crossfade blending ──────────────────
  const drawBlended = useCallback((exactFrame) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });

    const cw = canvas.width;
    const ch = canvas.height;

    const floorIdx = Math.floor(exactFrame);
    const ceilIdx = Math.min(floorIdx + 1, FRAME_COUNT - 1);
    const blend = exactFrame - floorIdx; // 0…1 between two frames

    const drawImg = (img, alpha) => {
      if (!img || !img.complete || img.naturalWidth === 0) return;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const scale = Math.max(cw / iw, ch / ih);
      const sw = iw * scale;
      const sh = ih * scale;
      const sx = (cw - sw) / 2;
      const sy = (ch - sh) / 2;
      ctx.globalAlpha = alpha;
      ctx.drawImage(img, sx, sy, sw, sh);
    };

    const imgA = framesRef.current[floorIdx];
    const imgB = framesRef.current[ceilIdx];

    // Draw base frame fully, then blend next frame on top
    drawImg(imgA, 1);
    if (blend > 0.01 && floorIdx !== ceilIdx) {
      drawImg(imgB, blend);
    }
    ctx.globalAlpha = 1;
  }, []);

  // ── Resize canvas to match viewport ──────────────────────
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    drawBlended(currentFrameRef.current);
  }, [drawBlended]);

  // ── Preload all frames on mount ──────────────────────────
  useEffect(() => {
    let cancelled = false;

    preloadFrames((progress) => {
      if (!cancelled) setLoadProgress(progress);
    }).then((images) => {
      if (cancelled) return;
      framesRef.current = images;
      setIsLoaded(true);
    });

    return () => { cancelled = true; };
  }, []);

  // ── Setup canvas sizing ──────────────────────────────────
  useEffect(() => {
    if (!isLoaded) return;
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [isLoaded, resizeCanvas]);

  // ── GSAP ScrollTrigger with PIN → frame scrubbing + hero reveal ──
  useEffect(() => {
    if (!isLoaded) return;

    drawBlended(0);

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      // Pin for PIN_SCROLL_DISTANCE × viewport heights
      end: () => `+=${window.innerHeight * PIN_SCROLL_DISTANCE}`,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        // ── Frame scrubbing with sub-frame precision ──
        const frameProgress = Math.min(progress / HERO_START, 1);
        const exactFrame = frameProgress * (FRAME_COUNT - 1);

        currentFrameRef.current = exactFrame;
        drawBlended(exactFrame);

        // ── Hero overlay fade-in: HERO_START → HERO_FULL ──
        if (heroOverlayRef.current) {
          let opacity = 0;
          if (progress >= HERO_START) {
            opacity = Math.min((progress - HERO_START) / (HERO_FULL - HERO_START), 1);
          }
          heroOverlayRef.current.style.opacity = opacity;
        }

        // ── Dark overlay dims the last frame so hero content is readable ──
        if (dimOverlayRef.current) {
          if (progress >= HERO_START) {
            const dim = Math.min((progress - HERO_START) / (HERO_FULL - HERO_START), 1);
            dimOverlayRef.current.style.opacity = dim;
          } else {
            dimOverlayRef.current.style.opacity = 0;
          }
        }

        // ── Mount hero children only after reaching last frame ──
        if (progress >= HERO_START - 0.02 && !heroRevealedRef.current) {
          heroRevealedRef.current = true;
          setHeroRevealed(true);
        } else if (progress < HERO_START - 0.08 && heroRevealedRef.current) {
          heroRevealedRef.current = false;
          setHeroRevealed(false);
        }
      },
    });

    return () => {
      st.kill();
    };
  }, [isLoaded, drawBlended]);

  // ═══════════════════════════════════════════════════════════
  //  RENDER
  // ═══════════════════════════════════════════════════════════
  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ zIndex: 1 }}
      id="scroll-animation"
    >
      {/* Deep ocean gradient behind canvas */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(180deg, #020617 0%, #032b43 25%, #011627 60%, #000814 85%, #000000 100%)",
        }}
      />

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10"
        style={{ display: isLoaded ? "block" : "none" }}
      />

      {/* Bubbles overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-cyan-400/30"
            style={{
              width: 4 + Math.random() * 12,
              height: 4 + Math.random() * 12,
              left: `${Math.random() * 100}%`,
              bottom: "-5%",
              background:
                "radial-gradient(circle at 30% 30%, rgba(34,211,238,0.35), transparent)",
            }}
            animate={{
              y: [0, -(window?.innerHeight || 900) * 1.2],
              x: [0, (Math.random() - 0.5) * 60],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* ── Dark dim overlay – darkens last frame for readability ── */}
      <div
        ref={dimOverlayRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0, zIndex: 15, background: "linear-gradient(180deg, rgba(2,6,23,0.7) 0%, rgba(3,43,67,0.6) 25%, rgba(1,22,39,0.65) 50%, rgba(1,22,39,0.85) 75%, #011627 100%)" }}
      />

      {/* ── Hero content overlay – fades in on last frame ── */}
      <div
        ref={heroOverlayRef}
        className="absolute inset-0 z-30"
        style={{ opacity: 0 }}
      >
        {heroRevealed && children}
      </div>

      {/* ── Loading overlay ──────────────────────────────── */}
      {!isLoaded && (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-background/90 backdrop-blur-md">
          <div className="w-48 h-2 bg-muted rounded-full overflow-hidden mb-4">
            <motion.div
              className="h-full bg-gradient-water rounded-full"
              style={{ width: `${loadProgress * 100}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
          <p className="text-sm font-display text-cyan-300 tracking-widest uppercase">
            Loading Animation… {Math.round(loadProgress * 100)}%
          </p>
        </div>
      )}
    </section>
  );
};

export default ScrollFrameAnimation;
