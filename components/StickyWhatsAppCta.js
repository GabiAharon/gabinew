import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useInView } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { EASE } from "../lib/motion";
import { openWhatsApp } from "../lib/links";

// Floating WhatsApp pill on the logical START edge (RTL: bottom-right,
// LTR: bottom-left) - the AccessibilityMenu owns the opposite corner.
// Appears once the hero has scrolled away; hides while the final CTA is on
// screen so the page never shows two competing WhatsApp buttons.
export default function StickyWhatsAppCta({ t, language, finalCtaRef }) {
  const [pastHero, setPastHero] = useState(false);
  const { scrollY } = useScroll();
  const finalInView = useInView(finalCtaRef, { amount: 0.25 });

  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > (typeof window !== "undefined" ? window.innerHeight * 0.85 : 700);
    setPastHero((prev) => (prev === next ? prev : next));
  });

  const visible = pastHero && !finalInView;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="sticky-wa"
          type="button"
          onClick={() => openWhatsApp("generic", language)}
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.9 }}
          transition={{ duration: 0.4, ease: EASE }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          className="group fixed bottom-5 z-[120] flex items-center gap-2 rounded-full bg-[#25D366] py-3.5 ps-4 pe-4 font-bold text-white shadow-[0_16px_50px_rgba(37,211,102,0.35)]"
          style={{ insetInlineStart: "1.25rem" }}
          aria-label={t.sticky.label}
        >
          <MessageCircle className="h-6 w-6" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm transition-[max-width] duration-500 group-hover:max-w-[8rem] md:max-w-[8rem]">
            {t.sticky.label}
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
