import "tailwindcss/tailwind.css";
import "../styles/globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

import AuthRedirectWrapper from "../components/AuthRedirectWrapper";
import BottomNav from "../components/Navigation/BottomNav";
import TopNav from "../components/Navigation/TopNav";
import ThemeContextWrapper from "../context/ThemeContextWrapper";

const queryClient = new QueryClient();

function Account({ Component, pageProps: { ...pageProps } }: AppProps) {
  //#region Hooks

  const [searchValue, setSearchValue] = useState("");
  const [feedSortValue, setFeedSortValue] = useState<"featured" | "recent">(
    "featured"
  );

  //#endregion

  return (
    <>
      <Head>
        <title>Daydream</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <AuthRedirectWrapper>
          <ThemeContextWrapper>
            <TopNav
              feedSortValue={feedSortValue}
              setFeedSortValue={setFeedSortValue}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
            <AnimatePresence mode={"popLayout"}>
              <Component
                searchValue={searchValue}
                feedSortValue={feedSortValue}
                {...pageProps}
              />
            </AnimatePresence>
            <BottomNav />
            <Toaster
              position={"bottom-center"}
              containerClassName={"!bottom-16 !select-none !text-center"}
              gutter={16}
              toastOptions={{
                duration: 5000,
                className:
                  "!bg-slate-900/80 !text-slate-50 !backdrop-blur-md dark:!bg-slate-100/90 dark:!text-slate-900",
                success: {
                  className:
                    "!bg-emerald-900/80 !text-emerald-50 !backdrop-blur-md dark:!bg-emerald-100/90 dark:!text-emerald-900",
                },
                error: {
                  className:
                    "!bg-red-900/80 !text-red-50 !backdrop-blur-md dark:!bg-red-100/90 dark:!text-red-900",
                  icon: "🚨",
                },
              }}
            />
          </ThemeContextWrapper>
        </AuthRedirectWrapper>
      </QueryClientProvider>
    </>
  );
}

export default Account;
