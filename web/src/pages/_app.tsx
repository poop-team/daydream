import "tailwindcss/tailwind.css";
import "../styles/globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import BottomNav from "../components/Navigation/BottomNav";
import TopNav from "../components/Navigation/TopNav";

interface Props extends AppProps {
  pageProps: {
    session: Session;
  };
}

const queryClient = new QueryClient();

function Account({ Component, pageProps: { session, ...pageProps } }: Props) {
  return (
    <>
      <Head>
        <title>Big 💩 Project™️</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <TopNav />
          <Component {...pageProps} />
          <BottomNav />
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}

export default Account;
