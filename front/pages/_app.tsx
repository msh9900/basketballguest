import type { AppProps } from "next/app";

import { useEffect, useState } from "react";

//MUI
import CssBaseline from "@mui/material/CssBaseline";
// components
import classes from "./App.module.scss";
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
        <Header />
        <div className={classes.wrapper}>
          <div className={classes.contentWrapper}>
            <Component {...pageProps} />
          </div>
          <Footer />
        </div>
      </Provider>
    </>
  );
}
