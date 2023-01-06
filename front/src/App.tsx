import classes from './App.module.scss';
import { Routes, Route, useLocation } from 'react-router-dom';
import GuestRecruitmentPage from './pages/guest/GuestRecruitmentPage';
import GymRental from './pages/rental/GymRental';
import HomePage from './pages/HomePage';
import IntroducePage from './pages/intro/IntroducePage';
import NotFoundPage from './pages/NotFoundPage';
import Header from './components/layout/Header';
import LoginPage from './pages/login/LoginPage';
import Profile from './pages/profile/Profile';
import Service from './pages/service/Service';
import { useEffect, useState } from 'react';
import Footer from './components/layout/Footer';
import Register from './pages/login/RegisterPage';

function App() {
  const location = useLocation();
  const [headerDel, setHeaderDel] = useState(true);
  const [footerDel, setFooterDel] = useState(true);
  useEffect(() => {
    location.pathname === '/login' || location.pathname === '/register'
      ? setHeaderDel(false)
      : setHeaderDel(true);
    location.pathname === '/guest' ? setFooterDel(false) : setFooterDel(true);
  }, [location.pathname]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.contentWrapper}>
        {headerDel ? <Header /> : ''}
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
      </div>

      {footerDel ? <Footer /> : ''}
    </div>
  );
}

export default App;
