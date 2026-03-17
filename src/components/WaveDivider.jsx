import { motion } from "framer-motion";
const WaveDivider = ({ variant = "bottom", className = "" }) => {
    const isTop = variant === "top";
    return (<div className={`absolute ${isTop ? "top-0 rotate-180" : "bottom-0"} left-0 w-full overflow-hidden leading-none ${className}`}>
      <svg className="relative block w-full h-16 md:h-24" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <motion.path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" className="fill-primary/10" initial={{ opacity: 0, translateX: -50 }} animate={{ opacity: 1, translateX: [0, 40, -40, 0], translateY: [0, -6, 4, 0] }} transition={{ opacity: { duration: 2 }, translateX: { duration: 4, repeat: Infinity, ease: "easeInOut" }, translateY: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}/>
        <motion.path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" className="fill-primary/5" initial={{ opacity: 0, translateX: 40 }} animate={{ opacity: 1, translateX: [0, -50, 50, 0], translateY: [0, 5, -5, 0] }} transition={{ opacity: { duration: 2.5, delay: 0.3 }, translateX: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }, translateY: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.3 } }}/>
        <motion.path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-accent/5" initial={{ opacity: 0, translateX: -30 }} animate={{ opacity: 1, translateX: [0, 30, -30, 0], translateY: [0, -4, 6, 0] }} transition={{ opacity: { duration: 3, delay: 0.6 }, translateX: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }, translateY: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.8 } }}/>
      </svg>
      
      
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (<motion.div key={i} className="absolute w-4 h-4 rounded-full bg-primary/30" style={{
                left: `${20 + i * 30}%`,
                top: "50%",
            }} animate={{
                scale: [1, 2.5, 1],
                opacity: [0.6, 0, 0.6],
            }} transition={{
                duration: 3,
                delay: i * 0.8,
                repeat: Infinity,
                ease: "easeInOut",
            }}/>))}
      </div>
    </div>);
};
export default WaveDivider;
