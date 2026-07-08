import React, { createContext, useContext, useEffect } from "react";
import { useScroll, useSpring, useMotionValueEvent } from "framer-motion";

// Drives the three-act scroll narrative. One springed scroll-progress value
// (0 = fear, 1 = presence) written to the --presence CSS var on <html> -
// a CSS-var write per frame, zero React re-renders.
const PresenceContext = createContext(null);
export const usePresence = () => useContext(PresenceContext);

export default function PresenceProvider({ children }) {
  const { scrollYProgress } = useScroll();
  const presence = useSpring(scrollYProgress, { stiffness: 55, damping: 20, mass: 0.6 });

  useMotionValueEvent(presence, "change", (v) => {
    document.documentElement.style.setProperty("--presence", Math.max(0, Math.min(1, v)).toFixed(3));
  });

  useEffect(() => {
    return () => document.documentElement.style.setProperty("--presence", "0");
  }, []);

  return (
    <PresenceContext.Provider value={presence}>
      {children}
    </PresenceContext.Provider>
  );
}
