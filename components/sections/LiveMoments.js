import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { useIsMobile, useMotionPrefs } from "../../lib/motion";
import { lectureImages } from "../../lib/content";

// "Stage panels": all photos share the full width as strips; the active one
// expands to take the stage while the others dim and step back. Click (or
// the auto-cycle) hands the spotlight to the next photo. No dead space, no
// blur - the transition itself is the show.
const EXPAND_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

export default function LiveMoments({ t }) {
  const isMobile = useIsMobile();
  const { reduced } = useMotionPrefs();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduced || paused) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % lectureImages.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [reduced, paused]);

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 flex items-center justify-center gap-3"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/40" />
          <span className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-gold/70">
            <Camera className="h-4 w-4" />
            {t.hero.liveInAction}
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/40" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className={`flex gap-2.5 md:gap-3 ${isMobile ? "h-[560px] flex-col" : "h-[480px] md:h-[540px]"}`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {lectureImages.map((image, index) => {
            const isActive = index === active;
            return (
              <button
                key={image.src}
                type="button"
                onClick={() => setActive(index)}
                onFocus={() => setPaused(true)}
                onBlur={() => setPaused(false)}
                aria-label={`${t.hero.liveInAction} ${index + 1}`}
                aria-pressed={isActive}
                className={`group relative overflow-hidden rounded-[1.6rem] border transition-colors duration-500 md:rounded-[2rem] ${
                  isActive
                    ? "border-gold/50 shadow-[0_24px_90px_rgba(255,222,89,0.12)]"
                    : "border-white/10 hover:border-white/25"
                }`}
                style={{
                  flexGrow: isActive ? 4.2 : 1,
                  flexShrink: 1,
                  flexBasis: "0%",
                  transition: reduced
                    ? "border-color 0.2s"
                    : `flex-grow 0.85s ${EXPAND_EASE}, border-color 0.5s, box-shadow 0.5s`,
                }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{
                    objectPosition: "center 22%",
                    filter: isActive ? "none" : "grayscale(55%) brightness(0.5)",
                    transform: isActive ? "scale(1)" : "scale(1.06)",
                    transition: reduced ? "none" : `filter 0.7s ease, transform 0.9s ${EXPAND_EASE}`,
                  }}
                />
                {/* soft stage light on the active panel */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: isActive
                      ? "linear-gradient(180deg, rgba(5,5,5,0.12) 0%, transparent 40%, rgba(5,5,5,0.45) 100%)"
                      : "linear-gradient(180deg, rgba(5,5,5,0.25) 0%, rgba(5,5,5,0.35) 100%)",
                    transition: "background 0.6s ease",
                  }}
                />
                {/* index tag: quiet on idle strips, gold on the active stage */}
                <span
                  className={`absolute bottom-4 font-assistant-extrabold transition-all duration-500 ${
                    isActive ? "text-2xl text-gold md:text-3xl" : "text-base text-white/45"
                  }`}
                  style={{ insetInlineStart: "1.1rem" }}
                >
                  <bdi>{String(index + 1).padStart(2, "0")}</bdi>
                </span>
              </button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
