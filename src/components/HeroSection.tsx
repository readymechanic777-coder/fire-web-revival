import { motion } from "framer-motion";
import EmberParticles from "./EmberParticles";
import TypingEffect from "./TypingEffect";
import { Flame, Zap, Users } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      
      {/* Fire glow effect at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-primary/20 via-secondary/10 to-transparent" />
      
      {/* Dynamic animated background orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.7, 0.4],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-20 right-20 w-4 h-4 bg-primary/60 rotate-45"
        animate={{
          y: [0, -20, 0],
          opacity: [0.5, 1, 0.5],
          rotate: [45, 90, 45],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-32 left-20 w-6 h-6 border-2 border-secondary/60 rotate-12"
        animate={{
          y: [0, 20, 0],
          opacity: [0.5, 1, 0.5],
          rotate: [12, -12, 12],
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-3 h-3 bg-accent/60 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Ember particles */}
      <EmberParticles />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 bg-primary/20 border border-primary/50 rounded-full px-4 py-2 text-sm font-display uppercase tracking-wider text-primary">
            <Flame className="w-4 h-4" />
            48 Hours National Hackathon
            <Flame className="w-4 h-4" />
          </span>
        </motion.div>

        {/* Typing Effect for AVISHKAAR with glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4"
        >
          <TypingEffect />
        </motion.div>

        {/* Season 4 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <h2 className="text-2xl md:text-4xl font-display font-bold text-foreground tracking-[0.3em]">
            SEASON 4
          </h2>
        </motion.div>

        {/* New Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-4"
        >
          <p className="text-lg md:text-2xl font-display uppercase tracking-widest text-primary font-bold">
            The Infinite Loop of Innovation
          </p>
        </motion.div>

        {/* Sub-tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <p className="text-base md:text-lg text-muted-foreground font-display">
            48-Hour National Level Hackathon | <span className="text-primary">Dream</span> • <span className="text-accent">Code</span> • <span className="text-secondary">Disrupt</span>
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
        >
          The biggest 48-hour national hackathon where the brightest minds come together
          to build, innovate, and set the tech world on fire!
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap justify-center gap-8"
        >
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-accent" />
            <span className="font-display text-foreground">₹5,00,000+ Prizes</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-accent" />
            <span className="font-display text-foreground">500+ Innovators</span>
          </div>
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-accent" />
            <span className="font-display text-foreground">48 Hours</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center pt-2">
          <motion.div
            className="w-1.5 h-1.5 bg-primary rounded-full"
            animate={{ y: [0, 12, 0], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
