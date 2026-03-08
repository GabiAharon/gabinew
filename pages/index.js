import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";
import {
  Instagram,
  Linkedin,
  MessageCircle,
  Mail,
  Globe,
  Play,
  X,
  ChevronDown,
  Star,
  Quote,
  Users,
  Mic,
  Target,
  Award,
  ArrowRight,
  Download,
  Sparkles,
  Camera,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useLanguage } from './_app';
import Head from 'next/head';

// ============================================
// MOBILE HOOK
// ============================================
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
};

// ============================================
// LECTURE IMAGES
// ============================================
const lectureImages = [
  { src: "https://i.postimg.cc/qRw4Tb0d/IMG-20241209-WA0055.jpg", alt: "Lecture 1" },
  { src: "https://i.postimg.cc/BQXsrBzv/IMG-20250109-WA0062.jpg", alt: "Lecture 2" },
  { src: "https://i.postimg.cc/nhmxzcZd/IMG-20250511-WA0122.jpg", alt: "Lecture 3" },
  { src: "https://i.postimg.cc/ZRMsppxr/IMG-20260113-WA0016.jpg", alt: "Lecture 4" },
];

const heroStageImage = "https://images.pexels.com/photos/31129059/pexels-photo-31129059.jpeg?cs=srgb&dl=pexels-kerim-isazade-2148708032-31129059.jpg&fm=jpg";
const heroPortraitImage = "https://i.postimg.cc/hjqSQKms/Untitled-design1.png";

const bodyLanguageTips = {
  he: [
    "יציבה מנצחת מתחילה בברכיים מעט רפויות, חזה מעט בחוץ, בטן טיפה בפנים וראש מורם.",
    "חוק קשר העין 80/20: שמור קשר עין ברוב הזמן והרפה רק מעט.",
    "חיוך כשאתה נכנס לחדר משדר ביטחון, יוצר חיבור ונפתח מהר יותר מול הקהל.",
    "גיוון בטונציה מייצר דרמה ומדגיש את הנקודות החשובות באמת.",
    "קצב דיבור איטי יותר לפני מסר מרכזי נותן לו משקל גבוה יותר.",
    "שתיקות יזומות יוצרות סקרנות, מאפשרות עיכול ומשדרות שליטה.",
    "כדי להימנע ממילות מילוי, דבר לאט יותר ועצור עצירה מודעת בין משפטים.",
    "אל תסתתר מאחורי הפודיום. צא אל הבמה ותן לגוף לעבוד בשבילך.",
    "הגעה מוקדמת לחלל ההרצאה מורידה חרדה ומחזקת תחושת שליטה.",
    "במקום להתמקד בפחדים שלך, מקד את תשומת הלב בקהל ובמסר.",
    "קופסת ההמחשה הווירטואלית: השתמש בידיים כדי להמחיש גודל ומשמעות בלי להסביר יותר מדי.",
    "כפות ידיים פתוחות משדרות אמינות ופתיחות, אצבע מאשימה משדרת כוחנות.",
    "לעולם אל תנתח שפת גוף בלי הקשר רחב ובלי להבין את הסיטואציה.",
    "קבע בייסליין דרך שאלות פשוטות ורק אחר כך חפש חריגות מההתנהגות הרגילה.",
    "חיוך אמיתי מגיע עד העיניים, חיוך מזויף נעצר בפה.",
    "מיקרו-הבעות פנים חושפות רגש אמיתי גם כשמנסים להסתיר אותו.",
    "נגיעות לא מודעות בפנים משדרות פעמים רבות לחץ, אי נוחות או חסימה.",
    "כיסוי אזור הפה או הפנים עשוי להעיד על הגנה, ספק או רצון להימנע מלדבר.",
    "שיקוף לא מודע של שפת גוף הוא סימן מובהק לכימיה ולסנכרון טוב.",
    "האופן שבו אדם תופס מקום במרחב מספר הרבה על צורך בשליטה ובנוכחות.",
    "הליכה מהירה ובטוחה משדרת אסרטיביות, הליכה כפופה ואיטית משדרת חוסר ביטחון.",
    "שינוי פתאומי ביציבה, בידיים או בטון צריך להדליק נורה אדומה ולגרום לך לבדוק מה קרה.",
    "תנועות ידיים פתוחות וגדולות משדרות ביטחון, ידיים סגורות או בכיסים משדרות הסתרה או אי נוחות.",
    "שבר בקול מעיד לרוב על רגש עמוק ופגיעות, לא בהכרח על שקר.",
    "כיווני מבט מספרים אם האדם שולף תמונה, צליל או רגש פנימי.",
    "כשיש התנגדות חריפה, כתיבה משותפת על דף יכולה להוריד התנגדות רגשית.",
    "חוק שלושת הסימנים: אל תסיק מסקנה לפני שראית לפחות שלושה סימנים תומכים."
  ],
  en: [
    "Winning posture starts with soft knees, open chest, engaged core, and lifted head.",
    "Use the 80/20 eye-contact rule to build trust without staring.",
    "Enter the room with a smile. It lowers tension and opens the audience.",
    "Vocal variation creates drama and highlights your key message.",
    "Slow down before an important point to give it more weight.",
    "Intentional pauses create curiosity and project control.",
    "Cut filler words by speaking slower and pausing on purpose.",
    "Do not hide behind the podium. Let your body support the message.",
    "Arriving early reduces anxiety and improves command of the room.",
    "Focus on the audience and the message, not on your fear.",
    "Use your hands to visualize size and meaning instead of overexplaining.",
    "Open palms project honesty and openness. Pointing fingers feels aggressive.",
    "Never read body language without context.",
    "Set a baseline first, then look for deviations.",
    "A real smile reaches the eyes. A fake smile usually does not.",
    "Micro-expressions often reveal the emotion someone is trying to hide.",
    "Unconscious face touching often signals stress or discomfort.",
    "Covering the mouth or face can signal protection, doubt, or withdrawal.",
    "Mirroring body language is a strong sign of chemistry and alignment.",
    "How someone uses physical space says a lot about control and presence.",
    "A confident walk projects assertiveness. A collapsed walk weakens presence.",
    "A sudden shift in posture, gesture, or tone is a cue to reassess the moment.",
    "Open gestures project confidence. Closed gestures often signal discomfort.",
    "A breaking voice usually signals deep emotion, not necessarily deception.",
    "Eye direction often hints at whether someone is recalling visuals, sounds, or feelings.",
    "When resistance is high, writing ideas down together can lower emotional friction.",
    "Use the three-sign rule before jumping to conclusions."
  ]
};

