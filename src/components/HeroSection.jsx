import { motion } from "framer-motion";
import { useMemo } from "react";
import TypingEffect from "./TypingEffect";
// CursorRipple moved to global level in Index.jsx
import WaterDistortionFilter from "./WaterDistortionFilter";
import WaterSurface from "./WaterSurface";
import GlassWaterDroplets from "./GlassWaterDroplets";
import GlassTerminal from "./GlassTerminal";
import { Droplets, Users, Trophy, Calendar, MapPin, Terminal } from "lucide-react";

// Floating code snippets that drift behind the content
const codeSnippets = [
  { code: 'const innovate = () => {', x: '5%', y: '15%', size: 'text-xs', delay: 0 },
  { code: '  return breakthrough;', x: '8%', y: '20%', size: 'text-xs', delay: 0.2 },
  { code: '};', x: '5%', y: '25%', size: 'text-xs', delay: 0.4 },
  { code: 'async function hack() {', x: '70%', y: '12%', size: 'text-xs', delay: 1 },
  { code: '  await solve(problem);', x: '73%', y: '17%', size: 'text-xs', delay: 1.2 },
  { code: '  deploy(solution);', x: '73%', y: '22%', size: 'text-xs', delay: 1.4 },
  { code: '}', x: '70%', y: '27%', size: 'text-xs', delay: 1.6 },
  { code: 'import { future } from "avishkaar"', x: '12%', y: '70%', size: 'text-[10px]', delay: 2 },
  { code: '<Innovation season={4} />', x: '65%', y: '75%', size: 'text-[10px]', delay: 2.5 },
  { code: 'git commit -m "built the future"', x: '15%', y: '85%', size: 'text-[10px]', delay: 3 },
  { code: 'while(true) { create(); }', x: '60%', y: '60%', size: 'text-[10px]', delay: 1.8 },
  { code: '// 48 hours of innovation', x: '3%', y: '50%', size: 'text-[11px]', delay: 0.8 },
  { code: 'npm run hackathon', x: '75%', y: '45%', size: 'text-[10px]', delay: 2.2 },
  { code: 'const [ideas, setIdeas] = useState([])', x: '8%', y: '40%', size: 'text-[10px]', delay: 3.2 },
  { code: 'export default Solution;', x: '68%', y: '88%', size: 'text-[10px]', delay: 3.8 },
];

const FloatingCodeSnippet = ({ snippet }) => (
  <motion.div
    className="absolute font-code pointer-events-none select-none whitespace-nowrap"
    style={{ left: snippet.x, top: snippet.y }}
    initial={{ opacity: 0 }}
    animate={{
      opacity: [0, 0.12, 0.2, 0.12, 0],
      y: [0, -15, -30, -45, -60],
    }}
    transition={{
      duration: 14,
      repeat: Infinity,
      delay: snippet.delay,
      ease: "linear",
    }}
  >
    <span className={`${snippet.size} text-primary/30`}>{snippet.code}</span>
  </motion.div>
);

// Matrix-style code rain column with mixed characters
const CodeRainColumn = ({ left, delay, speed }) => {
  const chars = useMemo(() => {
    const codeChars = '{}[]();=></:._$#@!&|~+-*%^01';
    return Array.from({ length: 25 }, () => 
      codeChars[Math.floor(Math.random() * codeChars.length)]
    ).join('\n');
  }, []);
  
  return (
    <motion.div
      className="absolute font-code text-[10px] leading-4 pointer-events-none select-none whitespace-pre"
      style={{ left, color: `hsl(190, 100%, ${40 + Math.random() * 20}% / ${0.06 + Math.random() * 0.06})` }}
      initial={{ y: '-100%', opacity: 0 }}
      animate={{ y: '100vh', opacity: [0, 0.12, 0.12, 0] }}
      transition={{ duration: speed, repeat: Infinity, delay, ease: "linear" }}
    >
      {chars}
    </motion.div>
  );
};

