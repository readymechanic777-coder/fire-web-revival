import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Clock, Coffee, Code, Presentation, Trophy, PartyPopper, Users, Droplets } from "lucide-react";

const schedule = [
  {
    day: "Day 1",
    date: "January 15, 2025",
    events: [
      { time: "09:00 AM", title: "Registration & Check-in", icon: Users, desc: "Get your badges and swag" },
      { time: "10:00 AM", title: "Opening Ceremony", icon: PartyPopper, desc: "Kickoff & keynote speakers" },
      { time: "11:00 AM", title: "Hacking Begins!", icon: Code, desc: "Let the coding commence" },
      { time: "01:00 PM", title: "Lunch Break", icon: Coffee, desc: "Refuel and network" },
      { time: "06:00 PM", title: "Workshop: AI/ML", icon: Presentation, desc: "Hands-on AI session" },
      { time: "09:00 PM", title: "Dinner & Networking", icon: Coffee, desc: "Evening social" },
    ],
  },
  {
    day: "Day 2",
    date: "January 16, 2025",
    events: [
      { time: "08:00 AM", title: "Breakfast", icon: Coffee, desc: "Morning fuel-up" },
      { time: "10:00 AM", title: "Mentor Sessions", icon: Users, desc: "1-on-1 guidance" },
      { time: "01:00 PM", title: "Lunch Break", icon: Coffee, desc: "Midday recharge" },
      { time: "03:00 PM", title: "Final Sprint", icon: Code, desc: "Polish your project" },
      { time: "05:00 PM", title: "Project Submission", icon: Clock, desc: "Deadline!" },
      { time: "06:00 PM", title: "Presentations Begin", icon: Presentation, desc: "Demo your creation" },
      { time: "08:00 PM", title: "Awards Ceremony", icon: Trophy, desc: "Winners announced" },
    ],
  },
];

const TimelineEvent = ({ event, index, isLeft }) => (
  <motion.div
    initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay: index * 0.08 }}
    className={`flex items-center gap-4 md:gap-6 ${isLeft ? 'md:flex-row-reverse md:text-right' : ''}`}
  >
    {/* Event card */}
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      className="flex-1 glass-card glass-highlight rounded-xl p-4 md:p-5 group cursor-default relative overflow-hidden"
    >
      {/* Water shimmer on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 30% 50%, hsl(190, 100%, 50% / 0.08) 0%, transparent 60%),
            radial-gradient(ellipse 60% 80% at 70% 30%, hsl(175, 100%, 50% / 0.06) 0%, transparent 50%)
          `,
        }}
      />
      <div className="relative z-10">
        <div className={`flex items-center gap-3 mb-2 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300"
            style={{ background: 'linear-gradient(135deg, hsl(190, 100%, 50% / 0.2), hsl(220, 80%, 55% / 0.15))' }}
          >
            <event.icon className="w-4 h-4 text-primary" />
          </div>
          <span className="font-code text-xs text-primary/70 tracking-wider">{event.time}</span>
        </div>
        <h4 className="text-base font-display font-bold text-foreground mb-1">{event.title}</h4>
        <p className="text-xs text-muted-foreground">{event.desc}</p>
      </div>
    </motion.div>
  </motion.div>
);

const ScheduleSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const streamHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative py-20 md:py-32 overflow-hidden" id="schedule" ref={containerRef}>
      {/* Background water atmosphere */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 60% 40% at 30% 40%, hsl(190, 80%, 30% / 0.08) 0%, transparent 60%),
              radial-gradient(ellipse 50% 50% at 70% 60%, hsl(220, 60%, 30% / 0.06) 0%, transparent 50%)
            `,
          }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 glass-panel rounded-full px-4 py-1.5 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Droplets className="w-3.5 h-3.5 text-primary" />
            <span className="text-primary font-display uppercase tracking-widest text-xs">Event Timeline</span>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            <span className="text-gradient-liquid">48 HOURS OF INNOVATION</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Two days of intense coding, learning, and fun.
          </p>
        </motion.div>

        {/* Timeline for each day */}
        <div className="space-y-16">
          {schedule.map((day, dayIndex) => (
            <div key={day.day}>
              {/* Day header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-10"
              >
                <div className="inline-flex items-center gap-4 glass-panel-strong rounded-2xl px-6 py-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, hsl(190, 100%, 50% / 0.25), hsl(220, 80%, 55% / 0.2))' }}
                  >
                    <span className="text-xl font-display font-bold text-primary">{dayIndex + 1}</span>
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-display font-bold text-foreground">{day.day}</h3>
                    <p className="text-sm text-muted-foreground">{day.date}</p>
                  </div>
                </div>
              </motion.div>

              {/* Vertical timeline with water stream */}
              <div className="relative max-w-3xl mx-auto">
                {/* Central flowing water line */}
                <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px">
                  {/* Static track */}
                  <div className="absolute inset-0 w-px bg-border/30" />
                  {/* Glowing water stream */}
                  <motion.div
                    className="absolute top-0 left-0 w-px"
                    style={{
                      height: streamHeight,
                      background: 'linear-gradient(to bottom, hsl(190, 100%, 50% / 0.6), hsl(175, 100%, 50% / 0.4), hsl(220, 80%, 55% / 0.3))',
                      boxShadow: '0 0 8px hsl(190, 100%, 50% / 0.4), 0 0 20px hsl(190, 100%, 50% / 0.2)',
                    }}
                  />
                </div>

                {/* Events */}
                <div className="space-y-6">
                  {day.events.map((event, eventIndex) => {
                    const isLeft = eventIndex % 2 === 0;
                    return (
                      <div
                        key={event.title}
                        className={`relative flex items-start gap-4 md:gap-0 ${
                          isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                        }`}
                      >
                        {/* Content - takes half width on desktop */}
                        <div className={`flex-1 pl-12 md:pl-0 ${isLeft ? 'md:pr-10' : 'md:pl-10'}`}>
                          <TimelineEvent event={event} index={eventIndex} isLeft={isLeft} />
                        </div>

                        {/* Center dot */}
                        <motion.div
                          className="absolute left-5 md:left-1/2 top-4 -translate-x-1/2 z-10"
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: eventIndex * 0.08, type: "spring" }}
                        >
                          <div className="relative">
                            <div className="w-3 h-3 rounded-full bg-primary" />
                            <motion.div
                              className="absolute inset-0 rounded-full"
                              style={{ boxShadow: '0 0 12px hsl(190, 100%, 50% / 0.6)' }}
                              animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                              transition={{ duration: 2, repeat: Infinity, delay: eventIndex * 0.2 }}
                            />
                          </div>
                        </motion.div>

                        {/* Spacer for opposite side on desktop */}
                        <div className="hidden md:block flex-1" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;
