import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import classes from "./RegisterForm.module.scss";
import { Link, useNavigate } from "react-router-dom";
import React, { useRef, useState, useEffect } from "react";
import Button from "./Button";
import { FlashAuto } from "@mui/icons-material";

const formData = new FormData();

export default function LoginForm(props: any) {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userImg, setUserImg] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isRecentSubmitted, setIsRecentSubmitted] = useState(false);

  const navigate = useNavigate();

  async function imgHandler(e: any) {
    formData.append("img", e.target.files[0]);
    setUserImg(e.target.files[0].name);
    console.log(e.target.files[0]);
  }

  const registerFormHandler = async (event: any) => {
    event.preventDefault();
    setIsRecentSubmitted(true);

    if (isValid === false) {
      return;
    } else {
    }

    const resImg = await fetch("http://localhost:4000/img", {
      method: "POST",
      body: formData,
    });
    const imgName = await resImg.json();

    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        pw,
        email,
        userName,
        userImg: imgName,
      }),
    });
    const data = await response.json();

    try {
      if (data !== id) {
        alert("중복된 아이디가 존재합니다.");
        navigate("#");
      } else if (data) {
        alert("회원 가입성공");
      }
    } catch {
      throw new Error("통신 에러");
    }
  };

  return (
    <>
      <form onSubmit={registerFormHandler} className={classes.loginForm}>
        <div className={classes.logo}>
          <div className={classes.title}>
            <SportsBasketballIcon fontSize="inherit" className={classes.ball} />
            BPT
          </div>
        </div>

        <div className={classes.login}>
          <input type="file" value={userImg} onChange={imgHandler} />
          <input
            type="email"
            className={classes.email}
            value={email}
            placeholder="이메일"
            onClick={() => {
              setIsRecentSubmitted(false);
            }}
          />
          <input
            type="text"
            className={classes.id}
            value={id}
            placeholder="아이디"
            onClick={() => {
              setIsRecentSubmitted(false);
            }}
          />
          <input
            type="password"
            className={classes.id}
            placeholder="비밀번호"
            value={pw}
            onClick={() => {
              setIsRecentSubmitted(false);
            }}
          />
          <input
            type="text"
            className={classes.id}
            placeholder="이름"
            value={userName}
            onClick={() => {
              setIsRecentSubmitted(false);
            }}
          />

          <Button type="submit">
            <p>가입하기</p>
          </Button>
        </div>
      </form>
    </>
  );
}