const servicesSpotlightContent = {
  he: {
    kicker: "הרצאה וסדנאות לארגונים",
    promiseTitle: "הרצאה שמחזיקה חדר ומשאירה אנשים עם כלים.",
    promiseSubtitle:
      "שפת גוף, נוכחות ועמידה מול קהל באופן חד, חווייתי ויישומי.",
    miniPoints: [
      "פותחת את הקהל מהר",
      "נותנת כלים שנשארים אחרי האירוע",
      "מתאימה לכנסים, הנהלות וצוותים"
    ],
    signatureLabel: "הרצאת הדגל",
    signatureBody:
      "״הבמה הכי גדולה היא החיים עצמם״ היא הרצאה שמחברת בין ביטחון, נוכחות והשפעה באופן שנשאר עם הקהל גם אחרי שיוצאים מהחדר.",
    offers: [
      {
        key: "body",
        icon: Target,
        accent: "from-amber-300/18 via-amber-200/8 to-transparent",
        edge: "border-amber-300/20",
        iconWrap: "from-amber-200/20 to-amber-400/10",
        iconColor: "text-amber-200",
        title: "שפת גוף ותקשורת לא מילולית",
        description: "איך לקרוא את החדר, לשדר אמינות ולבנות נוכחות שמשפיעה.",
        outcomes: ["קריאת שפת גוף", "יצירת אמון מיידי"]
      },
      {
        key: "speaking",
        icon: Mic,
        accent: "from-sky-300/18 via-sky-200/8 to-transparent",
        edge: "border-sky-300/20",
        iconWrap: "from-sky-200/20 to-sky-400/10",
        iconColor: "text-sky-200",
        title: "עמידה מול קהל ונוכחות",
        description: "איך לעלות לבמה רגוע יותר, להחזיק קול יציב ולהעביר מסר חד.",
        outcomes: ["התגברות על פחד קהל", "קול וטונציה"]
      }
    ],
    primaryCta: "בואו נדבר",
    secondaryCta: "הורידו פלייר"
  },
  en: {
    kicker: "Talks and workshops for organizations",
    promiseTitle: "A talk that holds the room and leaves people with tools.",
    promiseSubtitle:
      "Body language, presence and public speaking delivered in a sharp, experiential and practical format.",
    miniPoints: [
      "Opens the room quickly",
      "Leaves people with tools they keep using",
      "Fits conferences, leadership teams and workshops"
    ],
    signatureLabel: "Signature keynote",
    signatureBody:
      "\"The Biggest Stage is Life Itself\" connects confidence, presence and influence in a way that stays with the audience after the room clears.",
    offers: [
      {
        key: "body",
        icon: Target,
        accent: "from-amber-300/18 via-amber-200/8 to-transparent",
        edge: "border-amber-300/20",
        iconWrap: "from-amber-200/20 to-amber-400/10",
        iconColor: "text-amber-200",
        title: "Body Language & Non-Verbal Communication",
        description:
          "Learn to read the room, project trust and build influence before saying a word.",
        outcomes: ["Reading body language", "Building instant trust"]
      },
      {
        key: "speaking",
        icon: Mic,
        accent: "from-sky-300/18 via-sky-200/8 to-transparent",
        edge: "border-sky-300/20",
        iconWrap: "from-sky-200/20 to-sky-400/10",
        iconColor: "text-sky-200",
        title: "Public Speaking & Presence",
        description:
          "Learn to step on stage calmer, hold your voice steady and land a sharp message.",
        outcomes: ["Overcoming stage fear", "Voice and tonality"]
      }
    ],
    primaryCta: "Let's Talk",
    secondaryCta: "Download Flyer"
  }
};

