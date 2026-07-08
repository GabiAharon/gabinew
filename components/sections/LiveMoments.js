import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Camera, ChevronLeft, ChevronRight } from "lucide-react";
import { EASE, useIsMobile, useMotionPrefs } from "../../lib/motion";
import { lectureImages } from "../../lib/content";

// 3D coverflow of live lecture photos. Autoplay is gated by motion prefs
// and pauses on hover; only the visible cards stay eagerly loaded.
const LectureFeatureCarousel = ({ images, interval = 4000 }) => {
  const isMobile = useIsMobile();
  const { reduced } = useMotionPrefs();
  const [currentIndex, setCurrentIndex] = useState(Math.floor(images.length / 2));
  const [paused, setPaused] = useState(false);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (reduced || paused) return;
    const timer = setInterval(handleNext, interval);
    return () => clearInterval(timer);
  }, [handleNext, interval, reduced, paused]);

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative z-10 h-[340px] w-full md:h-[460px]">
        <div className="relative flex h-full w-full items-center justify-center [perspective:1000px]" dir="ltr">
          {images.map((image, index) => {
            const offset = index - currentIndex;
            const total = images.length;
            let position = (offset + total) % total;
            if (position > Math.floor(total / 2)) position -= total;

            const isCenter = position === 0;
            const isAdjacent = Math.abs(position) === 1;
            const translateX = isMobile ? position * 58 : position * 45;
            const scale = isCenter ? 1 : isAdjacent ? 0.84 : 0.7;
            const opacity = isCenter ? 1 : isAdjacent ? 0.42 : 0;

            return (
              <motion.button
                key={image.src}
                type="button"
                className="absolute flex h-72 w-40 items-center justify-center rounded-[2rem] sm:h-80 sm:w-48 md:h-[430px] md:w-64"
                onClick={() => setCurrentIndex(index)}
                initial={false}
                animate={{ x: `${translateX}%`, scale, rotateY: position * -10, opacity }}
                transition={{ duration: reduced ? 0 : 0.55, ease: EASE }}
                style={{
                  zIndex: isCenter ? 10 : isAdjacent ? 5 : 1,
                  filter: isCenter ? "blur(0px)" : "blur(4px)",
                  visibility: Math.abs(position) > 1 ? "hidden" : "visible",
                }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-white/12 bg-white/5 shadow-[0_28px_80px_rgba(2,6,23,0.55)]">
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading={isCenter ? "eager" : "lazy"}
                    className="h-full w-full object-cover"
                  />
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      isCenter
                        ? "bg-gradient-to-t from-ink/40 via-transparent to-transparent"
                        : "bg-gradient-to-t from-ink/75 via-ink/25 to-ink/10"
                    }`}
                  />
                  <div
                    className={`absolute inset-0 rounded-[2rem] border transition-all duration-500 ${
                      isCenter
                        ? "border-gold/60 shadow-[0_0_45px_rgba(255,222,89,0.3)]"
                        : "border-white/8"
                    }`}
                  />
                </div>
              </motion.button>
            );
          })}

          <motion.button
            type="button"
            onClick={handlePrev}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="absolute left-0 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-ink/70 text-white/80 backdrop-blur-md transition-colors hover:text-gold sm:left-4"
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5" />
          </motion.button>

          <motion.button
            type="button"
            onClick={handleNext}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="absolute right-0 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-ink/70 text-white/80 backdrop-blur-md transition-colors hover:text-gold sm:right-4"
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5" />
          </motion.button>
        </div>
      </div>

      <div className="mt-2 flex justify-center gap-2">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setCurrentIndex(index)}
            className={`rounded-full transition-all duration-300 ${
              index === currentIndex ? "h-2 w-8 bg-gold" : "h-2 w-2 bg-white/25 hover:bg-white/45"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default function LiveMoments({ t }) {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 flex items-center justify-center gap-3"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/40" />
          <span className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-gold/70">
            <Camera className="h-4 w-4" />
            {t.hero.liveInAction}
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/40" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <LectureFeatureCarousel images={lectureImages} interval={4000} />
        </motion.div>
      </div>
    </section>
  );
}
