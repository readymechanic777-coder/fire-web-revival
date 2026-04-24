import React, { useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import RealisticFish from './RealisticFish';
import DeepSeaCreatures from './DeepSeaCreatures';

// CSS-based bubbles for performance — reduced count
const Bubbles = () => {
    const bubbles = useMemo(() => {
        const count = window.matchMedia('(max-width: 768px)').matches ? 10 : 18;
        return Array.from({ length: count }).map((_, i) => ({
            id: i,
            size: Math.random() * 8 + 4,
            left: Math.random() * 100,
            duration: Math.random() * 5 + 8,
            delay: Math.random() * -10,
        }));
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
            {bubbles.map((b) => (
                <div
                    key={b.id}
                    className="absolute bottom-0 rounded-full border border-cyan-400/30"
                    style={{
                        width: b.size,
                        height: b.size,
                        left: `${b.left}%`,
                        background: 'radial-gradient(circle at 30% 30%, rgba(34, 211, 238, 0.4), transparent)',
                        animation: `bubbleFloat ${b.duration}s linear ${b.delay}s infinite`,
                        willChange: 'transform, opacity'
                    }}
                />
            ))}
        </div>
    );
};

// CSS-based Light Rays
const LightRays = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-[60vh] pointer-events-none z-0 overflow-hidden opacity-30 mix-blend-screen mix-blend-color-dodge">
            <div
                className="absolute top-[-20%] left-[10%] w-[150%] h-[150%] origin-top-left"
                style={{
                    background: 'linear-gradient(170deg, rgba(34, 211, 238, 0.15) 0%, transparent 60%)',
                    clipPath: 'polygon(0 0, 100% 0, 80% 100%, 20% 100%)',
                    animation: 'raySwing 12s ease-in-out infinite alternate'
                }}
            />
            <div
                className="absolute top-[-10%] right-[10%] w-[120%] h-[140%] origin-top-right transform -scale-x-100"
                style={{
                    background: 'linear-gradient(190deg, rgba(56, 189, 248, 0.1) 0%, transparent 60%)',
                    clipPath: 'polygon(10% 0, 90% 0, 70% 100%, 30% 100%)',
                    animation: 'raySwingReverse 15s ease-in-out infinite alternate'
                }}
            />
        </div>
    );
};

// Global CSS Overrides and Keyframes injected into head
const GlobalOceanStyles = () => (
    <style>{`
        body {
            background-color: #000814 !important;
        }
        .bg-background, 
        .bg-slate-950,
        main,
        section:not(#scroll-animation),
        div[class*="bg-gradient-to-"] {
            background-color: transparent !important;
            background-image: none !important;
        }
        .bg-card {
            background-color: rgba(3, 43, 67, 0.3) !important;
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
        }
        #hero-section canvas {
            opacity: 0.5;
            mix-blend-mode: screen;
        }

        @keyframes bubbleFloat {
            0% { transform: translateY(100px) scale(0.8); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; scale: 1; }
            100% { transform: translateY(-110vh) scale(1.2); opacity: 0; }
        }
        
        @keyframes swimRightFast {
            0% { transform: translateX(-20vw); }
            100% { transform: translateX(120vw); }
        }
        @keyframes swimLeftSlow {
            0% { transform: translateX(120vw) translateY(0); }
            50% { transform: translateX(50vw) translateY(-40px); }
            100% { transform: translateX(-40vw) translateY(0); }
        }
        @keyframes swimRightSlow {
            0% { transform: translateX(-40vw) translateY(0); }
            50% { transform: translateX(50vw) translateY(30px); }
            100% { transform: translateX(120vw) translateY(0); }
        }
        @keyframes jellyfishBob {
            0% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-40px) scale(0.95); }
            100% { transform: translateY(0) scale(1); }
        }
        @keyframes raySwing {
            0% { transform: rotate(-3deg); opacity: 0.3; }
            100% { transform: rotate(3deg); opacity: 0.7; }
        }
        @keyframes raySwingReverse {
            0% { transform: rotate(2deg) scaleX(-1); opacity: 0.4; }
            100% { transform: rotate(-4deg) scaleX(-1); opacity: 0.8; }
        }
        @keyframes sandShimmer {
            0% { background-position: 0% 0%; }
            100% { background-position: 100% 100%; }
        }
    `}</style>
);

const ScrollDepthMeter = () => {
    const { scrollYProgress } = useScroll();

    const depthNumber = useTransform(scrollYProgress, [0, 1], [0, 10994]);
    const depthText = useTransform(depthNumber, (val) => Math.floor(val).toLocaleString() + 'm');
    const markerHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

    return (
        <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-[50] flex flex-col items-center gap-3 pointer-events-none">
            <div className="h-32 md:h-48 w-1.5 md:w-2 bg-slate-800/50 backdrop-blur-sm rounded-full overflow-hidden relative border border-white/5">
                <motion.div
                    className="absolute top-0 w-full bg-gradient-to-b from-cyan-300 to-cyan-600 rounded-full"
                    style={{
                        height: markerHeight,
                        boxShadow: '0 0 10px rgba(34,211,238,0.8)'
                    }}
                />
            </div>
            <div className="bg-slate-900/60 backdrop-blur-md rounded-xl px-3 py-2 border border-cyan-400/30 text-cyan-400 font-mono text-xs md:text-sm shadow-[0_0_15px_rgba(34,211,238,0.2)] text-center min-w-[70px]">
                <motion.div className="font-bold">{depthText}</motion.div>
                <div className="text-[9px] md:text-[10px] uppercase tracking-widest mt-0.5 text-cyan-400/70">Depth</div>
            </div>
        </div>
    );
};

const DeepOceanWrapper = ({ children }) => {
    return (
        <div
            className="relative min-h-screen overflow-hidden"
            style={{
                background: 'linear-gradient(180deg, #020617 0%, #032b43 25%, #011627 60%, #000814 85%, #000000 100%)'
            }}
        >
            <GlobalOceanStyles />
            <ScrollDepthMeter />
            <div className="fixed inset-0 pointer-events-none z-[5]">
                <RealisticFish />
            </div>
            <LightRays />
            <Bubbles />


            {/* Main content (sections + footer) */}
            <div className="relative z-[15]">
                {children}
            </div>
        </div>
    );
};

export default DeepOceanWrapper;
