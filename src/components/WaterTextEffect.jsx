import { motion } from "framer-motion";
import { useMemo, useState, useCallback } from "react";
const WaterTextEffect = ({ children, id = "waterText" }) => {
  const filterId = `waterDistort-${id}`;
  const [distortStrength, setDistortStrength] = useState(4);
  const drips = useMemo(() => [...Array(5)].map((_, i) => ({
    id: i,
    width: 3 + Math.random() * 3,
    height: 8 + Math.random() * 10,
    left: 15 + i * 18,
    delay: i * 0.6 + Math.random() * 0.5,
    duration: 1.5 + Math.random(),
    repeatDelay: 1 + Math.random() * 2,
  })), []);
  const ripples = useMemo(() => [...Array(3)].map((_, i) => ({
    id: i,
    delay: i * 1.8,
    duration: 3.5 + i * 0.5,
  })), []);

  const handleMouseMove = useCallback((event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    const distance = Math.sqrt(x * x + y * y);
    const strength = 4 + distance * 12;
    setDistortStrength(strength);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setDistortStrength(4);
  }, []);

  return (<div className="relative flex items-center justify-center"
    onMouseMove={handleMouseMove}
    onMouseLeave={handleMouseLeave}
  >
    
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {ripples.map((r) => (<motion.div key={`ripple-${r.id}`} className="absolute rounded-full border" style={{
        borderColor: 'hsl(195, 100%, 60% / 0.4)',
        boxShadow: '0 0 15px hsl(195, 100%, 50% / 0.2), inset 0 0 15px hsl(195, 100%, 50% / 0.1)',
      }} initial={{ width: 40, height: 20, opacity: 0.6 }} animate={{
        width: [40, 500, 900],
        height: [20, 200, 400],
        opacity: [0.6, 0.3, 0],
        borderWidth: [2, 1.5, 0.5],
      }} transition={{
        duration: r.duration,
        delay: r.delay,
        repeat: Infinity,
        ease: "easeOut",
      }} />))}
    </div>

    
    <svg className="absolute w-0 h-0">
      <defs>
        <filter id={filterId}>
          <feTurbulence type="fractalNoise" baseFrequency="0.015 0.04" numOctaves="3" seed="3" result="noise">
            <animate attributeName="baseFrequency" values="0.015 0.04;0.02 0.06;0.015 0.04" dur="4s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={distortStrength} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>

    <div className="relative z-10" style={{ filter: `url(#${filterId})` }}>
      {children}
    </div>

    
    <motion.div className="absolute inset-0 pointer-events-none z-20" style={{
      background: 'linear-gradient(105deg, transparent 40%, hsl(195, 100%, 90% / 0.15) 45%, hsl(195, 100%, 95% / 0.25) 50%, transparent 55%)',
      backgroundSize: '200% 100%',
    }} animate={{
      backgroundPosition: ['200% 0%', '-200% 0%'],
    }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }} />

    
    <div className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none z-10">
      {drips.map((d) => (<motion.div key={`drip-${d.id}`} className="absolute rounded-full" style={{
        width: d.width,
        height: d.height,
        left: `${d.left}%`,
        top: 0,
        background: 'linear-gradient(to bottom, hsl(195, 100%, 70% / 0.8), hsl(195, 100%, 50% / 0.3))',
        borderRadius: '50% 50% 50% 50% / 30% 30% 70% 70%',
      }} animate={{
        y: [0, 30, 50],
        opacity: [0.8, 0.5, 0],
        scaleY: [1, 1.5, 0.5],
      }} transition={{
        duration: d.duration,
        repeat: Infinity,
        delay: d.delay,
        ease: "easeIn",
        repeatDelay: d.repeatDelay,
      }} />))}
    </div>
  </div>);
};
export default WaterTextEffect;
