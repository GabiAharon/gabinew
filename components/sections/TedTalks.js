import React from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { tedTalks } from "../../lib/content";

// Deliberately compact: outbound links reframed as curation authority
// ("the talks I send people"), not a destination that competes with the CTA.
export default function TedTalks({ t }) {
  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-assistant-extrabold text-white md:text-3xl">{t.ted.title}</h2>
          <p className="mt-2 text-base text-gray-400">{t.ted.subtitle}</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {tedTalks.map((talk, i) => (
            <motion.a
              key={talk.url}
              href={talk.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group block"
            >
              <div className="relative mb-3 overflow-hidden rounded-xl">
                <img
                  src={talk.image}
                  alt={talk.title}
                  loading="lazy"
                  className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-colors duration-300 group-hover:bg-black/20">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold transition-transform duration-300 group-hover:scale-110">
                    <Play className="ms-0.5 h-5 w-5 fill-ink text-ink" />
                  </div>
                </div>
                <div className="absolute bottom-2 rounded bg-black/70 px-2 py-0.5 text-xs text-gray-300" style={{ insetInlineEnd: "0.5rem" }}>
                  <bdi>{talk.views} views</bdi>
                </div>
              </div>
              <h3 className="mb-0.5 text-sm font-semibold text-white transition-colors line-clamp-2 group-hover:text-gold">
                <bdi>{talk.title}</bdi>
              </h3>
              <p className="text-xs text-gray-500"><bdi>{talk.speaker}</bdi></p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
