import React from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "../../lib/motion";
import { bodyLanguageTips } from "../../lib/content";

// The 27-tips marquee. LTR shell + RTL spans keeps the CSS keyframe scroll
// stable regardless of page direction (existing proven trick). Desktop gets
// a second row scrolling the opposite way; hover pauses (CSS).
const TickerRow = ({ tips, reverse = false, dirAttr }) => {
  const gap = 24;
  return (
    <div className="ticker-marquee relative overflow-hidden border-y border-white/5 bg-ink/60 py-3" dir="ltr">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />
      <div className={`ticker-track ${reverse ? "ticker-track-reverse" : ""}`} style={{ gap: `${gap}px` }}>
        {[0, 1].map((groupIndex) => (
          <div key={groupIndex} className="flex items-center" style={{ gap: `${gap}px` }}>
            {tips.map((tip, index) => (
              <div key={`${groupIndex}-${index}`} className="flex items-center" style={{ gap: `${gap}px` }}>
                <span className="whitespace-nowrap font-assistant text-sm text-slate-300" dir={dirAttr}>{tip}</span>
                <span className="h-5 w-px bg-gold/25" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function TipsTicker({ t, language }) {
  const tips = bodyLanguageTips[language];
  const isMobile = useIsMobile();
  const dirAttr = language === "he" ? "rtl" : "ltr";
  const half = Math.ceil(tips.length / 2);

  return (
    <section className="relative py-16">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto mb-8 max-w-4xl px-6 text-center"
      >
        <h2 className="text-2xl font-assistant-extrabold text-white md:text-3xl">{t.ticker.title}</h2>
        <p className="mt-2 text-sm font-semibold tracking-[0.2em] text-gold/70">{t.ticker.subtitle}</p>
      </motion.div>

      {isMobile ? (
        <TickerRow tips={tips} dirAttr={dirAttr} />
      ) : (
        <div className="space-y-3">
          <TickerRow tips={tips.slice(0, half)} dirAttr={dirAttr} />
          <TickerRow tips={tips.slice(half)} reverse dirAttr={dirAttr} />
        </div>
      )}
    </section>
  );
}
