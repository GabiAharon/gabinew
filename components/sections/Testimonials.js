import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMotionPrefs } from "../../lib/motion";
import { testimonialsData } from "../../lib/content";
import { TextReveal } from "../ui";

const calculateGap = (width) => {
  const minWidth = 768, maxWidth = 1456, minGap = 42, maxGap = 86;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth) return maxGap;
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
};

const CircularTestimonials = ({ testimonials, language }) => {
  const { reduced } = useMotionPrefs();
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(1200);
  const [paused, setPaused] = useState(false);
  const imageContainerRef = useRef(null);
  const isHebrew = language === "he";
  const activeTestimonial = testimonials[activeIndex];
  const PrevIcon = isHebrew ? ChevronRight : ChevronLeft;
  const NextIcon = isHebrew ? ChevronLeft : ChevronRight;

  useEffect(() => {
    const handleResize = () => {
      if (imageContainerRef.current) setContainerWidth(imageContainerRef.current.offsetWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (reduced || paused) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [reduced, paused, handleNext]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") (isHebrew ? handleNext : handlePrev)();
      if (e.key === "ArrowRight") (isHebrew ? handlePrev : handleNext)();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleNext, handlePrev, isHebrew]);

  const getImageStyle = (index) => {
    const isMobileWidth = containerWidth < 768;
    const gap = calculateGap(containerWidth);
    const lift = isMobileWidth ? gap * 0.42 : gap * 0.78;
    const sideScale = isMobileWidth ? 0.82 : 0.85;
    const sideRotate = isMobileWidth ? 10 : 15;
    const sideGap = isMobileWidth ? gap * 0.78 : gap;
    const transitionCss = reduced ? "none" : "all 0.8s cubic-bezier(.4,2,.3,1)";

    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + testimonials.length) % testimonials.length === index;
    const isRight = (activeIndex + 1) % testimonials.length === index;

    if (isActive) {
      return { zIndex: 3, opacity: 1, pointerEvents: "auto", transform: "translateX(0px) translateY(0px) scale(1) rotateY(0deg)", transition: transitionCss };
    }
    if (isLeft) {
      return { zIndex: 2, opacity: 1, pointerEvents: "auto", transform: `translateX(-${sideGap}px) translateY(-${lift}px) scale(${sideScale}) rotateY(${sideRotate}deg)`, transition: transitionCss };
    }
    if (isRight) {
      return { zIndex: 2, opacity: 1, pointerEvents: "auto", transform: `translateX(${sideGap}px) translateY(-${lift}px) scale(${sideScale}) rotateY(-${sideRotate}deg)`, transition: transitionCss };
    }
    return { zIndex: 1, opacity: 0, pointerEvents: "none", transition: transitionCss };
  };

  return (
    <div
      className="mx-auto w-full max-w-6xl px-6"
      dir={isHebrew ? "rtl" : "ltr"}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="grid items-center gap-14 md:grid-cols-[1.08fr_0.92fr]">
        <div ref={imageContainerRef} className="relative h-[20rem] w-full perspective-[1000px] sm:h-[23rem] md:h-[27rem]">
          <motion.div
            className="absolute inset-[12%] rounded-full bg-gold/10 blur-3xl"
            animate={reduced ? undefined : { opacity: [0.2, 0.38, 0.2], scale: [1, 1.08, 1] }}
            transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
          />
          {testimonials.map((testimonial, index) => (
            <img
              key={testimonial.image}
              src={testimonial.image}
              alt={testimonial.name[language]}
              loading="lazy"
              className="absolute inset-0 h-full w-full rounded-[2rem] border border-white/10 object-cover shadow-[0_24px_80px_rgba(2,8,23,0.55)]"
              style={getImageStyle(index)}
            />
          ))}
        </div>

        <div className="flex flex-col items-start text-start">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <h3 className="text-3xl font-extrabold text-white md:text-4xl">
                <bdi>{activeTestimonial.name[language]}</bdi>
              </h3>
              <p className="mt-2 text-sm font-semibold tracking-[0.18em] text-gold/70">
                {activeTestimonial.title[language]}
              </p>
              <p className="mt-6 text-lg leading-8 text-slate-300 md:text-xl">
                {reduced
                  ? activeTestimonial.content[language]
                  : activeTestimonial.content[language].split(" ").map((word, i) => (
                      <motion.span
                        key={`${activeIndex}-${i}`}
                        initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                        transition={{ duration: 0.22, ease: "easeInOut", delay: 0.025 * i }}
                        className="inline-block"
                      >
                        {word}&nbsp;
                      </motion.span>
                    ))}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center gap-4">
            <motion.button
              type="button"
              onClick={handlePrev}
              whileHover={{ scale: 1.06, backgroundColor: "#ffde59", color: "#050505" }}
              whileTap={{ scale: 0.96 }}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-ink text-white transition-colors"
              aria-label={isHebrew ? "המלצה קודמת" : "Previous testimonial"}
            >
              <PrevIcon className="h-5 w-5" />
            </motion.button>
            <motion.button
              type="button"
              onClick={handleNext}
              whileHover={{ scale: 1.06, backgroundColor: "#ffde59", color: "#050505" }}
              whileTap={{ scale: 0.96 }}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-ink text-white transition-colors"
              aria-label={isHebrew ? "המלצה הבאה" : "Next testimonial"}
            >
              <NextIcon className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Testimonials({ t, language }) {
  return (
    <section id="testimonials" className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_75%,rgba(255,222,89,0.06),transparent_28%)]" />
      <div className="relative">
        <div className="mb-14 px-6 text-center">
          <TextReveal>
            <h2 className="mb-4 font-assistant-extrabold text-white" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              {t.testimonials.title}
            </h2>
          </TextReveal>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-lg text-gray-400"
          >
            {t.testimonials.subtitle}
          </motion.p>
          {/* Honesty badge: these are samples until real testimonials arrive */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.38 }}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/[0.06] px-4 py-1.5 text-xs font-semibold tracking-wide text-gold/90"
          >
            {t.testimonials.sampleLabel} · {t.testimonials.sampleNote}
          </motion.div>
        </div>
        <div className="relative z-10">
          <CircularTestimonials testimonials={testimonialsData} language={language} />
        </div>
      </div>
    </section>
  );
}
