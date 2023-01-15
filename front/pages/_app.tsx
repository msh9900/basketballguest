import type { AppProps } from "next/app";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
//style
import "../styles/globals.scss";
import classes from "./App.module.scss";
//MUI
import CssBaseline from "@mui/material/CssBaseline";
// components
import Footer from "../components/layout/Footer";
import Header from "../components/layout/header/Header";
import { Provider } from "react-redux";
import store from "../redux/index";
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const [headerDel, setHeaderDel] = useState(false);
  const [footerDel, setFooterDel] = useState(false);
  useEffect(() => {
    if (router.pathname === "/guest") {
      setFooterDel(true);
    } else if (
      router.pathname === "/login" ||
      router.pathname === "/register"
    ) {
      setHeaderDel(true);
    } else {
      setHeaderDel(false);
      setFooterDel(false);
    }
  }, [router.pathname]);
  return (
    <>
      <Provider store={store}>
        <CssBaseline />
        <div className={classes.wrapper}>
          <div className={classes.contentWrapper}>
            {!headerDel && <Header />}
            <Component {...pageProps} />
          </div>
          {!footerDel && <Footer />}
        </div>
      </Provider>
    </>
  );
}
