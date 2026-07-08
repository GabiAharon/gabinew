import { useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];

// Combines the OS-level prefers-reduced-motion signal with the site's own
// AccessibilityMenu toggle (html.a11y-reduced-motion). CSS overrides don't
// stop framer-motion's rAF springs, so every effect component must gate on
// this hook and render its static variant when `reduced` is true.
export const useMotionPrefs = () => {
  const osReduced = useReducedMotion();
  const [a11yReduced, setA11yReduced] = useState(false);

  useEffect(() => {
    const el = document.documentElement;
    const update = () => setA11yReduced(el.classList.contains("a11y-reduced-motion"));
    update();
    const observer = new MutationObserver(update);
    observer.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return { reduced: Boolean(osReduced) || a11yReduced };
};

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
};

export const usePointerFine = () => {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return fine;
};

export const useMounted = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
};
