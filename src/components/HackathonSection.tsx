import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate, useScroll, useSpring } from "framer-motion";
import { Laptop, Users, Trophy, Medal, Award, Star, ArrowRight, Calendar, Clock } from "lucide-react";

// Animated Number Component
function AnimatedNumber({ value, delay = 0 }: { value: number; delay?: number }) {
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

// Timeline Item Component
const TimelineItem = ({ phase, index }: { phase: { title: string; description: string[] }; index: number }) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["center end", "start center"]
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const dotScale = useTransform(scrollYProgress, [0.4, 0.5, 0.6], [1, 1.5, 1]);
  const dotBoxShadow = useTransform(
    scrollYProgress,
    [0.4, 0.5, 0.6],
    ['0 0 0px hsl(var(--primary) / 0)', '0 0 15px hsl(var(--primary))', '0 0 0px hsl(var(--primary) / 0)']
  );

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div ref={cardRef} className="relative flex gap-6 pb-12 last:pb-0">
      {/* Timeline dot */}
      <div className="relative flex flex-col items-center">
        <motion.div
          style={{ scale: dotScale, boxShadow: dotBoxShadow }}
          className="w-4 h-4 rounded-full bg-primary border-2 border-primary z-10"
        />
        {index !== 4 && <div className="w-0.5 h-full bg-border absolute top-4" />}
      </div>

      {/* Content card */}
      <motion.div
        onMouseMove={handleMouseMove}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="flex-1 relative bg-card border border-border rounded-xl p-6 overflow-hidden group hover:border-primary/50 transition-colors"
      >
        {/* Spotlight effect */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: useTransform(
              [mouseX, mouseY],
              ([x, y]) => `radial-gradient(350px at ${x}px ${y}px, hsl(var(--primary) / 0.15), transparent 80%)`
            ),
          }}
        />
        
        <h4 className="text-lg font-display font-bold text-primary mb-3">{phase.title}</h4>
        <ul className="space-y-2">
          {phase.description.map((point, idx) => (
            <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              {point}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

// Timeline Component
const Timeline = ({ type }: { type: 'virtual' | 'physical' }) => {
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
    <div ref={timelineRef} className="py-8">
      <h3 className="text-2xl font-display font-bold text-primary mb-8 text-center">
        {type === 'virtual' ? 'Virtual' : 'Physical'} Timeline
      </h3>
      <div className="relative max-w-2xl mx-auto">
        {phases.map((phase, index) => (
          <TimelineItem key={index} phase={phase} index={index} />
        ))}
      </div>
    </div>
  );
};

// Prize Pool Display
const PrizePoolDisplay = ({ type }: { type: 'virtual' | 'physical' }) => {
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

// Important Dates Component
const ImportantDates = ({ type }: { type: 'virtual' | 'physical' }) => {
  const virtualDates = [
    { event: 'Registrations Open', date: 'Oct 23, 2025' },
    { event: 'Registrations Close', date: 'Nov 20, 2025' },
    { event: 'Problem Statements Release', date: 'Nov 25, 2025 - 10:00 AM' },
    { event: 'Hackathon Begins', date: 'Nov 25, 2025 - 11:00 AM' },
    { event: 'Hackathon Ends', date: 'Nov 26, 2025 - 11:00 AM' },
    { event: 'Results Announcement', date: 'Nov 26, 2025' },
  ];

  const physicalDates = [
    { event: 'Registrations Open', date: 'Oct 23, 2025' },
    { event: 'Abstract & Video Submission', date: 'Nov 20, 2025' },
    { event: 'Shortlisting Results', date: 'Nov 30, 2025' },
    { event: 'Mentorship Phase', date: 'Dec 1 - Dec 21, 2025' },
    { event: 'Reporting at Campus', date: 'Dec 26, 2025' },
    { event: 'Hackathon Days', date: 'Dec 27-29, 2025' },
    { event: 'Awards Ceremony', date: 'Dec 29, 2025' },
  ];

  const dates = type === 'virtual' ? virtualDates : physicalDates;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-card border border-border rounded-2xl p-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-display font-bold text-foreground">Important Dates</h3>
      </div>
      <div className="space-y-3">
        {dates.map((item, index) => (
          <motion.div
            key={item.event}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center gap-3 group"
          >
            <div className="w-2 h-2 rounded-full bg-primary group-hover:scale-150 transition-transform" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{item.event}</p>
              <p className="text-xs text-muted-foreground">{item.date}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Hackathon Description Card
const HackathonCard = ({ type }: { type: 'virtual' | 'physical' }) => {
  const isVirtual = type === 'virtual';

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
  const [activeTab, setActiveTab] = useState<'virtual' | 'physical'>('physical');

  const tabs = [
    { id: 'virtual' as const, label: 'Virtual Hackathon', icon: Laptop },
    { id: 'physical' as const, label: 'Physical Hackathon', icon: Users },
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Timeline type={activeTab} />
              </div>
              <div>
                <ImportantDates type={activeTab} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HackathonSection;
