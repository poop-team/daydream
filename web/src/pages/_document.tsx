import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

// This is the html document as the root of the application, similar to index.html in a traditional web app.
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Script src={"/static/theme.js"} strategy="beforeInteractive" />
        <link
          rel="icon"
          href="https://avatars.githubusercontent.com/u/114451606"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <meta charSet="utf-8" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
