import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, X, Check } from "lucide-react";
import { EASE, useMotionPrefs } from "../../lib/motion";
import { lectureImages } from "../../lib/content";
import { openWhatsApp } from "../../lib/links";
import { MagneticButton, SectionKicker } from "../ui";

// Editorial theater, not widget boxes: the signature keynote runs full-bleed
// like a film poster, and the two lectures are typographic "chapters" with
// giant ghost numerals - rules and whitespace instead of nested cards.

const WordRise = ({ text, className }) => (
  <span className={className}>
    {text.split(" ").map((word, i) => (
      <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
        <motion.span
          className="inline-block"
          initial={{ y: "100%", opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 + i * 0.07, ease: EASE }}
        >
          {word}&nbsp;
        </motion.span>
      </span>
    ))}
  </span>
);

const ChapterNumeral = ({ index }) => (
  <span className="relative block select-none leading-none" aria-hidden="true">
    <span
      className="block font-assistant-extrabold text-transparent"
      style={{ WebkitTextStroke: "1.5px rgba(255,222,89,0.38)", fontSize: "clamp(4.5rem, 9vw, 7.5rem)" }}
    >
      {String(index + 1).padStart(2, "0")}
    </span>
    <span
      className="absolute inset-0 block font-assistant-extrabold text-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      style={{ fontSize: "clamp(4.5rem, 9vw, 7.5rem)" }}
    >
      {String(index + 1).padStart(2, "0")}
    </span>
  </span>
);

