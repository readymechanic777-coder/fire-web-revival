import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate, useScroll, useSpring, useInView } from "framer-motion";
import { Laptop, Users, Trophy, Medal, Award, Star, ArrowRight, Clock } from "lucide-react";
import WaterTextEffect from "./WaterTextEffect";
import FloatingParticles from "./FloatingParticles";

function AnimatedNumber({ value, delay = 0 }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());
  useEffect(() => {
    const controls = animate(count, value, {
      duration: 1,
      delay: delay + 0.5,
      ease: "easeOut",
    });
    return controls.stop;
  }, [value, delay]);
  return <motion.span>{rounded}</motion.span>;
}
const CountdownTimer = ({ targetDate, type }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);
  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];
  return (<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-6">
    <div className="flex items-center gap-2 mb-3">
      <Clock className="w-4 h-4 text-primary" />
      <span className="text-sm font-display text-muted-foreground">
        {type === 'virtual' ? 'Virtual Starts In' : 'Physical Starts In'}
      </span>
    </div>
    <div className="flex gap-2">
      {timeUnits.map((unit, index) => (<motion.div key={unit.label} initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="relative flex-1">
        <div className="bg-background/80 border border-primary/30 rounded-lg p-2 text-center overflow-hidden group hover:border-primary/60 transition-colors">
          <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{
            background: 'radial-gradient(circle at center, hsl(var(--primary) / 0.15), transparent 70%)',
          }} />

          <motion.span key={unit.value} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="relative block text-xl md:text-2xl font-display font-bold text-primary">
            {String(unit.value).padStart(2, '0')}
          </motion.span>
          <span className="relative text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider">
            {unit.label}
          </span>
        </div>
      </motion.div>))}
    </div>
  </motion.div>);
};
const LargeCountdownTimer = ({ type }) => {
  const getTargetDate = () => {
    return type === 'virtual'
      ? new Date('2026-12-20T00:00:00').getTime()
      : new Date('2026-12-26T00:00:00').getTime();
  };
  const calculateTime = () => {
    const now = new Date().getTime();
    const target = getTargetDate();
    const difference = target - now;
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };
  const [timeLeft, setTimeLeft] = useState(calculateTime);
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);
    return () => clearInterval(timer);
  }, [type]);
  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];
  return (<motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="py-12">

    <motion.div className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-4">
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <Clock className="w-8 h-8 text-primary" />
        </motion.div>
        <h3 className="text-2xl md:text-4xl font-display font-black text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
          {type === 'virtual' ? 'Virtual Hackathon' : 'Physical Hackathon'} Starts In
        </h3>
      </div>
      <p className="text-muted-foreground">
        {type === 'virtual' ? 'December 20, 2026' : 'December 26, 2026'}
      </p>
    </motion.div>


    <div className="flex justify-center gap-4 md:gap-8">
      {timeUnits.map((unit, index) => (<motion.div key={unit.label} initial={{ scale: 0.5, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }} className="relative group">
        <div className="relative bg-card border-2 border-primary/40 rounded-2xl p-4 md:p-8 text-center overflow-hidden hover:border-primary transition-all duration-300 min-w-[80px] md:min-w-[140px]">

          <motion.div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity" style={{
            background: 'radial-gradient(circle at center bottom, hsl(var(--primary) / 0.3), transparent 70%)',
          }} />


          <motion.div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary" animate={{
            y: [-5, -20, -5],
            opacity: [0.5, 1, 0.5],
            scale: [0.8, 1.2, 0.8],
          }} transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }} />


          <motion.span key={unit.value} initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="relative block text-4xl md:text-7xl font-display font-black text-transparent bg-clip-text" style={{
            background: 'linear-gradient(180deg, hsl(var(--primary)), hsl(220, 85%, 55%))',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
          }}>
            {String(unit.value).padStart(2, '0')}
          </motion.span>


          <span className="relative text-sm md:text-lg text-muted-foreground uppercase tracking-widest font-display mt-2 block">
            {unit.label}
          </span>


          <motion.div className="absolute bottom-0 left-0 right-0 h-1" style={{
            background: 'linear-gradient(to right, transparent, hsl(var(--primary)), transparent)',
          }} animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }} />
        </div>
      </motion.div>))}
    </div>
  </motion.div>);
};
const TimelineCursor = ({ containerRef }) => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [ripples, setRipples] = useState([]);
  const rippleId = useRef(0);
  useEffect(() => {
    const container = containerRef.current;
    if (!container)
      return;
    const handleMove = (e) => {
      const rect = container.getBoundingClientRect();
      cursorX.set(e.clientX - rect.left);
      cursorY.set(e.clientY - rect.top);
    };
    const handleClick = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = ++rippleId.current;
      setRipples(prev => [...prev.slice(-4), { id, x, y }]);
      setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 1200);
    };
    container.addEventListener('mousemove', handleMove);
    container.addEventListener('click', handleClick);
    return () => {
      container.removeEventListener('mousemove', handleMove);
      container.removeEventListener('click', handleClick);
    };
  }, [containerRef, cursorX, cursorY]);
  return (<>

    <motion.div className="absolute pointer-events-none z-[20] hidden md:block" style={{
      x: cursorX,
      y: cursorY,
      translateX: '-50%',
      translateY: '-50%',
    }}>

      <motion.div className="absolute -inset-6 rounded-full" style={{
        background: 'radial-gradient(circle, hsl(195, 100%, 50% / 0.15), transparent 70%)',
      }} animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 2, repeat: Infinity }} />

      <div className="w-5 h-5 rounded-full border border-primary/40" style={{
        background: 'radial-gradient(circle at 30% 30%, hsl(195, 100%, 80% / 0.6), hsl(195, 100%, 50% / 0.2))',
        boxShadow: '0 0 12px hsl(195, 100%, 50% / 0.4)',
      }} />
    </motion.div>


    {ripples.map(ripple => (<motion.div key={ripple.id} className="absolute pointer-events-none z-[19]" style={{ left: ripple.x, top: ripple.y, translateX: '-50%', translateY: '-50%' }} initial={{ scale: 0, opacity: 0.8 }} animate={{ scale: 4, opacity: 0 }} transition={{ duration: 1.2, ease: "easeOut" }}>
      <div className="w-12 h-12 rounded-full" style={{
        border: '2px solid hsl(195, 100%, 50% / 0.5)',
        boxShadow: '0 0 20px hsl(195, 100%, 50% / 0.3)',
      }} />
    </motion.div>))}
  </>);
};
const ScrollProgressLine = ({ containerRef }) => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const height = useTransform(smoothProgress, [0, 1], ['0%', '100%']);
  const glowOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.3, 0.8, 1]);
  return (<div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-[3px] md:-translate-x-1/2 z-[5]">

    <div className="absolute inset-0 rounded-full" style={{
      background: 'linear-gradient(to bottom, hsl(195, 100%, 50% / 0.1), hsl(220, 85%, 50% / 0.05))',
    }} />

    <motion.div className="absolute top-0 left-0 right-0 rounded-full" style={{
      height,
      background: 'linear-gradient(to bottom, hsl(175, 100%, 50%), hsl(195, 100%, 50%), hsl(220, 85%, 55%))',
      boxShadow: '0 0 15px hsl(195, 100%, 50% / 0.6), 0 0 30px hsl(195, 100%, 50% / 0.3)',
    }} />

    <motion.div className="absolute left-1/2 -translate-x-1/2 w-2 h-8 rounded-full" style={{
      top: height,
      background: 'linear-gradient(to bottom, transparent, hsl(195, 100%, 80%), transparent)',
      opacity: glowOpacity,
      filter: 'blur(1px)',
    }} />

    <motion.div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full" style={{
      top: height,
      translateY: '-50%',
      background: 'hsl(195, 100%, 70%)',
      boxShadow: '0 0 20px hsl(195, 100%, 50%), 0 0 40px hsl(195, 100%, 50% / 0.5)',
    }} />
  </div>);
};
const TimelineItem = ({ phase, index, totalItems }) => {
  const itemRef = useRef(null);
  const isEven = index % 2 === 0;
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start 85%", "start 40%"],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 150, damping: 25 });
  const opacity = useTransform(smoothProgress, [0, 1], [0, 1]);
  const x = useTransform(smoothProgress, [0, 1], [isEven ? -60 : 60, 0]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.85, 0.95, 1]);
  const blur = useTransform(smoothProgress, [0, 0.5, 1], [8, 2, 0]);
  const filterBlur = useTransform(blur, v => `blur(${v}px)`);
  const dotScale = useTransform(smoothProgress, [0, 0.3, 1], [0, 1.3, 1]);
  const dotGlow = useTransform(smoothProgress, [0, 0.5, 1], [0, 1, 0.6]);
  return (<div ref={itemRef} className={`relative flex items-start gap-0 mb-16 last:mb-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}>

    <motion.div className={`flex-1 pl-14 md:pl-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`} style={{ opacity, x, scale, filter: filterBlur }}>
      <motion.div className="relative rounded-2xl overflow-hidden group" whileHover={{ scale: 1.03, y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>

        <div className="relative rounded-2xl p-6 md:p-8 border border-white/10 overflow-hidden" style={{
          background: 'linear-gradient(135deg, hsl(210, 50%, 10% / 0.95), hsl(220, 60%, 6% / 0.9))',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          boxShadow: '0 8px 40px hsl(220, 85%, 10% / 0.6), inset 0 1px 0 rgba(255,255,255,0.08)',
        }}>

          <motion.div className="absolute top-0 left-0 right-0 h-[1px]" style={{
            background: 'linear-gradient(90deg, transparent 5%, hsl(195, 100%, 70% / 0.5) 30%, hsl(195, 100%, 90% / 0.7) 50%, hsl(195, 100%, 70% / 0.5) 70%, transparent 95%)',
          }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: index * 0.1 }} />


          <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{
            background: `
                  radial-gradient(ellipse at ${isEven ? '70%' : '30%'} 20%, hsl(195, 100%, 50% / 0.06), transparent 60%),
                  radial-gradient(ellipse at ${isEven ? '30%' : '70%'} 80%, hsl(175, 100%, 45% / 0.04), transparent 50%)
                `,
          }} />


          <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <motion.div className="absolute top-0 left-0 h-[2px] w-16" style={{
              background: 'linear-gradient(90deg, transparent, hsl(195, 100%, 60%), transparent)',
              boxShadow: '0 0 10px hsl(195, 100%, 50%)',
            }} animate={{ left: ['-10%', '110%'] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
            <motion.div className="absolute bottom-0 right-0 h-[2px] w-16" style={{
              background: 'linear-gradient(270deg, transparent, hsl(175, 100%, 50%), transparent)',
              boxShadow: '0 0 10px hsl(175, 100%, 50%)',
            }} animate={{ right: ['-10%', '110%'] }} transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }} />
          </div>


          <motion.div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-display font-bold uppercase tracking-wider mb-4 ${isEven ? 'md:ml-auto' : ''}`} style={{
            background: 'linear-gradient(135deg, hsl(195, 100%, 50% / 0.15), hsl(220, 85%, 50% / 0.1))',
            border: '1px solid hsl(195, 100%, 50% / 0.25)',
            color: 'hsl(195, 100%, 65%)',
          }} whileInView={{ opacity: [0, 1], y: [10, 0] }} viewport={{ once: true }} transition={{ delay: index * 0.1 + 0.2 }}>
            <span className="w-2 h-2 rounded-full" style={{
              background: 'hsl(195, 100%, 50%)',
              boxShadow: '0 0 8px hsl(195, 100%, 50%)',
            }} />
            Phase {index + 1}
          </motion.div>


          <h4 className={`text-xl md:text-2xl font-display font-bold mb-4 leading-tight ${isEven ? 'md:text-right' : ''}`} style={{
            background: 'linear-gradient(135deg, hsl(175, 100%, 60%), hsl(195, 100%, 65%), hsl(220, 85%, 70%))',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}>
            {phase.title}
          </h4>


          <ul className="space-y-3">
            {phase.description.map((point, idx) => (<motion.li key={idx} className={`text-sm text-foreground/80 flex items-start gap-3 ${isEven ? 'md:flex-row-reverse md:text-right' : ''}`} initial={{ opacity: 0, x: isEven ? 15 : -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 + idx * 0.08 + 0.3 }}>
              <motion.span className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{
                background: `hsl(${195 + idx * 10}, 100%, ${55 + idx * 5}%)`,
                boxShadow: `0 0 8px hsl(${195 + idx * 10}, 100%, 50% / 0.5)`,
              }} animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }} />
              {point}
            </motion.li>))}
          </ul>


          <div className="absolute bottom-0 left-0 right-0 h-12 overflow-hidden pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity">
            <motion.div className="absolute bottom-0 left-0 right-0 h-full" style={{
              background: 'linear-gradient(to top, hsl(195, 100%, 50% / 0.15), transparent)',
            }} />

            <motion.div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{
              background: 'linear-gradient(90deg, transparent, hsl(195, 100%, 50% / 0.6), hsl(175, 100%, 50% / 0.4), hsl(220, 85%, 55% / 0.5), transparent)',
            }} animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.2 }} />
          </div>


          {[...Array(4)].map((_, i) => (<motion.div key={i} className="absolute rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
            left: `${20 + i * 20}%`,
            bottom: 0,
            width: 3 + i,
            height: 3 + i,
            background: `radial-gradient(circle at 30% 30%, hsl(195, 100%, 85%), hsl(195, 100%, 55% / 0.4))`,
            boxShadow: `0 0 6px hsl(195, 100%, 50% / 0.4)`,
          }} animate={{
            y: [0, -40, -80],
            x: [0, (i % 2 === 0 ? -8 : 8), 0],
            opacity: [0, 0.7, 0],
          }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }} />))}
        </div>
      </motion.div>
    </motion.div>


    <div className="absolute left-5 md:left-1/2 md:-translate-x-1/2 z-[10] top-6">
      <motion.div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center" style={{ scale: dotScale }}>

        <motion.div className="absolute inset-0 rounded-full" style={{
          border: '2px solid hsl(195, 100%, 50% / 0.3)',
        }} animate={{ scale: [1, 1.8], opacity: [0.5, 0] }} transition={{ duration: 2, repeat: Infinity, delay: index * 0.15 }} />
        <motion.div className="absolute inset-0 rounded-full" style={{
          border: '1px solid hsl(195, 100%, 50% / 0.2)',
        }} animate={{ scale: [1, 2.2], opacity: [0.3, 0] }} transition={{ duration: 2, repeat: Infinity, delay: index * 0.15 + 0.5 }} />


        <motion.div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border border-white/30 relative overflow-hidden" style={{
          background: 'linear-gradient(135deg, hsl(195, 100%, 55% / 0.9), hsl(220, 85%, 45% / 0.7))',
          boxShadow: '0 0 20px hsl(195, 100%, 50% / 0.5), inset 0 2px 4px rgba(255,255,255,0.2)',
          opacity: dotGlow,
        }}>

          <div className="absolute top-1 left-2 w-4 h-2.5 rounded-full bg-white/30 blur-[2px]" />
          <span className="relative z-10 font-display font-black text-white text-base md:text-lg drop-shadow-lg">
            {index + 1}
          </span>
        </motion.div>
      </motion.div>
    </div>


    <div className="hidden md:block flex-1" />
  </div>);
};
const ParallaxWaves = ({ containerRef }) => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const wave1Y = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const wave2Y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const wave3Y = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const wave4Y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const wave5Y = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const wavePaths = [
    {
      y: wave1Y,
      opacity: 0.18,
      color: 'hsl(195, 100%, 50%)',
      d: 'M0,80 C150,120 350,20 500,60 C650,100 850,30 1000,70 C1150,110 1350,40 1440,80 L1440,320 L0,320 Z',
      animDuration: 10,
    },
    {
      y: wave2Y,
      opacity: 0.12,
      color: 'hsl(220, 85%, 55%)',
      d: 'M0,100 C200,60 400,140 600,90 C800,40 1000,120 1200,80 C1350,50 1440,100 1440,100 L1440,320 L0,320 Z',
      animDuration: 14,
    },
    {
      y: wave3Y,
      opacity: 0.22,
      color: 'hsl(175, 100%, 45%)',
      d: 'M0,120 C100,80 300,160 500,110 C700,60 900,140 1100,100 C1300,60 1440,120 1440,120 L1440,320 L0,320 Z',
      animDuration: 8,
    },
    {
      y: wave4Y,
      opacity: 0.1,
      color: 'hsl(200, 90%, 50%)',
      d: 'M0,60 C250,110 450,30 700,80 C950,130 1150,50 1440,90 L1440,320 L0,320 Z',
      animDuration: 18,
    },
    {
      y: wave5Y,
      opacity: 0.15,
      color: 'hsl(190, 95%, 48%)',
      d: 'M0,90 C180,50 360,130 540,70 C720,10 900,110 1080,60 C1260,20 1440,100 1440,100 L1440,320 L0,320 Z',
      animDuration: 12,
    },
  ];
  return (<div className="absolute inset-0 pointer-events-none overflow-hidden z-[0]">
    {wavePaths.map((wave, i) => (<motion.div key={`parallax-wave-${i}`} className="absolute w-full" style={{
      y: wave.y,
      top: `${15 + i * 20}%`,
      height: '320px',
    }}>
      <svg viewBox="0 0 1440 320" className="w-[200%] h-full" preserveAspectRatio="none" style={{ position: 'absolute', left: '-50%' }}>
        <motion.path d={wave.d} fill={wave.color} fillOpacity={wave.opacity} style={{ filter: `drop-shadow(0 0 20px ${wave.color})` }} animate={{ x: [0, -720, 0] }} transition={{
          duration: wave.animDuration,
          repeat: Infinity,
          ease: "linear",
        }} />
      </svg>

      <svg viewBox="0 0 1440 320" className="w-[200%] h-full" preserveAspectRatio="none" style={{ position: 'absolute', left: '-25%', top: '10px' }}>
        <motion.path d={wave.d} fill={wave.color} fillOpacity={wave.opacity * 0.6} style={{ filter: `drop-shadow(0 0 15px ${wave.color})` }} animate={{ x: [0, 720, 0] }} transition={{
          duration: wave.animDuration * 1.3,
          repeat: Infinity,
          ease: "linear",
        }} />
      </svg>
    </motion.div>))}


    <div className="absolute bottom-0 left-0 right-0 h-1/3" style={{
      background: 'linear-gradient(to top, hsl(210, 50%, 5% / 0.6), transparent)',
    }} />
  </div>);
};
const Timeline = ({ type }) => {
  const timelineRef = useRef(null);
  const virtualPhases = [
    {
      title: 'Registration & Confirmation',
      description: [
        'Teams must register through the official Avishkaar Season 4 portal before the deadline.',
        'Each team may consist of 1 to 4 members.',
        'Once registered, a confirmation email with your Team Code will be sent.',
      ]
    },
    {
      title: 'Hackathon Kickoff & Problem Statement Release',
      description: [
        'Problem statements released on hackathon day via email.',
        'Teams must choose one problem statement and begin immediately.',
        'A 24-hour timer starts when problems are released.',
      ]
    },
    {
      title: 'Product Development — 24 Hours',
      description: [
        'Teams should brainstorm solutions and divide roles.',
        'All coding, design, and documentation must be completed within 24 hours.',
        'Use any technology stack, APIs, or platforms.',
      ]
    },
    {
      title: 'Final Submission',
      description: [
        'Upload Code Repository Link (GitHub or Google Drive).',
        'Submit Technical Documentation (PDF).',
        'Pitch Deck (6–8 Slides).',
      ]
    },
    {
      title: 'Evaluation & Pitching',
      description: [
        'Submissions reviewed by expert jury panel.',
        '5-7 minute pitch followed by Q&A with the jury.',
        'Results announced after all pitches.',
      ]
    },
  ];
  const physicalPhases = [
    {
      title: 'Registration & Idea Submission',
      description: [
        'Register your team (1-4 members) on the portal.',
        'Submit Abstract Document (Max 2 pages) in PDF.',
        'Submit 1-Minute Video Pitch.',
      ]
    },
    {
      title: 'Screening & Selection',
      description: [
        'Expert panel reviews all submissions.',
        'Evaluation based on originality, relevance, and feasibility.',
        'Shortlisted teams invited to 48-hour on-campus finale.',
      ]
    },
    {
      title: 'Mentorship Phase',
      description: [
        'Paired with mentors (faculty/startup experts).',
        'Duration: 3 weeks of guidance.',
        'Refine problem understanding and technical architecture.',
      ]
    },
    {
      title: 'Hackathon Days — Finale On-Campus',
      description: [
        'Report to AITAM campus on the notified date.',
        'Working space with internet & power provided.',
        '48 continuous hours of building, testing, and innovating!',
      ]
    },
    {
      title: 'Evaluation & Pitching',
      description: [
        'Submissions reviewed by expert jury panel.',
        '5-7 minute pitch followed by Q&A.',
        'Awards ceremony after all presentations.',
      ]
    },
  ];
  const phases = type === 'virtual' ? virtualPhases : physicalPhases;
  return (<div ref={timelineRef} className="py-16 relative cursor-none md:cursor-none" style={{ cursor: 'none' }}>

    <TimelineCursor containerRef={timelineRef} />


    <div className="absolute inset-0 pointer-events-none">
      <motion.div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[800px] rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, hsl(195, 100%, 50% / 0.08), hsl(220, 85%, 40% / 0.05), transparent)' }} animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }} transition={{ duration: 6, repeat: Infinity }} />

      {[...Array(8)].map((_, i) => (<motion.div key={`ambient-${i}`} className="absolute rounded-full" style={{
        left: `${10 + Math.random() * 80}%`,
        bottom: '0%',
        width: 3 + Math.random() * 4,
        height: 3 + Math.random() * 4,
        background: `radial-gradient(circle at 30% 30%, hsl(195, 100%, 80% / 0.5), transparent)`,
      }} animate={{
        y: [0, -600, -1200],
        x: [0, (Math.random() - 0.5) * 60],
        opacity: [0, 0.4, 0],
      }} transition={{
        duration: 6 + Math.random() * 4,
        repeat: Infinity,
        delay: i * 1.2,
        ease: "easeOut",
      }} />))}
    </div>


    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16 relative">
      <div className="inline-block px-10 py-5 rounded-3xl border border-white/10 mb-4" style={{
        background: 'linear-gradient(135deg, hsl(210, 50%, 12% / 0.6), hsl(220, 60%, 8% / 0.4))',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 12px 40px hsl(220, 85%, 10% / 0.3), inset 0 1px 0 rgba(255,255,255,0.06)',
      }}>
        <h3 className="text-3xl md:text-5xl font-display font-black text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
          {type === 'virtual' ? 'Virtual' : 'Physical'} Timeline
        </h3>
      </div>

      <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto mt-3">
        Scroll to reveal each phase of the journey
      </p>

      <motion.div className="w-56 h-[2px] mx-auto mt-4 rounded-full" style={{
        background: 'linear-gradient(to right, transparent, hsl(195, 100%, 50%), hsl(175, 100%, 45%), transparent)',
      }} animate={{ opacity: [0.3, 0.8, 0.3], scaleX: [0.6, 1, 0.6] }} transition={{ duration: 3, repeat: Infinity }} />


      <motion.div className="mt-6 flex flex-col items-center gap-1" animate={{ y: [0, 8, 0], opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 2, repeat: Infinity }}>
        <div className="w-5 h-8 rounded-full border-2 border-primary/30 flex items-start justify-center p-1">
          <motion.div className="w-1.5 h-2 rounded-full bg-primary/60" animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
        </div>
      </motion.div>
    </motion.div>


    <ScrollProgressLine containerRef={timelineRef} />


    <div className="relative max-w-5xl mx-auto px-4">
      {phases.map((phase, index) => (<TimelineItem key={index} phase={phase} index={index} totalItems={phases.length} />))}
    </div>
  </div>);
};
const PrizePoolDisplay = ({ type }) => {
  const virtualPrizes = {
    total: "₹75,000+",
    main: [
      { place: "1st", amount: "₹30,000", icon: Trophy, color: "from-yellow-400 to-amber-500" },
      { place: "2nd", amount: "₹20,000", icon: Medal, color: "from-gray-300 to-gray-400" },
      { place: "3rd", amount: "₹10,000", icon: Award, color: "from-orange-400 to-orange-600" },
    ],
  };
  const physicalPrizes = {
    total: "₹2,00,000+",
    main: [
      { place: "1st", amount: "₹1,00,000", icon: Trophy, color: "from-yellow-400 to-amber-500" },
      { place: "2nd", amount: "₹60,000", icon: Medal, color: "from-gray-300 to-gray-400" },
      { place: "3rd", amount: "₹40,000", icon: Award, color: "from-orange-400 to-orange-600" },
    ],
  };
  const prizes = type === 'virtual' ? virtualPrizes : physicalPrizes;
  return (<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card rounded-2xl p-8 hover:glow-bioluminescent transition-all duration-500">

    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Star className="w-5 h-5 text-primary" />
        <span className="text-sm font-display uppercase tracking-widest text-muted-foreground">Prize Pool</span>
        <Star className="w-5 h-5 text-primary" />
      </div>
      <motion.h3 className="text-4xl md:text-5xl font-display font-black text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" animate={{
        textShadow: [
          "0 0 20px hsl(var(--primary) / 0.5)",
          "0 0 40px hsl(var(--primary) / 0.8)",
          "0 0 20px hsl(var(--primary) / 0.5)",
        ]
      }} transition={{ duration: 2, repeat: Infinity }}>
        {prizes.total}
      </motion.h3>
    </div>


    <div className="grid grid-cols-3 gap-4 mb-8">

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-col items-center mt-8">
        <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${prizes.main[1].color} flex items-center justify-center mb-3`}>
          <Medal className="w-8 h-8 text-background" />
        </div>
        <span className="text-xs font-display uppercase tracking-wider text-muted-foreground">2ND PLACE</span>
        <span className="text-xl font-display font-bold text-foreground">{prizes.main[1].amount}</span>
      </motion.div>


      <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1, type: "spring" }} className="flex flex-col items-center">
        <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }} className={`w-20 h-20 rounded-full bg-gradient-to-br ${prizes.main[0].color} flex items-center justify-center mb-3 shadow-lg shadow-yellow-500/30`}>
          <Trophy className="w-10 h-10 text-background" />
        </motion.div>
        <span className="text-xs font-display uppercase tracking-wider text-primary">1ST PLACE</span>
        <span className="text-2xl font-display font-bold text-foreground">{prizes.main[0].amount}</span>
      </motion.div>


      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="flex flex-col items-center mt-12">
        <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${prizes.main[2].color} flex items-center justify-center mb-3`}>
          <Award className="w-7 h-7 text-background" />
        </div>
        <span className="text-xs font-display uppercase tracking-wider text-muted-foreground">3RD PLACE</span>
        <span className="text-lg font-display font-bold text-foreground">{prizes.main[2].amount}</span>
      </motion.div>
    </div>

  </motion.div>);
};
const ImportantDates = ({ type }) => {
  const virtualDates = [
    { event: 'Registrations Open', date: 'Oct 23, 2025' },
    { event: 'Registrations Close', date: 'Nov 20, 2025' },
    { event: 'Problem Statements Release', date: 'Nov 25, 2025 - 10:00 AM' },
    { event: 'Hackathon Begins', date: 'Nov 25, 2025 - 11:00 AM' },
    { event: 'Hackathon Ends', date: 'Nov 26, 2025 - 11:00 AM' },
    { event: 'Project Submission Deadline', date: 'Nov 26, 2025 - 09:00 AM to 11:00 AM' },
    { event: 'Online Pitching', date: 'Nov 26, 2025 - 10:00 AM Onwards' },
    { event: 'Results Announcement', date: 'Nov 26, 2025' },
  ];
  const physicalDates = [
    { event: 'Registrations Open', date: 'Oct 23, 2025' },
    { event: 'Abstract & Video Submission', date: 'Nov 20, 2025' },
    { event: 'Shortlisting Results', date: 'Nov 30, 2025' },
    { event: 'Mentorship Phase Begins', date: 'Dec 1, 2025' },
    { event: 'Mentorship Phase Ends', date: 'Dec 21, 2025' },
    { event: 'Reporting at Campus', date: 'Dec 26, 2025 (Evening)' },
    { event: 'Hackathon Begins', date: 'Dec 27, 2025 - 9:00 AM' },
    { event: 'Hackathon Ends', date: 'Dec 29, 2025 - 9:00 AM' },
    { event: 'Final Jury & Awards', date: 'Dec 29, 2025 - 2:00 PM onwards' },
  ];
  const dates = type === 'virtual' ? virtualDates : physicalDates;
  return (<div className="py-12">

    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
      <h3 className="text-3xl md:text-4xl font-display font-black text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] italic">
        Important Dates
      </h3>
    </motion.div>


    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {dates.map((item, index) => (<motion.div key={item.event} initial={{ opacity: 0, y: 30, scale: 0.9 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{
        delay: index * 0.08,
        type: "spring",
        stiffness: 100,
        damping: 15
      }} whileHover={{
        scale: 1.05,
        y: -5,
        boxShadow: "0 20px 40px -20px hsl(var(--primary) / 0.4)"
      }} className="group relative">
        <div className="relative glass-card rounded-xl p-6 h-full overflow-hidden transition-all duration-300 group-hover:glow-ocean">

          <motion.div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
            background: "linear-gradient(135deg, hsl(var(--primary) / 0.1), transparent, hsl(var(--primary) / 0.05))",
          }} />


          <motion.div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }} />


          <div className="relative text-center">
            <h4 className="text-base font-display font-bold text-foreground mb-3 leading-tight">
              {item.event}
            </h4>
            <p className="text-sm font-mono text-primary">
              {item.date}
            </p>
          </div>


          <motion.div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary group-hover:w-3/4 transition-all duration-500" />
        </div>
      </motion.div>))}
    </div>
  </div>);
};
const HackathonCard = ({ type }) => {
  const isVirtual = type === 'virtual';
  const virtualDate = new Date('2026-12-20T00:00:00');
  const physicalDate = new Date('2026-12-26T00:00:00');
  return (<motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative glass-card rounded-2xl p-8 overflow-hidden group">

    <motion.div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
      background: "linear-gradient(45deg, hsl(var(--primary) / 0.1), transparent, hsl(var(--secondary) / 0.1))",
    }} />

    <div className="relative">
      <div className="flex items-center gap-3 mb-4">
        {isVirtual ? (<Laptop className="w-8 h-8 text-primary" />) : (<Users className="w-8 h-8 text-primary" />)}
        <div>
          <h3 className="text-2xl font-display font-bold text-foreground">
            {isVirtual ? 'Virtual Hackathon' : 'Physical Hackathon'}
          </h3>
          <p className="text-sm text-primary font-display">
            {isVirtual ? '24-Hour Online Format' : '48-Hour On-Campus Format'}
          </p>
        </div>
      </div>

      <ul className="space-y-3 mb-6">
        {isVirtual ? (<>
          <li className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="text-primary mt-0.5">•</span>
            Online 24-hour hackathon for teams of 1–4 members.
          </li>
          <li className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="text-primary mt-0.5">•</span>
            Problem released at the start; one to be solved within 24 hours.
          </li>
          <li className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="text-primary mt-0.5">•</span>
            Submission includes code link, documentation, and pitch deck.
          </li>
          <li className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="text-primary mt-0.5">•</span>
            ₹75,000+ prize pool with certificates for all valid entries.
          </li>
        </>) : (<>
          <li className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="text-primary mt-0.5">•</span>
            48-hour marathon of innovation on-campus at AITAM.
          </li>
          <li className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="text-primary mt-0.5">•</span>
            Submit abstract and video pitch for screening.
          </li>
          <li className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="text-primary mt-0.5">•</span>
            3 weeks of mentorship before the finale.
          </li>
          <li className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="text-primary mt-0.5">•</span>
            ₹2,00,000+ prize pool with exciting rewards.
          </li>
        </>)}
      </ul>

      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => window.open('https://unstop.com/o/3C4O1aP?lb=O4B2h3r', '_blank')} className="btn-ocean neon-border text-sm md:text-base mt-2" aria-label={`Register for ${isVirtual ? 'Virtual' : 'Physical'} Hackathon`}>
        Register Now
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </div>
  </motion.div>);
};
const HackathonSection = () => {
  const [activeTab, setActiveTab] = useState('physical');
  const tabs = [
    { id: 'virtual', label: 'Virtual Hackathon', icon: Laptop },
    { id: 'physical', label: 'Physical Hackathon', icon: Users },
  ];

  return (<section className="relative py-20 md:py-32 overflow-hidden min-h-[50vh]" id="hackathon">
    <FloatingParticles count={50} />
    
    <div className="relative z-10 container mx-auto px-4">

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-4">
        <h2 className="text-3xl md:text-5xl font-display font-black text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
          Choose Your Battleground
        </h2>
      </motion.div>


      <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="w-24 h-1 bg-primary mx-auto mb-4" />

      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
        Whether you prefer the thrill of in-person collaboration or the flexibility of a virtual challenge, we have a track for you.
      </motion.p>


      <div className="flex justify-center mb-12">
        <div className="inline-flex bg-card border border-border rounded-full p-1">
          {tabs.map((tab) => (<motion.button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`relative flex items-center gap-2 px-6 py-3 rounded-full font-display font-bold transition-colors ${activeTab === tab.id
            ? 'text-background'
            : 'text-muted-foreground hover:text-foreground'}`}>
            {activeTab === tab.id && (<motion.div layoutId="activeTab" className="absolute inset-0 bg-primary rounded-full" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />)}
            <span className="relative z-10 flex items-center gap-2">
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </span>
          </motion.button>))}
        </div>
      </div>


      <AnimatePresence mode="wait">
        <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <HackathonCard type={activeTab} />
            <PrizePoolDisplay type={activeTab} />
          </div>


          <LargeCountdownTimer type={activeTab} />


          <ImportantDates type={activeTab} />


          <Timeline type={activeTab} />
        </motion.div>
      </AnimatePresence>
    </div>
  </section>);
};
export default HackathonSection;
