import React, { useEffect, useMemo, useRef, useState } from "react";
import { Accessibility, Minus, Plus, RotateCcw, X } from "lucide-react";

const STORAGE_KEY = "gabiAccessibilitySettings";

const DEFAULT_SETTINGS = {
  fontScale: 100,
  enhancedContrast: false,
  underlineLinks: false,
  readableFont: false,
  reducedMotion: false,
  highlightFocus: false,
  grayscale: false,
  hideImages: false,
  increasedLineHeight: false,
  userSetHighlightFocus: false,
};

const COPY = {
  he: {
    open: "נגישות",
    title: "נגישות",
    description: "התאמות תצוגה מהירות לנוחות הקריאה והשימוש באתר.",
    textSize: "גודל טקסט",
    increase: "הגדל טקסט",
    decrease: "הקטן טקסט",
    reset: "איפוס התאמות",
    close: "סגירה",
    actions: [
      { key: "enhancedContrast", label: "ניגודיות משופרת" },
      { key: "underlineLinks", label: "הדגשת קישורים" },
      { key: "readableFont", label: "תמיכה בדיסלקסיה" },
      { key: "increasedLineHeight", label: "גובה שורה" },
      { key: "grayscale", label: "גווני אפור" },
      { key: "hideImages", label: "הסתרת תמונות" },
      { key: "reducedMotion", label: "הפחתת אנימציות" },
      { key: "highlightFocus", label: "הדגשת פוקוס" },
    ],
  },
  en: {
    open: "Accessibility",
    title: "Accessibility",
    description: "Quick visual adjustments for easier reading and navigation.",
    textSize: "Text size",
    increase: "Increase text",
    decrease: "Decrease text",
    reset: "Reset settings",
    close: "Close",
    actions: [
      { key: "enhancedContrast", label: "Enhanced contrast" },
      { key: "underlineLinks", label: "Underline links" },
      { key: "readableFont", label: "Dyslexia support" },
      { key: "increasedLineHeight", label: "Line height" },
      { key: "grayscale", label: "Grayscale" },
      { key: "hideImages", label: "Hide images" },
      { key: "reducedMotion", label: "Reduce motion" },
      { key: "highlightFocus", label: "Highlight focus" },
    ],
  },
};

const clampFontScale = (value) => Math.min(118, Math.max(92, value));

const applyAccessibilitySettings = (settings) => {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  root.style.setProperty("--site-font-scale", `${settings.fontScale}%`);
  root.style.setProperty(
    "--a11y-body-filter",
    `${settings.enhancedContrast ? "contrast(1.12) saturate(0.94) " : ""}${settings.grayscale ? "grayscale(1)" : ""}`.trim() || "none"
  );
  root.classList.toggle("a11y-enhanced-contrast", settings.enhancedContrast);
  root.classList.toggle("a11y-underline-links", settings.underlineLinks);
  root.classList.toggle("a11y-readable-font", settings.readableFont);
  root.classList.toggle("a11y-reduced-motion", settings.reducedMotion);
  root.classList.toggle("a11y-highlight-focus", settings.highlightFocus);
  root.classList.toggle("a11y-hide-images", settings.hideImages);
  root.classList.toggle("a11y-line-height", settings.increasedLineHeight);
  root.classList.toggle("a11y-grayscale", settings.grayscale);
};

export default function AccessibilityMenu({ language = "he" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const panelRef = useRef(null);
  const copy = useMemo(() => COPY[language] ?? COPY.he, [language]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        applyAccessibilitySettings(DEFAULT_SETTINGS);
        return;
      }

      const parsed = { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
      parsed.fontScale = clampFontScale(parsed.fontScale);
      if (!parsed.userSetHighlightFocus) {
        parsed.highlightFocus = false;
      }
      setSettings(parsed);
      applyAccessibilitySettings(parsed);
    } catch (error) {
      applyAccessibilitySettings(DEFAULT_SETTINGS);
    }
  }, []);

  useEffect(() => {
    applyAccessibilitySettings(settings);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {}
  }, [settings]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handlePointerDown = (event) => {
      if (!panelRef.current || !isOpen) return;
      if (!panelRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("pointerdown", handlePointerDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen]);

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const toggleSetting = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
      ...(key === "highlightFocus" ? { userSetHighlightFocus: true } : {}),
    }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`fixed bottom-5 z-[120] flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-slate-950/90 text-white shadow-[0_20px_50px_rgba(2,8,23,0.45)] backdrop-blur-xl transition-all hover:border-[#ffde59]/40 hover:text-[#ffde59] ${language === "he" ? "left-5" : "right-5"}`}
        aria-expanded={isOpen}
        aria-controls="accessibility-panel"
        aria-label={copy.open}
      >
        <Accessibility className="h-5 w-5" />
      </button>
      <aside
        id="accessibility-panel"
        ref={panelRef}
        dir={language === "he" ? "rtl" : "ltr"}
        className={`fixed bottom-24 z-[121] w-[min(92vw,24rem)] rounded-[1.8rem] border border-white/12 bg-[linear-gradient(180deg,rgba(8,15,31,0.96),rgba(7,12,24,0.92))] p-5 text-white shadow-[0_24px_90px_rgba(2,8,23,0.55)] backdrop-blur-xl transition-all duration-300 ${isOpen ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"} ${language === "he" ? "left-5" : "right-5"}`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-white">{copy.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">{copy.description}</p>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition-colors hover:bg-white/10"
            aria-label={copy.close}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-4">
          <div className="mb-3 text-sm font-bold tracking-[0.16em] text-slate-300">{copy.textSize}</div>
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => updateSetting("fontScale", clampFontScale(settings.fontScale - 4))}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-slate-950 text-white transition-colors hover:border-[#ffde59]/30 hover:text-[#ffde59]"
              aria-label={copy.decrease}
            >
              <Minus className="h-4 w-4" />
            </button>
            <div className="min-w-[5rem] text-center text-lg font-extrabold text-[#ffde59]">
              {settings.fontScale}%
            </div>
            <button
              type="button"
              onClick={() => updateSetting("fontScale", clampFontScale(settings.fontScale + 4))}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-slate-950 text-white transition-colors hover:border-[#ffde59]/30 hover:text-[#ffde59]"
              aria-label={copy.increase}
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-4 grid gap-3">
          {copy.actions.map((action) => (
            <button
              key={action.key}
              type="button"
              onClick={() => toggleSetting(action.key)}
              aria-pressed={settings[action.key]}
              className={`flex items-center justify-between rounded-[1.25rem] border px-4 py-3 text-sm font-semibold transition-all ${
                settings[action.key]
                  ? "border-[#ffde59]/35 bg-[#ffde59]/10 text-[#ffde59]"
                  : "border-white/10 bg-white/[0.04] text-slate-100 hover:bg-white/[0.07]"
              }`}
            >
              <span>{action.label}</span>
              <span
                className={`flex h-6 w-11 items-center rounded-full p-1 transition-colors ${
                  settings[action.key] ? "bg-[#ffde59]/30" : "bg-slate-700/80"
                }`}
              >
                <span
                  className={`h-4 w-4 rounded-full transition-transform ${
                    settings[action.key]
                      ? "translate-x-5 bg-[#ffde59]"
                      : "translate-x-0 bg-white"
                  }`}
                />
              </span>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={resetSettings}
          className="mt-5 flex w-full items-center justify-center gap-3 rounded-full border border-white/12 bg-transparent px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-white/5"
        >
          <RotateCcw className="h-4 w-4" />
          {copy.reset}
        </button>
      </aside>
    </>
  );
}
