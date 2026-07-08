import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MessageCircle, ChevronDown } from "lucide-react";
import { EASE, useMotionPrefs } from "../../lib/motion";
import { heroStageImage, heroPortraitImage } from "../../lib/content";
import { openWhatsApp } from "../../lib/links";
import { MagneticButton } from "../ui";
import KineticWord from "../effects/KineticWord";
import EyeContactPortrait from "../effects/EyeContactPortrait";

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
      {/* Act I stage: darker vignette than a normal hero — the room before the lights */}
      <div className="absolute inset-0">
        <img
          src={heroStageImage}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.88)_0%,rgba(5,5,5,0.62)_30%,rgba(5,5,5,0.9)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(255,222,89,0.07),rgba(5,5,5,0.55)_45%,rgba(5,5,5,0.92)_78%)]" />
      </div>

      <motion.div
        className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 pb-24 pt-28 text-center md:pt-32"
        style={reduced ? undefined : { opacity: heroOpacity }}
      >
        <motion.div {...rise(0)} className="mb-12">
          <EyeContactPortrait
            src={heroPortraitImage}
            alt={t.hero.name}
            caption={t.hero.eyeCaption}
          />
        </motion.div>

        <motion.div {...rise(0.1)} className="mb-5 inline-flex items-center rounded-full border border-white/12 bg-white/5 px-5 py-2 text-sm text-slate-100/88 backdrop-blur-sm">
          <span className="font-medium">{t.hero.greeting}</span>
        </motion.div>

        <motion.h1
          {...rise(0.18)}
          className="font-assistant-extrabold tracking-tight text-slate-50"
          style={{ fontSize: "clamp(3rem, 9vw, 6.5rem)", lineHeight: 1.05 }}
        >
          {t.hero.name}
        </motion.h1>

        <motion.h2 {...rise(0.28)} className="mt-3 text-xl font-assistant-extrabold text-slate-100/95 md:text-2xl">
          {t.hero.title}
        </motion.h2>

        {/* The emotional centerpiece: the sentence that embodies the transformation */}
        <motion.div {...rise(0.4)} className="mt-10 w-full">
          <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.38em] text-slate-300/50">
            {t.hero.morphLabel}
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xl font-medium leading-tight text-slate-200/85 md:text-2xl">
              {t.hero.morphLead}
            </span>
            <KineticWord
              words={t.hero.morphWords}
              className="min-h-[4.5rem] md:min-h-[6.5rem]"
              wordClassName="text-[clamp(2.75rem,8vw,5.5rem)] leading-none"
            />
          </div>
        </motion.div>

        <motion.p {...rise(0.5)} className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-slate-200/80 md:text-xl">
          {t.hero.subtitle}
        </motion.p>

        <motion.div {...rise(0.6)} className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <MagneticButton
            onClick={() => openWhatsApp("generic", language)}
            className="group relative overflow-hidden rounded-full bg-gold px-9 py-4 text-lg font-bold text-ink shadow-[0_16px_50px_rgba(255,222,89,0.28)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              {t.hero.cta}
            </span>
          </MagneticButton>
          <MagneticButton
            onClick={scrollToServices}
            className="flex items-center gap-2 rounded-full border border-white/20 px-9 py-4 font-medium text-white transition-colors duration-300 hover:bg-white/5"
          >
            {t.hero.ctaSecondary}
            {!reduced && (
              <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ChevronDown className="h-4 w-4" />
              </motion.span>
            )}
          </MagneticButton>
        </motion.div>
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
