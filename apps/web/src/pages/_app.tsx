import "tailwindcss/tailwind.css";
import "../styles/globals.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

interface Props extends AppProps {
  pageProps: {
    session: Session;
  };
}

function Account({ Component, pageProps: { session, ...pageProps } }: Props) {
  return (
    <>
      <Head>
        <title>Big 💩 Project™️</title>
      </Head>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}

export default Account;
