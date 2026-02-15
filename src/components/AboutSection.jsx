import { motion } from "framer-motion";
import { fadeIn, textVariant, zoomIn } from "@/lib/motion";
import { Code, Lightbulb, Trophy, Users, Droplets } from "lucide-react";

const features = [
  { icon: Code, title: "48-Hour Coding Sprint", description: "Non-stop innovation and development" },
  { icon: Lightbulb, title: "10+ Themes", description: "Diverse problem statements to solve" },
  { icon: Users, title: "Mentorship", description: "Guidance from industry experts" },
  { icon: Trophy, title: "Exciting Prizes", description: "Recognition and rewards for winners" },
];

const AboutSection = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden" id="about">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-deep to-background" />
      
      <div className="relative z-10 container mx-auto px-4">
        <motion.div variants={textVariant(0)} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-4">
          <h2 className="text-3xl md:text-5xl font-display font-black text-gradient-liquid tracking-wide">ABOUT AVISHKAAR</h2>
        </motion.div>

        <motion.div variants={fadeIn("up", "spring", 0.2, 0.6)} initial="hidden" whileInView="show" viewport={{ once: true }} className="w-24 h-1 bg-primary mx-auto mb-16" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div variants={fadeIn("left", "spring", 0.3, 0.6)} initial="hidden" whileInView="show" viewport={{ once: true }} className="glass-panel rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 bg-background/50 border-b border-border">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <div className="w-3 h-3 rounded-full bg-secondary" />
              <div className="w-3 h-3 rounded-full bg-accent" />
              <span className="ml-2 font-mono text-sm text-muted-foreground">readme.md</span>
            </div>
            <div className="p-6 space-y-6 font-mono text-sm leading-relaxed">
              <p className="flex items-start gap-2"><span className="mt-1 shrink-0"><Droplets className="w-4 h-4 text-primary" /></span> <span><span className="text-primary font-bold">Avishkaar</span> is a National Level 48-hour hackathon organized by <span className="text-secondary font-bold">Aditya Engineering College</span>, designed to bring together the brightest minds in technology and innovation.</span></p>
              <p className="flex items-start gap-2"><span className="mt-1 shrink-0"><Droplets className="w-4 h-4 text-accent" /></span> <span>Season 4 introduces <span className="text-primary">"The Infinite Loop of Innovation"</span> – a theme that celebrates continuous learning, iterative development, and breakthrough solutions.</span></p>
              <p className="text-muted-foreground"><span className="text-primary">{">"}</span> Join us for 48 hours of intense coding, networking, workshops, and the chance to win amazing prizes while solving real-world problems.</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <motion.div key={feature.title} variants={zoomIn(0.3 + index * 0.1, 0.5)} initial="hidden" whileInView="show" viewport={{ once: true }} className="group">
                <div className="relative h-full p-6 glass-panel rounded-xl hover:border-primary/40 transition-all duration-300 text-center">
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                  <div className="relative">
                    <div className="w-14 h-14 bg-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/30 transition-colors">
                      <feature.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-display font-bold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
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
