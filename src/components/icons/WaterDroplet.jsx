import { motion } from "framer-motion";

const WaterDroplet = ({ size = 20, animate = false, className = "" }) => {
  const Wrapper = animate ? motion.svg : "svg";
  const animateProps = animate
    ? {
        animate: { scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] },
        transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
      }
    : {};

  return (
    <Wrapper
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      {...animateProps}
    >
      <defs>
        <linearGradient id="dropGrad" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="hsl(175, 100%, 65%)" />
          <stop offset="50%" stopColor="hsl(190, 100%, 50%)" />
          <stop offset="100%" stopColor="hsl(220, 80%, 50%)" />
        </linearGradient>
        <radialGradient id="dropHighlight" cx="0.38" cy="0.35" r="0.35">
          <stop offset="0%" stopColor="hsl(190, 100%, 90%)" stopOpacity="0.7" />
          <stop offset="100%" stopColor="hsl(190, 100%, 90%)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path
        d="M12 2C12 2 5.5 10 5.5 15C5.5 18.59 8.41 21.5 12 21.5C15.59 21.5 18.5 18.59 18.5 15C18.5 10 12 2 12 2Z"
        fill="url(#dropGrad)"
      />
      <ellipse cx="10" cy="13" rx="3" ry="4" fill="url(#dropHighlight)" />
    </Wrapper>
  );
};

export default WaterDroplet;
