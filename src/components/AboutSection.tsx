import { motion } from "framer-motion";
import { Code, Lightbulb, Trophy, Clock } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "48 Hours",
    description: "Non-stop coding, creating, and innovating in an intense hackathon experience.",
  },
  {
    icon: Code,
    title: "Build Anything",
    description: "Web, Mobile, AI/ML, Blockchain - bring your wildest ideas to life.",
  },
  {
    icon: Lightbulb,
    title: "Learn & Grow",
    description: "Workshops, mentorship, and networking with industry experts.",
  },
  {
    icon: Trophy,
    title: "Win Big",
    description: "Compete for prizes worth ₹5,00,000+ and amazing opportunities.",
  },
];

const AboutSection = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden" id="about">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-ash to-background" />
      
      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-display uppercase tracking-widest text-sm mb-4 block">
            What is Ignite?
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            <span className="text-gradient-fire">FUEL YOUR PASSION</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Join the most electrifying 48-hour national hackathon where innovation meets intensity. 
            Code, collaborate, and compete with the brightest minds across the country.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative h-full p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-all duration-300 hover:glow-ember">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                
                <div className="relative">
                  <div className="w-14 h-14 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  
                  <h3 className="text-xl font-display font-bold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
