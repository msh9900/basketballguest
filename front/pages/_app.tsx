import type { AppProps } from "next/app";
import React, { Suspense } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

//style
import "../styles/globals.scss";
import classes from "./App.module.scss";

//MUI
import CssBaseline from "@mui/material/CssBaseline";

// components
import { Provider } from "react-redux";
import store from "../redux/index";
import Loading from "../components/common/Loading";
import Seo from "../components/common/Seo";
import AppLayout from "components/layout/AppLayout";

export default function App({ Component, pageProps }: AppProps) {
  const { pagePath, pageTitle, pageDesc, item } = pageProps;

  return (
    <>
      <Provider store={store}>
        <Suspense fallback={<Loading />}>
          <Seo pagePath={pagePath} pageTitle={pageTitle} pageDesc={pageDesc} />
          <CssBaseline />
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </Suspense>
      </Provider>
    </>
  );
}
