import { motion } from "framer-motion";
import { fadeIn, textVariant, zoomIn } from "@/lib/motion";
import { Code, Lightbulb, Trophy, Users, Droplets } from "lucide-react";
import { useMemo } from "react";

const fishSVG = (color, flip = false) => (
  <svg viewBox="0 0 64 32" fill="none" className="w-full h-full" style={{ transform: flip ? 'scaleX(-1)' : 'none' }}>
    <ellipse cx="28" cy="16" rx="18" ry="10" fill={color} opacity="0.85" />
    <polygon points={flip ? "10,16 0,6 0,26" : "46,16 58,6 58,26"} fill={color} opacity="0.7" />
    <circle cx={flip ? "36" : "20"} cy="13" r="2.5" fill="white" opacity="0.9" />
    <circle cx={flip ? "36" : "20"} cy="13" r="1.2" fill="#0a1628" />
    <polygon points={flip ? "22,6 18,2 16,8" : "30,6 34,2 36,8"} fill={color} opacity="0.6" />
  </svg>
);

const SwimmingFish = ({ delay, duration, y, size, color, direction }) => {
  const flip = direction === "right";
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ top: y, width: size, height: size * 0.5 }}
      initial={{ x: flip ? "calc(100vw + 80px)" : "-120px", opacity: 0 }}
      animate={{ x: flip ? "-120px" : "calc(100vw + 80px)", opacity: [0, 1, 1, 1, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
    >
      {fishSVG(color, flip)}
    </motion.div>
  );
};

const features = [
  { icon: Code, title: "48-Hour Coding Sprint", description: "Non-stop innovation and development" },
  { icon: Lightbulb, title: "10+ Themes", description: "Diverse problem statements to solve" },
  { icon: Users, title: "Mentorship", description: "Guidance from industry experts" },
  { icon: Trophy, title: "Exciting Prizes", description: "Recognition and rewards for winners" },
];

const fishConfigs = [
  { delay: 0, duration: 12, y: "10%", size: 48, color: "hsl(190, 100%, 50%)", direction: "left" },
  { delay: 2, duration: 15, y: "30%", size: 36, color: "hsl(175, 100%, 45%)", direction: "right" },
  { delay: 4, duration: 10, y: "55%", size: 56, color: "hsl(220, 80%, 55%)", direction: "left" },
  { delay: 1, duration: 18, y: "75%", size: 32, color: "hsl(190, 80%, 60%)", direction: "right" },
  { delay: 6, duration: 14, y: "20%", size: 40, color: "hsl(175, 80%, 55%)", direction: "left" },
  { delay: 3, duration: 11, y: "85%", size: 44, color: "hsl(200, 90%, 50%)", direction: "right" },
  { delay: 8, duration: 16, y: "45%", size: 28, color: "hsl(190, 100%, 65%)", direction: "left" },
  { delay: 5, duration: 13, y: "65%", size: 52, color: "hsl(210, 70%, 50%)", direction: "right" },
];

const AboutSection = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden" id="about">
      {/* Swimming fish from left and right */}
      {fishConfigs.map((fish, i) => (
        <SwimmingFish key={i} {...fish} />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-deep to-background" />
      
      <div className="relative z-10 container mx-auto px-4">
        <motion.div variants={textVariant(0)} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-4">
          <h2 className="text-3xl md:text-5xl font-display font-black text-gradient-liquid tracking-wide">ABOUT AVISHKAAR</h2>
        </motion.div>

        <motion.div variants={fadeIn("up", "spring", 0.2, 0.6)} initial="hidden" whileInView="show" viewport={{ once: true }} className="w-24 h-1 bg-primary mx-auto mb-16" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div variants={fadeIn("left", "spring", 0.3, 0.6)} initial="hidden" whileInView="show" viewport={{ once: true }} className="glass-panel rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 bg-background/50 border-b border-border">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <div className="w-3 h-3 rounded-full bg-secondary" />
              <div className="w-3 h-3 rounded-full bg-accent" />
              <span className="ml-2 font-mono text-sm text-muted-foreground">readme.md</span>
            </div>
            <div className="p-6 space-y-6 font-mono text-sm leading-relaxed">
              <p className="flex items-start gap-2"><span className="mt-1 shrink-0"><Droplets className="w-4 h-4 text-primary" /></span> <span><span className="text-primary font-bold">Avishkaar</span> is a National Level 48-hour hackathon organized by <span className="text-secondary font-bold">Aditya Engineering College</span>, designed to bring together the brightest minds in technology and innovation.</span></p>
              <p className="flex items-start gap-2"><span className="mt-1 shrink-0"><Droplets className="w-4 h-4 text-accent" /></span> <span>Season 4 introduces <span className="text-primary">"The Infinite Loop of Innovation"</span> – a theme that celebrates continuous learning, iterative development, and breakthrough solutions.</span></p>
              <p className="text-muted-foreground"><span className="text-primary">{">"}</span> Join us for 48 hours of intense coding, networking, workshops, and the chance to win amazing prizes while solving real-world problems.</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <motion.div key={feature.title} variants={zoomIn(0.3 + index * 0.1, 0.5)} initial="hidden" whileInView="show" viewport={{ once: true }} className="group">
                <div className="relative h-full p-6 glass-panel rounded-xl hover:border-primary/40 transition-all duration-300 text-center">
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                  <div className="relative">
                    <div className="w-14 h-14 bg-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/30 transition-colors">
                      <feature.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-display font-bold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
