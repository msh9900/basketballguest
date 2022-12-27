import "./App.css";
import { Routes, Route } from "react-router-dom";
import GuestRecruitmentPage from "./pages/GuestRecruitmentPage";
import GymRental from "./pages/GymRental";
import HomePage from "./pages/HomePage";
import IntroducePage from "./pages/IntroducePage";
import NotFoundPage from "./pages/NotFoundPage";
import Header from "./components/layout/Header";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/intro" element={<IntroducePage />} />
        <Route path="/guest" element={<GuestRecruitmentPage />} />
        <Route path="/gym" element={<GymRental />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
