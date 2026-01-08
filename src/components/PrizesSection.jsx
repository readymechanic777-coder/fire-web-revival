import { motion } from "framer-motion";
import { fadeIn, textVariant, zoomIn } from "@/lib/motion";
import { Trophy, Medal, Award, Gift } from "lucide-react";

const prizes = [
  {
    icon: Trophy,
    place: "1st Place",
    amount: "₹2,00,000",
    perks: ["Cash Prize", "Internship Opportunities", "Swag Kit", "Cloud Credits"],
    gradient: "from-accent via-primary to-secondary",
    glow: "glow-fire",
  },
  {
    icon: Medal,
    place: "2nd Place",
    amount: "₹1,50,000",
    perks: ["Cash Prize", "Mentorship Session", "Swag Kit", "Cloud Credits"],
    gradient: "from-muted-foreground via-foreground to-muted-foreground",
    glow: "glow-ember",
  },
  {
    icon: Award,
    place: "3rd Place",
    amount: "₹1,00,000",
    perks: ["Cash Prize", "Swag Kit", "Cloud Credits"],
    gradient: "from-ember via-primary to-ember",
    glow: "glow-ember",
  },
];

const specialPrizes = [
  { title: "Best UI/UX", amount: "₹25,000" },
  { title: "Best AI/ML Project", amount: "₹25,000" },
  { title: "People's Choice", amount: "₹25,000" },
  { title: "Best First-Timer", amount: "₹25,000" },
];

const PrizesSection = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden" id="prizes">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-display uppercase tracking-widest text-sm mb-4 block">
            What's at Stake
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            <span className="text-gradient-fire">PRIZES WORTH ₹5,00,000+</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Compete for glory and amazing rewards. Every participant gets goodies!
          </p>
        </motion.div>

        {/* Main Prizes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {prizes.map((prize, index) => (
            <motion.div
              key={prize.place}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className={`relative ${index === 0 ? "md:-mt-8" : ""}`}
            >
              <div className={`relative h-full p-8 bg-card border-2 border-primary/30 rounded-2xl ${prize.glow} hover:scale-105 transition-transform duration-300`}>
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-b ${prize.gradient} opacity-5 rounded-2xl`} />
                
                <div className="relative text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/20 rounded-full mb-4">
                    <prize.icon className="w-10 h-10 text-primary" />
                  </div>
                  
                  <h3 className="text-xl font-display font-bold text-foreground mb-2">
                    {prize.place}
                  </h3>
                  
                  <p className="text-4xl md:text-5xl font-display font-black text-gradient-fire mb-6">
                    {prize.amount}
                  </p>
                  
                  <ul className="space-y-2">
                    {prize.perks.map((perk) => (
                      <li key={perk} className="text-muted-foreground flex items-center justify-center gap-2">
                        <Gift className="w-4 h-4 text-primary" />
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Special Prizes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {specialPrizes.map((prize, index) => (
            <motion.div
              key={prize.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="p-4 bg-card border border-border rounded-xl text-center hover:border-primary/50 transition-colors"
            >
              <p className="text-sm text-muted-foreground font-display uppercase tracking-wider mb-1">
                {prize.title}
              </p>
              <p className="text-xl font-display font-bold text-primary">
                {prize.amount}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PrizesSection;
