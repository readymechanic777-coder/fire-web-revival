import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Flame, ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Fire gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 via-primary/30 to-secondary/20" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      
      {/* Animated glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Flame className="w-16 h-16 text-primary mx-auto mb-6 animate-flicker" />
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black mb-6">
            <span className="text-foreground">READY TO </span>
            <span className="text-gradient-fire">IGNITE?</span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Don't miss your chance to be part of the most electrifying hackathon of the year. 
            Limited spots available - register now!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="fire" size="xl" className="group">
              <Flame className="w-5 h-5" />
              Register Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="xl">
              Contact Us
            </Button>
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            Registration closes on January 10, 2025. No participation fee!
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
