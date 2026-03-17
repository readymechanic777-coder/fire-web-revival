import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import FloatingParticles from "./FloatingParticles";
const allPartners = [
  { name: "GDG", initials: "GDG", type: "Outreach Partner" },
  { name: "GFG", initials: "GFG", type: "Outreach Partner" },
  { name: "Branding Jester", initials: "BJ", type: "Media Partner" },
  { name: "Flashoot", initials: "FL", type: "Media Partner" },
  { name: "AITAMRISE Incubator", initials: "ARI", type: "Incubation Partner" },
  { name: "Unstop", initials: "US", type: "Platform Partner" },
];
const groupedPartners = allPartners.reduce((acc, partner) => {
  if (!acc[partner.type]) {
    acc[partner.type] = [];
  }
  acc[partner.type].push(partner);
  return acc;
}, {});
const PartnersSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (<section ref={ref} className="relative py-24 overflow-hidden min-h-[50vh]" id="partners">

    <FloatingParticles count={40} />

    <div className="container mx-auto px-4 relative z-10">

      <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16">
        <motion.h2 className="text-4xl md:text-5xl font-display font-black mb-4 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
          OUR PARTNERS
        </motion.h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Collaborating with the best to bring you an unforgettable experience
        </p>
        <motion.div className="w-24 h-1 mx-auto rounded-full mt-6 bg-gradient-water" animate={{
          opacity: [0.7, 1, 0.7],
          scaleX: [0.9, 1, 0.9],
        }} transition={{ duration: 2, repeat: Infinity }} />
      </motion.div>


      <div className="flex flex-wrap justify-center gap-12 max-w-6xl mx-auto">
        {Object.entries(groupedPartners).map(([type, partners], catIndex) => (<motion.div key={type} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: catIndex * 0.15 }} className="text-center">

          <motion.h3 className="text-xl md:text-2xl font-display font-bold mb-6 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
            {type}
          </motion.h3>


          <div className="flex flex-wrap justify-center gap-8">
            {partners.map((partner, index) => (<motion.div key={partner.name} initial={{ opacity: 0, scale: 0.8 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{
              duration: 0.5,
              delay: catIndex * 0.2 + index * 0.1,
              type: "spring",
            }} whileHover={{
              scale: 1.1,
              y: -8,
            }} className="group relative">

              <motion.div className="absolute -inset-3 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-lg" style={{
                background: 'radial-gradient(circle, hsl(195, 100%, 50% / 0.6), hsl(175, 100%, 45% / 0.3), transparent)',
              }} />

              <div className="relative bg-white/95 backdrop-blur-sm rounded-xl h-24 w-28 flex items-center justify-center p-3 overflow-hidden transition-all duration-500 group-hover:shadow-2xl border border-transparent group-hover:border-primary/30">

                <div className="absolute inset-0 rounded-xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">

                  <motion.div className="absolute top-0 left-0 h-[2px] w-12" style={{
                    background: 'linear-gradient(90deg, transparent, hsl(175, 100%, 45%), hsl(195, 100%, 50%), transparent)',
                    boxShadow: '0 0 8px hsl(175, 100%, 45%), 0 0 16px hsl(195, 100%, 50%)',
                  }} animate={{
                    left: ['-30%', '130%'],
                  }} transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }} />

                  <motion.div className="absolute top-0 right-0 w-[2px] h-12" style={{
                    background: 'linear-gradient(180deg, transparent, hsl(175, 100%, 45%), hsl(195, 100%, 50%), transparent)',
                    boxShadow: '0 0 8px hsl(175, 100%, 45%), 0 0 16px hsl(195, 100%, 50%)',
                  }} animate={{
                    top: ['-30%', '130%'],
                  }} transition={{ duration: 1.2, repeat: Infinity, ease: "linear", delay: 0.3 }} />

                  <motion.div className="absolute bottom-0 right-0 h-[2px] w-12" style={{
                    background: 'linear-gradient(270deg, transparent, hsl(175, 100%, 45%), hsl(195, 100%, 50%), transparent)',
                    boxShadow: '0 0 8px hsl(175, 100%, 45%), 0 0 16px hsl(195, 100%, 50%)',
                  }} animate={{
                    right: ['-30%', '130%'],
                  }} transition={{ duration: 1.2, repeat: Infinity, ease: "linear", delay: 0.6 }} />

                  <motion.div className="absolute bottom-0 left-0 w-[2px] h-12" style={{
                    background: 'linear-gradient(0deg, transparent, hsl(175, 100%, 45%), hsl(195, 100%, 50%), transparent)',
                    boxShadow: '0 0 8px hsl(175, 100%, 45%), 0 0 16px hsl(195, 100%, 50%)',
                  }} animate={{
                    bottom: ['-30%', '130%'],
                  }} transition={{ duration: 1.2, repeat: Infinity, ease: "linear", delay: 0.9 }} />
                </div>


                <motion.div className="relative z-10 text-center" whileHover={{ scale: 1.1 }}>
                  <motion.div className="text-xl font-display font-bold" style={{
                    background: 'linear-gradient(135deg, hsl(195, 100%, 40%), hsl(220, 85%, 45%))',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                  }}>
                    {partner.initials}
                  </motion.div>
                </motion.div>


                {[...Array(5)].map((_, i) => (<motion.div key={i} className="absolute rounded-full opacity-0 group-hover:opacity-100" style={{
                  left: `${20 + i * 15}%`,
                  bottom: '-3px',
                  width: `${2 + Math.random() * 2}px`,
                  height: `${2 + Math.random() * 2}px`,
                  background: `hsl(${195 + i * 8}, 100%, ${55 + i * 3}%)`,
                  boxShadow: `0 0 ${3 + i}px hsl(${195 + i * 8}, 100%, 50%)`,
                }} animate={{
                  y: [0, -30, -60],
                  x: [0, (i % 2 === 0 ? -1 : 1) * 8, 0],
                  opacity: [0, 1, 0],
                  scale: [0.3, 1, 0],
                }} transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.12,
                }} />))}


                <motion.div className="absolute inset-0 rounded-xl border-2 border-primary/50 opacity-0 group-hover:opacity-100" animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0, 0.5],
                }} transition={{ duration: 1.5, repeat: Infinity }} />
              </div>


              <motion.div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <span className="text-xs font-display font-medium px-3 py-1.5 rounded-full whitespace-nowrap" style={{
                  background: 'linear-gradient(135deg, hsl(195, 100%, 50% / 0.2), hsl(175, 100%, 45% / 0.1))',
                  border: '1px solid hsl(195, 100%, 50% / 0.3)',
                  color: 'hsl(195, 100%, 60%)',
                }}>
                  {partner.name}
                </span>
              </motion.div>
            </motion.div>))}
          </div>
        </motion.div>))}
      </div>
    </div>
  </section>
  );
};
export default PartnersSection;
