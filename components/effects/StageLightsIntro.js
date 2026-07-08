import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE, useMotionPrefs } from "../../lib/motion";

// A 1.4s "stage lights up" opening: black room, one gold spotlight sweeps in
// and lands center, page fades in beneath. Plays once per browser session;
// skipped entirely under reduced motion.
export default function StageLightsIntro() {
  const { reduced } = useMotionPrefs();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (reduced) {
      setShow(false);
      return;
    }
    // Flag is written when the intro *finishes*, not when it starts —
    // otherwise StrictMode's double effect-run in dev leaves the overlay
    // stuck (first run arms the timer, cleanup clears it, second run
    // early-returns on the already-set flag).
    try {
      if (sessionStorage.getItem("gabiIntroSeen")) return;
    } catch (e) { /* private mode: play anyway */ }
    setShow(true);
    const timer = setTimeout(() => {
      setShow(false);
      try { sessionStorage.setItem("gabiIntroSeen", "1"); } catch (e) {}
    }, 1500);
    return () => clearTimeout(timer);
  }, [reduced]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="stage-lights"
          className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden bg-ink"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <motion.div
            className="absolute left-1/2 top-1/2 h-[130vmax] w-[130vmax] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(255,222,89,0.20) 0%, rgba(255,222,89,0.06) 26%, transparent 55%)",
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{ x: "-46vw", scale: 0.35, opacity: 0 }}
            animate={{ x: 0, scale: 1, opacity: 1 }}
            transition={{ duration: 1.0, ease: EASE }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
