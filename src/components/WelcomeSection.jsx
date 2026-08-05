import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import TypingEffect from "./TypingEffect";
import FloatingParticles from "./FloatingParticles";
import OceanFloor3D from "./OceanFloor3D";


const WelcomeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (<section ref={ref} className="relative py-24 md:py-32 overflow-hidden min-h-[90vh]" id="welcome">



    <FloatingParticles count={15} />
    
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none z-[1] opacity-40" style={{
      background: 'radial-gradient(circle, hsl(195, 100%, 50% / 0.15), transparent 60%)',
    }} />

    <div className="container mx-auto px-4 relative z-10">

      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-1">
        <motion.h2 className="text-3xl md:text-5xl font-display font-black italic mb-2 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.9)]">
          Welcome to
        </motion.h2>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="mb-2">
        <TypingEffect />
      </motion.div>

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="text-center mb-8">
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
