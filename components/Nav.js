import React from "react";
import { motion } from "framer-motion";
import { Globe, MessageCircle } from "lucide-react";
import { openWhatsApp } from "../lib/links";

export default function Nav({ t, language, setLanguage, isHebrew }) {
  const scrollToSection = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-x-0 top-0 z-50 px-4 py-4 sm:px-6"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/10 bg-ink/60 px-4 py-3 backdrop-blur-md sm:px-6">
        <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.02 }}>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-xl font-extrabold text-ink shadow-[0_8px_24px_rgba(255,222,89,0.3)]">
            {isHebrew ? "ג" : "G"}
          </div>
          <span className="hidden text-lg font-medium sm:block">{t.hero.name}</span>
        </motion.div>

        <div className="hidden items-center gap-8 text-sm text-gray-400 md:flex">
          {[
            { key: "services", id: "services" },
            { key: "about", id: "about" },
            { key: "testimonials", id: "testimonials" },
            { key: "contact", id: "contact" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => scrollToSection(item.id)}
              className="transition-colors duration-300 hover:text-gold"
            >
              {t.nav[item.key]}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            onClick={() => setLanguage(language === "he" ? "en" : "he")}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 transition-all duration-300 hover:bg-white/10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Globe className="h-4 w-4" />
            <span className="text-sm font-medium"><bdi>{t.nav.switchLang}</bdi></span>
          </motion.button>
          <motion.button
            onClick={() => openWhatsApp("generic", language)}
            className="hidden items-center gap-2 rounded-full bg-gold px-5 py-2 text-sm font-bold text-ink shadow-[0_8px_24px_rgba(255,222,89,0.25)] md:flex"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle className="h-4 w-4" />
            {t.nav.cta}
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}
