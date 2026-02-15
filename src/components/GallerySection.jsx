import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { fadeIn, textVariant, zoomIn } from "@/lib/motion";
import { Camera } from "lucide-react";
import WaterDroplet from "./icons/WaterDroplet";

const galleryImages = [
  { id: 1, title: "Hackathon Kickoff", size: "large" },
  { id: 2, title: "Coding Session", size: "normal" },
  { id: 3, title: "Team Collaboration", size: "normal" },
  { id: 4, title: "Mentorship Hour", size: "tall" },
  { id: 5, title: "Prize Ceremony", size: "normal" },
  { id: 6, title: "Workshop Session", size: "large" },
  { id: 7, title: "Networking Event", size: "normal" },
  { id: 8, title: "Demo Day", size: "normal" },
];

const GallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 overflow-hidden" id="gallery">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(190, 100%, 50% / 0.08), transparent 70%)' }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div variants={textVariant(0)} initial="hidden" animate={isInView ? "show" : "hidden"} className="text-center mb-16">
          <motion.h2 
            className="font-display text-3xl md:text-5xl font-black mb-4 text-gradient-liquid"
          >
            <span className="flex items-center justify-center gap-3"><WaterDroplet size={36} /> TECH FEST GALLERY <WaterDroplet size={36} /></span>
          </motion.h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Glimpses from our previous seasons</p>
          <motion.div 
            className="w-24 h-1 mx-auto rounded-full mt-6"
            style={{ background: 'linear-gradient(to right, hsl(175, 100%, 55%), hsl(190, 100%, 50%), hsl(220, 80%, 55%))' }}
            animate={{ opacity: [0.7, 1, 0.7], scaleX: [0.9, 1, 0.9] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ scale: 1.03, zIndex: 10 }}
              className={`relative overflow-hidden group cursor-pointer rounded-2xl border border-border ${
                image.size === "large" ? "col-span-2 row-span-2" :
                image.size === "tall" ? "row-span-2" : ""
              }`}
            >
              {/* Liquid gradient background */}
              <motion.div 
                className={`absolute inset-0 ${
                  index % 4 === 0 ? "bg-gradient-to-br from-cyan-500/20 via-blue-500/15 to-teal-500/20" :
                  index % 4 === 1 ? "bg-gradient-to-br from-teal-500/20 via-cyan-500/15 to-blue-500/20" :
                  index % 4 === 2 ? "bg-gradient-to-br from-blue-500/20 via-teal-500/15 to-cyan-500/20" :
                  "bg-gradient-to-br from-sky-500/20 via-cyan-500/15 to-blue-600/20"
                }`}
                animate={{ opacity: [0.5, 0.7, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
              />
              
              {/* Floating bubbles */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    left: `${20 + i * 30}%`,
                    bottom: '10%',
                    width: 4,
                    height: 4,
                    background: `radial-gradient(circle at 30% 30%, hsl(190, 100%, 80% / 0.5), transparent)`,
                    border: '1px solid hsl(190, 100%, 70% / 0.3)',
                  }}
                  animate={{ y: [-10, -60, -100], opacity: [0, 0.6, 0], scale: [0.5, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 + index * 0.1 }}
                />
              ))}
              
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'linear-gradient(hsl(var(--primary) / 0.2) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.2) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }} />
              
              <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-10 transition-opacity">
                <Camera className="w-16 h-16 text-foreground" />
              </div>
              
              <motion.div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                <div className="text-center p-4">
                  <h3 className="font-display font-bold text-foreground mb-2 text-lg">{image.title}</h3>
                  <span className="text-sm text-primary flex items-center justify-center gap-2">
                    View Gallery <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1, repeat: Infinity }}>→</motion.span>
                  </span>
                </div>
              </motion.div>

              <motion.div 
                className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2"
                style={{ borderColor: 'hsl(190, 100%, 50% / 0.5)' }}
                animate={{ borderColor: ['hsl(190, 100%, 50% / 0.3)', 'hsl(175, 100%, 55% / 0.6)', 'hsl(190, 100%, 50% / 0.3)'] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div 
                className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2"
                style={{ borderColor: 'hsl(190, 100%, 50% / 0.5)' }}
                animate={{ borderColor: ['hsl(175, 100%, 55% / 0.3)', 'hsl(190, 100%, 50% / 0.6)', 'hsl(175, 100%, 55% / 0.3)'] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />

              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ boxShadow: '0 0 20px hsl(190, 100%, 50% / 0.3), inset 0 0 20px hsl(190, 100%, 50% / 0.08)' }}
              />
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.4 }} className="text-center mt-12">
          <motion.button className="relative px-8 py-4 font-display font-bold text-foreground rounded-full overflow-hidden group" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <motion.div
              className="absolute inset-0 rounded-full p-[2px]"
              style={{ background: 'linear-gradient(135deg, hsl(175, 100%, 55%), hsl(190, 100%, 50%), hsl(220, 80%, 55%), hsl(175, 100%, 55%))', backgroundSize: '300% 300%' }}
              animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="w-full h-full bg-card rounded-full" />
            </motion.div>
            <span className="relative z-10 flex items-center gap-2">
              VIEW ALL PHOTOS
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}><WaterDroplet size={20} /></motion.span>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default GallerySection;
