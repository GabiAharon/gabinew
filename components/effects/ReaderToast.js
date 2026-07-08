import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useVelocity, useMotionValueEvent, useInView } from "framer-motion";
import { X } from "lucide-react";
import { EASE } from "../../lib/motion";

// "The page reads you": reacts once to rushed scrolling and once to a long
// pause in the fear section, with a witty line about what an audience would
// see. Hard-capped at 2 toasts per browser session - a wink, not a nag.
const SESSION_KEY = "gabiReaderToasts";

export default function ReaderToast({ t, fearRef }) {
  const [toast, setToast] = useState(null);
  const shownKinds = useRef(new Set());
  const fastStart = useRef(null);
  const hideTimer = useRef(null);

  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const fearInView = useInView(fearRef, { amount: 0.55 });

  const trigger = useCallback((kind) => {
    if (shownKinds.current.has(kind)) return;
    let count = 0;
    try { count = parseInt(sessionStorage.getItem(SESSION_KEY) || "0", 10); } catch (e) {}
    if (count >= 2) return;
    shownKinds.current.add(kind);
    try { sessionStorage.setItem(SESSION_KEY, String(count + 1)); } catch (e) {}
    setToast(kind);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setToast(null), 5500);
  }, []);

  // Rusher: sustained fast scrolling for >600ms
  useMotionValueEvent(velocity, "change", (v) => {
    if (Math.abs(v) > 4200) {
      if (!fastStart.current) {
        fastStart.current = Date.now();
      } else if (Date.now() - fastStart.current > 600) {
        trigger("rusher");
      }
    } else {
      fastStart.current = null;
    }
  });

  // Hesitater: parked in the fear section for 6s without scrolling
  useEffect(() => {
    if (!fearInView) return;
    let lastY = window.scrollY;
    let stillSince = Date.now();
    const interval = setInterval(() => {
      if (Math.abs(window.scrollY - lastY) > 30) {
        lastY = window.scrollY;
        stillSince = Date.now();
      } else if (Date.now() - stillSince > 6000) {
        trigger("hesitater");
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [fearInView, trigger]);

  useEffect(() => () => clearTimeout(hideTimer.current), []);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[130] flex justify-center px-4" role="status" aria-live="polite">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="pointer-events-auto flex items-center gap-3 rounded-full border border-gold/25 bg-ink/90 py-2.5 ps-5 pe-2.5 text-sm font-medium text-slate-100 shadow-[0_18px_60px_rgba(2,6,23,0.6)] backdrop-blur-xl"
          >
            <span>{t.reader[toast]}</span>
            <button
              type="button"
              onClick={() => setToast(null)}
              aria-label={t.reader.close}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-slate-400 transition-colors hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
