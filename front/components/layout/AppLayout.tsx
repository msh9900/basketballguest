import classes from "pages/App.module.scss";
import Footer from "components/layout/footer/Footer";
import Header from "components/layout/header/Header";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { IsLogin } from "redux/modules/login";

const AppLayout = ({ children }: any) => {
  const [cookie, setCookie, removeCookie] = useCookies<any>();
  // console.log(cookie);
  const dispatch = useDispatch();
  useEffect(() => {
    if (cookie.login !== undefined) {
      try {
        dispatch(IsLogin(cookie.login));
      } catch (error) {
        throw new Error("쿠키 에러");
      }
    }
  }, [cookie]);

  const router = useRouter();

  const [headerDel, setHeaderDel] = useState(false);
  const [footerDel, setFooterDel] = useState(false);

  useEffect(() => {
    const path = router.pathname;
    if (path === "/guest") {
      setFooterDel(true);
    } else if (path === "/login" || path === "/register") {
      setHeaderDel(true);
    } else {
      setHeaderDel(false);
      setFooterDel(false);
    }
  }, [router.pathname]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.contentWrapper}>
        {!headerDel && <Header />}
        <main>{children}</main>
      </div>
      {!footerDel && <Footer />}
    </div>
  );
};

export default AppLayout;
