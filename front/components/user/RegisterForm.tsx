// react
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// style
import cls from "./RegisterForm.module.scss";
import Button from "../common/Button";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";

// state
import { useDispatch } from "react-redux";
import { IsLogin } from "../../redux/modules/login";

export default function LoginForm(props: any) {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isRecentSubmitted, setIsRecentSubmitted] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      id.length > 3 &&
      pw.match(
        /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{4,}$/
      )
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [id, pw]);

  const handleId = (e: any) => {
    setId(e.target.value);
  };

  const handlePw = (e: any) => {
    setPw(e.target.value);
  };

  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const handleUserName = (e: any) => {
    setUserName(e.target.value);
  };

  const registerFormHandler = async (event: any) => {
    event.preventDefault();
    setIsRecentSubmitted(true);

    if (isValid === false) {
      return;
    }

    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
        pw: pw,
        email: email,
        userName: userName,
      }),
    });
    const data = await response.json();
    try {
      if (data.msg === "회원가입 완료") {
        alert("회원 가입성공");
        dispatch(IsLogin(data));
        router.push("/login");
      } else {
        alert("중복된 회원 존재");
      }
    } catch {
      throw new Error("통신 에러");
    }
  };

  return (
    <>
      <form onSubmit={registerFormHandler} className={cls.loginForm}>
        <div className={cls.logo}>
          <Link href="/" className={cls.title}>
            <SportsBasketballIcon fontSize="inherit" className={cls.ball} />
            BPT
          </Link>
        </div>
        <div className={cls.register}>
          <input
            type="email"
            className={cls.email}
            placeholder="이메일"
            value={email}
            onChange={handleEmail}
          />
          <input
            type="text"
            className={cls.id}
            placeholder="아이디"
            value={id}
            onChange={handleId}
            onClick={() => {
              setIsRecentSubmitted(false);
            }}
          />
          <input
            type="password"
            className={cls.id}
            placeholder="비밀번호"
            value={pw}
            autoComplete="off"
            onChange={handlePw}
            onClick={() => {
              setIsRecentSubmitted(false);
            }}
          />
          <input
            type="text"
            className={cls.id}
            placeholder="이름"
            value={userName}
            onChange={handleUserName}
          />
          {!isValid && isRecentSubmitted && (
            <p className={cls.invalid}>
              ID는 4글자이상 PW는 영문, 숫자, 특수문자 중 2가지 이상 조합하여
              4자리 이상이여야 합니다.
            </p>
          )}
          <Button type="submit">
            <p>가입하기</p>
          </Button>
          <Link href="/login" className={cls.loginBtn}>
            <p>로그인</p>
          </Link>
        </div>
      </form>
    </>
  );
}
