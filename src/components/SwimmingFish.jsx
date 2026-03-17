import { motion } from "framer-motion";

const fishSVG = (color, flip, size = 40) => (
  <svg width={size} height={size * 0.6} viewBox="0 0 80 48" fill="none" style={{ transform: flip ? "scaleX(-1)" : "none" }}>
    <ellipse cx="38" cy="24" rx="28" ry="14" fill={color} opacity="0.85" />
    <polygon points="66,24 80,10 80,38" fill={color} opacity="0.7" />
    <circle cx="22" cy="20" r="3" fill="hsl(210, 100%, 95%)" />
    <circle cx="22" cy="20" r="1.5" fill="hsl(220, 80%, 20%)" />
    <ellipse cx="38" cy="24" rx="28" ry="14" fill="url(#shimmer)" opacity="0.3" />
    <defs>
      <linearGradient id="shimmer" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="white" stopOpacity="0.6" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

const defaultFishConfigs = [
  { y: "12%", color: "hsl(195, 90%, 55%)", size: 38, duration: 14, delay: 0, flip: false },
  { y: "30%", color: "hsl(35, 95%, 60%)", size: 32, duration: 11, delay: 2, flip: true },
  { y: "55%", color: "hsl(340, 80%, 60%)", size: 44, duration: 16, delay: 4, flip: false },
  { y: "75%", color: "hsl(160, 85%, 50%)", size: 30, duration: 12, delay: 1, flip: true },
  { y: "45%", color: "hsl(270, 70%, 65%)", size: 36, duration: 18, delay: 6, flip: false },
  { y: "85%", color: "hsl(50, 90%, 55%)", size: 28, duration: 10, delay: 3, flip: true },
];

const SwimmingFish = ({ configs = defaultFishConfigs }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {configs.map((fish, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top: fish.y }}
          initial={{
            x: fish.flip ? "calc(100vw + 80px)" : "-120px",
            opacity: 0,
          }}
          animate={{
            x: fish.flip ? "-120px" : "calc(100vw + 80px)",
            opacity: [0, 1, 1, 1, 0],
          }}
          transition={{
            duration: fish.duration,
            delay: fish.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <motion.div
            animate={{ y: [0, -8, 0, 8, 0] }}
            transition={{ duration: fish.duration / 3, repeat: Infinity, ease: "easeInOut" }}
          >
            {fishSVG(fish.color, fish.flip, fish.size)}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default SwimmingFish;
