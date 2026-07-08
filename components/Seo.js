import React from "react";
import Head from "next/head";
import { heroStageImage } from "../lib/content";
import { INSTAGRAM_URL, LINKEDIN_URL } from "../lib/links";

const CONTENT = {
  he: {
    title: "גבי אהרון | מומחה לשפת גוף ועמידה מול קהל",
    description:
      "הרצאות וסדנאות לארגונים על שפת גוף, תקשורת לא מילולית ועמידה מול קהל. גבי אהרון מסייע למנהלים, יזמים ואנשי מקצוע להפוך לדוברים בטוחים ומשפיעים.",
    locale: "he_IL",
  },
  en: {
    title: "Gabi Aharon | Body Language & Public Speaking Expert",
    description:
      "Lectures and workshops on body language, non-verbal communication and public speaking. Gabi Aharon helps executives, entrepreneurs and professionals become confident, influential speakers.",
    locale: "en_US",
  },
};

export default function Seo({ language = "he" }) {
  const c = CONTENT[language] || CONTENT.he;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Gabi Aharon",
    alternateName: "גבי אהרון",
    jobTitle: "Body Language & Public Speaking Lecturer",
    description: c.description,
    image: heroStageImage,
    sameAs: [INSTAGRAM_URL, LINKEDIN_URL],
    knowsAbout: ["Body language", "Non-verbal communication", "Public speaking", "Presence"],
  };

  return (
    <Head>
      <title>{c.title}</title>
      <meta name="description" content={c.description} />
      <meta name="theme-color" content="#050505" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={c.title} />
      <meta property="og:description" content={c.description} />
      <meta property="og:image" content={heroStageImage} />
      <meta property="og:locale" content={c.locale} />
      <meta property="og:locale:alternate" content={language === "he" ? "en_US" : "he_IL"} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={c.title} />
      <meta name="twitter:description" content={c.description} />
      <meta name="twitter:image" content={heroStageImage} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  );
}
