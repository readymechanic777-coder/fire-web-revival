import { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";

const codeLines = [
  { tokens: [{ text: 'const', type: 'keyword' }, { text: ' hackathon', type: 'variable' }, { text: ' = ', type: 'operator' }, { text: '{', type: 'bracket' }] },
  { tokens: [{ text: '  name', type: 'property' }, { text: ': ', type: 'operator' }, { text: '"Avishkaar S4"', type: 'string' }, { text: ',', type: 'punctuation' }] },
  { tokens: [{ text: '  duration', type: 'property' }, { text: ': ', type: 'operator' }, { text: '"48 hours"', type: 'string' }, { text: ',', type: 'punctuation' }] },
  { tokens: [{ text: '  teams', type: 'property' }, { text: ': ', type: 'operator' }, { text: '500', type: 'number' }, { text: ',', type: 'punctuation' }] },
  { tokens: [{ text: '  prize', type: 'property' }, { text: ': ', type: 'operator' }, { text: '"₹5,00,000+"', type: 'string' }] },
  { tokens: [{ text: '};', type: 'bracket' }] },
  { tokens: [] },
  { tokens: [{ text: 'async', type: 'keyword' }, { text: ' function ', type: 'default' }, { text: 'innovate', type: 'function' }, { text: '() {', type: 'bracket' }] },
  { tokens: [{ text: '  const', type: 'keyword' }, { text: ' idea', type: 'variable' }, { text: ' = ', type: 'operator' }, { text: 'await', type: 'keyword' }, { text: ' brainstorm', type: 'function' }, { text: '();', type: 'bracket' }] },
  { tokens: [{ text: '  const', type: 'keyword' }, { text: ' solution', type: 'variable' }, { text: ' = ', type: 'operator' }, { text: 'build', type: 'function' }, { text: '(idea);', type: 'bracket' }] },
  { tokens: [{ text: '  ', type: 'default' }, { text: 'return', type: 'keyword' }, { text: ' deploy', type: 'function' }, { text: '(solution);', type: 'bracket' }] },
  { tokens: [{ text: '}', type: 'bracket' }] },
  { tokens: [] },
  { tokens: [{ text: '// ', type: 'comment' }, { text: '🚀 Launch the future', type: 'comment' }] },
  { tokens: [{ text: 'innovate', type: 'function' }, { text: '().', type: 'bracket' }, { text: 'then', type: 'function' }, { text: '(', type: 'bracket' }, { text: 'celebrate', type: 'function' }, { text: ');', type: 'bracket' }] },
];

const tokenColors = {
  keyword: 'hsl(190, 100%, 60%)',
  variable: 'hsl(195, 80%, 75%)',
  property: 'hsl(175, 80%, 60%)',
  string: 'hsl(150, 70%, 55%)',
  number: 'hsl(35, 90%, 65%)',
  function: 'hsl(210, 90%, 70%)',
  operator: 'hsl(200, 30%, 55%)',
  bracket: 'hsl(200, 30%, 50%)',
  punctuation: 'hsl(200, 20%, 45%)',
  comment: 'hsl(200, 20%, 38%)',
  default: 'hsl(200, 40%, 70%)',
};

const GlassTerminal = () => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [charIndex, setCharIndex] = useState(0);
  const intervalRef = useRef(null);

  // Total characters in the current line
  const currentLineLength = useMemo(() => {
    if (visibleLines >= codeLines.length) return 0;
    return codeLines[visibleLines].tokens.reduce((sum, t) => sum + t.text.length, 0);
  }, [visibleLines]);

  useEffect(() => {
    // Typing effect — character by character per line
    intervalRef.current = setInterval(() => {
      setCharIndex((prev) => {
        if (visibleLines >= codeLines.length) {
          // Reset after a pause
          clearInterval(intervalRef.current);
          setTimeout(() => {
            setVisibleLines(0);
            setCharIndex(0);
          }, 3000);
          return prev;
        }

        const lineLen = codeLines[visibleLines].tokens.reduce((s, t) => s + t.text.length, 0);
        if (prev >= lineLen) {
          setVisibleLines((v) => v + 1);
          return 0;
        }
        return prev + 1;
      });
    }, 45);

    return () => clearInterval(intervalRef.current);
  }, [visibleLines]);

  // Cursor blink
  useEffect(() => {
    const blink = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(blink);
  }, []);

  const renderLine = (line, lineIndex) => {
    const isCurrentLine = lineIndex === visibleLines;
    const isVisibleLine = lineIndex < visibleLines;

    if (!isVisibleLine && !isCurrentLine) return null;

    let charCount = 0;
    return (
      <div key={lineIndex} className="flex items-center min-h-[1.4em]">
        <span className="text-muted-foreground/30 select-none w-6 text-right mr-3 text-[10px]">
          {lineIndex + 1}
        </span>
        <span>
          {line.tokens.map((token, ti) => {
            const tokenStart = charCount;
            charCount += token.text.length;

            if (isVisibleLine) {
              return (
                <span key={ti} style={{ color: tokenColors[token.type] || tokenColors.default }}>
                  {token.text}
                </span>
              );
            }

            // Current line — partial render
            const visibleChars = Math.max(0, Math.min(token.text.length, charIndex - tokenStart));
            if (visibleChars === 0) return null;

            return (
              <span key={ti} style={{ color: tokenColors[token.type] || tokenColors.default }}>
                {token.text.slice(0, visibleChars)}
              </span>
            );
          })}
          {isCurrentLine && cursorVisible && (
            <span
              className="inline-block w-[2px] h-[1em] ml-px align-middle"
              style={{ background: 'hsl(190, 100%, 60%)' }}
            />
          )}
        </span>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1, duration: 0.8, type: "spring" }}
      className="relative max-w-lg mx-auto mb-8"
    >
      {/* Terminal window */}
      <div className="glass-panel-strong rounded-xl overflow-hidden glass-condensation">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-primary/10">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ background: 'hsl(0, 70%, 55%)' }} />
            <div className="w-3 h-3 rounded-full" style={{ background: 'hsl(45, 80%, 55%)' }} />
            <div className="w-3 h-3 rounded-full" style={{ background: 'hsl(140, 60%, 45%)' }} />
          </div>
          <span className="font-code text-[10px] text-muted-foreground/50 ml-2 tracking-wider">
            hackathon.js — Avishkaar IDE
          </span>
          {/* Frosted glass reflection on title bar */}
          <div
            className="absolute top-0 left-[10%] right-[30%] h-[1px]"
            style={{
              background: 'linear-gradient(90deg, transparent, hsl(190, 100%, 90% / 0.15), transparent)',
            }}
          />
        </div>

        {/* Code area */}
        <div className="px-4 py-3 font-code text-xs leading-relaxed overflow-hidden" style={{ minHeight: 220 }}>
          {codeLines.map((line, i) => renderLine(line, i))}
        </div>

        {/* Bottom status bar */}
        <div className="flex items-center justify-between px-4 py-1.5 border-t border-primary/10 text-[9px] font-code text-muted-foreground/40">
          <span>JavaScript</span>
          <span>UTF-8</span>
          <span>Ln {Math.min(visibleLines + 1, codeLines.length)}, Col {charIndex + 1}</span>
        </div>
      </div>

      {/* Ambient glow behind terminal */}
      <div
        className="absolute -inset-4 -z-10 rounded-2xl"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(190, 100%, 50% / 0.06) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />
    </motion.div>
  );
};

export default GlassTerminal;
