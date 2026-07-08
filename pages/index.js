import React, { useRef } from "react";
import { useLanguage } from "./_app";
import { translations, servicesSpotlightContent } from "../lib/content";

import Seo from "../components/Seo";
import Nav from "../components/Nav";
import StickyWhatsAppCta from "../components/StickyWhatsAppCta";

import PresenceProvider from "../components/effects/PresenceProvider";
import ActRail from "../components/effects/ActRail";
import SpotlightCursor from "../components/effects/SpotlightCursor";
import StageLightsIntro from "../components/effects/StageLightsIntro";
import ReaderToast from "../components/effects/ReaderToast";

import Hero from "../components/sections/Hero";
import Proof from "../components/sections/Proof";
import FearToPresence from "../components/sections/FearToPresence";
import Offerings from "../components/sections/Offerings";
import LiveMoments from "../components/sections/LiveMoments";
import TipsTicker from "../components/sections/TipsTicker";
import About from "../components/sections/About";
import Testimonials from "../components/sections/Testimonials";
import TedTalks from "../components/sections/TedTalks";
import FinalCta from "../components/sections/FinalCta";
import Footer from "../components/sections/Footer";

export default function Home() {
  const { language, setLanguage } = useLanguage();
  const t = translations[language];
  const spotlight = servicesSpotlightContent[language];
  const isHebrew = language === "he";

  // Shared refs: the fear section anchors the hesitation reader; the final
  // CTA hides the sticky WhatsApp pill while it's on screen.
  const fearRef = useRef(null);
  const finalCtaRef = useRef(null);

  return (
    <>
      <Seo language={language} />
      <StageLightsIntro />

      <PresenceProvider>
        <div className={`relative min-h-screen overflow-x-hidden bg-ink font-assistant text-white ${isHebrew ? "rtl" : "ltr"}`}>
          <div className="presence-backdrop" aria-hidden="true" />
          <SpotlightCursor />
          <ActRail t={t} isHebrew={isHebrew} />
          <Nav t={t} language={language} setLanguage={setLanguage} isHebrew={isHebrew} />

          <Hero t={t} language={language} />
          <Proof t={t} />
          <FearToPresence t={t} sectionRef={fearRef} />
          <Offerings t={t} spotlight={spotlight} language={language} />
          <LiveMoments t={t} />
          <TipsTicker t={t} language={language} />
          <About t={t} />
          <Testimonials t={t} language={language} />
          <TedTalks t={t} />
          <FinalCta t={t} language={language} sectionRef={finalCtaRef} />
          <Footer t={t} />

          <StickyWhatsAppCta t={t} language={language} finalCtaRef={finalCtaRef} />
          <ReaderToast t={t} fearRef={fearRef} />
        </div>
      </PresenceProvider>
    </>
  );
}
