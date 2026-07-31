import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * ParallaxSection — wraps a section with bold scroll-driven motion.
 * Variants:
 *  - "zoom": scale up as section enters, scale down as it leaves (pinned feel)
 *  - "rise": translateY parallax + fade reveal
 *  - "tilt": subtle 3D tilt + parallax
 *  - "mask": clip-path reveal as you scroll in
 */
export const ParallaxSection = ({
  children,
  variant = "rise",
  intensity = 1,
  className = "",
}) => {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Hooks must be called unconditionally
  const yRise = useTransform(scrollYProgress, [0, 0.5, 1], [120 * intensity, 0, -80 * intensity]);
  const opacityRise = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0, 1, 1, 0.6]);

  const scaleZoom = useTransform(scrollYProgress, [0, 0.5, 1], [0.82, 1, 1.08]);
  const opacityZoom = useTransform(scrollYProgress, [0, 0.25, 0.85, 1], [0, 1, 1, 0.7]);
  const blurZoom = useTransform(scrollYProgress, [0, 0.3, 0.85, 1], ["8px", "0px", "0px", "4px"]);

  const rotateXTilt = useTransform(scrollYProgress, [0, 0.5, 1], [10 * intensity, 0, -8 * intensity]);
  const yTilt = useTransform(scrollYProgress, [0, 1], [60 * intensity, -60 * intensity]);

  const clipMask = useTransform(
    scrollYProgress,
    [0, 0.45],
    ["inset(0% 50% 0% 50% round 32px)", "inset(0% 0% 0% 0% round 0px)"]
  );

  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  if (variant === "zoom") {
    return (
      <motion.div
        ref={ref}
        className={className}
        style={{
          scale: scaleZoom,
          opacity: opacityZoom,
          filter: useTransformToFilter(blurZoom),
          willChange: "transform, opacity, filter",
        }}
      >
        {children}
      </motion.div>
    );
  }

  if (variant === "tilt") {
    return (
      <motion.div
        ref={ref}
        className={className}
        style={{
          y: yTilt,
          rotateX: rotateXTilt,
          transformPerspective: 1200,
          willChange: "transform",
        }}
      >
        {children}
      </motion.div>
    );
  }

  if (variant === "mask") {
    return (
      <motion.div
        ref={ref}
        className={className}
        style={{ clipPath: clipMask, WebkitClipPath: clipMask, willChange: "clip-path" }}
      >
        {children}
      </motion.div>
    );
  }

  // rise (default)
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y: yRise, opacity: opacityRise, willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
};

// Helper: wrap a MotionValue<string> as a CSS filter string `blur(x)`
const useTransformToFilter = (mv) => useTransform(mv, (v) => `blur(${v})`);

/**
 * ParallaxLayer — for stacked depth elements (backgrounds inside a section).
 */
export const ParallaxLayer = ({ children, speed = 0.4, className = "", style = {} }) => {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [200 * speed, -200 * speed]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ ...style, y: reduce ? 0 : y, willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxSection;
