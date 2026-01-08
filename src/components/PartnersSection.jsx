import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { fadeIn, textVariant, zoomIn } from "@/lib/motion";

// Partners grouped by type - replace with actual partner logos
const allPartners = [
  { name: "GDG", initials: "GDG", type: "Outreach Partner" },
  { name: "GFG", initials: "GFG", type: "Outreach Partner" },
  { name: "Branding Jester", initials: "BJ", type: "Media Partner" },
  { name: "Flashoot", initials: "FL", type: "Media Partner" },
  { name: "AITAMRISE Incubator", initials: "ARI", type: "Incubation Partner" },
  { name: "Unstop", initials: "US", type: "Platform Partner" },
];

// Group partners by type
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

  return (
    <section ref={ref} className="relative py-24 overflow-hidden" id="partners">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />

      {/* Animated embers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: 'hsl(25, 100%, 50%)',
              boxShadow: '0 0 6px hsl(25, 100%, 50%)',
            }}
            animate={{
              y: [0, -100, -200],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-display font-black mb-4"
            style={{
              background: 'linear-gradient(135deg, hsl(45, 100%, 55%), hsl(25, 100%, 50%), hsl(15, 100%, 45%))',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
            animate={{
              textShadow: [
                '0 0 30px hsl(25, 100%, 50% / 0.3)',
                '0 0 50px hsl(25, 100%, 50% / 0.5)',
                '0 0 30px hsl(25, 100%, 50% / 0.3)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🔥 OUR PARTNERS 🔥
          </motion.h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Collaborating with the best to bring you an unforgettable experience
          </p>
          <motion.div
            className="w-24 h-1 mx-auto rounded-full mt-6"
            style={{
              background: 'linear-gradient(to right, hsl(45, 100%, 55%), hsl(25, 100%, 50%), hsl(15, 100%, 45%))',
            }}
            animate={{
              opacity: [0.7, 1, 0.7],
              scaleX: [0.9, 1, 0.9],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Partners by Category */}
        <div className="flex flex-wrap justify-center gap-12 max-w-6xl mx-auto">
          {Object.entries(groupedPartners).map(([type, partners], catIndex) => (
            <motion.div
              key={type}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: catIndex * 0.15 }}
              className="text-center"
            >
              {/* Category Title */}
              <motion.h3
                className="text-xl md:text-2xl font-display font-bold mb-6"
                style={{
                  background: 'linear-gradient(to right, hsl(45, 100%, 55%), hsl(25, 100%, 50%))',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                {type}
              </motion.h3>

              {/* Partners in Category */}
              <div className="flex flex-wrap justify-center gap-8">
                {partners.map((partner, index) => (
                  <motion.div
                    key={partner.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: catIndex * 0.2 + index * 0.1,
                      type: "spring",
                    }}
                    whileHover={{
                      scale: 1.1,
                      y: -8,
                    }}
                    className="group relative"
                  >
                    {/* Outer fire glow */}
                    <motion.div
                      className="absolute -inset-3 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-lg"
                      style={{
                        background: 'radial-gradient(circle, hsl(25, 100%, 50% / 0.6), hsl(45, 100%, 55% / 0.3), transparent)',
                      }}
                    />

                    <div className="relative bg-white/95 backdrop-blur-sm rounded-xl h-24 w-28 flex items-center justify-center p-3 overflow-hidden transition-all duration-500 group-hover:shadow-2xl border border-transparent group-hover:border-orange-400/30">
                      {/* Border beam effect */}
                      <div className="absolute inset-0 rounded-xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {/* Top beam */}
                        <motion.div
                          className="absolute top-0 left-0 h-[2px] w-12"
                          style={{
                            background: 'linear-gradient(90deg, transparent, hsl(45, 100%, 55%), hsl(25, 100%, 50%), transparent)',
                            boxShadow: '0 0 8px hsl(45, 100%, 55%), 0 0 16px hsl(25, 100%, 50%)',
                          }}
                          animate={{
                            left: ['-30%', '130%'],
                          }}
                          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                        />
                        {/* Right beam */}
                        <motion.div
                          className="absolute top-0 right-0 w-[2px] h-12"
                          style={{
                            background: 'linear-gradient(180deg, transparent, hsl(45, 100%, 55%), hsl(25, 100%, 50%), transparent)',
                            boxShadow: '0 0 8px hsl(45, 100%, 55%), 0 0 16px hsl(25, 100%, 50%)',
                          }}
                          animate={{
                            top: ['-30%', '130%'],
                          }}
                          transition={{ duration: 1.2, repeat: Infinity, ease: "linear", delay: 0.3 }}
                        />
                        {/* Bottom beam */}
                        <motion.div
                          className="absolute bottom-0 right-0 h-[2px] w-12"
                          style={{
                            background: 'linear-gradient(270deg, transparent, hsl(45, 100%, 55%), hsl(25, 100%, 50%), transparent)',
                            boxShadow: '0 0 8px hsl(45, 100%, 55%), 0 0 16px hsl(25, 100%, 50%)',
                          }}
                          animate={{
                            right: ['-30%', '130%'],
                          }}
                          transition={{ duration: 1.2, repeat: Infinity, ease: "linear", delay: 0.6 }}
                        />
                        {/* Left beam */}
                        <motion.div
                          className="absolute bottom-0 left-0 w-[2px] h-12"
                          style={{
                            background: 'linear-gradient(0deg, transparent, hsl(45, 100%, 55%), hsl(25, 100%, 50%), transparent)',
                            boxShadow: '0 0 8px hsl(45, 100%, 55%), 0 0 16px hsl(25, 100%, 50%)',
                          }}
                          animate={{
                            bottom: ['-30%', '130%'],
                          }}
                          transition={{ duration: 1.2, repeat: Infinity, ease: "linear", delay: 0.9 }}
                        />
                      </div>

                      {/* Placeholder logo */}
                      <motion.div 
                        className="relative z-10 text-center"
                        whileHover={{ scale: 1.1 }}
                      >
                        <motion.div
                          className="text-xl font-display font-bold"
                          style={{
                            background: 'linear-gradient(135deg, hsl(25, 100%, 40%), hsl(15, 100%, 35%))',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                          }}
                        >
                          {partner.initials}
                        </motion.div>
                      </motion.div>

                      {/* Rising ember particles */}
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute rounded-full opacity-0 group-hover:opacity-100"
                          style={{
                            left: `${20 + i * 15}%`,
                            bottom: '-3px',
                            width: `${2 + Math.random() * 2}px`,
                            height: `${2 + Math.random() * 2}px`,
                            background: `hsl(${30 + i * 8}, 100%, ${55 + i * 3}%)`,
                            boxShadow: `0 0 ${3 + i}px hsl(${30 + i * 8}, 100%, 50%)`,
                          }}
                          animate={{
                            y: [0, -30, -60],
                            x: [0, (i % 2 === 0 ? -1 : 1) * 8, 0],
                            opacity: [0, 1, 0],
                            scale: [0.3, 1, 0],
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.12,
                          }}
                        />
                      ))}

                      {/* Pulse ring on hover */}
                      <motion.div
                        className="absolute inset-0 rounded-xl border-2 border-orange-400/50 opacity-0 group-hover:opacity-100"
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.5, 0, 0.5],
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    </div>

                    {/* Partner name tooltip with fire styling */}
                    <motion.div
                      className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                    >
                      <span 
                        className="text-xs font-display font-medium px-3 py-1.5 rounded-full whitespace-nowrap"
                        style={{
                          background: 'linear-gradient(135deg, hsl(25, 100%, 50% / 0.2), hsl(45, 100%, 55% / 0.1))',
                          border: '1px solid hsl(25, 100%, 50% / 0.3)',
                          color: 'hsl(25, 100%, 60%)',
                        }}
                      >
                        {partner.name}
                      </span>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Become a Partner CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-4">
            Want to partner with Avishkaar Season 4?
          </p>
          <motion.button
            className="relative px-8 py-4 font-display font-bold text-foreground rounded-full overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Button fire border */}
            <motion.div
              className="absolute inset-0 rounded-full p-[2px]"
              style={{
                background: 'linear-gradient(135deg, hsl(45, 100%, 55%), hsl(25, 100%, 50%), hsl(15, 100%, 45%), hsl(45, 100%, 55%))',
                backgroundSize: '300% 300%',
              }}
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="w-full h-full bg-card rounded-full" />
            </motion.div>

            <span className="relative z-10 flex items-center gap-2">
              BECOME A PARTNER
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                🤝
              </motion.span>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;
