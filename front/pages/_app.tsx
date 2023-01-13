// import "../styles/globals.css";
import type { AppProps } from "next/app";

// 가져온 값
// style
// import classes from "./App.module.scss";
// react
// import { Routes, Route, useLocation } from "react-router-dom";

// You can use useRouter from 'next/router' and then you can either use pathname or asPath and then you conditionally add slug or params. Rest you can find more information via documentation posted by others.

import { useEffect, useState } from "react";
// components
// import Footer from "../components/layout/Footer";
// import Header from "../components/layout/header/Header";

export default function App({ Component, pageProps }: AppProps) {
  // const location = useLocation();
  // const [headerDel, setHeaderDel] = useState(true);
  // const [footerDel, setFooterDel] = useState(true);
  // useEffect(() => {
  //   location.pathname === "/login" || location.pathname === "/register"
  //     ? setHeaderDel(false)
  //     : setHeaderDel(true);
  //   location.pathname === "/guest" ? setFooterDel(false) : setFooterDel(true);
  // }, [location.pathname]);

  return (
    <>
      <Component {...pageProps} />

      {/* <div className={classes.wrapper}>
        <div className={classes.contentWrapper}>
          {headerDel ? <Header /> : ""}
        </div>
        
        {footerDel ? <Footer /> : ""}
      </div> */}
    </>
  );
}
