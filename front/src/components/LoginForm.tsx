import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import classes from "./LoginForm.module.scss";
import { Link, useNavigate } from "react-router-dom";
import React, { useRef, useState, useEffect } from "react";
import Button from "./Button";
import { FlashAuto } from "@mui/icons-material";

// interface LoginProps {
//   onConfirm: () => any;
// }

export default function LoginForm(props: any) {
  const [formInputValid, setFormInputValid] = useState(false);
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [isIdPwValid, setIsIdPwValid] = useState(false);
  const [isRecentSubmitted, setIsRecentSubmitted] = useState(false);

  useEffect(() => {
    if (id.length > 3 && pw.length > 3) {
      setIsIdPwValid(true);
    } else {
      setIsIdPwValid(false);
    }
  }, [id, pw]);

  const navigate = useNavigate();

  const handleId = (e: any) => {
    setId(e.target.value);
  };

  const handlePw = (e: any) => {
    setPw(e.target.value);
  };
  const send: any = () => {
    fetch("http://localhost:4000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
        pw: pw,
      }),
    });
  };

  const loginFormHandler = async (event: any) => {
    event.preventDefault();

    setIsRecentSubmitted(true);

    if (isIdPwValid === false) {
      return;
    }

    // api 호출
    try {
      // send()...
      send()
        .then((res: any) => res.json())
        .then((data: any) => {
          if (data.isValid) {
            alert("로그인 성공");

            // 페이지 이동 (화면 처리)
            navigate("/");
            // 로그인 처리
            // redux...
          } else {
            alert("아이디나 패스워드를 확인해주세요");
            setId("");
            setPw("");
          }
        });
    } catch {
      //   console.log(error:any);
    }
  };

  return (
    <>
      <form onSubmit={loginFormHandler} className={classes.loginForm}>
        <div className={classes.logo}>
          <div className={classes.title}>
            <SportsBasketballIcon fontSize="inherit" className={classes.ball} />
            BPT
          </div>
        </div>
        <div className={classes.login}>
          <input
            type="text"
            className={classes.id}
            value={id}
            placeholder="아이디"
            onChange={handleId}
            onClick={() => {
              setIsRecentSubmitted(false);
            }}
          />
          <input
            type="password"
            className={classes.pw}
            placeholder="비밀번호"
            value={pw}
            onChange={handlePw}
            onClick={() => {
              setIsRecentSubmitted(false);
            }}
          />

          {!isIdPwValid && isRecentSubmitted && (
            <p className={classes.invalid}>ID와 PW값은 4글자 이상입니다.</p>
          )}

          <Button type="submit">
            <p>로그인</p>
          </Button>
          <Link to="/register" className={classes.register}>
            <p>회원가입</p>
          </Link>
        </div>
      </form>
    </>
  );
}
