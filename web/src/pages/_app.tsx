import "tailwindcss/tailwind.css";
import "../styles/globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

import BottomNav from "../components/Navigation/BottomNav";
import TopNav from "../components/Navigation/TopNav";
import ThemeContextWrapper from "../context/ThemeContextWrapper";

const queryClient = new QueryClient();

function Account({ Component, pageProps: { ...pageProps } }: AppProps) {
  //#region Hooks

  const [searchValue, setSearchValue] = useState("");

  //#endregion

  return (
    <>
      <Head>
        <title>Daydream</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ThemeContextWrapper>
          <TopNav searchValue={searchValue} setSearchValue={setSearchValue} />
          <AnimatePresence mode={"popLayout"}>
            <Component searchValue={searchValue} {...pageProps} />
          </AnimatePresence>
          <BottomNav />
          <Toaster
            position={"bottom-center"}
            containerClassName={"!bottom-16 !select-none !text-center"}
            gutter={16}
            toastOptions={{
              duration: 5000,
              className: "!bg-slate-900/80 !text-slate-50 !backdrop-blur-md",
              success: {
                className:
                  "!bg-emerald-900/80 !text-emerald-50 !backdrop-blur-md",
              },
              error: {
                className: "!bg-red-900/80 !text-red-50 !backdrop-blur-md",
                icon: "🚨",
              },
            }}
          />
        </ThemeContextWrapper>
      </QueryClientProvider>
    </>
  );
}

export default Account;
