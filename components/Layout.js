import React from "react";
import Head from "next/head";
import AccessibilityMenu from "./AccessibilityMenu";

export default function Layout({ children, language = 'he' }) {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      </Head>
      <a className="skip-link" href="#main-content">
        {language === 'he' ? 'דלגו לתוכן הראשי' : 'Skip to main content'}
      </a>
      <main id="main-content">
        {children}
      </main>
      <AccessibilityMenu language={language} />
    </div>
  );
}
