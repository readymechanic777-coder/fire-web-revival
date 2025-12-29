import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Indian language translations for AVISHKAAR
const translations = [
  { text: "ആവിഷ്കാർ", lang: "Malayalam" },
  { text: "AVISHKAAR", lang: "English" },
  { text: "आविष्कार", lang: "Hindi" },
  { text: "ஆவிஷ்கார்", lang: "Tamil" },
  { text: "ఆవిష్కార్", lang: "Telugu" },
  { text: "আবিষ্কার", lang: "Bengali" },
  { text: "ಆವಿಷ್ಕಾರ್", lang: "Kannada" },
  { text: "આવિષ્કાર", lang: "Gujarati" },
  { text: "ਆਵਿਸ਼ਕਾਰ", lang: "Punjabi" },
  { text: "ଆଭିଷ୍କାର", lang: "Odia" },
  { text: "आविष्कार", lang: "Marathi" },
];

const WelcomeSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % translations.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden" id="welcome">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />

      {/* Animated background glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(25, 100%, 50% / 0.15), transparent 60%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* Floating embers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `hsl(${25 + Math.random() * 20}, 100%, ${50 + Math.random() * 15}%)`,
              boxShadow: `0 0 ${4 + Math.random() * 4}px hsl(25, 100%, 50%)`,
            }}
            animate={{
              y: [0, -80, -160],
              x: [0, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 60],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <motion.h2
            className="text-3xl md:text-5xl font-display font-black italic mb-8"
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
            Welcome to Avishkaar Season 4
          </motion.h2>
        </motion.div>

        {/* Animated Language Text */}
        <div className="relative min-h-[120px] md:min-h-[180px] flex items-center justify-center mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="text-center"
            >
              <motion.span
                className="text-5xl md:text-7xl lg:text-9xl font-display font-black block"
                style={{
                  background: 'linear-gradient(135deg, hsl(300, 100%, 70%), hsl(280, 100%, 65%), hsl(320, 100%, 75%))',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  textShadow: '0 0 40px hsl(300, 100%, 50% / 0.5)',
                }}
                animate={{
                  filter: [
                    'drop-shadow(0 0 20px hsl(300, 100%, 60% / 0.8)) drop-shadow(0 0 40px hsl(180, 100%, 50% / 0.4))',
                    'drop-shadow(0 0 30px hsl(280, 100%, 65% / 0.9)) drop-shadow(0 0 60px hsl(200, 100%, 55% / 0.5))',
                    'drop-shadow(0 0 20px hsl(300, 100%, 60% / 0.8)) drop-shadow(0 0 40px hsl(180, 100%, 50% / 0.4))',
                  ]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {translations[currentIndex].text}
              </motion.span>
              
              {/* Language indicator */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                className="text-sm text-muted-foreground mt-4 block font-display"
              >
                — {translations[currentIndex].lang} —
              </motion.span>
            </motion.div>
          </AnimatePresence>

          {/* Typing cursor */}
          <motion.div
            className="absolute right-[10%] md:right-[20%] top-1/2 -translate-y-1/2 w-1 h-16 md:h-24"
            style={{
              background: 'linear-gradient(to bottom, hsl(180, 100%, 50%), hsl(200, 100%, 55%))',
              boxShadow: '0 0 10px hsl(180, 100%, 50%)',
            }}
            animate={{
              opacity: [1, 0, 1],
            }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        </div>

        {/* Welcome Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="max-w-4xl mx-auto text-center"
        >
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Welcome to the Official Website of Avishkaar Season 4 — a high-energy arena where innovation meets impact. 
            Step into an immersive hackathon experience that celebrates creativity, teamwork, and cutting-edge technology. 
            From AI and web to AR/VR, IoT, and sustainability, Avishkaar brings together brilliant minds to prototype bold ideas, 
            build real solutions, and present them to mentors and industry leaders. Join us for 48 hours of focused problem-solving, 
            lightning workshops, deep-dive mentoring, and live demos — where every commit pushes the future forward and every project 
            can spark change.
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <motion.button
            className="relative px-10 py-5 font-display font-bold text-lg text-foreground rounded-full overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open('https://unstop.com/o/3C4O1aP?lb=O4B2h3r', '_blank')}
          >
            {/* Animated fire border */}
            <motion.div
              className="absolute inset-0 rounded-full p-[3px]"
              style={{
                background: 'linear-gradient(135deg, hsl(45, 100%, 55%), hsl(25, 100%, 50%), hsl(15, 100%, 45%), hsl(300, 100%, 60%), hsl(45, 100%, 55%))',
                backgroundSize: '400% 400%',
              }}
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="w-full h-full bg-card rounded-full" />
            </motion.div>

            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                boxShadow: '0 0 30px hsl(25, 100%, 50% / 0.5), 0 0 60px hsl(300, 100%, 60% / 0.3)',
              }}
            />

            <span className="relative z-10 flex items-center gap-3">
              JOIN THE INNOVATION
              <motion.span
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
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

export default WelcomeSection;
