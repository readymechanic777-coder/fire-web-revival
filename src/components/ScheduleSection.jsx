import { motion } from "framer-motion";
import { fadeIn, textVariant, staggerContainer } from "@/lib/motion";
import { Clock, Coffee, Code, Presentation, Trophy, PartyPopper, Users } from "lucide-react";

const schedule = [
  {
    day: "Day 1",
    date: "January 15, 2025",
    events: [
      { time: "09:00 AM", title: "Registration & Check-in", icon: Users },
      { time: "10:00 AM", title: "Opening Ceremony", icon: PartyPopper },
      { time: "11:00 AM", title: "Hacking Begins!", icon: Code },
      { time: "01:00 PM", title: "Lunch Break", icon: Coffee },
      { time: "06:00 PM", title: "Workshop: AI/ML", icon: Presentation },
      { time: "09:00 PM", title: "Dinner & Networking", icon: Coffee },
    ],
  },
  {
    day: "Day 2",
    date: "January 16, 2025",
    events: [
      { time: "08:00 AM", title: "Breakfast", icon: Coffee },
      { time: "10:00 AM", title: "Mentor Sessions", icon: Users },
      { time: "01:00 PM", title: "Lunch Break", icon: Coffee },
      { time: "03:00 PM", title: "Final Sprint", icon: Code },
      { time: "05:00 PM", title: "Project Submission", icon: Clock },
      { time: "06:00 PM", title: "Presentations Begin", icon: Presentation },
      { time: "08:00 PM", title: "Awards Ceremony", icon: Trophy },
    ],
  },
];

const ScheduleSection = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden" id="schedule">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-ash to-background" />
      
      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-display uppercase tracking-widest text-sm mb-4 block">
            Event Timeline
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            <span className="text-gradient-fire">48 HOURS OF FIRE</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Two days of intense coding, learning, and fun. Here's what to expect.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {schedule.map((day, dayIndex) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, x: dayIndex === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center">
                    <span className="text-2xl font-display font-bold text-primary">
                      {dayIndex + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-foreground">
                      {day.day}
                    </h3>
                    <p className="text-muted-foreground">{day.date}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {day.events.map((event, eventIndex) => (
                    <motion.div
                      key={event.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: eventIndex * 0.1 }}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <event.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">{event.title}</p>
                      </div>
                      <span className="text-sm text-muted-foreground font-display">
                        {event.time}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;
