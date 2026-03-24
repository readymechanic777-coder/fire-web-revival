import { motion } from "framer-motion";
import TypingEffect from "./TypingEffect";
import WaterTextEffect from "./WaterTextEffect";
import OceanBackground from "./OceanBackground";
import {
  Droplets,
  Users,
  Trophy,
  Calendar,
  MapPin,
  Code2,
  Terminal,
  MonitorPlay,
  Cpu,
  Database,
  Server,
  Globe,
  Braces,
  Laptop,
  Cloud,
  Satellite,
} from "lucide-react";

const floatingIcons = [
  {
    Icon: Code2,
    top: "15%",
    left: "10%",
    duration: 4.5,
    delay: 0,
    size: "w-14 h-14",
    rot: [0, 5, 0],
    y: [0, -15, 0],
    glow: "rgba(34,211,238,0.8)",
    glowOuter: "rgba(56,189,248,0.4)",
    text: "text-cyan-200/50",
  },
  {
    Icon: Terminal,
    top: "25%",
    right: "12%",
    duration: 5,
    delay: 1,
    size: "w-12 h-12",
    rot: [0, -5, 0],
    y: [0, 20, 0],
    glow: "rgba(52,211,153,0.8)",
    glowOuter: "rgba(16,185,129,0.4)",
    text: "text-emerald-200/50",
  },
  {
    Icon: Cpu,
    bottom: "25%",
    left: "15%",
    duration: 4,
    delay: 2,
    size: "w-10 h-10",
    rot: [0, 8, 0],
    y: [0, -20, 0],
    glow: "rgba(167,139,250,0.8)",
    glowOuter: "rgba(139,92,246,0.4)",
    text: "text-violet-200/50",
  },
  {
    Icon: MonitorPlay,
    bottom: "35%",
    right: "18%",
    duration: 5.5,
    delay: 1.5,
    size: "w-12 h-12",
    rot: [0, -8, 0],
    y: [0, 15, 0],
    glow: "rgba(96,165,250,0.8)",
    glowOuter: "rgba(59,130,246,0.4)",
    text: "text-blue-200/50",
  },
  {
    Icon: Database,
    top: "20%",
    right: "28%",
    duration: 6,
    delay: 0.5,
    size: "w-9 h-9",
    rot: [0, 10, 0],
    y: [0, -10, 0],
    glow: "rgba(34,211,238,0.8)",
    glowOuter: "rgba(34,211,238,0.4)",
    text: "text-cyan-200/50",
  },
  {
    Icon: Server,
    bottom: "15%",
    left: "30%",
    duration: 4.8,
    delay: 2.5,
    size: "w-11 h-11",
    rot: [0, -12, 0],
    y: [0, 18, 0],
    glow: "rgba(192,132,252,0.8)",
    glowOuter: "rgba(168,85,247,0.4)",
    text: "text-purple-200/50",
  },
  {
    Icon: Globe,
    top: "35%",
    left: "5%",
    duration: 5.2,
    delay: 1.2,
    size: "w-12 h-12",
    rot: [0, 6, 0],
    y: [0, -25, 0],
    glow: "rgba(52,211,153,0.8)",
    glowOuter: "rgba(16,185,129,0.4)",
    text: "text-emerald-200/50",
  },
  {
    Icon: Braces,
    bottom: "45%",
    right: "8%",
    duration: 3.8,
    delay: 0.8,
    size: "w-10 h-10",
    rot: [0, -15, 0],
    y: [0, 22, 0],
    glow: "rgba(96,165,250,0.8)",
    glowOuter: "rgba(59,130,246,0.4)",
    text: "text-blue-200/50",
  },
  {
    Icon: Cloud,
    top: "10%",
    left: "35%",
    duration: 7,
    delay: 3,
    size: "w-14 h-14",
    rot: [0, 4, 0],
    y: [0, 12, 0],
    glow: "rgba(34,211,238,0.5)",
    glowOuter: "rgba(56,189,248,0.2)",
    text: "text-cyan-200/50",
  },
  {
    Icon: Laptop,
    bottom: "12%",
    right: "35%",
    duration: 4.2,
    delay: 1.8,
    size: "w-10 h-10",
    rot: [0, -6, 0],
    y: [0, -18, 0],
    glow: "rgba(167,139,250,0.8)",
    glowOuter: "rgba(139,92,246,0.4)",
    text: "text-violet-200/50",
  },
  {
    Icon: Satellite,
    top: "8%",
    right: "45%",
    duration: 6.5,
    delay: 1.5,
    size: "w-12 h-12",
    rot: [0, 12, 0],
    y: [0, -22, 0],
    glow: "rgba(236,72,153,0.8)",
    glowOuter: "rgba(219,39,119,0.4)",
    text: "text-pink-200/50",
  },
];