export default function Offerings({ t, spotlight, language }) {
  const [showFlyerModal, setShowFlyerModal] = useState(false);
  const { reduced } = useMotionPrefs();

  const requestFlyer = (key) => {
    openWhatsApp(key === "body" ? "flyerBody" : "flyerSpeaking", language);
    setShowFlyerModal(false);
  };

  return (
    <section id="services" className="relative overflow-hidden pt-24 md:pt-32">
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <SectionKicker>{spotlight.kicker}</SectionKicker>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-6 font-assistant-extrabold tracking-tight text-white"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.15 }}
        >
          {spotlight.promiseTitle}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.72, delay: 0.08, ease: EASE }}
          className="text-balance mt-5 text-lg leading-relaxed text-slate-300 md:text-xl"
        >
          {spotlight.promiseSubtitle}
        </motion.p>
      </div>

      {/* Signature keynote - full-bleed cinema poster */}
      <div className="relative mt-16 w-full overflow-hidden md:mt-20">
        <img
          src={lectureImages[3].src}
          alt={lectureImages[3].alt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-[52%_24%] md:object-[center_22%]"
        />
        {/* Base wash + a strong lower scrim so the text never drowns in the
            photo (critical on mobile, where the copy sits over a busy frame) */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#050505_0%,rgba(5,5,5,0.35)_22%,rgba(5,5,5,0.62)_46%,rgba(5,5,5,0.9)_70%,#050505_92%)] md:bg-[linear-gradient(180deg,#050505_0%,rgba(5,5,5,0.22)_28%,rgba(5,5,5,0.45)_54%,rgba(5,5,5,0.9)_86%,#050505_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-ink via-ink/70 to-transparent" />
        {!reduced && (
          <motion.div
            aria-hidden="true"
            className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-gold/10 to-transparent blur-2xl"
            animate={{ x: ["-20%", "240%"] }}
            transition={{ duration: 9, repeat: Infinity, repeatDelay: 4, ease: "linear" }}
          />
        )}

        <div className="relative z-10 mx-auto flex min-h-[64vh] max-w-6xl flex-col justify-end px-6 pb-16 pt-40 md:min-h-[78vh] md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex flex-wrap items-center gap-3"
          >
            <span className="rounded-full border border-gold/40 bg-gold px-4 py-1.5 text-xs font-bold tracking-[0.24em] text-ink">
              <bdi>KEYNOTE</bdi>
            </span>
            <span className="rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-sm font-bold tracking-wide text-gold backdrop-blur-sm">
              {spotlight.signatureLead}
            </span>
          </motion.div>

          <h3
            className="mt-6 max-w-4xl font-assistant-extrabold text-white"
            style={{ fontSize: "clamp(2.5rem, 6.5vw, 4.75rem)", lineHeight: 1.08, textShadow: "0 4px 30px rgba(0,0,0,0.9), 0 2px 10px rgba(0,0,0,0.8)" }}
          >
            <WordRise text={spotlight.signatureTitlePrefix} />
          </h3>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
            className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-100 md:text-xl"
            style={{ textShadow: "0 2px 14px rgba(0,0,0,0.85)" }}
          >
            {spotlight.signatureBody}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
            className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3"
          >
            {spotlight.miniPoints.map((point) => (
              <span key={point} className="flex items-center gap-2.5 text-sm font-medium text-slate-200 md:text-base">
                <span className="h-2 w-2 flex-shrink-0 rounded-full bg-gold shadow-[0_0_10px_rgba(255,222,89,0.8)]" />
                {point}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* The two lectures - typographic chapters, no boxes */}
      <div className="mx-auto max-w-6xl px-6 pb-24 pt-16 md:pb-32 md:pt-20">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm font-semibold tracking-[0.26em] text-slate-400"
        >
          {t.services.subtitle}
        </motion.p>

        <div className="mt-14 grid gap-16 md:grid-cols-2 md:gap-0">
          {spotlight.offers.map((offer, index) => (
            <motion.article
              key={offer.key}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.12, ease: EASE }}
              className={`group relative ${index === 0 ? "md:pe-14" : "md:border-s md:border-white/10 md:ps-14"}`}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-6 rounded-3xl bg-[radial-gradient(circle_at_30%_20%,rgba(255,222,89,0.06),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="relative">
                <ChapterNumeral index={index} />
                <h4 className="mt-4 text-2xl font-assistant-extrabold leading-snug text-white md:text-3xl">
                  {offer.title}
                </h4>
                <div className="mt-4 h-px w-14 bg-gold/50 transition-all duration-500 group-hover:w-28 group-hover:bg-gold" />
                <p className="mt-5 max-w-md text-base leading-relaxed text-slate-300 md:text-lg">
                  {offer.description}
                </p>
                <p className="mt-7 text-xs font-bold tracking-[0.18em] text-gold/80">{spotlight.outcomesLabel}</p>
                <ul className="mt-3 space-y-2.5">
                  {offer.outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-center gap-3 text-base text-slate-100">
                      <Check className="h-4 w-4 flex-shrink-0 text-gold" />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-center gap-4 sm:flex-row md:mt-20">
          <MagneticButton
            onClick={() => openWhatsApp("generic", language)}
            className="flex items-center justify-center gap-3 rounded-full bg-gold px-8 py-4 text-lg font-bold text-ink shadow-[0_16px_40px_rgba(255,222,89,0.2)]"
          >
            <MessageCircle className="h-5 w-5" />
            {spotlight.primaryCta}
          </MagneticButton>
          <motion.button
            type="button"
            onClick={() => setShowFlyerModal(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-3 rounded-full border border-white/12 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-white/5"
          >
            <Send className="h-5 w-5" />
            {spotlight.secondaryCta}
          </motion.button>
        </div>
      </div>

      {/* Flyer request modal - sends a prefilled WhatsApp message per lecture */}
      <AnimatePresence>
        {showFlyerModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[140] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={() => setShowFlyerModal(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0b0b09] p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-xl font-bold">{t.services.flyerModalTitle}</h3>
                <button onClick={() => setShowFlyerModal(false)} className="text-gray-400 transition-colors hover:text-white" aria-label="✕">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <p className="mb-6 text-sm text-slate-400">{t.services.flyerModalNote}</p>
              <div className="space-y-3">
                {spotlight.offers.map((offer) => (
                  <motion.button
                    key={offer.key}
                    onClick={() => requestFlyer(offer.key)}
                    className="flex w-full items-center gap-4 rounded-xl border border-gold/20 bg-gold/[0.06] p-4 transition-all hover:border-gold/45"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <offer.icon className="h-8 w-8 flex-shrink-0 text-gold" />
                    <div className="flex-1 text-start">
                      <div className="font-semibold">{offer.title}</div>
                      <div className="text-sm text-gray-400">{t.services.flyerRequest}</div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
