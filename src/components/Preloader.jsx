import { motion, AnimatePresence } from "framer-motion";
import { zoomIn, fadeIn } from "@/lib/motion";
import { useEffect, useState } from "react";

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Animated liquid logo */}
      <motion.div
        className="relative mb-8"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Outer glow */}
        <motion.div
          className="absolute inset-0 rounded-full blur-3xl"
          style={{ background: 'hsl(190, 100%, 50% / 0.3)' }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        
        {/* Liquid droplet icon */}
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" className="relative z-10">
          <motion.path
            d="M12 2C12 2 6 9 6 14C6 17.31 8.69 20 12 20C15.31 20 18 17.31 18 14C18 9 12 2 12 2Z"
            fill="url(#liquidGradient)"
            animate={{
              d: [
                "M12 2C12 2 6 9 6 14C6 17.31 8.69 20 12 20C15.31 20 18 17.31 18 14C18 9 12 2 12 2Z",
                "M12 1C12 1 5 8.5 5 14C5 18 8 21 12 21C16 21 19 18 19 14C19 8.5 12 1 12 1Z",
                "M12 2C12 2 6 9 6 14C6 17.31 8.69 20 12 20C15.31 20 18 17.31 18 14C18 9 12 2 12 2Z",
              ],
            }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Inner reflection */}
          <motion.ellipse
            cx="10" cy="12" rx="2.5" ry="3.5"
            fill="hsl(190, 100%, 80% / 0.3)"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <defs>
            <linearGradient id="liquidGradient" x1="12" y1="2" x2="12" y2="20" gradientUnits="userSpaceOnUse">
              <stop stopColor="hsl(175, 100%, 65%)" />
              <stop offset="0.5" stopColor="hsl(190, 100%, 50%)" />
              <stop offset="1" stopColor="hsl(220, 80%, 45%)" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Title */}
      <motion.h1
        className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-gradient-liquid mb-8 tracking-wider"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        AVISHKAAR 2026
      </motion.h1>

      {/* Progress bar */}
      <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-liquid rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ duration: 0.2 }}
        />
      </div>

      {/* Loading text */}
      <motion.p
        className="mt-4 text-sm text-muted-foreground font-body"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Immersing into the experience...
      </motion.p>

      {/* Floating bubble particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${20 + Math.random() * 60}%`,
            bottom: 0,
            width: 6 + Math.random() * 6,
            height: 6 + Math.random() * 6,
            background: `radial-gradient(circle at 30% 30%, hsl(${180 + Math.random() * 40}, 100%, 80% / 0.5), hsl(${180 + Math.random() * 40}, 100%, 50% / 0.2))`,
            border: '1px solid hsl(190, 100%, 70% / 0.3)',
          }}
          animate={{
            y: [0, -window.innerHeight],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1, 0.3],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeOut",
          }}
        />
      ))}
    </motion.div>
  );
};

export const usePreloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleComplete = () => {
    setIsLoading(false);
  };

  const PreloaderComponent = () => (
    <AnimatePresence mode="wait">
      {isLoading && <Preloader onComplete={handleComplete} />}
    </AnimatePresence>
  );

  return { isLoading, PreloaderComponent };
};

export default Preloader;
