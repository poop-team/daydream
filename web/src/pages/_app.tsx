import "tailwindcss/tailwind.css";
import "../styles/globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import Head from "next/head";

import BottomNav from "../components/Navigation/BottomNav";
import TopNav from "../components/Navigation/TopNav";
import useAuth from "../hooks/useAuth";

const queryClient = new QueryClient();

function Account({ Component, pageProps: { ...pageProps } }: AppProps) {
  useAuth();

  return (
    <>
      <Head>
        <title>Daydream</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <TopNav />
        <Component {...pageProps} />
        <BottomNav />
      </QueryClientProvider>
    </>
  );
}

export default Account;