// ============================================
// LECTURE FEATURE CAROUSEL
// ============================================
const LectureFeatureCarousel = ({ images, interval = 4000 }) => {
  const isMobile = useIsMobile();
  const [currentIndex, setCurrentIndex] = useState(Math.floor(images.length / 2));

  useEffect(() => {
    images.forEach((img) => {
      const preloaded = new Image();
      preloaded.src = img.src;
    });
  }, [images]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const timer = setInterval(handleNext, interval);
    return () => clearInterval(timer);
  }, [handleNext, interval]);

  return (
    <div className="relative w-full">
      <div className="absolute inset-0 z-0 opacity-40" aria-hidden="true">
        <div className="absolute left-[-12%] top-10 h-48 w-48 rounded-full bg-[radial-gradient(circle_farthest-side,rgba(59,130,246,0.22),rgba(255,255,255,0))] blur-2xl" />
        <div className="absolute bottom-0 right-[-10%] h-52 w-52 rounded-full bg-[radial-gradient(circle_farthest-side,rgba(168,85,247,0.24),rgba(255,255,255,0))] blur-2xl" />
      </div>

      <div className="relative z-10 h-[340px] w-full md:h-[460px]">
        <div className="relative flex h-full w-full items-center justify-center [perspective:1000px]">
          {images.map((image, index) => {
            const offset = index - currentIndex;
            const total = images.length;
            let position = (offset + total) % total;

            if (position > Math.floor(total / 2)) {
              position -= total;
            }

            const isCenter = position === 0;
            const isAdjacent = Math.abs(position) === 1;
            const translateX = isMobile ? position * 58 : position * 45;
            const scale = isCenter ? 1 : isAdjacent ? 0.84 : 0.7;
            const opacity = isCenter ? 1 : isAdjacent ? 0.42 : 0;

            return (
              <motion.button
                key={index}
                type="button"
                className="absolute flex h-72 w-40 items-center justify-center rounded-[2rem] sm:h-80 sm:w-48 md:h-[430px] md:w-64"
                onClick={() => setCurrentIndex(index)}
                initial={false}
                animate={{
                  x: `${translateX}%`,
                  scale,
                  rotateY: position * -10,
                  opacity,
                }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
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
                    className="h-full w-full object-cover"
                  />
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      isCenter
                        ? "bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"
                        : "bg-gradient-to-t from-slate-950/75 via-slate-950/25 to-slate-950/10"
                    }`}
                  />
                  <div
                    className={`absolute inset-0 rounded-[2rem] border transition-all duration-500 ${
                      isCenter
                        ? "border-blue-300/70 shadow-[0_0_45px_rgba(96,165,250,0.45)]"
                        : "border-white/8"
                    }`}
                  />
                </div>
              </motion.button>
            );
          })}
        </div>

        <motion.button
          type="button"
          onClick={handlePrev}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="absolute left-0 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-slate-950/65 text-white/80 backdrop-blur-md transition-colors hover:text-white sm:left-4"
        >
          <ChevronLeft className="h-5 w-5" />
        </motion.button>

        <motion.button
          type="button"
          onClick={handleNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="absolute right-0 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-slate-950/65 text-white/80 backdrop-blur-md transition-colors hover:text-white sm:right-4"
        >
          <ChevronRight className="h-5 w-5" />
        </motion.button>
      </div>

      <div className="mt-2 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentIndex(index)}
            className={`rounded-full transition-all duration-300 ${
              index === currentIndex ? "h-2 w-8 bg-blue-400" : "h-2 w-2 bg-white/25 hover:bg-white/45"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// SIGNATURE LECTURE BADGE
// ============================================
const SignatureLectureBadge = ({ label, title }) => (
  <motion.div className="relative inline-flex flex-col items-center gap-2 my-6">
    <div className="flex items-center gap-2">
      <div className="h-px w-12 bg-gradient-to-r from-transparent via-amber-400/60 to-amber-400/60" />
      <span className="text-xs text-amber-400/70 font-light tracking-widest uppercase">{label}</span>
      <div className="h-px w-12 bg-gradient-to-l from-transparent via-amber-400/60 to-amber-400/60" />
    </div>
    <div className="relative">
      <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-amber-500/10 border border-amber-400/20 shadow-lg shadow-amber-500/10">
        <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
        </svg>
        <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-amber-200 via-yellow-200 to-amber-200 bg-clip-text text-transparent" style={{ fontFamily: "'Assistant', sans-serif" }}>
          "{title}"
        </span>
      </div>
      <motion.div className="absolute -top-1 -right-1 w-2 h-2" animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}>
        <div className="w-full h-full bg-amber-300 rounded-full blur-sm" />
      </motion.div>
      <motion.div className="absolute -bottom-1 -left-1 w-2 h-2" animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, delay: 1 }}>
        <div className="w-full h-full bg-yellow-300 rounded-full blur-sm" />
      </motion.div>
    </div>
  </motion.div>
);

// ============================================
// FLOATING PARTICLES BACKGROUND
// ============================================
const FloatingParticles = () => {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const count = isMobile ? 10 : 30;
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
          initial={{ x: `${Math.random() * 100}%`, y: `${Math.random() * 100}%` }}
          animate={{ y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`], x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`], scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 15 + Math.random() * 20, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
};

// ============================================
// ANIMATED COUNTER
// ============================================
const AnimatedCounter = ({ value, suffix = "", duration = 2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [display, setDisplay] = useState(0);
  const numeric = parseInt(value.replace(/[^0-9]/g, ''));

  useEffect(() => {
    if (!isInView) return;
    let startTime;
    const animate = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / (duration * 1000), 1);
      setDisplay(Math.floor((1 - Math.pow(1 - progress, 3)) * numeric));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, numeric, duration]);

  return <span ref={ref}>{display}{suffix}</span>;
};

// ============================================
// MORPHING WORD CYCLE
// ============================================
const MorphingWordCycle = ({ words, interval = 2200, className = "", wordClassName = "" }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [measuredWidth, setMeasuredWidth] = useState("auto");
  const measureRef = useRef(null);

  useEffect(() => {
    const updateWidth = () => {
      if (!measureRef.current) return;
      const activeWord = measureRef.current.children[activeIndex];
      if (!activeWord) return;
      setMeasuredWidth(`${Math.ceil(activeWord.getBoundingClientRect().width)}px`);
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [activeIndex, words]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [interval, words.length]);

  const variants = {
    hidden: { y: -20, opacity: 0, filter: "blur(8px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: {
      y: 20,
      opacity: 0,
      filter: "blur(8px)",
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  return (
    <>
      <div
        ref={measureRef}
        aria-hidden="true"
        className="absolute pointer-events-none opacity-0"
        style={{ visibility: "hidden" }}
      >
        {words.map((word, index) => (
          <span key={index} className={`inline-block whitespace-nowrap px-2 font-assistant-extrabold ${wordClassName}`}>
            {word}
          </span>
        ))}
      </div>

      <motion.span
        className={`relative inline-flex items-center justify-center align-baseline ${className}`}
        animate={{ width: measuredWidth }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 1.2 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={words[activeIndex]}
            className={`inline-block whitespace-nowrap px-2 font-assistant-extrabold ${wordClassName}`}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {words[activeIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </>
  );
};

// ============================================
// EXPERTISE TICKER
// ============================================
const ExpertiseTicker = ({ tips }) => {
  const gap = 24;

  return (
    <div className="relative overflow-hidden rounded-full border border-white/10 bg-slate-950/88 px-4 py-2.5 backdrop-blur-xl" dir="ltr">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-slate-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-slate-950 to-transparent" />

      <div className="ticker-marquee">
        <div className="ticker-track" style={{ gap: `${gap}px` }}>
          {[0, 1].map((groupIndex) => (
            <div
              key={groupIndex}
              className="flex items-center"
              style={{ gap: `${gap}px` }}
            >
            {tips.map((tip, index) => (
              <div
                key={`${tip}-${groupIndex}-${index}`}
                className="flex items-center"
                style={{ gap: `${gap}px` }}
              >
                <span className="font-assistant" dir="rtl">{tip}</span>
                <span className="h-6 w-px bg-white/10" />
              </div>
            ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================
// MAGNETIC BUTTON
// ============================================
const MagneticButton = ({ children, onClick, className }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { damping: 15, stiffness: 150 });
  const ySpring = useSpring(y, { damping: 15, stiffness: 150 });

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      className={className}
      style={{ x: xSpring, y: ySpring }}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (rect) {
          x.set((e.clientX - rect.left - rect.width / 2) * 0.15);
          y.set((e.clientY - rect.top - rect.height / 2) * 0.15);
        }
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
};

// ============================================
// TEXT REVEAL
// ============================================
const TextReveal = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        animate={isInView ? { y: 0 } : { y: "100%" }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// ============================================
// GLOWING ORB CURSOR
// ============================================
const GlowingOrb = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const move = (e) => { setPos({ x: e.clientX, y: e.clientY }); setVisible(true); };
    const leave = () => setVisible(false);
    window.addEventListener('mousemove', move);
    document.body.addEventListener('mouseleave', leave);
    return () => { window.removeEventListener('mousemove', move); document.body.removeEventListener('mouseleave', leave); };
  }, []);
  return (
    <motion.div
      className="fixed w-64 h-64 rounded-full pointer-events-none z-[1] hidden md:block"
      style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)', left: pos.x - 128, top: pos.y - 128 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.8 }}
      transition={{ duration: 0.3 }}
    />
  );
};

// ============================================
// TRANSLATIONS
// ============================================
const translations = {
  he: {
    nav: { services: "שירותים", about: "אודות", testimonials: "המלצות", contact: "צור קשר", switchLang: "EN" },
    hero: {
      greeting: "שלום, אני",
      name: "גבי אהרון",
      title: "מומחה לשפת גוף ועמידה מול קהל",
      morphLabel: "מפחד לנוכחות",
      morphLead: "כשאני צריך לעמוד מול קהל אני",
      morphWords: ["חושש", "נלחץ", "נמנע", "מתכווץ", "מצפה", "מתרגש", "נהנה", "משפיע"],
      subtitle: "מסייע למנהלים, יזמים ואנשי מקצוע להפוך לדוברים בטוחים ומשפיעים",
      cta: "בואו נדבר",
      ctaSecondary: "גלו עוד",
      liveInAction: "בפעולה",
      signatureLecture: "ההרצאה שלי",
      lectureTitle: "הבמה הכי גדולה היא החיים עצמם"
    },
    stats: { years: "שנות ניסיון", lectures: "הרצאות וסדנאות", participants: "משתתפים", satisfaction: "שביעות רצון" },
    services: {
      title: "ההרצאות והסדנאות", subtitle: "כלים פרקטיים שתוכלו ליישם מיד",
      bodyLanguage: { title: "שפת גוף ותקשורת לא מילולית", description: "למדו לקרוא ולהשתמש בשפת הגוף כדי להשפיע, לשכנע וליצור אמון מיידי. סדנה אינטראקטיבית עם תרגול מעשי.", features: ["קריאת שפת גוף", "יצירת רושם ראשוני", "זיהוי שקרים", "בניית אמון"] },
      publicSpeaking: { title: "עמידה מול קהל ונוכחות", description: "הפכו כל הופעה לחוויה בלתי נשכחת. טכניקות מוכחות לעמידה בטוחה, קול משכנע והעברת מסר חזק.", features: ["התגברות על פחד קהל", "טכניקות קול", "בניית מצגת", "אימפרוביזציה"] },
      downloadFlyer: "הורידו פלייר"
    },
    about: { title: "קצת עליי", p1: "אני גבי אהרון - מנהל, מהנדס מכונות ואיש של אנשים. בשנים האחרונות עובד עם מגוון רחב של אנשים - בני נוער, יזמים ומורים.", p2: "המטרה שלי היא לחשוף את הפוטנציאל הסמוי שיש בכל אחד מאיתנו להשפיע, לשכנע ולהוביל שינוי.", p3: "היכולת לעמוד מול קהל בביטחון, להשתמש בשפת גוף מדויקת ולהעביר מסר חזק - היא לא רק כלי, היא נשק סודי.", quote: "הבמה הכי גדולה היא החיים עצמם" },
    testimonials: { title: "מה אומרים עליי", subtitle: "משובים מלקוחות ומשתתפים" },
    ted: { title: "הרצאות TED מומלצות", subtitle: "אוסף מובחר של ההרצאות הכי טובות בנושא שפת גוף ודיבור מול קהל", watch: "צפייה" },
    contact: { title: "בואו נדבר", subtitle: "מעוניינים בהרצאה או סדנה לארגון שלכם? אשמח לשמוע מכם", whatsapp: "שלחו הודעה בוואטסאפ", email: "שלחו מייל", or: "או עקבו אחריי" },
    footer: { rights: "כל הזכויות שמורות", made: "נוצר עם" }
  },
  en: {
    nav: { services: "Services", about: "About", testimonials: "Testimonials", contact: "Contact", switchLang: "עב" },
    hero: {
      greeting: "Hello, I'm",
      name: "Gabi Aharon",
      title: "Body Language & Public Speaking Expert",
      morphLabel: "From tension to presence",
      morphLead: "When I need to stand in front of a crowd, I feel",
      morphWords: ["hesitant", "nervous", "guarded", "prepared", "excited", "present", "grounded", "impactful"],
      subtitle: "Helping executives, entrepreneurs and professionals become confident and influential speakers",
      cta: "Let's Talk",
      ctaSecondary: "Learn More",
      liveInAction: "Live in Action",
      signatureLecture: "My Signature Talk",
      lectureTitle: "The Biggest Stage is Life Itself"
    },
    stats: { years: "Years Experience", lectures: "Lectures & Workshops", participants: "Participants", satisfaction: "Satisfaction" },
    services: {
      title: "Lectures & Workshops", subtitle: "Practical tools you can implement immediately",
      bodyLanguage: { title: "Body Language & Non-Verbal Communication", description: "Learn to read and use body language to influence, persuade and build instant trust. Interactive workshop with hands-on practice.", features: ["Reading body language", "First impressions", "Detecting deception", "Building trust"] },
      publicSpeaking: { title: "Public Speaking & Presence", description: "Turn every appearance into an unforgettable experience. Proven techniques for confident stance, persuasive voice and powerful messaging.", features: ["Overcoming stage fright", "Voice techniques", "Presentation building", "Improvisation"] },
      downloadFlyer: "Download Flyer"
    },
    about: { title: "About Me", p1: "I'm Gabi Aharon - a manager, mechanical engineer, and people person. In recent years, I've been working with diverse groups - teenagers, entrepreneurs, and educators.", p2: "My mission is to unlock the hidden potential within each of us to influence, persuade, and lead change.", p3: "The ability to stand confidently before an audience, use precise body language, and deliver a powerful message - is not just a tool, it's a secret weapon.", quote: "The biggest stage is life itself" },
    testimonials: { title: "What They Say", subtitle: "Feedback from clients and participants" },
    ted: { title: "Recommended TED Talks", subtitle: "A curated collection of the best talks on body language and public speaking", watch: "Watch" },
    contact: { title: "Let's Connect", subtitle: "Interested in a lecture or workshop for your organization? I'd love to hear from you", whatsapp: "Message on WhatsApp", email: "Send Email", or: "Or follow me" },
    footer: { rights: "All rights reserved", made: "Made with" }
  }
};

// ============================================
// DATA
// ============================================
const testimonialsData = [
  { id: 1, name: { he: "ד״ר שרה כהן", en: "Dr. Sarah Cohen" }, title: { he: "מנהלת משאבי אנוש", en: "HR Director" }, content: { he: "גבי הוא מרצה יוצא דופן. ההרצאה שלו על שפת גוף שינתה לחלוטין את האופן שבו הצוות שלנו מתנהל. הכלים הפרקטיים מיושמים אצלנו עד היום.", en: "Gabi is an exceptional speaker. His lecture on body language completely changed how our team operates. The practical tools are still being used today." }, image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" },
  { id: 2, name: { he: "אורי לוי", en: "Uri Levy" }, title: { he: "מנכ״ל", en: "CEO" }, content: { he: "הזמנתי את גבי להרצות בכנס השנתי שלנו. התגובות היו מדהימות! המשתתפים עדיין מיישמים את הטכניקות. מרצה שיודע להעביר תוכן מורכב בצורה מרתקת.", en: "I invited Gabi to speak at our annual conference. The response was amazing! Participants are still implementing the techniques. A speaker who conveys complex content fascinatingly." }, image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
  { id: 3, name: { he: "דנה אביב", en: "Dana Aviv" }, title: { he: "מנהלת הדרכות", en: "Training Manager" }, content: { he: "גבי הדריך את מנהלי המכירות שלנו על שפת גוף ונוכחות. התוצאות היו מיידיות - עלייה של 25% בשביעות רצון הלקוחות!", en: "Gabi trained our sales managers on body language and presence. The results were immediate - 25% increase in customer satisfaction!" }, image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" },
];

const tedTalks = [
  { title: "Your Body Language May Shape Who You Are", speaker: "Amy Cuddy", url: "https://www.ted.com/talks/amy_cuddy_your_body_language_may_shape_who_you_are", views: "71M+", image: "https://img.youtube.com/vi/Ks-_Mh1QhMc/mqdefault.jpg" },
  { title: "How to Speak So That People Want to Listen", speaker: "Julian Treasure", url: "https://www.ted.com/talks/julian_treasure_how_to_speak_so_that_people_want_to_listen", views: "50M+", image: "https://img.youtube.com/vi/eIho2S0ZahI/mqdefault.jpg" },
  { title: "The Power of Vulnerability", speaker: "Brené Brown", url: "https://www.ted.com/talks/brene_brown_the_power_of_vulnerability", views: "62M+", image: "https://img.youtube.com/vi/iCvmsMzlF7o/mqdefault.jpg" },
];

// ============================================
// CINEMATIC INTRO
// ============================================
const CinematicIntro = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);
  // 0=dark  1=letters fly in  2=impact  3=name chars  4=tagline  5=exit

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 250),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 2100),
      setTimeout(() => setPhase(4), 3400),
      setTimeout(() => setPhase(5), 5000),
      setTimeout(onComplete,          5900),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const nameChars = ["ג","ב","י"," ","א","ה","ר","ו","ן"];
  const tagline   = "מרצה לעמידה מול קהל ותקשורת לא מילולית";

  return (
    <AnimatePresence>
      {phase < 5 && (
        <motion.div
          key="cinematic-intro"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden select-none"
          style={{ background: '#050505' }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.9, ease: [0.33, 1, 0.68, 1] }}
        >
          {/* Ambient pulse after impact */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.12) 0%, transparent 65%)',
              opacity: 0,
            }}
            animate={phase >= 2 ? { opacity: [0, 1, 0.4] } : {}}
            transition={{ duration: 1.2 }}
          />

          {/* Shockwave rings on impact */}
          {phase === 2 && [0, 1, 2, 3].map(i => (
            <motion.div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                border: `${1.5 - i * 0.3}px solid`,
                borderColor: i % 2 === 0 ? 'rgba(59,130,246,0.5)' : 'rgba(139,92,246,0.4)',
                left: '50%', top: '50%',
              }}
              initial={{ width: 20, height: 20, x: '-50%', y: '-50%', opacity: 1 }}
              animate={{ width: 700 + i * 120, height: 700 + i * 120, x: '-50%', y: '-50%', opacity: 0 }}
              transition={{ duration: 1.4, delay: i * 0.12, ease: 'easeOut' }}
            />
          ))}

          {/* White flash on impact */}
          {phase === 2 && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'white', zIndex: 5 }}
              initial={{ opacity: 0.55 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          )}

          {/* ===== COMBINED: GA + Name always rendered, animate together ===== */}
          <div className="flex flex-col items-center gap-6 px-6" style={{ zIndex: 10 }}>

            {/* GA — visible only in phases 1 & 2, fades out in phase 3 */}
            <motion.div
              className="relative flex items-center justify-center"
              style={{ direction: 'ltr', flexDirection: 'row' }}
              animate={phase >= 3 ? { opacity: 0, scale: 0.85, y: -20 } : { opacity: phase >= 1 ? 1 : 0 }}
              transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
            >
              {/* G */}
              <motion.span
                style={{
                  fontSize: 'clamp(130px, 22vw, 240px)',
                  fontFamily: "'Assistant', sans-serif",
                  fontWeight: 900,
                  lineHeight: 1,
                  background: 'linear-gradient(135deg, #60a5fa 0%, #818cf8 50%, #8b5cf6 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  filter: 'drop-shadow(0 0 48px rgba(59,130,246,0.7))',
                  display: 'inline-block',
                }}
                initial={{ x: '-55vw', opacity: 0, scale: 1.3 }}
                animate={
                  phase >= 2
                    ? { x: -4, opacity: 1, scale: 1 }
                    : phase >= 1
                    ? { x: '-4vw', opacity: 1, scale: 1 }
                    : { x: '-55vw', opacity: 0, scale: 1.3 }
                }
                transition={
                  phase >= 2
                    ? { duration: 0.35, ease: [0.68, -0.55, 0.265, 1.55] }
                    : { duration: 1.0, ease: [0.33, 1, 0.68, 1] }
                }
              >
                G
              </motion.span>

              {/* A */}
              <motion.span
                style={{
                  fontSize: 'clamp(130px, 22vw, 240px)',
                  fontFamily: "'Assistant', sans-serif",
                  fontWeight: 900,
                  lineHeight: 1,
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #818cf8 50%, #60a5fa 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  filter: 'drop-shadow(0 0 48px rgba(139,92,246,0.7))',
                  display: 'inline-block',
                }}
                initial={{ x: '55vw', opacity: 0, scale: 1.3 }}
                animate={
                  phase >= 2
                    ? { x: 4, opacity: 1, scale: 1 }
                    : phase >= 1
                    ? { x: '4vw', opacity: 1, scale: 1 }
                    : { x: '55vw', opacity: 0, scale: 1.3 }
                }
                transition={
                  phase >= 2
                    ? { duration: 0.35, ease: [0.68, -0.55, 0.265, 1.55] }
                    : { duration: 1.0, delay: 0.08, ease: [0.33, 1, 0.68, 1] }
                }
              >
                A
              </motion.span>
            </motion.div>

            {/* Full name — fades in at phase 3, overlapping the GA fade-out */}
            <motion.div
              className="flex flex-col items-center gap-5"
              style={{ position: 'absolute' }}
              initial={{ opacity: 0, y: 30 }}
              animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
            >
              {/* Character-by-character name */}
              <div className="flex flex-wrap justify-center" style={{ gap: '0.01em', direction: 'rtl', flexDirection: 'row' }}>
                {nameChars.map((char, i) => (
                  <motion.span
                    key={i}
                    style={{
                      fontSize: 'clamp(38px, 9vw, 96px)',
                      fontFamily: "'Assistant', sans-serif",
                      fontWeight: 900,
                      lineHeight: 1,
                      background: 'linear-gradient(135deg, #ffffff 0%, #bfdbfe 40%, #ddd6fe 80%, #ffffff 100%)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      color: 'transparent',
                      display: 'inline-block',
                      whiteSpace: 'pre',
                      filter: 'drop-shadow(0 0 20px rgba(96,165,250,0.35))',
                    }}
                    initial={{ y: 40, opacity: 0 }}
                    animate={phase >= 3 ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
                    transition={{
                      duration: 0.55,
                      delay: phase >= 3 ? i * 0.06 : 0,
                      ease: [0.33, 1, 0.68, 1],
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>

              {/* Expanding divider */}
              <motion.div
                style={{
                  height: 1,
                  background: 'linear-gradient(90deg, transparent, rgba(96,165,250,0.8), rgba(139,92,246,0.8), transparent)',
                  transformOrigin: 'center',
                  width: '70%',
                  maxWidth: 420,
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={phase >= 3 ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                transition={{ duration: 0.9, delay: 0.6, ease: [0.33, 1, 0.68, 1] }}
              />

              {/* Tagline */}
              <motion.p
                style={{
                  fontFamily: "'Heebo', sans-serif",
                  fontSize: 'clamp(15px, 3.2vw, 26px)',
                  color: '#94a3b8',
                  letterSpacing: '0.08em',
                  direction: 'rtl',
                  textAlign: 'center',
                  fontWeight: 400,
                }}
                initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
                animate={phase >= 4 ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 18, filter: 'blur(8px)' }}
                transition={{ duration: 1.1, ease: [0.33, 1, 0.68, 1] }}
              >
                {tagline}
              </motion.p>
            </motion.div>

          </div>

          {/* Subtle scanline overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
              zIndex: 1,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ============================================
// MAIN PAGE
// ============================================
export default function Home() {
  const { language, setLanguage } = useLanguage();
  const [introComplete, setIntroComplete] = useState(false);
  const handleIntroComplete = useCallback(() => setIntroComplete(true), []);
  const [showFlyerModal, setShowFlyerModal] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const isMobile = useIsMobile();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const t = translations[language];
  const isHebrew = language === 'he';
  const tickerTips = bodyLanguageTips[language];
  const serviceSpotlight = servicesSpotlightContent[language];

  useEffect(() => {
    const interval = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonialsData.length), 6000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const handleFlyerDownload = (type) => {
    const link = document.createElement('a');
    link.href = type === 'body' ? '/images/lectureflyer2.jpg' : '/images/lectureflyer1.jpg';
    link.download = type === 'body' ? 'gabi-aharon-body-language.jpg' : 'gabi-aharon-public-speaking.jpg';
    link.click();
    setShowFlyerModal(false);
  };

  return (
    <>
      <Head>
        <title>{isHebrew ? 'גבי אהרון | מומחה לשפת גוף ועמידה מול קהל' : 'Gabi Aharon | Body Language & Public Speaking Expert'}</title>
        <meta name="description" content={isHebrew ? 'מומחה לשפת גוף ועמידה מול קהל' : 'Body Language & Public Speaking Expert'} />
      </Head>

      <CinematicIntro onComplete={handleIntroComplete} />
      <GlowingOrb />
      <FloatingParticles />

      <div className={`min-h-screen bg-gradient-to-b from-slate-950 via-gray-950 to-black text-white overflow-x-hidden font-assistant ${isHebrew ? 'rtl' : 'ltr'}`}>

        {/* NAV */}
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        >
          <div className="max-w-6xl mx-auto flex items-center justify-between backdrop-blur-md bg-slate-900/50 rounded-full px-6 py-3 border border-white/10">
            <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.02 }}>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-blue-500/30">G</div>
              <span className="font-medium text-lg hidden sm:block">{isHebrew ? 'גבי אהרון' : 'Gabi Aharon'}</span>
            </motion.div>
            <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
              {[{ key: 'services', id: 'services' }, { key: 'about', id: 'about' }, { key: 'testimonials', id: 'testimonials' }, { key: 'contact', id: 'contact' }].map(item => (
                <button key={item.key} onClick={() => scrollToSection(item.id)} className="hover:text-blue-400 transition-colors duration-300">{t.nav[item.key]}</button>
              ))}
            </div>
            <motion.button onClick={() => setLanguage(language === 'he' ? 'en' : 'he')} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">{t.nav.switchLang}</span>
            </motion.button>
          </div>
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.55 }}
          className="fixed left-0 right-0 top-[86px] z-40 px-6"
        >
          <div className="max-w-6xl mx-auto">
            <ExpertiseTicker tips={tickerTips} />
          </div>
        </motion.div>

        {/* HERO */}
        <section ref={heroRef} className="relative min-h-screen overflow-hidden pt-40 md:pt-44">
          <div className="absolute inset-0">
            <img
              src={heroStageImage}
              alt="Speaker standing in front of a live audience"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.78)_0%,rgba(2,6,23,0.56)_24%,rgba(2,6,23,0.78)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.18),rgba(2,6,23,0.84)_68%)]" />
            <div className="absolute inset-x-0 top-0 h-56 bg-[linear-gradient(180deg,rgba(2,6,23,0.92),rgba(2,6,23,0))]" />
            <div className="absolute inset-x-[12%] top-[18%] h-40 rounded-full bg-[#ffde59]/8 blur-[90px]" />
          </div>

          <motion.div className="relative z-10 mx-auto flex min-h-[calc(100vh-11rem)] max-w-6xl items-center justify-center px-6" style={{ opacity: heroOpacity }}>
            <div className="w-full max-w-4xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 18, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mb-8 flex justify-center"
              >
                <div className="relative">
                  <div className="absolute inset-[-14px] rounded-full bg-[radial-gradient(circle,rgba(255,222,89,0.14),rgba(255,255,255,0))] blur-2xl" />
                  <div className="relative overflow-hidden rounded-full border border-white/15 bg-slate-950/70 p-2 shadow-[0_18px_50px_rgba(2,6,23,0.4)] backdrop-blur-md">
                    <img
                      src={heroPortraitImage}
                      alt="גבי אהרון"
                      className="h-28 w-28 rounded-full object-cover object-top md:h-32 md:w-32"
                    />
                  </div>
                </div>
              </motion.div>

              <div className="mx-auto rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.58),rgba(15,23,42,0.34))] p-8 shadow-[0_30px_100px_rgba(2,6,23,0.45)] backdrop-blur-md md:p-12">
              <div className="mb-6 inline-flex items-center rounded-full border border-white/12 bg-white/5 px-5 py-2 text-sm text-slate-100/88">
                <span className="font-medium">{isHebrew ? "נעים להכיר, אני" : "Nice to meet you, I'm"}</span>
              </div>

                <h1 className="mb-4 text-5xl font-assistant-extrabold tracking-tight text-slate-50 md:text-7xl lg:text-8xl">
                  {t.hero.name}
                </h1>

                <h2 className="mb-6 text-xl font-assistant-extrabold text-slate-100 md:text-2xl">
                  {t.hero.title}
                </h2>

                <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-slate-200/82 md:text-xl">
                  {t.hero.subtitle}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <MagneticButton
                    onClick={() => window.open('https://wa.me/972546436659', '_blank')}
                    className="group relative px-8 py-4 rounded-full bg-[#ffde59] text-slate-950 font-semibold text-lg overflow-hidden shadow-[0_16px_40px_rgba(255,222,89,0.22)]"
                  >
                    <span className="relative z-10 flex items-center gap-2"><MessageCircle className="w-5 h-5" />{t.hero.cta}</span>
                  </MagneticButton>
                  <MagneticButton onClick={() => scrollToSection('services')} className="px-8 py-4 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-all duration-300 flex items-center gap-2">
                    {t.hero.ctaSecondary}
                    <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </MagneticButton>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto mt-8 max-w-2xl"
              >
                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(90deg,rgba(15,23,42,0.82),rgba(30,41,59,0.72))] px-6 py-6 shadow-[0_24px_90px_rgba(15,23,42,0.35)] backdrop-blur-xl md:px-8 md:py-7">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_56%)]" />
                  <div className="relative">
                    <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.38em] text-slate-300/55">
                      {t.hero.morphLabel}
                    </div>
                    <div className="flex flex-col items-center gap-3 text-center">
                      <span className="text-lg font-medium leading-tight text-slate-200/80 md:text-xl">
                        {t.hero.morphLead}
                      </span>
                      <MorphingWordCycle
                        words={t.hero.morphWords}
                        interval={2200}
                        wordClassName="text-[#ffde59]"
                        className="min-h-[3.5rem] text-4xl md:min-h-[4.5rem] md:text-5xl"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2" animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ChevronDown className="w-6 h-6 text-gray-500" />
          </motion.div>
        </section>

        {/* LECTURE PHOTOS */}
        <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center justify-center gap-3 mb-10">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-blue-400/40" />
              <span className="text-blue-400/70 text-sm font-medium tracking-widest uppercase flex items-center gap-2">
                <Camera className="w-4 h-4" />{t.hero.liveInAction}
              </span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-blue-400/40" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <LectureFeatureCarousel images={lectureImages} interval={4000} />
            </motion.div>
          </div>
        </section>

        {/* STATS */}
        <section className="py-20 border-y border-white/5 relative overflow-hidden">
          <motion.div className="absolute inset-0 opacity-30" animate={{ background: ['radial-gradient(circle at 20% 50%, rgba(59,130,246,0.1) 0%, transparent 50%)', 'radial-gradient(circle at 80% 50%, rgba(139,92,246,0.1) 0%, transparent 50%)', 'radial-gradient(circle at 20% 50%, rgba(59,130,246,0.1) 0%, transparent 50%)'] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} />
          <div className="max-w-6xl mx-auto px-6 relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "10", suffix: "+", label: t.stats.years, icon: Award },
                { value: "200", suffix: "+", label: t.stats.lectures, icon: Mic },
                { value: "5000", suffix: "+", label: t.stats.participants, icon: Users },
                { value: "98", suffix: "%", label: t.stats.satisfaction, icon: Star },
              ].map((stat, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center group">
                  <motion.div whileHover={{ scale: 1.2, rotate: 10 }} transition={{ type: "spring", stiffness: 300 }}>
                    <stat.icon className="w-6 h-6 text-blue-400 mx-auto mb-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2 + i * 0.3} />
                  </div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="relative overflow-hidden py-24 md:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.12),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(251,191,36,0.08),transparent_28%),linear-gradient(180deg,#040814_0%,#07111f_48%,#040814_100%)]" />
          <motion.div
            className="absolute left-1/2 top-24 h-32 w-32 -translate-x-1/2 rounded-full bg-[#ffde59]/12 blur-3xl"
            animate={{ opacity: [0.16, 0.3, 0.16], scale: [1, 1.12, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="max-w-6xl mx-auto px-6 relative">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.03] px-5 py-2 text-xs font-semibold tracking-[0.28em] text-slate-300/85"
              >
                <span className="h-2 w-2 rounded-full bg-[#ffde59]" />
                {serviceSpotlight.kicker}
              </motion.div>
              <TextReveal className="mt-6">
                <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">{t.services.title}</h2>
              </TextReveal>
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.72, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="mt-5 text-lg leading-relaxed text-slate-300 md:text-xl"
              >
                {serviceSpotlight.promiseSubtitle}
              </motion.p>
            </div>

            <div className="grid items-center gap-8 lg:grid-cols-[1.04fr_0.96fr]">
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-slate-950/70 shadow-[0_30px_120px_rgba(2,8,23,0.45)]"
              >
                <motion.div
                  className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(125,211,252,0.12),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(255,222,89,0.12),transparent_28%)]"
                  animate={{ opacity: [0.55, 0.85, 0.55] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="relative overflow-hidden">
                  <motion.div
                    animate={{ y: [0, -8, 0], scale: [1, 1.018, 1] }}
                    transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                    className="relative h-[520px] md:h-[560px]"
                  >
                    <img
                      src={lectureImages[3].src}
                      alt={lectureImages[3].alt}
                      className="h-full w-full object-cover object-[52%_24%] md:object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/24 to-slate-900/10" />
                    <motion.div
                      className="absolute inset-y-0 w-28 bg-gradient-to-r from-transparent via-white/12 to-transparent blur-2xl"
                      animate={{ x: ["-20%", "220%"] }}
                      transition={{ duration: 8, repeat: Infinity, repeatDelay: 3, ease: "linear" }}
                    />
                  </motion.div>
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                    <div className="rounded-[1.8rem] border border-white/12 bg-slate-950/62 p-5 backdrop-blur-xl md:p-6">
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="rounded-full border border-[#ffde59]/20 bg-[#ffde59]/10 px-4 py-2 text-xs font-bold tracking-[0.24em] text-[#ffde59]">
                          KEYNOTE
                        </div>
                        <div className="rounded-full border border-white/12 bg-white/5 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-white/80">
                          {serviceSpotlight.signatureLabel}
                        </div>
                      </div>
                      <h3 className="mt-5 text-3xl font-extrabold leading-tight text-white md:text-4xl">
                        "{t.hero.lectureTitle}"
                      </h3>
                      <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">
                        {serviceSpotlight.signatureBody}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.78, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="rounded-[2.2rem] border border-white/10 bg-white/[0.04] p-7 shadow-[0_30px_120px_rgba(2,8,23,0.4)] backdrop-blur-xl md:p-9">
                  <p className="text-sm font-semibold tracking-[0.26em] text-slate-400">{t.services.subtitle}</p>
                  <h3 className="mt-5 text-3xl font-extrabold leading-tight text-white md:text-[3rem]">
                    {serviceSpotlight.promiseTitle}
                  </h3>
                  <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-300">
                    {serviceSpotlight.promiseSubtitle}
                  </p>

                  <div className="mt-8 space-y-3">
                    {serviceSpotlight.miniPoints.map((point, index) => (
                      <motion.div
                        key={point}
                        initial={{ opacity: 0, x: isHebrew ? 18 : -18 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.58, delay: 0.08 + index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                        className="flex items-center gap-3 text-base text-slate-200"
                      >
                        <span className="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[#ffde59]" />
                        <span>{point}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-10 grid gap-4">
                    {serviceSpotlight.offers.map((offer, index) => (
                      <motion.div
                        key={offer.key}
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.12 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                        className={`relative overflow-hidden rounded-[1.6rem] border bg-slate-950/45 p-5 ${offer.edge}`}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${offer.accent}`} />
                        <div className="relative flex items-start gap-4">
                          <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${offer.iconWrap}`}>
                            <offer.icon className={`h-5 w-5 ${offer.iconColor}`} />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-lg font-bold text-white">{offer.title}</h4>
                            <p className="mt-1 text-sm leading-relaxed text-slate-300">{offer.description}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {offer.outcomes.map((outcome) => (
                                <span key={outcome} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-200">
                                  {outcome}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                    <MagneticButton
                      onClick={() => window.open('https://wa.me/972546436659', '_blank')}
                      className="flex items-center justify-center gap-3 rounded-full bg-[#ffde59] px-7 py-4 text-lg font-bold text-slate-950 shadow-[0_16px_40px_rgba(255,222,89,0.2)]"
                    >
                      <MessageCircle className="h-5 w-5" />
                      {serviceSpotlight.primaryCta}
                    </MagneticButton>
                    <motion.button
                      type="button"
                      onClick={() => setShowFlyerModal(true)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center gap-3 rounded-full border border-white/12 bg-transparent px-7 py-4 text-lg font-semibold text-white transition-colors hover:bg-white/5"
                    >
                      <Download className="h-5 w-5" />
                      {serviceSpotlight.secondaryCta}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent" />
          <div className="max-w-4xl mx-auto px-6 relative">
            <div className="text-center">
              <TextReveal>
                <h2 className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">{t.about.title}</h2>
              </TextReveal>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                {[t.about.p1, t.about.p2, t.about.p3].map((text, i) => (
                  <motion.p key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }}>{text}</motion.p>
                ))}
              </div>
              <motion.blockquote initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="mt-12 relative">
                <motion.div animate={{ rotate: [0, 5, 0, -5, 0] }} transition={{ duration: 5, repeat: Infinity }}>
                  <Quote className="w-12 h-12 text-blue-400/20 absolute -top-4 left-1/2 -translate-x-1/2" />
                </motion.div>
                <motion.p className="text-2xl md:text-3xl font-medium text-blue-400 italic pt-6" animate={{ textShadow: ['0 0 20px rgba(59,130,246,0)', '0 0 30px rgba(59,130,246,0.3)', '0 0 20px rgba(59,130,246,0)'] }} transition={{ duration: 3, repeat: Infinity }}>
                  "{t.about.quote}"
                </motion.p>
              </motion.blockquote>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials" className="py-24 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <TextReveal>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">{t.testimonials.title}</h2>
              </TextReveal>
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-gray-400 text-lg">{t.testimonials.subtitle}</motion.p>
            </div>
            <div className="relative min-h-[320px]">
              <AnimatePresence mode="wait">
                {testimonialsData.map((testimonial, index) =>
                  index === activeTestimonial && (
                    <motion.div key={testimonial.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="absolute inset-0">
                      <div className="bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 rounded-3xl p-8 md:p-10 text-center">
                        <img src={testimonial.image} alt={testimonial.name[language]} className="w-20 h-20 rounded-full mx-auto mb-6 border-2 border-blue-400/30 object-cover" />
                        <p className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed italic">"{testimonial.content[language]}"</p>
                        <div className="flex items-center justify-center gap-1 mb-3">
                          {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-blue-400 fill-blue-400" />)}
                        </div>
                        <h4 className="font-semibold text-white">{testimonial.name[language]}</h4>
                        <p className="text-sm text-gray-500">{testimonial.title[language]}</p>
                      </div>
                    </motion.div>
                  )
                )}
              </AnimatePresence>
            </div>
            <div className="flex justify-center gap-2 mt-8">
              {testimonialsData.map((_, i) => (
                <button key={i} onClick={() => setActiveTestimonial(i)} className={`rounded-full transition-all duration-300 ${i === activeTestimonial ? 'w-8 h-2 bg-blue-400' : 'w-2 h-2 bg-white/20 hover:bg-white/40'}`} />
              ))}
            </div>
          </div>
        </section>

        {/* TED TALKS */}
        <section className="py-24 relative">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <TextReveal>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">{t.ted.title}</h2>
              </TextReveal>
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-gray-400 text-lg">{t.ted.subtitle}</motion.p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {tedTalks.map((talk, i) => (
                <motion.a key={i} href={talk.url} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group block">
                  <div className="relative overflow-hidden rounded-2xl mb-4">
                    <img src={talk.image} alt={talk.title} className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-6 h-6 text-white fill-white ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 rounded text-xs text-gray-300">{talk.views} views</div>
                  </div>
                  <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-2 mb-1">{talk.title}</h3>
                  <p className="text-sm text-gray-500">{talk.speaker}</p>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 to-transparent" />
          <div className="max-w-3xl mx-auto px-6 text-center relative">
            <TextReveal>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">{t.contact.title}</h2>
            </TextReveal>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-gray-400 text-lg mb-12">{t.contact.subtitle}</motion.p>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <MagneticButton onClick={() => window.open('https://wa.me/972546436659', '_blank')} className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 rounded-full text-white font-semibold text-lg flex items-center justify-center gap-3 shadow-lg shadow-green-500/25 relative overflow-hidden">
                <motion.div className="absolute inset-0 rounded-full bg-white/20" animate={{ scale: [1, 1.5], opacity: [0.5, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
                <MessageCircle className="w-5 h-5 relative z-10" />
                <span className="relative z-10">{t.contact.whatsapp}</span>
              </MagneticButton>
              <MagneticButton onClick={() => window.open('mailto:Gabiaharon@gmail.com', '_blank')} className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 text-white font-semibold flex items-center justify-center gap-3 hover:bg-white/5 transition-all">
                <Mail className="w-5 h-5" />{t.contact.email}
              </MagneticButton>
            </motion.div>
            <p className="text-gray-500 text-sm mb-6">{t.contact.or}</p>
            <div className="flex items-center justify-center gap-4">
              {[
                { icon: Instagram, url: "https://instagram.com/gabi.aharon", color: "hover:text-pink-400" },
                { icon: Linkedin, url: "https://linkedin.com/in/gabi-aharon", color: "hover:text-blue-400" },
              ].map((s, i) => (
                <motion.a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className={`w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 ${s.color} transition-all duration-300`} whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <s.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-8 border-t border-white/5">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} {isHebrew ? 'גבי אהרון' : 'Gabi Aharon'}. {t.footer.rights}.</p>
            <p className="text-gray-600 text-xs mt-2 flex items-center justify-center gap-1">{t.footer.made} <Sparkles className="w-3 h-3 text-blue-400" /></p>
          </div>
        </footer>

        {/* FLYER MODAL */}
        <AnimatePresence>
          {showFlyerModal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4" onClick={() => setShowFlyerModal(false)}>
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">{isHebrew ? 'בחר סוג הרצאה' : 'Choose Lecture Type'}</h3>
                  <button onClick={() => setShowFlyerModal(false)} className="text-gray-400 hover:text-white"><X className="w-6 h-6" /></button>
                </div>
                <div className="space-y-3">
                  <motion.button onClick={() => handleFlyerDownload('body')} className="w-full p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-purple-600/10 border border-purple-400/20 hover:border-purple-400/40 transition-all flex items-center gap-4" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Target className="w-8 h-8 text-purple-400 flex-shrink-0" />
                    <div className={isHebrew ? 'text-right flex-1' : 'text-left flex-1'}>
                      <div className="font-semibold">{t.services.bodyLanguage.title}</div>
                      <div className="text-sm text-gray-400">{isHebrew ? 'הורד פלייר' : 'Download flyer'}</div>
                    </div>
                  </motion.button>
                  <motion.button onClick={() => handleFlyerDownload('speaking')} className="w-full p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-400/20 hover:border-blue-400/40 transition-all flex items-center gap-4" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Mic className="w-8 h-8 text-blue-400 flex-shrink-0" />
                    <div className={isHebrew ? 'text-right flex-1' : 'text-left flex-1'}>
                      <div className="font-semibold">{t.services.publicSpeaking.title}</div>
                      <div className="text-sm text-gray-400">{isHebrew ? 'הורד פלייר' : 'Download flyer'}</div>
                    </div>
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
