import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import CountdownTimer from "./CountdownTimer";
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
      
      {/* Animated background circles */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.2, 0.4],
        }}
        transition={{ duration: 5, repeat: Infinity }}
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

        {/* Typing Effect for AVISHKAAR */}
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

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <p className="text-lg md:text-xl font-display uppercase tracking-widest">
            <span className="text-primary">[INNOVATION</span>
            <span className="text-muted-foreground"> • </span>
            <span className="text-accent">TECHNOLOGY</span>
            <span className="text-muted-foreground"> • </span>
            <span className="text-secondary">FUTURE]</span>
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
        >
          The biggest 48-hour national hackathon where the brightest minds come together
          to build, innovate, and set the tech world on fire!
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap justify-center gap-8 mb-10"
        >
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-accent" />
            <span className="font-display text-foreground">₹5,00,000+ Prizes</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-accent" />
            <span className="font-display text-foreground">500+ Hackers</span>
          </div>
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-accent" />
            <span className="font-display text-foreground">48 Hours</span>
          </div>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-10"
        >
          <p className="text-sm text-muted-foreground font-display uppercase tracking-widest mb-4">
            Event Starts In
          </p>
          <CountdownTimer />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button variant="fire" size="xl">
            <Flame className="w-5 h-5" />
            Register Now
          </Button>
          <Button variant="outline" size="xl">
            Learn More
          </Button>
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
