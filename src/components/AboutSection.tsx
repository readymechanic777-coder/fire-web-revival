import { motion } from "framer-motion";
import { Code, Lightbulb, Trophy, Users } from "lucide-react";

const features = [
  {
    icon: Code,
    title: "48-Hour Coding Sprint",
    description: "Non-stop innovation and development",
  },
  {
    icon: Lightbulb,
    title: "10+ Themes",
    description: "Diverse problem statements to solve",
  },
  {
    icon: Users,
    title: "Mentorship",
    description: "Guidance from industry experts",
  },
  {
    icon: Trophy,
    title: "Exciting Prizes",
    description: "Recognition and rewards for winners",
  },
];

const AboutSection = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden" id="about">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-ash to-background" />
      
      <div className="relative z-10 container mx-auto px-4">
        {/* Header with terminal style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-4 mb-4"
        >
          <span className="font-mono text-muted-foreground text-sm flex items-center gap-2">
            <span className="text-primary">{">"}</span> cat <span className="text-primary">about.md</span>
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-black text-gradient-fire tracking-wide">
            ABOUT AVISHKAAR
          </h2>
        </motion.div>

        {/* Underline */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-24 h-1 bg-muted-foreground/30 mx-auto mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Terminal-style readme card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-card border border-border rounded-xl overflow-hidden"
          >
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-background/50 border-b border-border">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <div className="w-3 h-3 rounded-full bg-secondary" />
              <div className="w-3 h-3 rounded-full bg-accent" />
              <span className="ml-2 font-mono text-sm text-muted-foreground">readme.md</span>
            </div>

            {/* Terminal content */}
            <div className="p-6 space-y-6 font-mono text-sm leading-relaxed">
              <p>
                <span className="text-primary">⚡</span>{" "}
                <span className="text-primary font-bold">Avishkaar</span> is a National Level 48-hour hackathon organized by{" "}
                <span className="text-secondary font-bold">Aditya Engineering College</span>, designed to bring together the brightest
                minds in technology and innovation.
              </p>

              <p>
                <span className="text-accent">⚡</span> Season 4 introduces{" "}
                <span className="text-primary">"The Infinite Loop of Innovation"</span> – a
                theme that celebrates continuous learning, iterative development, and
                breakthrough solutions.
              </p>

              <p className="text-muted-foreground">
                <span className="text-primary">{">"}</span> Join us for 48 hours of intense coding, networking, workshops, and the chance
                to win amazing prizes while solving real-world problems.
              </p>
            </div>
          </motion.div>

          {/* Feature cards grid */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="group"
              >
                <div className="relative h-full p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-all duration-300 hover:glow-ember text-center">
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                  
                  <div className="relative">
                    <div className="w-14 h-14 bg-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/30 transition-colors">
                      <feature.icon className="w-7 h-7 text-primary" />
                    </div>
                    
                    <h3 className="text-lg font-display font-bold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
