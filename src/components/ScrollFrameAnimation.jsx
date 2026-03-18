import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const PIN_SCROLL_DISTANCE = 3.5;
const HERO_START = 0.85;
const HERO_FULL = 0.96;

const ScrollFrameAnimation = ({ children }) => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const heroOverlayRef = useRef(null);
  const dimOverlayRef = useRef(null);
  const heroRevealedRef = useRef(false);
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoaded = () => {
      setVideoReady(true);
    };

    if (video.readyState >= 2) {
      onLoaded();
    } else {
      video.addEventListener("loadeddata", onLoaded);
    }

    return () => video.removeEventListener("loadeddata", onLoaded);
  }, []);

  useEffect(() => {
    if (!videoReady) return;
    const video = videoRef.current;
    if (!video || !video.duration) return;

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: () => `+=${window.innerHeight * PIN_SCROLL_DISTANCE}`,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        // Scrub video based on scroll
        const videoProgress = Math.min(progress / HERO_START, 1);
        video.currentTime = videoProgress * video.duration;

        // Hero overlay fade-in
        if (heroOverlayRef.current) {
          let opacity = 0;
          if (progress >= HERO_START) {
            opacity = Math.min((progress - HERO_START) / (HERO_FULL - HERO_START), 1);
          }
          heroOverlayRef.current.style.opacity = opacity;
        }

        // Dark dim overlay
        if (dimOverlayRef.current) {
          if (progress >= HERO_START) {
            const dim = Math.min((progress - HERO_START) / (HERO_FULL - HERO_START), 1);
            dimOverlayRef.current.style.opacity = dim;
          } else {
            dimOverlayRef.current.style.opacity = 0;
          }
        }

        // Hero reveal toggle
        if (progress >= HERO_START - 0.02 && !heroRevealedRef.current) {
          heroRevealedRef.current = true;
          setHeroRevealed(true);
        } else if (progress < HERO_START - 0.08 && heroRevealedRef.current) {
          heroRevealedRef.current = false;
          setHeroRevealed(false);
        }
      },
    });

    return () => st.kill();
  }, [videoReady]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ zIndex: 1 }}
      id="scroll-animation"
    >
      {/* Deep ocean gradient behind video */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(180deg, #020617 0%, #032b43 25%, #011627 60%, #000814 85%, #000000 100%)",
        }}
      />

      {/* Video background */}
      <video
        ref={videoRef}
        src="/videos/hero-bg.mp4"
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 z-10 w-full h-full object-cover"
        style={{ display: videoReady ? "block" : "none" }}
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

      {/* Dark dim overlay */}
      <div
        ref={dimOverlayRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0, zIndex: 15, background: "linear-gradient(180deg, rgba(2,6,23,0.7) 0%, rgba(3,43,67,0.6) 25%, rgba(1,22,39,0.65) 50%, rgba(1,22,39,0.85) 75%, #011627 100%)" }}
      />

      {/* Hero content overlay */}
      <div
        ref={heroOverlayRef}
        className="absolute inset-0 z-30"
        style={{ opacity: 0 }}
      >
        {heroRevealed && children}
      </div>

      {/* Loading overlay */}
      {!videoReady && (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-background/90 backdrop-blur-md">
          <div className="w-12 h-12 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mb-4" />
          <p className="text-sm font-display text-cyan-300 tracking-widest uppercase">
            Loading…
          </p>
        </div>
      )}
    </section>
  );
};

export default ScrollFrameAnimation;
