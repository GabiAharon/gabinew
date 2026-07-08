import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMotionPrefs, useIsMobile } from "../../lib/motion";

// Embodied typography: each word doesn't just appear - it behaves like its
// meaning. חושש trembles, נלחץ compresses, משפיע takes the stage in gold.
// Two nested spans keep enter/exit transforms from fighting the behavior
// loop: the outer span handles enter/exit, the inner span loops the behavior.
const BEHAVIORS = {
  tremble: {
    color: "#94a3b8", scale: 0.94, mobileSkip: true,
    loop: { x: [0, -2, 2, -1.5, 1.5, 0], rotate: [0, -0.7, 0.7, -0.4, 0.4, 0] },
    loopT: { duration: 0.55, repeat: Infinity },
  },
  compress: {
    color: "#94a3b8", scale: 0.96,
    loop: { scaleY: [1, 0.86, 1], letterSpacing: ["0em", "-0.05em", "0em"] },
    loopT: { duration: 1.3, repeat: Infinity, ease: "easeInOut" },
  },
  retreat: {
    color: "#8a93a5", scale: 0.95,
    loop: { x: [0, 8, 0], opacity: [1, 0.55, 1] },
    loopT: { duration: 1.7, repeat: Infinity, ease: "easeInOut" },
  },
  shrink: {
    color: "#8a93a5", scale: 0.92,
    loop: { scale: [1, 0.9, 1], opacity: [1, 0.7, 1] },
    loopT: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
  },
  steady: { color: "#cfd6e4", scale: 1 },
  flutter: {
    color: "#e8d9a0", scale: 1,
    loop: { y: [0, -4, 0] },
    loopT: { duration: 0.85, repeat: Infinity, ease: "easeInOut" },
  },
  sway: {
    color: "#f3dd8a", scale: 1.02,
    loop: { rotate: [0, 1.2, -1.2, 0] },
    loopT: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
  },
  command: {
    color: "#ffde59", scale: 1.08, letterSpacing: "0.01em",
    loop: {
      scale: [1, 1.045, 1],
      textShadow: [
        "0 0 0px rgba(255,222,89,0)",
        "0 0 46px rgba(255,222,89,0.6)",
        "0 0 26px rgba(255,222,89,0.35)",
      ],
    },
    loopT: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function KineticWord({ words, className = "", wordClassName = "" }) {
  const { reduced } = useMotionPrefs();
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(0);
  const [measuredWidth, setMeasuredWidth] = useState("auto");
  const measureRef = useRef(null);

  const active = words[activeIndex];
  const behavior = BEHAVIORS[active.b] || BEHAVIORS.steady;

  useEffect(() => {
    const updateWidth = () => {
      if (!measureRef.current) return;
      const activeWord = measureRef.current.children[activeIndex];
      if (!activeWord) return;
      setMeasuredWidth(`${Math.ceil(activeWord.getBoundingClientRect().width)}px`);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [activeIndex, words]);

  useEffect(() => {
    // משפיע holds the stage longest, then the loop restarts from fear -
    // the cycle itself tells the transformation story.
    const holdMs = active.b === "command" ? 3800 : 2300;
    const timer = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % words.length);
    }, holdMs);
    return () => clearTimeout(timer);
  }, [activeIndex, active.b, words.length]);

  const enterExit = reduced
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.2 } },
        exit: { opacity: 0, transition: { duration: 0.15 } },
      }
    : {
        initial: { y: -20, opacity: 0, filter: "blur(8px)" },
        animate: { y: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 0.4, ease: "easeOut" } },
        exit: { y: 20, opacity: 0, filter: "blur(8px)", transition: { duration: 0.3, ease: "easeIn" } },
      };

  const loop = !reduced && behavior.loop && !(isMobile && behavior.mobileSkip) ? behavior.loop : undefined;

  return (
    <>
      <div
        ref={measureRef}
        aria-hidden="true"
        className="absolute pointer-events-none opacity-0"
        style={{ visibility: "hidden" }}
      >
        {words.map((word) => (
          <span key={word.w} className={`inline-block whitespace-nowrap px-2 font-assistant-extrabold ${wordClassName}`}>
            {word.w}
          </span>
        ))}
      </div>

      <motion.span
        className={`relative inline-flex items-center justify-center align-baseline ${className}`}
        animate={{ width: measuredWidth }}
        transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 150, damping: 15, mass: 1.2 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={active.w}
            className="inline-block"
            initial={enterExit.initial}
            animate={enterExit.animate}
            exit={enterExit.exit}
          >
            <motion.span
              className={`inline-block whitespace-nowrap px-2 font-assistant-extrabold ${wordClassName}`}
              style={{
                color: behavior.color,
                letterSpacing: behavior.letterSpacing || "0em",
                scale: reduced ? 1 : behavior.scale,
                willChange: loop ? "transform" : undefined,
              }}
              animate={loop}
              transition={loop ? behavior.loopT : undefined}
            >
              {active.w}
            </motion.span>
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </>
  );
}
