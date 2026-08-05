import { motion } from "framer-motion";
import { useRef } from "react";
import { Code, Lightbulb, Trophy, Users } from "lucide-react";
import FloatingParticles from "./FloatingParticles";
import RealisticGLBFish from "./RealisticGLBFish";

const features = [
  {
    icon: Code,
    title: "48-Hour Coding Sprint",
    description: "Non-stop innovation and development",
  },
  {
    icon: Lightbulb,
    title: "10+ Themes",
    description: "Diverse problem statements to solve",
  },
  {
    icon: Users,
    title: "Mentorship",
    description: "Guidance from industry experts",
  },
  {
    icon: Trophy,
    title: "Exciting Prizes",
    description: "Recognition and rewards for winners",
  },
];
const AboutSection = () => {
  return (<section className="relative py-20 md:py-32 overflow-hidden min-h-[50vh]" id="about">
    {/* Top gradient bleed for seamless transition from hero */}
    <div className="absolute top-0 left-0 right-0 h-40 pointer-events-none" style={{ background: 'linear-gradient(180deg, #011627 0%, transparent 100%)' }} />
    
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.1)_0%,transparent_60%)] pointer-events-none" />
    <FloatingParticles />
    <RealisticGLBFish />
    <div className="relative z-10 container mx-auto px-4">

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-4">
        <h2 className="text-3xl md:text-5xl font-display font-black text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] tracking-wide">
          ABOUT AVISHKAAR
        </h2>
      </motion.div>


      <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="w-24 h-1 bg-primary mx-auto mb-16" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="rounded-xl overflow-hidden border border-cyan-400/40 bg-slate-800/50 backdrop-blur-xl shadow-[0_0_30px_rgba(34,211,238,0.2)]">

          <div className="flex items-center gap-2 px-4 py-3 bg-slate-950 border-b border-cyan-400/30">
            <div className="w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
            <div className="w-3.5 h-3.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.9)]" />
            <div className="w-3.5 h-3.5 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.9)]" />
            <span className="ml-2 font-mono text-sm text-cyan-300 font-bold">readme.md</span>
          </div>


          <div className="p-6 space-y-6 font-mono text-base leading-relaxed text-white">
            <p className="text-slate-100">
              <span className="text-cyan-300 font-black drop-shadow-[0_0_8px_rgba(34,211,238,0.7)]">Aavishkar</span> is a 48-hour innovation marathon that challenges bright minds to turn bold ideas into real-world solutions. After two successful seasons, Aavishkar returns bigger and better — now in two phases: a 24-hour online hackathon and an on-campus 48-hour grand finale.
            </p>

            <p className="text-slate-100">
              Across themes like AI, Robotics, Sustainability, Smart Systems, and Emerging Technologies, participants from across India come together to create, collaborate, and compete. Experience hands-on mentoring, expert-led workshops, and an electrifying atmosphere of creativity and problem-solving.
            </p>

            <p className="text-cyan-100">
              <span className="text-cyan-400 font-black">{">"}</span> Join us as we push boundaries, prototype the future, and shape ideas that can make a difference. Because at Aavishkar — innovation never sleeps.
            </p>
          </div>
        </motion.div>


        <div className="grid grid-cols-2 gap-4">
          {features.map((feature, index) => (<motion.div key={feature.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }} className="group">
            <div className="relative h-full p-6 rounded-xl text-center border border-cyan-400/40 bg-slate-800/50 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/70 hover:shadow-[0_0_35px_rgba(34,211,238,0.3)]">
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />

              <div className="relative">
                <div className="w-14 h-14 bg-cyan-400/20 border border-cyan-300/50 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:bg-cyan-400/35 group-hover:scale-110 shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all duration-300">
                  <feature.icon className="w-7 h-7 text-cyan-300" />
                </div>

                <h3 className="text-lg font-display font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors drop-shadow-[0_0_4px_rgba(255,255,255,0.3)]">
                  {feature.title}
                </h3>

                <p className="text-sm text-cyan-100 font-medium leading-normal">
                  {feature.description}
                </p>
              </div>
            </div>
          </motion.div>))}
        </div>
      </div>
    </div>
  </section>);
};
export default AboutSection;
