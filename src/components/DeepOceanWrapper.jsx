import React, { useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// SVG Assets for Marine Life (Glowing Silhouettes style)
const JellyfishSVG = ({ className }) => (
    <svg viewBox="0 0 100 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 10C30 10 15 25 10 45C10 50 12 55 15 55C18 55 20 50 25 50C30 50 32 55 35 55C38 55 40 50 45 50C50 50 52 55 55 55C58 55 60 50 65 50C70 50 72 55 75 55C78 55 80 50 85 50C90 50 90 45 90 45C85 25 70 10 50 10Z" fill="url(#jelly-glow)" fillOpacity="0.4" />
        <path d="M50 10C30 10 15 25 10 45C10 50 12 55 15 55C18 55 20 50 25 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M75 55C78 55 80 50 85 50C90 50 90 45 90 45C85 25 70 10 50 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M20 55 C20 80, 10 100, 15 110" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M40 55 C40 85, 30 105, 35 115" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M60 55 C60 90, 70 100, 65 115" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M80 55 C80 80, 90 95, 85 105" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <defs>
            <radialGradient id="jelly-glow" cx="50" cy="30" r="40" gradientUnits="userSpaceOnUse">
                <stop stopColor="currentColor" stopOpacity="0.8" />
                <stop offset="1" stopColor="currentColor" stopOpacity="0" />
            </radialGradient>
        </defs>
    </svg>
);

const MantaRaySVG = ({ className }) => (
    <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M60 20 C70 10, 80 15, 85 20 C100 35, 115 50, 115 60 C115 65, 100 65, 85 55 C70 50, 65 60, 60 70 C55 60, 50 50, 35 55 C20 65, 5 65, 5 60 C5 50, 20 35, 35 20 C40 15, 50 10, 60 20 Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M55 70 L55 90 L60 100 L65 90 L65 70" fill="currentColor" fillOpacity="0.3" />
        <circle cx="50" cy="30" r="2" fill="currentColor" />
        <circle cx="70" cy="30" r="2" fill="currentColor" />
    </svg>
);

const SharkSVG = ({ className }) => (
    <svg viewBox="0 0 140 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 30 C30 10, 60 15, 80 20 C100 25, 120 20, 130 15 L125 35 L135 50 C120 40, 100 45, 80 45 C60 45, 30 50, 10 30 Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M60 20 L50 5 L65 15" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1" />
        <path d="M70 45 L60 55 L75 45" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1" />
        <circle cx="25" cy="27" r="1.5" fill="currentColor" />
    </svg>
);

const SmallFishSVG = ({ className }) => (
    <svg viewBox="0 0 40 20" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 10 C15 0, 25 0, 30 10 C25 20, 15 20, 5 10 Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1" />
        <path d="M30 10 L38 5 L35 10 L38 15 Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1" />
    </svg>
);

// CSS-based bubbles for performance
const Bubbles = () => {
    const bubbles = useMemo(() => {
        return Array.from({ length: 30 }).map((_, i) => ({
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
                        animation: `bubbleFloat ${b.duration}s linear ${b.delay}s infinite`
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
            <LightRays />
            <Bubbles />

            {/* Scroll-based elements - Absolute positioned throughout the page depth */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-[5]">

                {/* Surface level / Shallow - Small Fish */}
                <div className="absolute top-[8%] left-0 w-full"
                    style={{ animation: 'swimRightFast 25s linear infinite' }}
                >
                    <div className="flex gap-4 absolute left-0 top-0">
                        <SmallFishSVG className="w-8 h-4 text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                        <SmallFishSVG className="w-6 h-3 text-cyan-400 mt-2 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]" />
                        <SmallFishSVG className="w-7 h-3 text-sky-300 -mt-1 drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
                    </div>
                </div>

                {/* Medium Depth - Manta Ray */}
                <div className="absolute top-[25%] left-0 w-full"
                    style={{ animation: 'swimLeftSlow 45s ease-in-out infinite' }}
                >
                    <MantaRaySVG className="w-64 h-64 text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.4)] opacity-60 absolute left-0" />
                </div>

                {/* Medium-Deep - Shark */}
                <div className="absolute top-[48%] left-0 w-full"
                    style={{ animation: 'swimRightSlow 50s ease-in-out infinite 5s' }}
                >
                    <SharkSVG className="w-56 h-32 text-slate-400 drop-shadow-[0_0_20px_rgba(148,163,184,0.3)] opacity-40 absolute left-0" />
                </div>

                {/* Deep Depth - Glowing Jellyfish */}
                <div className="absolute top-[72%] right-[15%]"
                    style={{ animation: 'jellyfishBob 12s ease-in-out infinite' }}
                >
                    <JellyfishSVG className="w-48 h-48 text-purple-400 drop-shadow-[0_0_25px_rgba(168,85,247,0.7)] opacity-80" />
                </div>

                <div className="absolute top-[85%] left-[20%]"
                    style={{ animation: 'jellyfishBob 15s ease-in-out infinite 2s' }}
                >
                    <JellyfishSVG className="w-32 h-32 text-pink-400 drop-shadow-[0_0_25px_rgba(236,72,153,0.7)] opacity-80" />
                </div>

                <div className="absolute top-[96%] left-[60%]"
                    style={{ animation: 'jellyfishBob 18s ease-in-out infinite 5s' }}
                >
                    <JellyfishSVG className="w-24 h-24 text-cyan-400 drop-shadow-[0_0_25px_rgba(34,211,238,0.7)] opacity-80" />
                </div>
            </div>

            {/* Main content (sections + footer) */}
            <div className="relative z-[15]">
                {children}
            </div>
        </div>
    );
};

export default DeepOceanWrapper;
