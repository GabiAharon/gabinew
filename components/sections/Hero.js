import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MessageCircle, ChevronDown } from "lucide-react";
import { EASE, useMotionPrefs } from "../../lib/motion";
import { heroStageImage, heroPortraitImage } from "../../lib/content";
import { openWhatsApp } from "../../lib/links";
import { MagneticButton } from "../ui";
import KineticWord from "../effects/KineticWord";
import EyeContactPortrait from "../effects/EyeContactPortrait";

// One message, clear hierarchy: a compact byline (who), then the kinetic
// transformation sentence AS the page headline (what changes), then the
// promise and the CTAs. Start-aligned editorial column over the stage
// photo — not a centered stack of competing elements.
export default function Hero({ t, language }) {
  const ref = useRef(null);
  const { reduced } = useMotionPrefs();
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.14], [1, 0]);

  const scrollToServices = () =>
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });

  const rise = (delay = 0) => ({
    initial: reduced ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: EASE },
  });

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroStageImage}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        {/* Symmetric vignette: dark center pool for the text, edges breathe */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.86)_0%,rgba(5,5,5,0.6)_32%,rgba(5,5,5,0.88)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(5,5,5,0.55),rgba(5,5,5,0.25)_45%,rgba(5,5,5,0.7)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/90 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <motion.div
        className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 pb-24 pt-28"
        style={reduced ? undefined : { opacity: heroOpacity }}
      >
        <div className="max-w-3xl text-center">
          {/* Byline: identity in one compact centered stack */}
          <motion.div {...rise(0)} className="flex flex-col items-center gap-4">
            <EyeContactPortrait
              compact
              src={heroPortraitImage}
              alt={t.hero.name}
              caption={t.hero.eyeCaption}
            />
            <div>
              <div className="text-xl font-assistant-extrabold leading-tight text-white md:text-2xl">
                {t.hero.name}
              </div>
              <div className="mt-1 text-sm font-semibold tracking-wide text-gold/90 md:text-base">
                {t.hero.title}
              </div>
            </div>
          </motion.div>

          {/* The headline IS the transformation sentence */}
          <motion.h1
            {...rise(0.15)}
            className="mt-12 font-assistant-extrabold text-slate-100"
            style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)", lineHeight: 1.15 }}
          >
            {t.hero.morphLead}
            <span className="mt-2 flex min-h-[1.2em] items-baseline justify-center">
              <KineticWord
                words={t.hero.morphWords}
                className=""
                wordClassName="text-[clamp(2.9rem,7vw,5.8rem)] leading-none"
              />
            </span>
          </motion.h1>

          <motion.p
            {...rise(0.3)}
            className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-slate-300 md:text-xl"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div {...rise(0.45)} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <MagneticButton
              onClick={() => openWhatsApp("generic", language)}
              className="group relative overflow-hidden rounded-full bg-gold px-9 py-4 text-lg font-bold text-ink shadow-[0_16px_50px_rgba(255,222,89,0.28)]"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <MessageCircle className="h-5 w-5" />
                {t.hero.cta}
              </span>
            </MagneticButton>
            <MagneticButton
              onClick={scrollToServices}
              className="flex items-center justify-center gap-2 rounded-full border border-white/20 px-9 py-4 font-medium text-white transition-colors duration-300 hover:bg-white/5"
            >
              {t.hero.ctaSecondary}
              {!reduced && (
                <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ChevronDown className="h-4 w-4" />
                </motion.span>
              )}
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5 text-slate-500"
        animate={reduced ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-[11px] font-medium tracking-wide">{t.hero.scrollCue}</span>
        <ChevronDown className="h-5 w-5" />
      </motion.div>
    </section>
  );
}
