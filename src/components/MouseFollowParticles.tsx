import { useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  hue: number;
}

const MouseFollowParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isActive, setIsActive] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const createParticle = useCallback((x: number, y: number) => {
    const newParticle: Particle = {
      id: Date.now() + Math.random(),
      x: x + (Math.random() - 0.5) * 20,
      y: y + (Math.random() - 0.5) * 20,
      size: 4 + Math.random() * 8,
      opacity: 0.8 + Math.random() * 0.2,
      hue: 15 + Math.random() * 30, // Fire colors: orange to yellow
    };
    return newParticle;
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const heroSection = document.getElementById('hero-section');
    if (!heroSection) return;
    
    const rect = heroSection.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Check if mouse is within hero section
    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
      setIsActive(true);
      mouseX.set(x);
      mouseY.set(y);
      
      // Create new particles on movement
      setParticles(prev => {
        const newParticles = [...prev, createParticle(x, y)];
        // Limit particle count for performance
        if (newParticles.length > 20) {
          return newParticles.slice(-20);
        }
        return newParticles;
      });
    } else {
      setIsActive(false);
    }
  }, [mouseX, mouseY, createParticle]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  // Remove old particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => prev.slice(1));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-[5] overflow-hidden">
      {/* Main cursor glow */}
      {isActive && (
        <motion.div
          className="absolute w-32 h-32 rounded-full pointer-events-none"
          style={{
            x: springX,
            y: springY,
            translateX: '-50%',
            translateY: '-50%',
            background: 'radial-gradient(circle, hsl(25, 100%, 50% / 0.3) 0%, hsl(15, 100%, 45% / 0.1) 50%, transparent 70%)',
            filter: 'blur(10px)',
          }}
        />
      )}

      {/* Trailing particles */}
      {particles.map((particle, index) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full pointer-events-none"
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

      {/* Inner bright cursor */}
      {isActive && (
        <motion.div
          className="absolute w-4 h-4 rounded-full pointer-events-none"
          style={{
            x: springX,
            y: springY,
            translateX: '-50%',
            translateY: '-50%',
            background: 'radial-gradient(circle, hsl(45, 100%, 70%) 0%, hsl(25, 100%, 55%) 100%)',
            boxShadow: '0 0 20px hsl(25, 100%, 50%), 0 0 40px hsl(20, 100%, 45% / 0.5)',
          }}
          animate={{
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
          }}
        />
      )}
    </div>
  );
};

export default MouseFollowParticles;
