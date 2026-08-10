import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const FloatingRegisterButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleRegisterClick = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('hackathon-register');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('hackathon-register');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div 
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 200, damping: 20 }}
      className="fixed bottom-6 right-6 z-[100]"
    >
      <div className="relative group cursor-pointer" onClick={handleRegisterClick}>
        {/* Animated Background Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 rounded-full blur-md opacity-75 group-hover:opacity-100 animate-pulse transition duration-1000 group-hover:duration-200"></div>
        
        {/* Button Content */}
        <a 
          href="#hackathon-register"
          onClick={handleRegisterClick}
          className="relative flex items-center justify-center px-5 py-2.5 text-xs md:px-8 md:py-3.5 md:text-base font-display font-black text-white tracking-[0.2em] uppercase rounded-full bg-slate-950 border-2 border-cyan-400/50 hover:border-cyan-300 transition-colors"
        >
          {/* Inner glass effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
          
          <span className="relative z-10 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)] group-hover:drop-shadow-[0_0_10px_rgba(34,211,238,1)] transition-all">
            REGISTER NOW
          </span>
        </a>
      </div>
    </motion.div>
  );
};

export default FloatingRegisterButton;
