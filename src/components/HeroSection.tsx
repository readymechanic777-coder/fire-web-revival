import { motion } from "framer-motion";
import EmberParticles from "./EmberParticles";
import TypingEffect from "./TypingEffect";
import MouseFollowParticles from "./MouseFollowParticles";
import { Flame, Zap, Users, ArrowDown, Trophy, Calendar, MapPin } from "lucide-react";
import heroFireBg from "@/assets/hero-fire-bg.mp4";
import heroFireFallback from "@/assets/hero-fire-fallback.jpg";

const HeroSection = () => {
  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero-section" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Mouse Follow Particles */}
      <MouseFollowParticles />
      {/* Video Background with Fallback Image */}
      <div className="absolute inset-0 z-0">
        {/* Fallback image that shows while video loads or if video fails */}
        <img
          src={heroFireFallback}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.5)' }}
        />
        {/* Video overlay */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
          style={{ filter: 'brightness(0.6)' }}
          poster={heroFireFallback}
        >
          <source src={heroFireBg} type="video/mp4" />
        </video>
        {/* Dark gradient overlay for better text readability */}
        <div 
          className="absolute inset-0" 
          style={{
            background: 'linear-gradient(to bottom, hsl(0, 0%, 5% / 0.6) 0%, hsl(0, 0%, 5% / 0.3) 40%, hsl(0, 0%, 5% / 0.5) 100%)',
          }}
        />
      </div>

      {/* Animated gradient background */}
      <div className="absolute inset-0 z-[1]">
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 100%, hsl(20, 100%, 15%) 0%, hsl(0, 0%, 5%) 60%)',
          }}
        />
        {/* Animated fire gradient overlay */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 120%, hsl(20, 100%, 50% / 0.3) 0%, transparent 50%)',
          }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      {/* Fire glow effect at bottom */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[500px]"
        style={{
          background: 'linear-gradient(to top, hsl(20, 100%, 50% / 0.4), hsl(0, 85%, 45% / 0.2), transparent)',
        }}
        animate={{
          opacity: [0.6, 1, 0.6],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      
      {/* Dynamic animated background orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl will-animate"
        style={{
          background: 'radial-gradient(circle, hsl(25, 100%, 50% / 0.4), transparent 70%)',
        }}
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.3, 0.7, 0.3],
          x: [0, 80, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-3xl will-animate"
        style={{
          background: 'radial-gradient(circle, hsl(0, 85%, 50% / 0.4), transparent 70%)',
        }}
        animate={{
          scale: [1.2, 0.8, 1.2],
          opacity: [0.4, 0.8, 0.4],
          x: [0, -60, 0],
          y: [0, 60, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-3xl will-animate"
        style={{
          background: 'radial-gradient(circle, hsl(45, 100%, 50% / 0.15), transparent 60%)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Floating fire particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${15 + i * 10}%`,
            bottom: '10%',
            background: `hsl(${20 + i * 5}, 100%, ${50 + i * 3}%)`,
            boxShadow: `0 0 ${10 + i * 2}px hsl(${20 + i * 5}, 100%, 50%)`,
          }}
          animate={{
            y: [0, -300 - i * 50, -500],
            x: [0, (i % 2 === 0 ? 30 : -30), (i % 2 === 0 ? -20 : 20)],
            opacity: [0, 1, 0],
            scale: [0.5, 1.5, 0],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Ember particles */}
      <EmberParticles />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="mb-8"
        >
          <motion.span 
            className="inline-flex items-center gap-3 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 border border-primary/50 rounded-full px-6 py-3 text-sm md:text-base font-display uppercase tracking-wider text-primary backdrop-blur-sm"
            animate={{
              boxShadow: [
                '0 0 20px hsl(20, 100%, 50% / 0.3)',
                '0 0 40px hsl(20, 100%, 50% / 0.5)',
                '0 0 20px hsl(20, 100%, 50% / 0.3)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.span
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Flame className="w-5 h-5" />
            </motion.span>
            48 Hours National Hackathon
            <motion.span
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Flame className="w-5 h-5" />
            </motion.span>
          </motion.span>
        </motion.div>

        {/* Typing Effect for AVISHKAAR with glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, type: "spring" }}
          className="mb-6"
        >
          <TypingEffect />
        </motion.div>

        {/* Season 4 with animated underline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8 relative inline-block"
        >
          <motion.h2 
            className="text-3xl md:text-5xl font-display font-black tracking-[0.4em] text-transparent bg-clip-text"
            style={{
              background: 'linear-gradient(180deg, hsl(0, 0%, 100%) 0%, hsl(30, 100%, 90%) 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
            }}
          >
            SEASON 4
          </motion.h2>
          <motion.div
            className="absolute -bottom-2 left-0 right-0 h-1 rounded-full"
            style={{
              background: 'linear-gradient(90deg, transparent, hsl(20, 100%, 50%), hsl(45, 100%, 55%), hsl(20, 100%, 50%), transparent)',
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          />
        </motion.div>

        {/* Tagline with fire animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6"
        >
          <motion.p 
            className="text-xl md:text-3xl font-display uppercase tracking-widest font-bold"
            style={{
              background: 'linear-gradient(135deg, hsl(45, 100%, 60%), hsl(20, 100%, 55%), hsl(0, 85%, 50%))',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
            animate={{
              textShadow: [
                '0 0 20px hsl(20, 100%, 50% / 0.5)',
                '0 0 40px hsl(20, 100%, 50% / 0.8)',
                '0 0 20px hsl(20, 100%, 50% / 0.5)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            The Infinite Loop of Innovation
          </motion.p>
        </motion.div>

        {/* Sub-tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <p className="text-lg md:text-xl text-muted-foreground font-display">
            <motion.span 
              className="text-primary font-bold"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Dream
            </motion.span>
            {" • "}
            <motion.span 
              className="text-accent font-bold"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
            >
              Code
            </motion.span>
            {" • "}
            <motion.span 
              className="text-secondary font-bold"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
            >
              Disrupt
            </motion.span>
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-12"
        >
          <motion.a
            href="https://unstop.com/o/3C4O1aP?lb=O4B2h3r"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center gap-3 px-10 py-5 font-display font-bold text-lg md:text-xl rounded-full overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Animated gradient background */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(135deg, hsl(20, 100%, 50%), hsl(0, 85%, 50%), hsl(45, 100%, 55%), hsl(20, 100%, 50%))',
                backgroundSize: '300% 300%',
              }}
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                boxShadow: '0 0 40px hsl(20, 100%, 50% / 0.6), 0 0 80px hsl(0, 85%, 50% / 0.4)',
              }}
            />
            
            <span className="relative z-10 text-white">Register Now</span>
            <motion.span
              className="relative z-10"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Flame className="w-6 h-6 text-white" />
            </motion.span>
          </motion.a>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {[
            { icon: Trophy, label: 'Prize Pool', value: '₹5L+', color: 'from-yellow-500 to-orange-500' },
            { icon: Users, label: 'Innovators', value: '500+', color: 'from-orange-500 to-red-500' },
            { icon: Calendar, label: 'Duration', value: '48 Hrs', color: 'from-red-500 to-pink-500' },
            { icon: MapPin, label: 'Venue', value: 'AITAM', color: 'from-pink-500 to-purple-500' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative group"
            >
              <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl p-4 text-center hover:border-primary/50 transition-all duration-300">
                <motion.div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: 'radial-gradient(circle at center, hsl(20, 100%, 50% / 0.1), transparent 70%)',
                  }}
                />
                <stat.icon className={`w-6 h-6 mx-auto mb-2 text-primary`} />
                <p className={`text-2xl md:text-3xl font-display font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground font-display uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        whileHover={{ scale: 1.1 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground font-display uppercase tracking-widest">Scroll</span>
          <motion.div
            className="w-8 h-12 border-2 border-primary/50 rounded-full flex justify-center pt-2 hover:border-primary transition-colors"
          >
            <motion.div
              className="w-2 h-2 bg-primary rounded-full"
              animate={{ y: [0, 16, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </motion.button>

      {/* Side decorative lines */}
      <motion.div
        className="absolute left-8 top-1/4 bottom-1/4 w-px hidden lg:block"
        style={{
          background: 'linear-gradient(to bottom, transparent, hsl(20, 100%, 50% / 0.5), transparent)',
        }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 1, duration: 1 }}
      />
      <motion.div
        className="absolute right-8 top-1/4 bottom-1/4 w-px hidden lg:block"
        style={{
          background: 'linear-gradient(to bottom, transparent, hsl(20, 100%, 50% / 0.5), transparent)',
        }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 1, duration: 1 }}
      />
    </section>
  );
};

export default HeroSection;
