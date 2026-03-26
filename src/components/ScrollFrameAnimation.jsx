import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const ScrollFrameAnimation = ({ children }) => {
  const videoRef = useRef(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  // Lock scroll until video ends
  useEffect(() => {
    if (!videoEnded) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    } else {
      document.body.style.overflow = "";
      document.body.style.height = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, [videoEnded]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onReady = () => {
      setVideoReady(true);
      video.play().catch(() => {});
    };

    const onEnded = () => setVideoEnded(true);

    if (video.readyState >= 2) {
      onReady();
    } else {
      video.addEventListener("canplaythrough", onReady);
    }
    video.addEventListener("ended", onEnded);

    return () => {
      video.removeEventListener("canplaythrough", onReady);
      video.removeEventListener("ended", onEnded);
    };
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden" id="scroll-animation">
      {/* Deep ocean gradient behind video */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(180deg, #020617 0%, #032b43 25%, #011627 60%, #000814 85%, #000000 100%)",
        }}
      />

      {/* Video background - fixed during playback, then static last frame */}
      <div className={`${videoEnded ? "absolute" : "fixed"} inset-0 z-10`}>
        <video
          ref={videoRef}
          src="/videos/hero-bg.mp4"
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          style={{ display: videoReady ? "block" : "none" }}
        />
      </div>

      {/* Dark dim overlay - fades in when video ends */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[15]"
        initial={{ opacity: 0 }}
        animate={{ opacity: videoEnded ? 1 : 0 }}
        transition={{ duration: 1.2 }}
        style={{
          background:
            "linear-gradient(180deg, rgba(2,6,23,0.7) 0%, rgba(3,43,67,0.6) 25%, rgba(1,22,39,0.65) 50%, rgba(1,22,39,0.85) 75%, #011627 100%)",
        }}
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

      {/* Hero content - appears after video ends */}
      <motion.div
        className="relative z-30 min-h-screen"
        initial={{ opacity: 0, y: 30 }}
        animate={videoEnded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 1, delay: 0.3 }}
        style={{ pointerEvents: videoEnded ? "auto" : "none" }}
      >
        {children}
      </motion.div>

      {/* Loading overlay */}
      {!videoReady && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-background/90 backdrop-blur-md">
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
