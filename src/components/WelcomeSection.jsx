import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import TypingEffect from "./TypingEffect";
import FloatingParticles from "./FloatingParticles";
import OceanFloor3D from "./OceanFloor3D";


const WelcomeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (<section ref={ref} className="relative py-24 md:py-32 overflow-hidden min-h-[90vh]" id="welcome">

    {/* Sandy ground — sits at the very bottom behind the 3D plants */}
    <div className="absolute bottom-0 left-0 right-0 h-[25%] z-0 pointer-events-none"
      style={{
        background: `linear-gradient(180deg,
          transparent 0%,
          rgba(40, 28, 12, 0.25) 20%,
          rgba(60, 42, 18, 0.45) 40%,
          rgba(80, 58, 25, 0.55) 60%,
          rgba(100, 72, 30, 0.5) 75%,
          rgba(90, 65, 28, 0.6) 90%,
          rgba(70, 50, 20, 0.65) 100%
        )`,
      }}
    >
      <div className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 10% 30%, rgba(194,154,90,0.6) 50%, transparent 100%),
            radial-gradient(1px 1px at 25% 55%, rgba(180,140,80,0.5) 50%, transparent 100%),
            radial-gradient(1.5px 1.5px at 42% 20%, rgba(210,170,100,0.4) 50%, transparent 100%),
            radial-gradient(1px 1px at 58% 65%, rgba(194,154,90,0.6) 50%, transparent 100%),
            radial-gradient(1px 1px at 72% 35%, rgba(200,160,95,0.5) 50%, transparent 100%),
            radial-gradient(1.5px 1.5px at 88% 50%, rgba(180,140,80,0.4) 50%, transparent 100%),
            radial-gradient(1px 1px at 15% 75%, rgba(210,170,100,0.5) 50%, transparent 100%),
            radial-gradient(1px 1px at 65% 85%, rgba(194,154,90,0.4) 50%, transparent 100%),
            radial-gradient(1px 1px at 92% 70%, rgba(180,140,80,0.6) 50%, transparent 100%)
          `,
          backgroundSize: '80px 60px',
        }}
      />
      <div className="absolute top-0 left-0 w-full h-[2px]"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(139,92,42,0.25) 20%, rgba(160,110,50,0.35) 50%, rgba(139,92,42,0.25) 80%, transparent)',
        }}
      />
    </div>

    {/* 3D Ocean Floor as BG — anchored to the bottom, sits ON TOP of sand */}
    <div className="absolute bottom-0 left-0 right-0 h-[70%] z-[1]">
      <OceanFloor3D />
    </div>

    <FloatingParticles count={40} />
    <Fish3DOverlay zone="trench" />
    <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none z-[1]" style={{
      background: 'radial-gradient(circle, hsl(195, 100%, 50% / 0.15), transparent 60%)',
    }} animate={{
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.5, 0.3],
    }} transition={{ duration: 6, repeat: Infinity }} />

    <div className="container mx-auto px-4 relative z-10">

      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-8">
        <motion.h2 className="text-3xl md:text-5xl font-display font-black italic mb-4 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.9)]">
          Welcome to
        </motion.h2>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="mb-4">
        <TypingEffect />
      </motion.div>

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="text-center mb-12">
        <h3 className="text-2xl md:text-4xl font-display font-bold text-foreground tracking-[0.3em] drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
          SEASON 4
        </h3>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="max-w-4xl mx-auto text-center">
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
          Welcome to the Official Website of Avishkaar Season 4 — a high-energy arena where innovation meets impact.
          Step into an immersive hackathon experience that celebrates creativity, teamwork, and cutting-edge technology.
          From AI and web to AR/VR, IoT, and sustainability, Avishkaar brings together brilliant minds to prototype bold ideas,
          build real solutions, and present them to mentors and industry leaders. Join us for 48 hours of focused problem-solving,
          lightning workshops, deep-dive mentoring, and live demos — where every commit pushes the future forward and every project
          can spark change.
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="text-center mt-12">
        <motion.button className="btn-ocean neon-border font-display font-bold text-lg px-10 py-5" aria-label="Join the Innovation on Unstop" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => window.open('https://unstop.com/o/3C4O1aP?lb=O4B2h3r', '_blank')}>
          <span className="relative z-10 flex items-center gap-3">
            JOIN THE INNOVATION
          </span>
        </motion.button>
      </motion.div>
    </div>
  </section>);
};
export default WelcomeSection;
