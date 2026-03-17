import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Camera } from "lucide-react";
import FloatingParticles from "./FloatingParticles";
// Placeholder gallery images with different sizes
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
  return (<section ref={ref} className="relative py-24 overflow-hidden min-h-[50vh]" id="gallery">

    <FloatingParticles count={40} />

    <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none" style={{
      background: 'radial-gradient(circle, hsl(195, 100%, 50% / 0.1), transparent 70%)',
    }} animate={{
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.5, 0.3],
    }} transition={{ duration: 5, repeat: Infinity }} />

    <div className="container mx-auto px-4 relative z-10">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16">
        <motion.h2 className="font-display text-3xl md:text-5xl font-black mb-4 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
          TECH FEST GALLERY
        </motion.h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Glimpses from our previous seasons
        </p>
        <motion.div className="w-24 h-1 mx-auto rounded-full mt-6 bg-gradient-water" animate={{
          opacity: [0.7, 1, 0.7],
          scaleX: [0.9, 1, 0.9],
        }} transition={{ duration: 2, repeat: Infinity }} />
      </motion.div>


      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
        {galleryImages.map((image, index) => (<motion.div key={image.id} initial={{ opacity: 0, scale: 0.9 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5, delay: index * 0.08 }} whileHover={{ scale: 1.03, zIndex: 10 }} className={`relative overflow-hidden group cursor-pointer rounded-2xl border border-border ${image.size === "large" ? "col-span-2 row-span-2" :
          image.size === "tall" ? "row-span-2" : ""}`}>

          <motion.div className={`absolute inset-0 ${index % 4 === 0 ? "bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/30" :
            index % 4 === 1 ? "bg-gradient-to-br from-accent/30 via-primary/20 to-secondary/30" :
              index % 4 === 2 ? "bg-gradient-to-br from-secondary/30 via-accent/20 to-primary/30" :
                "bg-gradient-to-br from-water-cyan/30 via-water-blue/20 to-water-teal/30"}`} animate={{
                  opacity: [0.6, 0.8, 0.6],
                }} transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }} />


          {[...Array(3)].map((_, i) => (<motion.div key={i} className="absolute w-2 h-2 rounded-full bg-primary/60" style={{
            left: `${20 + i * 30}%`,
            bottom: '10%',
          }} animate={{
            y: [-10, -60, -100],
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
          }} transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.5 + index * 0.1,
          }} />))}


          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }} />


          <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-10 transition-opacity">
            <Camera className="w-16 h-16 text-foreground" />
          </div>


          <motion.div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center" whileHover={{
            background: 'linear-gradient(135deg, hsl(195, 100%, 50% / 0.1), hsl(175, 100%, 45% / 0.1))',
          }}>
            <div className="text-center p-4">
              <motion.h3 className="font-display font-bold text-foreground mb-2 text-lg" initial={{ y: 10 }} whileInView={{ y: 0 }}>
                {image.title}
              </motion.h3>
              <span className="text-sm text-primary flex items-center justify-center gap-2">
                View Gallery
                <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1, repeat: Infinity }}>
                  →
                </motion.span>
              </span>
            </div>
          </motion.div>


          <motion.div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-primary/60" animate={{
            borderColor: ['hsl(195, 100%, 50% / 0.4)', 'hsl(175, 100%, 45% / 0.8)', 'hsl(195, 100%, 50% / 0.4)'],
          }} transition={{ duration: 2, repeat: Infinity }} />
          <motion.div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-primary/60" animate={{
            borderColor: ['hsl(175, 100%, 45% / 0.4)', 'hsl(195, 100%, 50% / 0.8)', 'hsl(175, 100%, 45% / 0.4)'],
          }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />


          <motion.div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
            boxShadow: '0 0 20px hsl(195, 100%, 50% / 0.4), inset 0 0 20px hsl(195, 100%, 50% / 0.1)',
          }} />
        </motion.div>))}
      </div>


      <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.4 }} className="text-center mt-12">
        <motion.button className="btn-ocean neon-border font-display font-bold text-lg px-8 py-4" aria-label="View All Photos" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <span className="relative z-10 flex items-center gap-2">
            VIEW ALL PHOTOS
          </span>
        </motion.button>
      </motion.div>
    </div>
  </section>);
};
export default GallerySection;
