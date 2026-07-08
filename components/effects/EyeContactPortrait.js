import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { EASE, useMotionPrefs, usePointerFine } from "../../lib/motion";

// The portrait keeps "eye contact" with the visitor: a subtle 3D head-turn
// parallax toward the cursor plus a gold catchlight that tracks it. When the
// cursor lingers near the portrait, the page names what it just did.
// Touch / reduced motion: static portrait with a one-time gold ring glow.
export default function EyeContactPortrait({ src, alt, caption }) {
  const ref = useRef(null);
  const { reduced } = useMotionPrefs();
  const pointerFine = usePointerFine();
  const enabled = pointerFine && !reduced;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotY = useSpring(useTransform(mx, [-1, 1], [-8, 8]), { stiffness: 120, damping: 18 });
  const rotX = useSpring(useTransform(my, [-1, 1], [5, -5]), { stiffness: 120, damping: 18 });
  const lightX = useSpring(useTransform(mx, [-1, 1], [-12, 12]), { stiffness: 150, damping: 20 });
  const lightY = useSpring(useTransform(my, [-1, 1], [-12, 12]), { stiffness: 150, damping: 20 });

  const [showCaption, setShowCaption] = useState(false);
  const nearSince = useRef(null);
  const captionDone = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const nx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2)));
      const ny = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2)));
      mx.set(nx);
      my.set(ny);

      const dist = Math.hypot(
        (e.clientX - (r.left + r.width / 2)) / (r.width * 1.6),
        (e.clientY - (r.top + r.height / 2)) / (r.height * 1.6)
      );
      if (dist < 1 && !captionDone.current) {
        if (!nearSince.current) nearSince.current = Date.now();
      } else {
        nearSince.current = null;
      }
    };

    const checker = setInterval(() => {
      if (captionDone.current || !nearSince.current) return;
      if (Date.now() - nearSince.current > 1800) {
        captionDone.current = true;
        setShowCaption(true);
        setTimeout(() => setShowCaption(false), 4500);
      }
    }, 400);

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      clearInterval(checker);
    };
  }, [enabled, mx, my]);

  return (
    <div className="relative flex flex-col items-center">
      <div style={{ perspective: 700 }}>
        <motion.div
          ref={ref}
          className="relative"
          style={enabled ? { rotateY: rotY, rotateX: rotX, transformStyle: "preserve-3d", willChange: "transform" } : undefined}
        >
          <div className="absolute inset-[-16px] rounded-full bg-[radial-gradient(circle,rgba(255,222,89,0.16),rgba(255,255,255,0))] blur-2xl" />
          <motion.div
            className="relative overflow-hidden rounded-full border border-gold/25 bg-ink/70 p-2 shadow-[0_18px_50px_rgba(2,6,23,0.5)] backdrop-blur-md"
            initial={!enabled ? { boxShadow: "0 0 0px rgba(255,222,89,0)" } : undefined}
            whileInView={!enabled ? { boxShadow: "0 0 42px rgba(255,222,89,0.28)" } : undefined}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EASE }}
          >
            <img
              src={src}
              alt={alt}
              className="h-32 w-32 rounded-full object-cover object-top md:h-40 md:w-40"
            />
            {enabled && (
              <motion.div
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  x: lightX,
                  y: lightY,
                  background: "radial-gradient(circle, rgba(255,222,89,0.18) 0%, transparent 65%)",
                }}
              />
            )}
          </motion.div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute -bottom-10 flex w-max justify-center" aria-live="polite">
        <AnimatePresence>
          {showCaption && (
            <motion.span
              initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="rounded-full border border-gold/30 bg-ink/85 px-4 py-1.5 text-sm font-medium text-gold backdrop-blur-md"
            >
              {caption}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
