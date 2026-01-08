import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { zoomIn } from "@/lib/motion";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set target date to 15 days from now for demo
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 15);

    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="flex gap-4 md:gap-6 justify-center">
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          variants={zoomIn(0.5 + index * 0.1, 0.6)}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-fire opacity-20 blur-xl rounded-lg" />
            <div className="relative bg-card border-2 border-primary/50 rounded-lg p-3 md:p-4 min-w-[60px] md:min-w-[80px] glow-ember">
              <span className="text-2xl md:text-4xl font-display font-bold text-gradient-fire">
                {String(unit.value).padStart(2, "0")}
              </span>
            </div>
          </div>
          <span className="text-xs md:text-sm text-muted-foreground mt-2 font-display uppercase tracking-wider">
            {unit.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

export default CountdownTimer;
