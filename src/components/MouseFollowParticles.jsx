import { useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const MouseFollowParticles = () => {
  const [particles, setParticles] = useState([]);
  const [burstParticles, setBurstParticles] = useState([]);
  const [risingParticles, setRisingParticles] = useState([]);
  const [isActive, setIsActive] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  // Create trail particle
  const createParticle = useCallback((x, y) => {
    return {
      id: Date.now() + Math.random(),
      x: x + (Math.random() - 0.5) * 20,
      y: y + (Math.random() - 0.5) * 20,
      size: 4 + Math.random() * 8,
      opacity: 0.8 + Math.random() * 0.2,
      hue: 15 + Math.random() * 30,
      type: 'trail',
    };
  }, []);

  // Create burst particles on click
  const createBurstParticles = useCallback((x, y) => {
    const count = 12 + Math.floor(Math.random() * 8);
    return Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i + Math.random(),
      x,
      y,
      size: 6 + Math.random() * 10,
      opacity: 1,
      hue: 10 + Math.random() * 40,
      type: 'burst',
      angle: (i / count) * 360 + Math.random() * 30,
      distance: 80 + Math.random() * 120,
    }));
  }, []);

  // Create rising particles
  const createRisingParticle = useCallback(() => {
    return {
      id: Date.now() + Math.random(),
      x: Math.random() * 100,
      y: 100 + Math.random() * 20,
      size: 3 + Math.random() * 5,
      opacity: 0.6 + Math.random() * 0.4,
      hue: 15 + Math.random() * 35,
      type: 'rising',
    };
  }, []);

  // Initialize rising particles
  useEffect(() => {
    const initialRising = Array.from({ length: 8 }, createRisingParticle);
    setRisingParticles(initialRising);

    const interval = setInterval(() => {
      setRisingParticles(prev => {
        const newParticles = [...prev, createRisingParticle()];
        if (newParticles.length > 15) {
          return newParticles.slice(-15);
        }
        return newParticles;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [createRisingParticle]);

  // Remove old rising particles
  useEffect(() => {
    const interval = setInterval(() => {
      setRisingParticles(prev => prev.slice(1));
    }, 600);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = useCallback((e) => {
    const heroSection = document.getElementById('hero-section');
    if (!heroSection) return;
    
    const rect = heroSection.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
      setIsActive(true);
      mouseX.set(x);
      mouseY.set(y);
      
      setParticles(prev => {
        const newParticles = [...prev, createParticle(x, y)];
        if (newParticles.length > 20) {
          return newParticles.slice(-20);
        }
        return newParticles;
      });
    } else {
      setIsActive(false);
    }
  }, [mouseX, mouseY, createParticle]);

  const handleClick = useCallback((e) => {
    const heroSection = document.getElementById('hero-section');
    if (!heroSection) return;
    
    const rect = heroSection.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
      const burst = createBurstParticles(x, y);
      setBurstParticles(prev => [...prev, ...burst]);
      
      // Clean up burst particles after animation
      setTimeout(() => {
        setBurstParticles(prev => prev.filter(p => !burst.includes(p)));
      }, 1000);
    }
  }, [createBurstParticles]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, [handleMouseMove, handleClick]);

  // Remove old trail particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => prev.slice(1));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-[5] overflow-hidden">
      {/* Rising ambient particles */}
      {risingParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            bottom: 0,
            width: particle.size,
            height: particle.size,
            background: `hsl(${particle.hue}, 100%, 55%)`,
            boxShadow: `0 0 ${particle.size * 2}px hsl(${particle.hue}, 100%, 50%)`,
          }}
          initial={{ y: 0, opacity: 0, scale: 0.5 }}
          animate={{ 
            y: -400 - Math.random() * 200,
            x: (Math.random() - 0.5) * 60,
            opacity: [0, particle.opacity, particle.opacity, 0],
            scale: [0.5, 1.2, 1, 0],
          }}
          transition={{ 
            duration: 3 + Math.random() * 2,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Main cursor glow */}
      {isActive && (
        <motion.div
          className="absolute w-40 h-40 rounded-full"
          style={{
            x: springX,
            y: springY,
            translateX: '-50%',
            translateY: '-50%',
            background: 'radial-gradient(circle, hsl(25, 100%, 50% / 0.25) 0%, hsl(15, 100%, 45% / 0.1) 40%, transparent 70%)',
            filter: 'blur(15px)',
          }}
        />
      )}

      {/* Trailing particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          initial={{ 
            x: particle.x, 
            y: particle.y, 
            scale: 1, 
            opacity: particle.opacity 
          }}
          animate={{ 
            y: particle.y - 100 - Math.random() * 50,
            x: particle.x + (Math.random() - 0.5) * 40,
            scale: 0,
            opacity: 0,
          }}
          transition={{ 
            duration: 1 + Math.random() * 0.5,
            ease: "easeOut",
          }}
          style={{
            width: particle.size,
            height: particle.size,
            background: `hsl(${particle.hue}, 100%, 55%)`,
            boxShadow: `0 0 ${particle.size * 2}px hsl(${particle.hue}, 100%, 50%)`,
            translateX: '-50%',
            translateY: '-50%',
          }}
        />
      ))}

      {/* Burst particles on click */}
      {burstParticles.map((particle) => {
        const radians = ((particle.angle || 0) * Math.PI) / 180;
        const targetX = particle.x + Math.cos(radians) * (particle.distance || 100);
        const targetY = particle.y + Math.sin(radians) * (particle.distance || 100);
        
        return (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            initial={{ 
              x: particle.x, 
              y: particle.y, 
              scale: 0, 
              opacity: 1 
            }}
            animate={{ 
              x: targetX,
              y: targetY - 50,
              scale: [0, 1.5, 0],
              opacity: [1, 0.8, 0],
            }}
            transition={{ 
              duration: 0.8 + Math.random() * 0.3,
              ease: "easeOut",
            }}
            style={{
              width: particle.size,
              height: particle.size,
              background: `hsl(${particle.hue}, 100%, 60%)`,
              boxShadow: `0 0 ${particle.size * 3}px hsl(${particle.hue}, 100%, 55%), 0 0 ${particle.size * 5}px hsl(${particle.hue}, 100%, 45% / 0.5)`,
              translateX: '-50%',
              translateY: '-50%',
            }}
          />
        );
      })}

      {/* Click flash effect */}
      {burstParticles.length > 0 && (
        <motion.div
          className="absolute rounded-full"
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            x: burstParticles[0]?.x || 0,
            y: burstParticles[0]?.y || 0,
            width: 50,
            height: 50,
            translateX: '-50%',
            translateY: '-50%',
            background: 'radial-gradient(circle, hsl(45, 100%, 70%), hsl(25, 100%, 50%), transparent)',
            filter: 'blur(5px)',
          }}
        />
      )}

      {/* Inner bright cursor */}
      {isActive && (
        <motion.div
          className="absolute w-5 h-5 rounded-full"
          style={{
            x: springX,
            y: springY,
            translateX: '-50%',
            translateY: '-50%',
            background: 'radial-gradient(circle, hsl(45, 100%, 75%) 0%, hsl(25, 100%, 55%) 100%)',
            boxShadow: '0 0 25px hsl(25, 100%, 50%), 0 0 50px hsl(20, 100%, 45% / 0.6)',
          }}
          animate={{
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
          }}
        />
      )}
    </div>
  );
};

export default MouseFollowParticles;
