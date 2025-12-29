import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

// Placeholder sponsors - replace with actual sponsor logos
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

  return (
    <section ref={ref} className="relative py-24 overflow-hidden" id="sponsors">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
      
      {/* Animated fire glow */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, hsl(25, 100%, 50% / 0.15), transparent 70%)',
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

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
            🔥 OUR SPONSORS 🔥
          </motion.h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Backed by industry leaders who believe in innovation
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

        {/* Sponsors Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={sponsor.name}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{ 
                scale: 1.08, 
                y: -5,
                boxShadow: '0 20px 40px -15px hsl(25, 100%, 50% / 0.3)',
              }}
              className="group relative"
            >
              <div className="relative bg-white rounded-xl h-24 flex items-center justify-center p-4 overflow-hidden transition-all duration-300">
                {/* Animated border on hover */}
                <motion.div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, hsl(25, 100%, 50% / 0.3), transparent, hsl(45, 100%, 55% / 0.3))',
                  }}
                />
                
                {/* Placeholder logo - replace with actual images */}
                <div className="relative z-10 text-center">
                  <div 
                    className="text-2xl font-display font-bold"
                    style={{
                      background: 'linear-gradient(135deg, hsl(25, 100%, 40%), hsl(15, 100%, 35%))',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                    }}
                  >
                    {sponsor.initials}
                  </div>
                  <p className="text-xs text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {sponsor.name}
                  </p>
                </div>

                {/* Fire particles on hover */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-orange-400 opacity-0 group-hover:opacity-100"
                    style={{
                      left: `${30 + i * 20}%`,
                      bottom: '0',
                    }}
                    animate={{
                      y: [0, -30, -50],
                      opacity: [0, 1, 0],
                      scale: [0.5, 1, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Become a Sponsor CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-4">
            Interested in sponsoring Avishkaar Season 4?
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
              BECOME A SPONSOR
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                🔥
              </motion.span>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default SponsorsSection;
