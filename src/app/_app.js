// src/app/_app.js
import React from "react";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          rel="icon"
          type="image/x-icon"
          href="/favicon.ico"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
