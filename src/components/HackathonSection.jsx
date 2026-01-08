import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate, useScroll, useSpring } from "framer-motion";
import { Laptop, Users, Trophy, Medal, Award, Star, ArrowRight, Calendar, Clock } from "lucide-react";

// Animated Number Component
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

// Countdown Timer Component (Small - for cards)
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-6"
    >
      <div className="flex items-center gap-2 mb-3">
        <Clock className="w-4 h-4 text-primary" />
        <span className="text-sm font-display text-muted-foreground">
          {type === 'virtual' ? 'Virtual Starts In' : 'Physical Starts In'}
        </span>
      </div>
      <div className="flex gap-2">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative flex-1"
          >
            <div className="bg-background/80 border border-primary/30 rounded-lg p-2 text-center overflow-hidden group hover:border-primary/60 transition-colors">
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: 'radial-gradient(circle at center, hsl(var(--primary) / 0.15), transparent 70%)',
                }}
              />
              
              <motion.span
                key={unit.value}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="relative block text-xl md:text-2xl font-display font-bold text-primary"
              >
                {String(unit.value).padStart(2, '0')}
              </motion.span>
              <span className="relative text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider">
                {unit.label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Large Countdown Timer Component (for section display)
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-12"
    >
      {/* Header */}
      <motion.div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Clock className="w-8 h-8 text-primary" />
          </motion.div>
          <h3 className="text-2xl md:text-4xl font-display font-black text-gradient-fire">
            {type === 'virtual' ? 'Virtual Hackathon' : 'Physical Hackathon'} Starts In
          </h3>
        </div>
        <p className="text-muted-foreground">
          {type === 'virtual' ? 'December 20, 2026' : 'December 26, 2026'}
        </p>
      </motion.div>

      {/* Large Timer Display */}
      <div className="flex justify-center gap-4 md:gap-8">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
            className="relative group"
          >
            <div className="relative bg-card border-2 border-primary/40 rounded-2xl p-4 md:p-8 text-center overflow-hidden hover:border-primary transition-all duration-300 min-w-[80px] md:min-w-[140px]">
              {/* Fire glow background */}
              <motion.div
                className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity"
                style={{
                  background: 'radial-gradient(circle at center bottom, hsl(var(--primary) / 0.3), transparent 70%)',
                }}
              />
              
              {/* Animated fire particles */}
              <motion.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary"
                animate={{
                  y: [-5, -20, -5],
                  opacity: [0.5, 1, 0.5],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
              />
              
              {/* Number */}
              <motion.span
                key={unit.value}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="relative block text-4xl md:text-7xl font-display font-black text-transparent bg-clip-text"
                style={{
                  background: 'linear-gradient(180deg, hsl(var(--primary)), hsl(25, 100%, 40%))',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                }}
              >
                {String(unit.value).padStart(2, '0')}
              </motion.span>
              
              {/* Label */}
              <span className="relative text-sm md:text-lg text-muted-foreground uppercase tracking-widest font-display mt-2 block">
                {unit.label}
              </span>

              {/* Bottom glow line */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1"
                style={{
                  background: 'linear-gradient(to right, transparent, hsl(var(--primary)), transparent)',
                }}
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Fire Ember Particle for Timeline
const TimelineEmber = ({ delay, side }) => (
  <motion.div
    className="absolute w-1 h-1 rounded-full"
    style={{
      left: side === 'left' ? '-20px' : 'auto',
      right: side === 'right' ? '-20px' : 'auto',
      background: 'linear-gradient(to top, hsl(25, 100%, 50%), hsl(45, 100%, 60%))',
      boxShadow: '0 0 6px hsl(25, 100%, 50%)',
    }}
    initial={{ opacity: 0, y: 0 }}
    animate={{
      opacity: [0, 1, 1, 0],
      y: [-10, -40, -70, -100],
      x: side === 'left' ? [0, -10, -5, -15] : [0, 10, 5, 15],
      scale: [0.5, 1, 0.8, 0],
    }}
    transition={{
      duration: 2.5,
      repeat: Infinity,
      delay: delay,
      ease: "easeOut",
    }}
  />
);

// Timeline Item Component with Fire Effects
const TimelineItem = ({ phase, index, totalItems }) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"]
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Scroll-based animations
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [0.3, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.6], [0.85, 1, 1]);
  const x = useTransform(scrollYProgress, [0, 0.3], [index % 2 === 0 ? -30 : 30, 0]);
  const dotScale = useTransform(scrollYProgress, [0.2, 0.4, 0.6], [0.5, 1.8, 1.2]);
  const fireGlow = useTransform(
    scrollYProgress,
    [0.2, 0.4, 0.6],
    [
      '0 0 0px hsl(25, 100%, 50% / 0)',
      '0 0 30px hsl(25, 100%, 50%), 0 0 60px hsl(15, 100%, 45% / 0.5)',
      '0 0 15px hsl(25, 100%, 50% / 0.8)'
    ]
  );
  const lineProgress = useSpring(useTransform(scrollYProgress, [0, 0.5], [0, 1]), { stiffness: 100, damping: 30 });

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const isLast = index === totalItems - 1;

  return (
    <motion.div 
      ref={cardRef} 
      style={{ opacity, scale, x }}
      className="relative flex gap-8 pb-12 last:pb-0"
    >
      {/* Timeline line and fire dot */}
      <div className="relative flex flex-col items-center w-12">
        {/* Fire embers around dot */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2">
          {[0, 0.5, 1, 1.5, 2].map((delay, i) => (
            <TimelineEmber key={i} delay={delay + index * 0.3} side={i % 2 === 0 ? 'left' : 'right'} />
          ))}
        </div>

        {/* Fire dot with animated flames */}
        <motion.div
          style={{ scale: dotScale, boxShadow: fireGlow }}
          className="relative w-8 h-8 rounded-full z-10"
        >
          {/* Outer flame ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, hsl(25, 100%, 50%), hsl(45, 100%, 55%), hsl(15, 100%, 45%), hsl(25, 100%, 50%))',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Inner core */}
          <div className="absolute inset-1 rounded-full bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600">
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent to-yellow-300/50"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
          </div>
          
          {/* Center glow */}
          <motion.div
            className="absolute inset-2 rounded-full bg-yellow-200"
            animate={{ scale: [0.8, 1, 0.8], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        </motion.div>
        
        {/* Animated fire line */}
        {!isLast && (
          <div className="relative w-1 h-full mt-2">
            {/* Base line */}
            <div className="absolute inset-0 bg-gradient-to-b from-border via-border/50 to-border rounded-full" />
            
            {/* Animated fire progress */}
            <motion.div 
              className="absolute top-0 left-0 w-full rounded-full origin-top overflow-hidden"
              style={{ scaleY: lineProgress, height: '100%' }}
            >
              <motion.div
                className="w-full h-full"
                style={{
                  background: 'linear-gradient(to bottom, hsl(45, 100%, 55%), hsl(25, 100%, 50%), hsl(15, 100%, 45%), hsl(0, 100%, 40%))',
                }}
                animate={{
                  backgroundPosition: ['0% 0%', '0% 100%', '0% 0%'],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            
            {/* Fire glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                boxShadow: '0 0 10px hsl(25, 100%, 50% / 0.5)',
              }}
              animate={{
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        )}
      </div>

      {/* Content card with fire border */}
      <motion.div
        onMouseMove={handleMouseMove}
        whileHover={{ scale: 1.02, y: -5 }}
        className="flex-1 relative rounded-2xl overflow-hidden group"
      >
        {/* Animated fire border */}
        <motion.div
          className="absolute inset-0 rounded-2xl p-[2px]"
          style={{
            background: 'linear-gradient(135deg, hsl(25, 100%, 50%), hsl(45, 100%, 55%), hsl(15, 100%, 45%), hsl(25, 100%, 50%))',
            backgroundSize: '300% 300%',
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-full h-full bg-card rounded-2xl" />
        </motion.div>

        {/* Card content */}
        <div className="relative bg-card/95 backdrop-blur-sm rounded-2xl p-6 m-[2px]">
          {/* Fire spotlight effect on hover */}
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: useTransform(
                [mouseX, mouseY],
                ([mx, my]) => `radial-gradient(400px at ${mx}px ${my}px, hsl(25, 100%, 50% / 0.15), hsl(45, 100%, 55% / 0.1), transparent 70%)`
              ),
            }}
          />

          {/* Phase number badge with fire effect */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
            className="absolute -top-4 -left-4 w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
            style={{
              background: 'linear-gradient(135deg, hsl(45, 100%, 55%), hsl(25, 100%, 50%), hsl(15, 100%, 45%))',
              boxShadow: '0 0 20px hsl(25, 100%, 50% / 0.5)',
            }}
          >
            <motion.span
              className="font-display font-bold text-background text-lg"
              animate={{ textShadow: ['0 0 0px transparent', '0 0 10px hsl(0, 0%, 100% / 0.5)', '0 0 0px transparent'] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {index + 1}
            </motion.span>
          </motion.div>
          
          <h4 className="text-xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-500 to-red-500 mb-4 mt-3">
            {phase.title}
          </h4>
          
          <ul className="space-y-3">
            {phase.description.map((point, idx) => (
              <motion.li 
                key={idx} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-sm text-muted-foreground flex items-start gap-3"
              >
                <motion.span 
                  className="mt-1 text-lg"
                  animate={{ 
                    color: ['hsl(25, 100%, 50%)', 'hsl(45, 100%, 55%)', 'hsl(25, 100%, 50%)'],
                    textShadow: ['0 0 5px hsl(25, 100%, 50% / 0.5)', '0 0 10px hsl(45, 100%, 55% / 0.8)', '0 0 5px hsl(25, 100%, 50% / 0.5)']
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                >
                  🔥
                </motion.span>
                {point}
              </motion.li>
            ))}
          </ul>

          {/* Bottom fire line */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1"
            style={{
              background: 'linear-gradient(to right, transparent, hsl(45, 100%, 55%), hsl(25, 100%, 50%), hsl(15, 100%, 45%), transparent)',
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

// Timeline Component
const Timeline = ({ type }) => {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useSpring(
    useTransform(scrollYProgress, [0.1, 0.8], [0, 1]),
    { stiffness: 400, damping: 90 }
  );

  const virtualPhases = [
    {
      title: 'Phase 1: Registration & Confirmation',
      description: [
        'Teams must register through the official Avishkaar Season 4 portal before the deadline.',
        'Each team may consist of 1 to 4 members.',
        'Once registered, a confirmation email with your Team Code will be sent.',
      ]
    },
    {
      title: 'Phase 2: Hackathon Kickoff & Problem Statement Release',
      description: [
        'Problem statements released on hackathon day via email.',
        'Teams must choose one problem statement and begin immediately.',
        'A 24-hour timer starts when problems are released.',
      ]
    },
    {
      title: 'Phase 3: Product Development - Within 24 Hours',
      description: [
        'Teams should brainstorm solutions and divide roles.',
        'All coding, design, and documentation must be completed within 24 hours.',
        'Use any technology stack, APIs, or platforms.',
      ]
    },
    {
      title: 'Phase 4: Final Submission',
      description: [
        'Upload Code Repository Link (GitHub or Google Drive).',
        'Submit Technical Documentation (PDF).',
        'Pitch Deck (6–8 Slides).',
      ]
    },
    {
      title: 'Phase 5: Evaluation & Pitching',
      description: [
        'Submissions reviewed by expert jury panel.',
        '5-7 minute pitch followed by Q&A with the jury.',
        'Results announced after all pitches.',
      ]
    },
  ];

  const physicalPhases = [
    {
      title: 'Phase 1: Registration & Idea Submission',
      description: [
        'Register your team (1-4 members) on the portal.',
        'Submit Abstract Document (Max 2 pages) in PDF.',
        'Submit 1-Minute Video Pitch.',
      ]
    },
    {
      title: 'Phase 2: Screening & Selection',
      description: [
        'Expert panel reviews all submissions.',
        'Evaluation based on originality, relevance, and feasibility.',
        'Shortlisted teams invited to 48-hour on-campus finale.',
      ]
    },
    {
      title: 'Phase 3: Mentorship Phase',
      description: [
        'Paired with mentors (faculty/startup experts).',
        'Duration: 3 weeks of guidance.',
        'Refine problem understanding and technical architecture.',
      ]
    },
    {
      title: 'Phase 4: Hackathon Days - Finale On-Campus',
      description: [
        'Report to AITAM campus on the notified date.',
        'Working space with internet & power provided.',
        '48 continuous hours of building, testing, and innovating!',
      ]
    },
    {
      title: 'Phase 5: Evaluation & Pitching',
      description: [
        'Submissions reviewed by expert jury panel.',
        '5-7 minute pitch followed by Q&A.',
        'Awards ceremony after all presentations.',
      ]
    },
  ];

  const phases = type === 'virtual' ? virtualPhases : physicalPhases;

  return (
    <div ref={timelineRef} className="py-12 relative">
      {/* Background fire glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-orange-500/10 via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      {/* Header with fire effect */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12 relative"
      >
        <motion.h3 
          className="text-3xl md:text-5xl font-display font-black italic"
          style={{
            background: 'linear-gradient(135deg, hsl(45, 100%, 55%), hsl(25, 100%, 50%), hsl(15, 100%, 45%), hsl(45, 100%, 55%))',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            backgroundSize: '200% 200%',
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
            textShadow: [
              '0 0 30px hsl(25, 100%, 50% / 0.3)',
              '0 0 60px hsl(25, 100%, 50% / 0.5)',
              '0 0 30px hsl(25, 100%, 50% / 0.3)',
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🔥 {type === 'virtual' ? 'Virtual' : 'Physical'} Timeline 🔥
        </motion.h3>
        
        {/* Animated underline flames */}
        <motion.div
          className="w-48 h-1 mx-auto mt-4"
          style={{
            background: 'linear-gradient(to right, transparent, hsl(45, 100%, 55%), hsl(25, 100%, 50%), hsl(15, 100%, 45%), transparent)',
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
            scaleX: [0.8, 1, 0.8],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
      
      <div className="relative max-w-3xl mx-auto">
        {phases.map((phase, index) => (
          <TimelineItem key={index} phase={phase} index={index} totalItems={phases.length} />
        ))}
      </div>
    </div>
  );
};

// Prize Pool Display
const PrizePoolDisplay = ({ type }) => {
  const virtualPrizes = {
    total: "₹75,000+",
    main: [
      { place: "1st", amount: "₹30,000", icon: Trophy, color: "from-yellow-400 to-amber-500" },
      { place: "2nd", amount: "₹20,000", icon: Medal, color: "from-gray-300 to-gray-400" },
      { place: "3rd", amount: "₹10,000", icon: Award, color: "from-orange-400 to-orange-600" },
    ],
    additional: [
      { title: "Best Virtual Presentation", amount: "₹5,000" },
      { title: "Most Creative Solution", amount: "₹5,000" },
      { title: "Best Remote Collaboration", amount: "₹5,000" },
    ],
  };

  const physicalPrizes = {
    total: "₹2,00,000+",
    main: [
      { place: "1st", amount: "₹1,00,000", icon: Trophy, color: "from-yellow-400 to-amber-500" },
      { place: "2nd", amount: "₹60,000", icon: Medal, color: "from-gray-300 to-gray-400" },
      { place: "3rd", amount: "₹40,000", icon: Award, color: "from-orange-400 to-orange-600" },
    ],
    additional: [
      { title: "Best UI/UX", amount: "₹10,000" },
      { title: "Most Innovative", amount: "₹10,000" },
      { title: "Best Presentation", amount: "₹5,000" },
      { title: "People's Choice", amount: "₹5,000" },
    ],
  };

  const prizes = type === 'virtual' ? virtualPrizes : physicalPrizes;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-card border border-border rounded-2xl p-8"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Star className="w-5 h-5 text-primary" />
          <span className="text-sm font-display uppercase tracking-widest text-muted-foreground">Prize Pool</span>
          <Star className="w-5 h-5 text-primary" />
        </div>
        <motion.h3
          className="text-4xl md:text-5xl font-display font-black text-gradient-fire"
          animate={{ 
            textShadow: [
              "0 0 20px hsl(var(--primary) / 0.5)",
              "0 0 40px hsl(var(--primary) / 0.8)",
              "0 0 20px hsl(var(--primary) / 0.5)",
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {prizes.total}
        </motion.h3>
      </div>

      {/* Main prizes - Podium style */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {/* 2nd Place */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center mt-8"
        >
          <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${prizes.main[1].color} flex items-center justify-center mb-3`}>
            <Medal className="w-8 h-8 text-background" />
          </div>
          <span className="text-xs font-display uppercase tracking-wider text-muted-foreground">2ND PLACE</span>
          <span className="text-xl font-display font-bold text-foreground">{prizes.main[1].amount}</span>
        </motion.div>

        {/* 1st Place */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, type: "spring" }}
          className="flex flex-col items-center"
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`w-20 h-20 rounded-full bg-gradient-to-br ${prizes.main[0].color} flex items-center justify-center mb-3 shadow-lg shadow-yellow-500/30`}
          >
            <Trophy className="w-10 h-10 text-background" />
          </motion.div>
          <span className="text-xs font-display uppercase tracking-wider text-primary">1ST PLACE</span>
          <span className="text-2xl font-display font-bold text-foreground">{prizes.main[0].amount}</span>
        </motion.div>

        {/* 3rd Place */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center mt-12"
        >
          <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${prizes.main[2].color} flex items-center justify-center mb-3`}>
            <Award className="w-7 h-7 text-background" />
          </div>
          <span className="text-xs font-display uppercase tracking-wider text-muted-foreground">3RD PLACE</span>
          <span className="text-lg font-display font-bold text-foreground">{prizes.main[2].amount}</span>
        </motion.div>
      </div>

      {/* Additional prizes */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {prizes.additional.map((prize, index) => (
          <motion.div
            key={prize.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + index * 0.1 }}
            whileHover={{ scale: 1.05, borderColor: "hsl(var(--primary) / 0.5)" }}
            className="bg-background/50 border border-border rounded-xl p-4 text-center"
          >
            <p className="text-xs text-muted-foreground mb-1">{prize.title}</p>
            <p className="text-lg font-display font-bold text-primary">{prize.amount}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Important Dates Component - Grid Layout
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

  return (
    <div className="py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <h3 className="text-3xl md:text-4xl font-display font-black text-gradient-fire italic">
          Important Dates
        </h3>
      </motion.div>

      {/* Grid of date cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {dates.map((item, index) => (
          <motion.div
            key={item.event}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              delay: index * 0.08,
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            whileHover={{ 
              scale: 1.05, 
              y: -5,
              boxShadow: "0 20px 40px -20px hsl(var(--primary) / 0.4)"
            }}
            className="group relative"
          >
            <div className="relative bg-card border border-border rounded-xl p-6 h-full overflow-hidden transition-all duration-300 hover:border-primary/50">
              {/* Animated border glow */}
              <motion.div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--primary) / 0.1), transparent, hsl(var(--primary) / 0.05))",
                }}
              />
              
              {/* Top accent line */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
              />

              {/* Content */}
              <div className="relative text-center">
                <h4 className="text-base font-display font-bold text-foreground mb-3 leading-tight">
                  {item.event}
                </h4>
                <p className="text-sm font-mono text-primary">
                  {item.date}
                </p>
              </div>

              {/* Bottom glow effect */}
              <motion.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary group-hover:w-3/4 transition-all duration-500"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Hackathon Description Card
const HackathonCard = ({ type }) => {
  const isVirtual = type === 'virtual';
  
  // Target dates: Virtual - 20/12/2026, Physical - 26/12/2026
  const virtualDate = new Date('2026-12-20T00:00:00');
  const physicalDate = new Date('2026-12-26T00:00:00');

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="relative bg-card border border-border rounded-2xl p-8 overflow-hidden group"
    >
      {/* Animated border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "linear-gradient(45deg, hsl(var(--primary) / 0.1), transparent, hsl(var(--secondary) / 0.1))",
        }}
      />

      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          {isVirtual ? (
            <Laptop className="w-8 h-8 text-primary" />
          ) : (
            <Users className="w-8 h-8 text-primary" />
          )}
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
          {isVirtual ? (
            <>
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
            </>
          ) : (
            <>
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
            </>
          )}
        </ul>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.open('https://unstop.com/o/3C4O1aP?lb=O4B2h3r', '_blank')}
          className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary rounded-full hover:bg-primary hover:text-background transition-colors duration-300 font-display font-bold"
        >
          Register Now
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
};

// Main Hackathon Section
const HackathonSection = () => {
  const [activeTab, setActiveTab] = useState('physical');

  const tabs = [
    { id: 'virtual', label: 'Virtual Hackathon', icon: Laptop },
    { id: 'physical', label: 'Physical Hackathon', icon: Users },
  ];

  return (
    <section className="relative py-20 md:py-32 overflow-hidden" id="hackathon">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.1, 0.5, 0.1],
              scale: [1, 2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <h2 className="text-3xl md:text-5xl font-display font-black text-gradient-fire">
            Choose Your Battleground
          </h2>
        </motion.div>

        {/* Underline */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-24 h-1 bg-primary mx-auto mb-4"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center text-muted-foreground max-w-2xl mx-auto mb-12"
        >
          Whether you prefer the thrill of in-person collaboration or the flexibility of a virtual challenge, we have a track for you.
        </motion.p>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-card border border-border rounded-full p-1">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-6 py-3 rounded-full font-display font-bold transition-colors ${
                  activeTab === tab.id
                    ? 'text-background'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Grid layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <HackathonCard type={activeTab} />
              <PrizePoolDisplay type={activeTab} />
            </div>

            {/* Large Countdown Timer - Above Important Dates */}
            <LargeCountdownTimer type={activeTab} />

            {/* Important Dates - Full width grid */}
            <ImportantDates type={activeTab} />

            {/* Timeline - Full width */}
            <Timeline type={activeTab} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HackathonSection;
