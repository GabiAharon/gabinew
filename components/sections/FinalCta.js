import React from "react";
import { motion } from "framer-motion";
import { Mail, Instagram, Linkedin } from "lucide-react";
import { EASE } from "../../lib/motion";
import { openEmail, INSTAGRAM_URL, LINKEDIN_URL } from "../../lib/links";
import { MagneticButton } from "../ui";
import HoldToBookButton from "../effects/HoldToBookButton";

// Act III climax: full presence typography — wide, gold, spacious — and the
// hold-to-book signature interaction.
export default function FinalCta({ t, language, sectionRef }) {
  return (
    <section ref={sectionRef} id="contact" className="relative overflow-hidden py-28 md:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(255,222,89,0.1),transparent_58%)]" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
          className="font-assistant-extrabold text-paper"
          style={{ fontSize: "clamp(2.5rem, 6.5vw, 4.75rem)", lineHeight: 1.1, letterSpacing: "0.01em" }}
        >
          {t.finalCta.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          className="mx-auto mt-6 max-w-xl text-xl leading-relaxed text-slate-300 md:text-2xl"
        >
          {t.finalCta.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          className="mt-14 flex justify-center"
        >
          <HoldToBookButton t={t} language={language} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-14 flex flex-col items-center gap-6"
        >
          <MagneticButton
            onClick={openEmail}
            className="flex items-center justify-center gap-3 rounded-full border border-white/20 px-8 py-3.5 font-semibold text-white transition-all hover:bg-white/5"
          >
            <Mail className="h-5 w-5" />
            {t.finalCta.email}
          </MagneticButton>

          <p className="text-sm text-gray-500">{t.finalCta.or}</p>
          <div className="flex items-center justify-center gap-4">
            {[
              { icon: Instagram, url: INSTAGRAM_URL, label: "Instagram" },
              { icon: Linkedin, url: LINKEDIN_URL, label: "LinkedIn" },
            ].map((s) => (
              <motion.a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 transition-all duration-300 hover:text-gold"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <s.icon className="h-5 w-5" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
