import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const LazySection = ({ children, className = '', animation = 'fade-up', delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setHasLoaded(true);
        } else if (hasLoaded) {
          // Keep rendered once loaded, but mark not visible
          setIsVisible(false);
        }
      },
      { rootMargin: '200px 0px', threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasLoaded]);

  // Lightweight ocean entrance — no infinite per-section animations (perf)
  const variants = {
    'fade-up': {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 },
    },
    'fade-left': {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 },
    },
    'fade-right': {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0 },
    },
    'scale': {
      hidden: { opacity: 0, scale: 0.94 },
      visible: { opacity: 1, scale: 1 },
    },
  };

  const selectedVariant = variants[animation] || variants['fade-up'];

  return (
    <div ref={ref} className={className}>
      {hasLoaded ? (
        <motion.div
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={selectedVariant}
          transition={{
            duration: 0.7,
            delay,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ willChange: isVisible ? 'auto' : 'transform, opacity' }}
        >
          {children}
        </motion.div>
      ) : (
        <div style={{ minHeight: '50vh' }} />
      )}
    </div>
  );
};

export default LazySection;
