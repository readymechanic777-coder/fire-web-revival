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
      {/* Animated fire logo */}
      <motion.div
        className="relative mb-8"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Outer glow */}
        <motion.div
          className="absolute inset-0 rounded-full bg-fire-orange/30 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ width: 120, height: 120, marginLeft: -20, marginTop: -20 }}
        />
        
        {/* Fire icon */}
        <svg
          width="80"
          height="80"
          viewBox="0 0 24 24"
          fill="none"
          className="relative z-10"
        >
          <motion.path
            d="M12 2C12 2 8 6 8 10C8 12.21 9.79 14 12 14C14.21 14 16 12.21 16 10C16 6 12 2 12 2Z"
            fill="url(#fireGradient1)"
            animate={{
              d: [
                "M12 2C12 2 8 6 8 10C8 12.21 9.79 14 12 14C14.21 14 16 12.21 16 10C16 6 12 2 12 2Z",
                "M12 1C12 1 7 5 7 10C7 13 9 15 12 15C15 15 17 13 17 10C17 5 12 1 12 1Z",
                "M12 2C12 2 8 6 8 10C8 12.21 9.79 14 12 14C14.21 14 16 12.21 16 10C16 6 12 2 12 2Z",
              ],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 10 21 8 19 6C19 8 18 10 16 11C16 8 14 5 12 3C10 5 8 8 8 11C6 10 5 8 5 6C3 8 2 10 2 12C2 17.5228 6.47715 22 12 22Z"
            fill="url(#fireGradient2)"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <defs>
            <linearGradient id="fireGradient1" x1="12" y1="2" x2="12" y2="14" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFD93D" />
              <stop offset="1" stopColor="#FF6B35" />
            </linearGradient>
            <linearGradient id="fireGradient2" x1="12" y1="3" x2="12" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF6B35" />
              <stop offset="0.5" stopColor="#F7418F" />
              <stop offset="1" stopColor="#8B0000" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Title */}
      <motion.h1
        className="text-4xl md:text-6xl lg:text-7xl font-orbitron font-bold text-gradient-fire mb-8 tracking-wider"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        AVISHKAAR 2026
      </motion.h1>

      {/* Progress bar */}
      <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-fire rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ duration: 0.2 }}
        />
      </div>

      {/* Loading text */}
      <motion.p
        className="mt-4 text-sm text-muted-foreground font-exo"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Igniting the experience...
      </motion.p>

      {/* Floating ember particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-fire-orange"
          style={{
            left: `${20 + Math.random() * 60}%`,
            bottom: 0,
          }}
          animate={{
            y: [0, -window.innerHeight],
            opacity: [0, 1, 0],
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
