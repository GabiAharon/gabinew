import React from "react";
import { motion, useTransform } from "framer-motion";
import { usePresence } from "./PresenceProvider";
import { useIsMobile, useMounted } from "../../lib/motion";

// The fear→presence progress indicator. Desktop: thin vertical rail on the
// logical start edge with a travelling gold dot and act labels. Mobile: a
// 2px progress bar across the top.
export default function ActRail({ t, isHebrew }) {
  const presence = usePresence();
  const isMobile = useIsMobile();
  const mounted = useMounted();
  const dotTop = useTransform(presence, (v) => `${Math.max(0, Math.min(1, v)) * 100}%`);
  const scaleX = useTransform(presence, (v) => Math.max(0, Math.min(1, v)));

  if (!mounted || !presence) return null;

  if (isMobile) {
    return (
      <div className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-white/5" aria-hidden="true">
        <motion.div
          className="h-full w-full bg-gradient-to-r from-slate-500 to-gold"
          style={{ scaleX, transformOrigin: isHebrew ? "right" : "left" }}
        />
      </div>
    );
  }

  return (
    <div
      className="fixed top-1/2 z-[60] hidden h-[46vh] -translate-y-1/2 flex-col items-center lg:flex"
      style={{ insetInlineStart: "1.4rem" }}
      aria-hidden="true"
    >
      <span className="mb-3 text-[10px] font-semibold tracking-[0.2em] text-slate-500">{t.acts.fear}</span>
      <div className="relative w-px flex-1 bg-gradient-to-b from-slate-600/60 via-slate-500/40 to-gold/70">
        <motion.div
          className="absolute h-2.5 w-2.5 rounded-full bg-gold shadow-[0_0_14px_rgba(255,222,89,0.75)]"
          style={{ top: dotTop, insetInlineStart: "50%", x: "-50%", y: "-50%" }}
        />
      </div>
      <span className="mt-3 text-[10px] font-semibold tracking-[0.2em] text-gold/80">{t.acts.presence}</span>
    </div>
  );
}
