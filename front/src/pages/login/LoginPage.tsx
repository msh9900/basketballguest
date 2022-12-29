import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/layout/Footer";
import LoginForm from "../../components/LoginForm";

export default function LoginPage() {
  const [loginData, setLoginData] = useState("");
  const navigate = useNavigate();

  const findHandler = async (data: any) => {
    const response = await fetch("http://localhost:4000/login", {
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error("통신 에러");
    }
    if (responseData) {
      setLoginData(responseData);
    }
  };

  return (
    <>
      <LoginForm />
    </>
  );
}
