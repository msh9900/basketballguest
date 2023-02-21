import type { AppProps } from "next/app";
import React, { Suspense, useContext, useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { CookiesProvider } from "react-cookie";
import "../styles/globals.scss"

//chat bot
import "react-chatbot-kit/build/main.css";
import "../styles/chatbot.css";

// components
import { Provider } from "react-redux";
import store from "../redux/index";
import Loading from "../components/common/loadingModule/Loading";
import Seo from "components/common/seo/Seo";
import AppLayout from "components/layout/AppLayout";

export default function App({ Component, pageProps }: AppProps) {
  const { pagePath } = pageProps;

  return (
    <CookiesProvider>
      <Provider store={store}>
        <Suspense fallback={<Loading />}>
          <Seo pagePath={pagePath} />
          <CssBaseline />
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </Suspense>
      </Provider>
    </CookiesProvider>
  );
}
