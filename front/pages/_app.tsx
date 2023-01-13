import type { AppProps } from "next/app";

import { useEffect, useState } from "react";
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
  const [headerDel, setHeaderDel] = useState(true);
  const [footerDel, setFooterDel] = useState(true);

  return (
    <>
      <Provider store={store}>
        <CssBaseline />
        <div className={classes.wrapper}>
          <Header />
          <div className={classes.contentWrapper}>
            <Component {...pageProps} />
          </div>
          <Footer />
        </div>
      </Provider>
    </>
  );
}
