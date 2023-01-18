import type { AppProps } from "next/app";
import React, { Suspense, useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { CookiesProvider, useCookies } from "react-cookie";

// components
import { Provider } from "react-redux";
import store from "../redux/index";
import Loading from "../components/common/loadingModule/Loading";
import Seo from "components/common/seo/Seo";
import AppLayout from "components/layout/AppLayout";

export default function App({ Component, pageProps }: AppProps) {
  const [cookie, setCookie, removeCookie] = useCookies(["cookieText"]);
  console.log(cookie);
  const login = async () => {
    await fetch("http://localhost:4000/login/cookie", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cookie,
      }),
    });
  };

  useEffect(() => {
    if (cookie !== undefined) {
      login();
    }
  }, [cookie]);
  const { pagePath } = pageProps;

  return (
    <>
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
    </>
  );
}