const HeroSection = () => {
  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const codeRainColumns = useMemo(() => 
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${2 + i * 5.5}%`,
      delay: Math.random() * 6,
      speed: 10 + Math.random() * 8,
    })), []
  );

  return (
    <section id="hero-section" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* SVG Filters for realistic water */}
      <WaterDistortionFilter />
      
      {/* Cursor ripple is now global */}
      
      {/* Deep underwater background with distortion */}
      <div className="absolute inset-0 z-0" style={{
        background: `
          radial-gradient(ellipse 140% 80% at 50% 110%, hsl(220, 40%, 12%) 0%, transparent 60%),
          radial-gradient(ellipse 80% 60% at 20% 80%, hsl(190, 80%, 15% / 0.5) 0%, transparent 50%),
          radial-gradient(ellipse 80% 60% at 80% 20%, hsl(220, 60%, 15% / 0.4) 0%, transparent 50%),
          radial-gradient(ellipse 60% 40% at 50% 50%, hsl(195, 50%, 10% / 0.6) 0%, transparent 60%),
          hsl(220, 25%, 6%)
        `,
      }} />

      {/* Realistic animated water surface with caustics */}
      <WaterSurface />

      {/* Animated liquid orbs with water distortion */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[100px] will-animate"
        style={{ left: '15%', top: '20%', background: 'radial-gradient(circle, hsl(190, 100%, 40% / 0.18), transparent 70%)', filter: 'url(#water-distortion)' }}
        animate={{ x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.3, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[80px] will-animate"
        style={{ right: '10%', bottom: '15%', background: 'radial-gradient(circle, hsl(220, 80%, 40% / 0.15), transparent 70%)', filter: 'url(#water-distortion)' }}
        animate={{ x: [0, -50, 0], y: [0, 50, 0], scale: [1.2, 0.9, 1.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-[90px] will-animate"
        style={{ left: '50%', top: '40%', transform: 'translate(-50%, -50%)', background: 'radial-gradient(circle, hsl(195, 90%, 45% / 0.1), transparent 65%)', filter: 'url(#water-distortion)' }}
        animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Code rain columns */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
        {codeRainColumns.map((col) => (
          <CodeRainColumn key={col.id} {...col} />
        ))}
      </div>

      {/* Floating code snippets */}
      <div className="absolute inset-0 z-[3] overflow-hidden pointer-events-none">
        {codeSnippets.map((snippet, i) => (
          <FloatingCodeSnippet key={i} snippet={snippet} />
        ))}
      </div>

      {/* Water droplets sliding down the hero glass */}
      <GlassWaterDroplets />

      {/* Vignette */}
      <div className="absolute inset-0 z-[4]" style={{
        background: 'radial-gradient(ellipse at center, transparent 40%, hsl(220, 25%, 6% / 0.8) 100%)',
      }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Terminal-style badge */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 glass-panel glass-highlight rounded-full px-5 py-2">
            <Terminal className="w-3.5 h-3.5 text-accent" />
            <span className="font-code text-xs text-primary/80 tracking-wider">
              <span className="text-accent">$</span> run hackathon --hours=48 --mode=national --status=
              <motion.span 
                className="text-accent"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >live</motion.span>
            </span>
          </div>
        </motion.div>

        {/* Typing Effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, type: "spring" }}
          className="mb-6 mt-4"
        >
          <TypingEffect />
        </motion.div>

        {/* Season 4 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8 relative inline-block"
        >
          <motion.h2 
            className="text-3xl md:text-5xl font-display font-black tracking-[0.4em] text-transparent bg-clip-text"
            style={{
              background: 'linear-gradient(180deg, hsl(0, 0%, 100%) 0%, hsl(195, 80%, 80%) 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
            }}
          >
            SEASON 4
          </motion.h2>
          <motion.div
            className="absolute -bottom-2 left-0 right-0 h-[2px] rounded-full"
            style={{ background: 'linear-gradient(90deg, transparent, hsl(190, 100%, 50%), hsl(175, 100%, 55%), hsl(190, 100%, 50%), transparent)' }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          />
        </motion.div>

        {/* Tagline in glass terminal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6"
        >
          <div className="inline-block glass-card glass-highlight rounded-xl px-6 py-3">
            <motion.p className="text-lg md:text-2xl font-display uppercase tracking-widest font-bold text-gradient-liquid">
              The Infinite Loop of Innovation
            </motion.p>
          </div>
        </motion.div>

        {/* Sub-tagline - code style */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <p className="text-lg md:text-xl font-code text-muted-foreground">
            <motion.span className="text-primary font-bold" animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 1.5, repeat: Infinity }}>{'{ '}</motion.span>
            <motion.span className="text-accent" animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 1.5, repeat: Infinity }}>Dream</motion.span>
            <span className="text-muted-foreground/60">{', '}</span>
            <motion.span className="text-primary" animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}>Code</motion.span>
            <span className="text-muted-foreground/60">{', '}</span>
            <motion.span className="text-secondary" animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}>Disrupt</motion.span>
            <motion.span className="text-primary font-bold" animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 1.5, repeat: Infinity }}>{' }'}</motion.span>
          </p>
        </motion.div>

        {/* Frosted Glass Terminal */}
        <GlassTerminal />

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-12"
        >
          <motion.a
            href="https://unstop.com/o/3C4O1aP?lb=O4B2h3r"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center gap-3 px-10 py-5 font-display font-bold text-lg md:text-xl rounded-2xl overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 glass-panel-strong rounded-2xl" />
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, hsl(190, 100%, 50% / 0.2), hsl(220, 80%, 55% / 0.15), hsl(175, 100%, 45% / 0.2))',
                backgroundSize: '300% 300%',
              }}
              animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ boxShadow: '0 0 40px hsl(190, 100%, 50% / 0.3), inset 0 0 20px hsl(190, 100%, 50% / 0.1)' }}
            />
            <div className="absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <span className="relative z-10 text-foreground">Register Now</span>
            <motion.span className="relative z-10" animate={{ y: [0, -3, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <Droplets className="w-5 h-5 text-primary" />
            </motion.span>
          </motion.a>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {[
            { icon: Trophy, label: 'Prize Pool', value: '₹5L+' },
            { icon: Users, label: 'Innovators', value: '500+' },
            { icon: Calendar, label: 'Duration', value: '48 Hrs' },
            { icon: MapPin, label: 'Venue', value: 'AITAM' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative group"
            >
              <div className="glass-card glass-highlight glass-condensation rounded-xl p-4 text-center transition-all duration-300 hover:border-primary/30">
                <motion.div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'radial-gradient(circle at center, hsl(190, 100%, 50% / 0.1), transparent 70%)' }}
                />
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-2xl md:text-3xl font-display font-black text-gradient-liquid">{stat.value}</p>
                <p className="text-xs md:text-sm text-muted-foreground font-display uppercase tracking-wider">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        whileHover={{ scale: 1.1 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground font-code uppercase tracking-widest">scroll</span>
          <motion.div className="w-8 h-12 border border-primary/30 rounded-full flex justify-center pt-2 glass-panel">
            <motion.div
              className="w-1.5 h-1.5 bg-primary rounded-full"
              animate={{ y: [0, 16, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </motion.button>

      {/* Side decorative lines */}
      <motion.div
        className="absolute left-6 top-1/3 bottom-1/3 w-px hidden lg:block z-[6]"
        style={{ background: 'linear-gradient(to bottom, transparent, hsl(190, 100%, 50% / 0.15), transparent)' }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 1, duration: 1 }}
      />
      <motion.div
        className="absolute right-6 top-1/3 bottom-1/3 w-px hidden lg:block z-[6]"
        style={{ background: 'linear-gradient(to bottom, transparent, hsl(190, 100%, 50% / 0.15), transparent)' }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 1, duration: 1 }}
      />
    </section>
  );
};

export default HeroSection;
