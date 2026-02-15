import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Droplets } from "lucide-react";

const sponsors = [
  { name: "GeeksForGeeks", initials: "GFG" }, { name: "CCC", initials: "CCC" },
  { name: "New Leaf", initials: "NL" }, { name: "Instack", initials: "IS" },
  { name: "SmartBridge", initials: "SB" }, { name: "SHTC", initials: "SHTC" },
  { name: "Matrix", initials: "MTX" }, { name: "GitHub", initials: "GH" },
  { name: "DualityAI", initials: "DAI" }, { name: "Moonex", initials: "MX" },
  { name: "Unstop", initials: "US" }, { name: "Interview Buddy", initials: "IB" },
  { name: "XYZ", initials: "XYZ" }, { name: "Interview Cake", initials: "IC" },
  { name: "Tech Corp", initials: "TC" },
];

const SponsorsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 overflow-hidden" id="sponsors">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
      
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, hsl(190, 100%, 50% / 0.1), transparent 70%)' }}
        animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-black mb-4 text-gradient-liquid flex items-center justify-center gap-3"><Droplets className="w-8 h-8 text-primary" /> OUR SPONSORS <Droplets className="w-8 h-8 text-primary" /></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Backed by industry leaders who believe in innovation</p>
          <motion.div className="w-24 h-1 mx-auto rounded-full mt-6" style={{ background: 'linear-gradient(to right, hsl(175, 100%, 55%), hsl(190, 100%, 50%), hsl(220, 80%, 55%))' }} animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity }} />
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={sponsor.name}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.05, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.08, y: -8 }}
              className="group relative"
            >
              <motion.div className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"
                style={{ background: 'linear-gradient(135deg, hsl(175, 100%, 55% / 0.4), hsl(190, 100%, 50% / 0.3), hsl(220, 80%, 55% / 0.4))' }} />

              <div className="relative glass-panel-strong rounded-xl h-28 flex items-center justify-center p-4 overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:border-primary/30">
                {/* Beam effects */}
                <div className="absolute inset-0 rounded-xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.div className="absolute top-0 left-0 h-[2px] w-16"
                    style={{ background: 'linear-gradient(90deg, transparent, hsl(175, 100%, 55%), hsl(190, 100%, 50%), transparent)' }}
                    animate={{ left: ['-20%', '120%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />
                  <motion.div className="absolute top-0 right-0 w-[2px] h-16"
                    style={{ background: 'linear-gradient(180deg, transparent, hsl(175, 100%, 55%), hsl(190, 100%, 50%), transparent)' }}
                    animate={{ top: ['-20%', '120%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.375 }} />
                  <motion.div className="absolute bottom-0 right-0 h-[2px] w-16"
                    style={{ background: 'linear-gradient(270deg, transparent, hsl(175, 100%, 55%), hsl(190, 100%, 50%), transparent)' }}
                    animate={{ right: ['-20%', '120%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.75 }} />
                  <motion.div className="absolute bottom-0 left-0 w-[2px] h-16"
                    style={{ background: 'linear-gradient(0deg, transparent, hsl(175, 100%, 55%), hsl(190, 100%, 50%), transparent)' }}
                    animate={{ bottom: ['-20%', '120%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 1.125 }} />
                </div>
                
                <motion.div className="relative z-10 text-center" whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
                  <div className="text-2xl font-display font-bold text-gradient-liquid">{sponsor.initials}</div>
                  <p className="text-xs text-muted-foreground mt-1 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    {sponsor.name}
                  </p>
                </motion.div>

                {/* Rising bubbles */}
                {[...Array(4)].map((_, i) => (
                  <motion.div key={i} className="absolute rounded-full opacity-0 group-hover:opacity-100"
                    style={{
                      left: `${20 + i * 18}%`, bottom: '-5px', width: 4, height: 4,
                      background: `radial-gradient(circle at 30% 30%, hsl(${185 + i * 10}, 100%, 80% / 0.5), transparent)`,
                      border: '1px solid hsl(190, 100%, 70% / 0.3)',
                    }}
                    animate={{ y: [0, -40, -80], opacity: [0, 0.6, 0], scale: [0.5, 1.2, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15, ease: "easeOut" }} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.6 }} className="text-center mt-16">
          <p className="text-muted-foreground mb-4">Interested in sponsoring Avishkaar Season 4?</p>
          <motion.button className="relative px-8 py-4 font-display font-bold text-foreground rounded-full overflow-hidden group" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <motion.div className="absolute inset-0 rounded-full p-[2px]"
              style={{ background: 'linear-gradient(135deg, hsl(175, 100%, 55%), hsl(190, 100%, 50%), hsl(220, 80%, 55%), hsl(175, 100%, 55%))', backgroundSize: '300% 300%' }}
              animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }} transition={{ duration: 3, repeat: Infinity }}>
              <div className="w-full h-full bg-card rounded-full" />
            </motion.div>
            <span className="relative z-10 flex items-center gap-2">BECOME A SPONSOR <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}><Droplets className="w-5 h-5" /></motion.span></span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default SponsorsSection;
