import { motion } from "framer-motion";
import { fadeIn, textVariant, zoomIn, staggerContainer } from "@/lib/motion";
import { 
  Users, Bus, Leaf, Heart, Recycle, Zap, Plane, Lightbulb 
} from "lucide-react";

const themes = [
  { icon: Users, title: "Digital Empowerment for Rural Communities", color: "text-cyan-400", bgColor: "bg-cyan-400/20" },
  { icon: Bus, title: "Urban Mobility & Traffic Management", color: "text-sky-400", bgColor: "bg-sky-400/20" },
  { icon: Leaf, title: "Agriculture & Food Technology", color: "text-teal-400", bgColor: "bg-teal-400/20" },
  { icon: Heart, title: "Medical & Health", color: "text-blue-400", bgColor: "bg-blue-400/20" },
  { icon: Recycle, title: "Waste Management & Recycling", color: "text-emerald-400", bgColor: "bg-emerald-400/20" },
  { icon: Zap, title: "Renewable & Sustainable Energy", color: "text-indigo-400", bgColor: "bg-indigo-400/20" },
  { icon: Plane, title: "Tourism & Travel", color: "text-violet-400", bgColor: "bg-violet-400/20" },
  { icon: Lightbulb, title: "Student Innovation (Open Theme)", color: "text-cyan-300", bgColor: "bg-cyan-300/20" },
];

const ThemesSection = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden" id="themes">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
      
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div key={i} className="absolute w-1 h-1 bg-primary/20 rounded-full"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ y: [0, -30, 0], opacity: [0.1, 0.5, 0.1], scale: [1, 1.5, 1] }}
            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }} />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-4">
          <h2 className="text-3xl md:text-5xl font-display font-black text-gradient-liquid tracking-wide">Themes Breakdown – What Problems You Can Solve?</h2>
        </motion.div>

        <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="w-24 h-1 bg-primary mx-auto mb-16" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {themes.map((theme, index) => (
            <motion.div key={theme.title} initial={{ opacity: 0, y: 30, scale: 0.9 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.2 } }} className="group cursor-pointer">
              <div className="relative h-full p-8 glass-panel rounded-2xl transition-all duration-500 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/15">
                <motion.div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-secondary/8 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <motion.div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: 'inset 0 0 30px hsl(var(--primary) / 0.08)' }} />
                <div className="relative text-center">
                  <motion.div className={`w-16 h-16 ${theme.bgColor} rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}>
                    <theme.icon className={`w-8 h-8 ${theme.color}`} />
                  </motion.div>
                  <h3 className="text-lg font-display font-bold text-foreground group-hover:text-primary transition-colors duration-300">{theme.title}</h3>
                </div>
                <motion.div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent group-hover:w-3/4 transition-all duration-500 rounded-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThemesSection;
