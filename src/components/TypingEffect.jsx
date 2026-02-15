import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const avishkaarLanguages = [
  { text: "AVISHKAAR", language: "English" },
  { text: "आविष्कार", language: "Hindi" },
  { text: "ஆவிஷ்கார்", language: "Tamil" },
  { text: "ఆవిష్కార్", language: "Telugu" },
  { text: "আবিষ্কার", language: "Bengali" },
  { text: "ಆವಿಷ್ಕಾರ್", language: "Kannada" },
  { text: "ആവിഷ്കാർ", language: "Malayalam" },
  { text: "આવિષ્કાર", language: "Gujarati" },
  { text: "ਆਵਿਸ਼ਕਾਰ", language: "Punjabi" },
  { text: "ଆଭିଷ୍କାର", language: "Odia" },
  { text: "आविष्कार", language: "Marathi" },
];

const TypingEffect = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  const currentWord = avishkaarLanguages[currentIndex].text;
  const typingSpeed = isDeleting ? 50 : 100;

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    const handleTyping = () => {
      if (!isDeleting) {
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentWord.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % avishkaarLanguages.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentWord, typingSpeed]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative min-h-[100px] md:min-h-[140px] flex items-center justify-center">
        <motion.span
          key={currentIndex}
          className="relative text-5xl md:text-7xl lg:text-9xl font-display font-black text-gradient-liquid"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            filter: [
              "drop-shadow(0 0 20px hsl(190 100% 50% / 0.8)) drop-shadow(0 0 60px hsl(190 100% 50% / 0.4))",
              "drop-shadow(0 0 40px hsl(175 100% 55% / 0.9)) drop-shadow(0 0 80px hsl(175 100% 55% / 0.5))",
              "drop-shadow(0 0 25px hsl(220 80% 55% / 0.7)) drop-shadow(0 0 50px hsl(220 80% 55% / 0.3))",
              "drop-shadow(0 0 35px hsl(190 100% 50% / 0.85)) drop-shadow(0 0 70px hsl(190 100% 50% / 0.45))",
              "drop-shadow(0 0 20px hsl(190 100% 50% / 0.8)) drop-shadow(0 0 60px hsl(190 100% 50% / 0.4))",
            ]
          }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ 
            duration: 0.3,
            filter: { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          {displayText}
          <span
            className={`inline-block w-1 md:w-2 h-12 md:h-20 bg-primary ml-1 ${
              showCursor ? "opacity-100" : "opacity-0"
            }`}
          />
        </motion.span>
      </div>
      <AnimatePresence mode="wait">
        <motion.span
          key={avishkaarLanguages[currentIndex].language}
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="text-sm md:text-base text-muted-foreground font-display uppercase tracking-widest mt-2"
        >
          {avishkaarLanguages[currentIndex].language}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default TypingEffect;
