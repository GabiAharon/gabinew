import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMotionPrefs, usePointerFine, useIsMobile } from "../../lib/motion";

// A gold stage-spotlight that follows the cursor. Motion values + springs
// only — no setState in the mousemove handler, so no re-renders per frame.
const SIZE = 560;

export default function SpotlightCursor() {
  const { reduced } = useMotionPrefs();
  const pointerFine = usePointerFine();
  const isMobile = useIsMobile();

  const x = useMotionValue(-SIZE);
  const y = useMotionValue(-SIZE);
  const xs = useSpring(x, { stiffness: 160, damping: 24, mass: 0.5 });
  const ys = useSpring(y, { stiffness: 160, damping: 24, mass: 0.5 });

  const enabled = pointerFine && !isMobile && !reduced;

  useEffect(() => {
    if (!enabled) return;
    const move = (e) => {
      x.set(e.clientX - SIZE / 2);
      y.set(e.clientY - SIZE / 2);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed z-[1] rounded-full"
      style={{
        width: SIZE,
        height: SIZE,
        x: xs,
        y: ys,
        willChange: "transform",
        background: "radial-gradient(circle, rgba(255,222,89,0.055) 0%, rgba(255,222,89,0.02) 38%, transparent 68%)",
      }}
    />
  );
}
