import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const TeamCard = ({ member }) => {
  const ref = useRef(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="relative w-full aspect-[3/4] rounded-2xl group cursor-pointer"
    >
      {/* Background aura */}
      <motion.div
        className="absolute -inset-4 bg-gradient-to-r from-cyan-500/30 to-purple-600/30 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          x: useTransform(mouseXSpring, [-0.5, 0.5], ["-10%", "10%"]),
          y: useTransform(mouseYSpring, [-0.5, 0.5], ["-10%", "10%"]),
        }}
      />

      {/* Main Card Content */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md border border-cyan-500/20 rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(34,211,238,0.05)] transition-shadow duration-500 group-hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]"
        style={{ transformStyle: "preserve-3d" }}
      >
        
        {/* SVG Border Beam */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-30 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
          <rect width="100%" height="100%" rx="16" fill="none" stroke="url(#beam-gradient)" strokeWidth="3" strokeDasharray="150 1500">
            <animate attributeName="stroke-dashoffset" from="1650" to="0" dur="4s" repeatCount="indefinite" />
          </rect>
          <defs>
            <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="1" />
              <stop offset="50%" stopColor="#a855f7" stopOpacity="1" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Dynamic Glare */}
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none rounded-2xl mix-blend-overlay"
          style={{
            background: useTransform(
              () =>
                `radial-gradient(circle at ${(x.get() + 0.5) * 100}% ${(y.get() + 0.5) * 100}%, rgba(255,255,255,0.4) 0%, transparent 60%)`
            ),
          }}
        />

        {/* Parallax Image Placeholder */}
        <motion.div 
          className="absolute inset-0 w-full h-full bg-gradient-to-b from-cyan-950/40 to-slate-950/90"
          style={{ transform: "translateZ(0px)" }}
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=400&q=80')] bg-cover bg-center opacity-10 grayscale-[50%] mix-blend-screen group-hover:opacity-30 group-hover:grayscale-0 transition-all duration-700" />
        </motion.div>

        {/* Text Container with Parallax Z-translation */}
        <motion.div 
          className="absolute bottom-0 left-0 w-full p-4 flex flex-col justify-end items-center text-center z-40 h-40 bg-gradient-to-t from-slate-950/90 via-slate-950/70 to-transparent"
          style={{ transform: "translateZ(40px)" }} // Pop out 3D effect
        >
          {/* Role Label */}
          <div className="mb-3 px-4 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 text-[10px] md:text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(34,211,238,0.2)] backdrop-blur-md">
            {member.role}
          </div>
          
          <h3 className="text-base md:text-xl font-display font-black text-white mb-1 leading-tight group-hover:text-cyan-300 transition-colors drop-shadow-[0_0_6px_rgba(0,0,0,0.8)] line-clamp-2">
            {member.name}
          </h3>
          <p className="text-cyan-400/80 font-mono text-xs md:text-sm font-bold tracking-widest drop-shadow-[0_0_6px_rgba(0,0,0,0.8)]">
            {member.dept}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TeamCard;
