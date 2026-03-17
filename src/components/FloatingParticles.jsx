import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const FloatingParticles = ({ count = 40 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "200px" });

    return (
        <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none">
            {isInView && [...Array(count)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        background: `hsl(${195 + Math.random() * 20}, 100%, ${50 + Math.random() * 15}%)`,
                        boxShadow: `0 0 ${4 + Math.random() * 4}px hsl(195, 100%, 50%)`,
                    }}
                    animate={{
                        y: [0, -80, -160],
                        x: [0, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 60],
                        opacity: [0, 1, 0],
                        scale: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 4 + Math.random() * 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                    }}
                />
            ))}
        </div>
    );
};

export default FloatingParticles;
