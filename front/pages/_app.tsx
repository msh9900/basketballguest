import type { AppProps } from "next/app";
import React, { Suspense, useContext, useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { CookiesProvider } from "react-cookie";

// components
import { Provider } from "react-redux";
import store from "../redux/index";
import Loading from "../components/common/loadingModule/Loading";
import Seo from "components/common/seo/Seo";
import AppLayout from "components/layout/AppLayout";

export default function App({ Component, pageProps }: AppProps) {
  const { pagePath } = pageProps;

  return (
    <Provider store={store}>
      <CookiesProvider>
        <Suspense fallback={<Loading />}>
          <Seo pagePath={pagePath} />
          <CssBaseline />
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </Suspense>
      </CookiesProvider>
    </Provider>
  );
}
