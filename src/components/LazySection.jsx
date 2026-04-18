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

  // Ocean-themed entrance animations: floating, drifting, surfacing
  const variants = {
    'fade-up': {
      hidden: { opacity: 0, y: 80, filter: 'blur(8px)' },
      visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
    },
    'fade-left': {
      hidden: { opacity: 0, x: -80, rotate: -2, filter: 'blur(6px)' },
      visible: { opacity: 1, x: 0, rotate: 0, filter: 'blur(0px)' },
    },
    'fade-right': {
      hidden: { opacity: 0, x: 80, rotate: 2, filter: 'blur(6px)' },
      visible: { opacity: 1, x: 0, rotate: 0, filter: 'blur(0px)' },
    },
    'scale': {
      hidden: { opacity: 0, scale: 0.85, filter: 'blur(10px)' },
      visible: { opacity: 1, scale: 1, filter: 'blur(0px)' },
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
            duration: 1.2,
            delay,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <motion.div
            animate={isVisible ? { y: [0, -6, 0, 4, 0] } : {}}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          >
            {children}
          </motion.div>
        </motion.div>
      ) : (
        <div style={{ minHeight: '50vh' }} />
      )}
    </div>
  );
};

export default LazySection;
