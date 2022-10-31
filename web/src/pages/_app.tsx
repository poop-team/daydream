import "tailwindcss/tailwind.css";
import "../styles/globals.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import BottomNav from "../components/Navigation/BottomNav";
import TopNav from "../components/Navigation/TopNav";
import { useRouter } from 'next/router';

interface Props extends AppProps {
  pageProps: {
    session: Session;
  };
}




function Account({ Component, pageProps: { session, ...pageProps } }: Props) {

  const router = useRouter();
  const isLogin = router.pathname == "/login"

  return (
    <>
      <Head>
        <title>Big 💩 Project™️</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SessionProvider session={session}>
        {isLogin ? (
          <><Component {...pageProps} /></>
        ) : (
          <>
            <TopNav />
            <BottomNav />
          </>
          
        )}
        
        <Component {...pageProps} />
        
      </SessionProvider>
    </>
  );
}

export default Account;
