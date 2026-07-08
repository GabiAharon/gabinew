import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { EASE, useMotionPrefs } from "../../lib/motion";

// Act I set piece: the headline arrives physically compressed - tight
// letter-spacing, squashed, dim - and *decompresses* as it scrolls into
// view. The typography performs the transformation the lecture promises.
export default function FearToPresence({ t, sectionRef }) {
  const localRef = useRef(null);
  const ref = sectionRef || localRef;
  const { reduced } = useMotionPrefs();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const letterSpacing = useTransform(scrollYProgress, [0, 1], ["-0.045em", "0em"]);
  const scaleY = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.4, 1]);

  const decompress = reduced ? {} : { letterSpacing, scaleY, opacity };

  return (
    <section ref={ref} id="moment" className="relative overflow-hidden py-28 md:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(148,163,184,0.06),transparent_55%)]" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.h2
          className="font-assistant-extrabold text-slate-200"
          style={{ fontSize: "clamp(2.25rem, 6vw, 4rem)", lineHeight: 1.12, ...decompress }}
        >
          {t.fear.title}
        </motion.h2>

        <div className="mt-10 space-y-4">
          {t.fear.lines.map((line, i) => (
            <motion.p
              key={line}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.18, ease: EASE }}
              className="text-xl leading-relaxed text-slate-400 md:text-2xl"
            >
              {line}
            </motion.p>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
          className="text-balance mx-auto mt-12 max-w-2xl text-2xl font-bold leading-snug text-paper md:text-3xl"
        >
          {t.fear.pivot}
        </motion.p>

        <motion.button
          type="button"
          onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="mt-14 inline-flex flex-col items-center gap-2 text-sm font-semibold tracking-widest text-gold/85 transition-colors hover:text-gold"
        >
          {t.fear.cue}
          <ChevronDown className="h-5 w-5" />
        </motion.button>
      </div>
    </section>
  );
}
