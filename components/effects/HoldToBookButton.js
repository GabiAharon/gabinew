import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useMotionPrefs } from "../../lib/motion";
import { waLink } from "../../lib/links";

// The site's signature interaction: hold the button ~1.1s to "take the
// stage" - a conic gold ring fills while held; release early and it springs
// back. The micro-lesson: commitment has a threshold. Keyboard users get
// instant activation on Enter/Space; reduced motion gets a plain button.
const HOLD_SECONDS = 1.1;

export default function HoldToBookButton({ t, language }) {
  const { reduced } = useMotionPrefs();
  const progress = useMotionValue(0);
  const animRef = useRef(null);
  const doneRef = useRef(false);
  const labelIdxRef = useRef(0);
  const [labelIdx, setLabelIdx] = useState(0); // 0 idle, 1 mid, 2 almost, 3 done
  const labels = [t.finalCta.holdIdle, t.finalCta.holdMid, t.finalCta.holdAlmost, t.finalCta.holdDone];

  const href = waLink("book", language);
  const openWa = () => window.open(href, "_blank", "noopener");

  useEffect(() => {
    // Coarse label state from a per-frame motion value: only setState when
    // crossing a threshold, never every frame.
    const unsub = progress.on("change", (v) => {
      const idx = doneRef.current ? 3 : v <= 0.02 ? 0 : v < 0.55 ? 1 : 2;
      if (idx !== labelIdxRef.current) {
        labelIdxRef.current = idx;
        setLabelIdx(idx);
      }
    });
    return () => unsub();
  }, [progress]);

  const start = () => {
    if (doneRef.current) return;
    animRef.current?.stop();
    animRef.current = animate(progress, 1, {
      duration: HOLD_SECONDS * (1 - progress.get()),
      ease: "linear",
      onComplete: () => {
        doneRef.current = true;
        labelIdxRef.current = 3;
        setLabelIdx(3);
        if (navigator.vibrate) navigator.vibrate(30);
        openWa();
        setTimeout(() => {
          doneRef.current = false;
          animate(progress, 0, { duration: 0.4 });
        }, 1600);
      },
    });
  };

  const cancel = () => {
    if (doneRef.current) return;
    animRef.current?.stop();
    animRef.current = animate(progress, 0, { type: "spring", stiffness: 300, damping: 30 });
  };

  if (reduced) {
    return (
      <button
        type="button"
        onClick={openWa}
        className="inline-flex items-center gap-3 rounded-full bg-gold px-10 py-5 text-xl font-bold text-ink shadow-[0_16px_50px_rgba(255,222,89,0.25)] transition-transform hover:scale-[1.02]"
      >
        <MessageCircle className="h-6 w-6" />
        {t.finalCta.holdIdle}
      </button>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative h-48 w-48 select-none md:h-56 md:w-56">
        <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2.5" />
          <motion.circle
            cx="50" cy="50" r="46" fill="none"
            stroke="#ffde59" strokeWidth="2.5" strokeLinecap="round"
            style={{ pathLength: progress, filter: "drop-shadow(0 0 6px rgba(255,222,89,0.6))" }}
          />
        </svg>
        <motion.button
          type="button"
          onPointerDown={start}
          onPointerUp={cancel}
          onPointerLeave={cancel}
          onPointerCancel={cancel}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openWa();
            }
          }}
          onContextMenu={(e) => e.preventDefault()}
          whileTap={{ scale: 0.96 }}
          className="absolute inset-4 flex flex-col items-center justify-center gap-2 rounded-full bg-gold text-ink shadow-[0_20px_70px_rgba(255,222,89,0.3)]"
          style={{ touchAction: "none" }}
          aria-label={t.finalCta.holdIdle}
        >
          <MessageCircle className="h-7 w-7" />
          <span className="max-w-[8.5rem] px-2 text-center text-base font-bold leading-snug md:max-w-[10rem]">
            {labels[labelIdx]}
          </span>
        </motion.button>
      </div>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-slate-400 underline decoration-slate-600 underline-offset-4 transition-colors hover:text-gold"
      >
        {t.finalCta.holdHint}
      </a>
    </div>
  );
}
