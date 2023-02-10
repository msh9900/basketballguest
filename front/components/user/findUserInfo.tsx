import cls from "./findUserInfo.module.scss";
import Link from "next/link";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { serialize } from "v8";

const findUserInfo = () => {
  const [userInput, setUserInput] = useState("");
  const [searchTarget, setSearchTarget] = useState("");
  // const [searchTarget, setSearchTarget] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (router.asPath == "/findUserPw") {
      setSearchTarget("비밀번호");
    }
    if (router.asPath == "/findUserId") {
      setSearchTarget("아이디");
    }
  }, [router.asPath]);

  const onChange = (e: any) => {
    setUserInput(e.target.value);
  };

  const cancel = () => {
    router.push("/");
  };

  const fetchIdPw = async (routeValue: string, userInput: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/${routeValue}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userInput }),
    });
    const data = await response.json();

    if (data.msg === "이메일 확인 불가") {
      alert("해당 이메일로 된 계정을 찾을 수 없습니다.");
    } else {
      // 이메일이 DB에 있는 경우 :
      // alert("");
      alert(`해당 email : ${userInput}로 인증번호가 전송되었습니다. `);
      // router.push("/auth");
    }
  };

  const submit = async () => {
    if (searchTarget == "아이디") {
      fetchIdPw("findid", userInput);
    } else if (searchTarget == "비밀번호") {
      fetchIdPw("findpw", userInput);
    }
  };

  return (
    <>
      <div className={cls.loginLayout}>
        <div className={cls.logo}>
          <Link href="/" className={cls.title}>
            <SportsBasketballIcon fontSize="inherit" className={cls.ball} />
            BPT
          </Link>
        </div>

        <div className={cls.login}>
          {searchTarget === "아이디" && (
            <>
              <p>
                이메일을 통해 등록한 <b>{searchTarget}</b>를 찾아보세요
              </p>
              <p>가입 시 ID에 등록된 이메일로 전송됩니다.</p>
              <input
                type="email"
                className={cls.email}
                value={userInput}
                placeholder="이메일"
                onChange={onChange}
              />
            </>
          )}
          {searchTarget === "비밀번호" && (
            <>
              <p>
                아이디를 통해 등록한 <b>{searchTarget}</b>를 찾아보세요
              </p>
              <p>가입 시 ID에 등록된 이메일로 전송됩니다.</p>
              <input
                type="text"
                className={cls.email}
                value={userInput}
                placeholder="아이디"
                onChange={onChange}
              />
            </>
          )}

          <div className={cls.checkBtns}>
            <button onClick={cancel}>취소</button>
            <button onClick={submit}>확인</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default findUserInfo;
