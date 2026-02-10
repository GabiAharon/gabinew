import React from "react";
import Head from "next/head";

export default function Layout({ children, language = 'he' }) {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Heebo:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      {children}
    </div>
  );
}
