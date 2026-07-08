import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { EASE, useMotionPrefs } from "../lib/motion";

// ============================================
// MAGNETIC BUTTON
// ============================================
export const MagneticButton = ({ children, onClick, className, ariaLabel }) => {
  const ref = useRef(null);
  const { reduced } = useMotionPrefs();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { damping: 15, stiffness: 150 });
  const ySpring = useSpring(y, { damping: 15, stiffness: 150 });

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      className={className}
      aria-label={ariaLabel}
      style={reduced ? undefined : { x: xSpring, y: ySpring }}
      onMouseMove={(e) => {
        if (reduced) return;
        const rect = ref.current?.getBoundingClientRect();
        if (rect) {
          x.set((e.clientX - rect.left - rect.width / 2) * 0.15);
          y.set((e.clientY - rect.top - rect.height / 2) * 0.15);
        }
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileHover={reduced ? undefined : { scale: 1.05 }}
      whileTap={reduced ? undefined : { scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
};

// ============================================
// TEXT REVEAL (masked slide-up)
// ============================================
export const TextReveal = ({ children, className = "" }) => {
  const ref = useRef(null);
  const { reduced } = useMotionPrefs();
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        animate={isInView ? { y: 0 } : { y: "100%" }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// ============================================
// ANIMATED COUNTER
// ============================================
export const AnimatedCounter = ({ value, suffix = "", duration = 2 }) => {
  const ref = useRef(null);
  const { reduced } = useMotionPrefs();
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [display, setDisplay] = useState(0);
  const numeric = parseInt(value.replace(/[^0-9]/g, ''));

  useEffect(() => {
    if (!isInView) return;
    if (reduced) { setDisplay(numeric); return; }
    let startTime;
    let frame;
    const animate = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / (duration * 1000), 1);
      setDisplay(Math.floor((1 - Math.pow(1 - progress, 3)) * numeric));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isInView, numeric, duration, reduced]);

  return <span ref={ref}>{display}{suffix}</span>;
};

// ============================================
// SECTION KICKER (small gold-dot label above headings)
// ============================================
export const SectionKicker = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.65, ease: EASE }}
    className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.03] px-5 py-2 text-xs font-semibold tracking-[0.28em] text-slate-300/85"
  >
    <span className="h-2 w-2 rounded-full bg-gold" />
    {children}
  </motion.div>
);
