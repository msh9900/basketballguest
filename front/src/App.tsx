import { Routes, Route, useLocation } from "react-router-dom";
import GuestRecruitmentPage from "./pages/guest/GuestRecruitmentPage";
import GymRental from "./pages/rental/GymRental";
import HomePage from "./pages/HomePage";
import IntroducePage from "./pages/intro/IntroducePage";
import NotFoundPage from "./pages/NotFoundPage";
import Header from "./components/layout/Header";
import LoginPage from "./pages/login/LoginPage";
import Profile from "./pages/profile/Profile";
import Service from "./pages/service/Service";
import { useEffect, useState } from "react";
import Footer from "./components/layout/Footer";
import Register from "./pages/login/RegisterPage";
import { useSelector } from "react-redux";

function App() {
  const location = useLocation();
  const loginState = useSelector((state: any) => state.login.islogin);
  const [headerDel, setHeaderDel] = useState(true);

  console.log(loginState);
  useEffect(() => {
    location.pathname === "/login" || location.pathname === "/register"
      ? setHeaderDel(false)
      : setHeaderDel(true);
  }, [location.pathname]);

  return (
    <>
      {headerDel ? <Header /> : ""}
      {headerDel ? <div style={{ height: 100 }} /> : ""}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/intro" element={<IntroducePage />} />
        <Route path="/guest" element={<GuestRecruitmentPage />} />
        <Route path="/gym" element={<GymRental />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/service" element={<Service />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
