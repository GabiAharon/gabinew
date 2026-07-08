import React from "react";
import { motion } from "framer-motion";
import { EASE, useMotionPrefs } from "../../lib/motion";
import { lectureImages } from "../../lib/content";
import { TextReveal } from "../ui";

// Act III opens here: more air, warmer light, the quote takes the stage in
// gold with a single spotlight sheen sweep.
export default function About({ t }) {
  const { reduced } = useMotionPrefs();

  return (
    <section id="about" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(255,222,89,0.05),transparent_55%)]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative mx-auto w-full max-w-md lg:mx-0"
          >
            <div className="absolute -inset-4 rounded-[2.4rem] bg-gold/[0.06] blur-2xl" />
            <img
              src={lectureImages[1].src}
              alt={t.hero.name}
              loading="lazy"
              className="relative aspect-[4/5] w-full rounded-[2rem] border border-white/10 object-cover shadow-[0_28px_90px_rgba(2,6,23,0.5)]"
            />
          </motion.div>

          <div>
            <TextReveal>
              <h2 className="font-assistant-extrabold text-white" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
                {t.about.title}
              </h2>
            </TextReveal>
            <div className="mt-8 space-y-6 text-lg leading-relaxed text-slate-300">
              {[t.about.p1, t.about.p2, t.about.p3].map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.7, ease: EASE }}
                >
                  {text}
                </motion.p>
              ))}
            </div>
          </div>
        </div>

        <motion.blockquote
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative mx-auto mt-20 max-w-4xl overflow-hidden text-center"
        >
          <p
            className="relative font-assistant-extrabold text-gold"
            style={{ fontSize: "clamp(1.75rem, 4.5vw, 3rem)", lineHeight: 1.25 }}
          >
            "{t.about.quote}"
            {!reduced && (
              <motion.span
                aria-hidden="true"
                className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/25 to-transparent blur-lg"
                initial={{ x: "-150%" }}
                whileInView={{ x: "1200%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, delay: 0.5, ease: "easeInOut" }}
              />
            )}
          </p>
        </motion.blockquote>
      </div>
    </section>
  );
}