const HeroSection = () => {
  const scrollToAbout = () => {
    const element = document.getElementById("about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero-section" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background/60 pointer-events-none" />
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {floatingIcons.map((item, idx) => {
          const IconComponent = item.Icon;
          return (
            <motion.div
              key={idx}
              animate={{ y: item.y, rotate: item.rot }}
              transition={{ duration: item.duration, repeat: Infinity, ease: "easeInOut", delay: item.delay }}
              className="absolute hidden md:flex opacity-90"
              style={{ top: item.top, bottom: item.bottom, left: item.left, right: item.right }}
            >
              <IconComponent
                className={item.size + " " + item.text}
                strokeWidth={1}
                fill="rgba(34, 211, 238, 0.1)"
                style={{ filter: `drop-shadow(0 0 10px ${item.glow}) drop-shadow(0 0 20px ${item.glowOuter})` }}
              />
            </motion.div>
          );
        })}
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center text-cyan-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, type: "spring" }}
          className="mb-4 w-full h-[150px] md:h-[250px] flex flex-col items-center justify-center relative"
        >
          <TypingEffect />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-2"
        >
          <p className="font-display text-xs md:text-sm uppercase tracking-[0.35em] text-cyan-100 drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]">
            Season 4 · Deep Ocean Edition
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        ></motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        ></motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-4 flex flex-col items-center justify-center gap-3 md:flex-row md:gap-5"
        >
          <a
            href="https://unstop.com/o/3C4O1aP?lb=O4B2h3r"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ocean neon-border text-sm md:text-base mb-4"
            aria-label="Join the Ocean Hack on Unstop"
          >
            <Code2 className="w-5 h-5 text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            <span className="drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">Join the Ocean Hack</span>
          </a>
        </motion.div>
        <motion.div className="mb-5">
          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] md:text-xs font-mono text-cyan-50">
            <span className="rounded-full border border-cyan-300/30 bg-slate-950/30 backdrop-blur-md shadow-[0_0_10px_rgba(34,211,238,0.2)] px-4 py-1 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)] hover:bg-cyan-900/30 hover:border-cyan-300/50 transition-colors">
              48 hrs · On‑campus finale
            </span>
            <span className="rounded-full border border-cyan-300/30 bg-slate-950/30 backdrop-blur-md shadow-[0_0_10px_rgba(34,211,238,0.2)] px-4 py-1 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)] hover:bg-cyan-900/30 hover:border-cyan-300/50 transition-colors">
              Web · AI · Sustainability tracks
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {[
            { icon: Trophy, label: "Prize Pool", value: "₹2L+", color: "from-cyan-400 to-sky-400" },
            { icon: Users, label: "Participants", value: "500+", color: "from-sky-400 to-blue-400" },
            { icon: Calendar, label: "Duration", value: "48 Hrs", color: "from-teal-400 to-cyan-400" },
            { icon: MapPin, label: "Venue", value: "AITAM", color: "from-indigo-400 to-cyan-400" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="group glass-card px-4 py-4 text-center rounded-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <stat.icon className="w-5 h-5 mx-auto mb-1.5 text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] group-hover:scale-110 transition-transform duration-300" />
              <p
                className={`text-2xl md:text-3xl font-display font-semibold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]`}
              >
                {stat.value}
              </p>
              <p className="text-[10px] md:text-xs text-cyan-100 font-display uppercase tracking-[0.18em] mt-1 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
export default HeroSection;
