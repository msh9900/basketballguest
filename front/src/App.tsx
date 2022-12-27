import { Routes, Route } from "react-router-dom";
import GuestRecruitmentPage from "./pages/guest/GuestRecruitmentPage";
import GymRental from "./pages/rental/GymRental";
import HomePage from "./pages/HomePage";
import IntroducePage from "./pages/intro/IntroducePage";
import NotFoundPage from "./pages/NotFoundPage";
import Header from "./components/layout/Header";
import LoginPage from "./pages/login/LoginPage";
import Profile from "./pages/intro/Profile";
import Service from "./pages/service/Service";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/intro" element={<IntroducePage />} />
        <Route path="/guest" element={<GuestRecruitmentPage />} />
        <Route path="/gym" element={<GymRental />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/service" element={<Service />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
