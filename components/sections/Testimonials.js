import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { EASE, useMotionPrefs } from "../../lib/motion";
import { testimonialsData } from "../../lib/content";
import { TextReveal } from "../ui";

// A photo-free quote wall: real words carry the section. Two featured
// quotes lead in larger type with a gold frame; the rest form a clean
// grid. Each card signs off with an initial-letter medallion instead of
// a photo.
const InitialMedallion = ({ name }) => (
  <span
    aria-hidden="true"
    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-lg font-assistant-extrabold text-gold"
  >
    {name.trim()[0]}
  </span>
);

const TestimonialCard = ({ item, language, index, reduced }) => {
  const featured = Boolean(item.featured);
  return (
    <motion.figure
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: (index % 3) * 0.1, ease: EASE }}
      className={`group relative flex h-full flex-col rounded-[1.8rem] border p-7 transition-all duration-500 md:p-8 ${
        featured
          ? "border-gold/30 bg-gold/[0.05] hover:border-gold/50"
          : "border-white/10 bg-white/[0.03] hover:border-gold/30"
      }`}
    >
      <Quote className={`h-6 w-6 -scale-x-100 ${featured ? "text-gold" : "text-gold/50"}`} />
      <blockquote
        className={`mt-4 flex-1 leading-relaxed ${
          featured ? "text-lg font-medium text-slate-100 md:text-xl" : "text-base text-slate-200"
        }`}
      >
        {item.content[language]}
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-white/8 pt-5">
        <InitialMedallion name={item.name[language]} />
        <span>
          <span className="block font-bold leading-tight text-white">
            <bdi>{item.name[language]}</bdi>
          </span>
          <span className="mt-0.5 block text-sm text-gold/80">
            <bdi>{item.title[language]}</bdi>
          </span>
        </span>
      </figcaption>
    </motion.figure>
  );
};

export default function Testimonials({ t, language }) {
  const { reduced } = useMotionPrefs();
  const featured = testimonialsData.filter((item) => item.featured);
  const rest = testimonialsData.filter((item) => !item.featured);

  return (
    <section id="testimonials" className="relative overflow-hidden py-24 md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,222,89,0.05),transparent_35%)]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mb-14 text-center">
          <TextReveal>
            <h2 className="mb-4 font-assistant-extrabold text-white" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              {t.testimonials.title}
            </h2>
          </TextReveal>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="text-balance text-lg text-gray-400"
          >
            {t.testimonials.subtitle}
          </motion.p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {featured.map((item, i) => (
            <TestimonialCard key={item.id} item={item} language={language} index={i} reduced={reduced} />
          ))}
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((item, i) => (
            <TestimonialCard key={item.id} item={item} language={language} index={i} reduced={reduced} />
          ))}
        </div>
      </div>
    </section>
  );
}
