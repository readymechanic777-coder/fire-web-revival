import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import FloatingParticles from "./FloatingParticles";

const sponsors = [
  { name: "GeeksForGeeks", initials: "GFG" },
  { name: "CCC", initials: "CCC" },
  { name: "New Leaf", initials: "NL" },
  { name: "Instack", initials: "IS" },
  { name: "SmartBridge", initials: "SB" },
  { name: "SHTC", initials: "SHTC" },
  { name: "Matrix", initials: "MTX" },
  { name: "GitHub", initials: "GH" },
  { name: "DualityAI", initials: "DAI" },
  { name: "Moonex", initials: "MX" },
  { name: "Unstop", initials: "US" },
  { name: "Interview Buddy", initials: "IB" },
  { name: "XYZ", initials: "XYZ" },
  { name: "Interview Cake", initials: "IC" },
  { name: "Tech Corp", initials: "TC" },
];
const SponsorsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (<section ref={ref} className="relative py-24 overflow-hidden min-h-[50vh]" id="sponsors">

    <FloatingParticles count={40} />
    

    <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none" style={{
      background: 'radial-gradient(ellipse, hsl(195, 100%, 50% / 0.15), transparent 70%)',
    }} animate={{
      opacity: [0.3, 0.6, 0.3],
      scale: [1, 1.1, 1],
    }} transition={{ duration: 4, repeat: Infinity }} />

    <div className="container mx-auto px-4 relative z-10">

      <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16">
        <motion.h2 className="text-4xl md:text-5xl font-display font-black mb-4 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
          OUR SPONSORS
        </motion.h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Backed by industry leaders who believe in innovation
        </p>
        <motion.div className="w-24 h-1 mx-auto rounded-full mt-6 bg-gradient-water" animate={{
          opacity: [0.7, 1, 0.7],
          scaleX: [0.9, 1, 0.9],
        }} transition={{ duration: 2, repeat: Infinity }} />
      </motion.div>


      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
        {sponsors.map((sponsor, index) => (<motion.div key={sponsor.name} initial={{ opacity: 0, y: 30, scale: 0.9 }} animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{
          duration: 0.5,
          delay: index * 0.05,
          type: "spring",
          stiffness: 100,
        }} whileHover={{
          scale: 1.08,
          y: -8,
        }} className="group relative">

          <motion.div className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" style={{
            background: 'linear-gradient(135deg, hsl(175, 100%, 45% / 0.6), hsl(195, 100%, 50% / 0.4), hsl(220, 85%, 55% / 0.6))',
          }} />

          <div className="relative glass-card rounded-xl h-28 flex items-center justify-center p-4 overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:border-primary/50 group-hover:glow-bioluminescent">

            <div className="absolute inset-0 rounded-xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 motion-reduce-hide">

              <motion.div className="absolute top-0 left-0 h-[2px] w-16" style={{
                background: 'linear-gradient(90deg, transparent, hsl(175, 100%, 45%), hsl(195, 100%, 50%), transparent)',
                boxShadow: '0 0 10px hsl(175, 100%, 45%), 0 0 20px hsl(195, 100%, 50%)',
              }} animate={{
                left: ['-20%', '120%'],
              }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />

              <motion.div className="absolute top-0 right-0 w-[2px] h-16" style={{
                background: 'linear-gradient(180deg, transparent, hsl(175, 100%, 45%), hsl(195, 100%, 50%), transparent)',
                boxShadow: '0 0 10px hsl(175, 100%, 45%), 0 0 20px hsl(195, 100%, 50%)',
              }} animate={{
                top: ['-20%', '120%'],
              }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.375 }} />

              <motion.div className="absolute bottom-0 right-0 h-[2px] w-16" style={{
                background: 'linear-gradient(270deg, transparent, hsl(175, 100%, 45%), hsl(195, 100%, 50%), transparent)',
                boxShadow: '0 0 10px hsl(175, 100%, 45%), 0 0 20px hsl(195, 100%, 50%)',
              }} animate={{
                right: ['-20%', '120%'],
              }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.75 }} />

              <motion.div className="absolute bottom-0 left-0 w-[2px] h-16" style={{
                background: 'linear-gradient(0deg, transparent, hsl(175, 100%, 45%), hsl(195, 100%, 50%), transparent)',
                boxShadow: '0 0 10px hsl(175, 100%, 45%), 0 0 20px hsl(195, 100%, 50%)',
              }} animate={{
                bottom: ['-20%', '120%'],
              }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 1.125 }} />
            </div>


            <motion.div className="relative z-10 text-center" whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
              <div className="text-2xl font-display font-bold transition-all duration-300 group-hover:text-primary" style={{
                background: 'linear-gradient(135deg, hsl(195, 100%, 40%), hsl(220, 85%, 45%))',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}>
                {sponsor.initials}
              </div>
              <p className="text-xs text-cyan-50 mt-1 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                {sponsor.name}
              </p>
            </motion.div>


            {[...Array(6)].map((_, i) => (<motion.div key={i} className="absolute rounded-full opacity-0 group-hover:opacity-100 motion-reduce-hide" style={{
              left: `${15 + i * 14}%`,
              bottom: '-5px',
              width: `${3 + Math.random() * 3}px`,
              height: `${3 + Math.random() * 3}px`,
              background: `hsl(${195 + i * 5}, 100%, ${50 + i * 5}%)`,
              boxShadow: `0 0 ${4 + i}px hsl(${195 + i * 5}, 100%, 50%)`,
            }} animate={{
              y: [0, -40, -80],
              x: [0, (i % 2 === 0 ? -1 : 1) * 10, (i % 2 === 0 ? -1 : 1) * 5],
              opacity: [0, 1, 0],
              scale: [0.5, 1.2, 0],
            }} transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeOut",
            }} />))}


            <motion.div className="absolute top-2 left-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
              borderLeft: '2px solid hsl(195, 100%, 50%)',
              borderTop: '2px solid hsl(175, 100%, 45%)',
            }} animate={{
              borderColor: ['hsl(195, 100%, 50%)', 'hsl(175, 100%, 45%)', 'hsl(195, 100%, 50%)'],
            }} transition={{ duration: 1, repeat: Infinity }} />
            <motion.div className="absolute bottom-2 right-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
              borderRight: '2px solid hsl(195, 100%, 50%)',
              borderBottom: '2px solid hsl(175, 100%, 45%)',
            }} animate={{
              borderColor: ['hsl(175, 100%, 45%)', 'hsl(195, 100%, 50%)', 'hsl(175, 100%, 45%)'],
            }} transition={{ duration: 1, repeat: Infinity }} />
          </div>
        </motion.div>))}
      </div>

    </div>
  </section>
  );
};
export default SponsorsSection;
