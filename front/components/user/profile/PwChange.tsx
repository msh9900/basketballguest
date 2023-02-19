import cls from "./PwChange.module.scss";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import usePwChecker from "hooks/usePwChecker";

const PwChange = () => {
  // CHECKERS
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isPwSame, setIsPwSame] = useState<boolean>(false);

  // VALUES
  const [pw, setPw] = useState<string>("");
  const [pw2, setPw2] = useState<string>("");

  // ETC
  const [isRecentSubmitted, setIsRecentSubmitted] = useState(false);
  const router = useRouter();

  // ONCHANGE PASSWORD
  const InputPasswordHandler = (e: any) => {
    setIsRecentSubmitted(false);
    setPw(e.target.value);
  };
  const InputPasswordHandler2 = (e: any) => {
    setIsRecentSubmitted(false);
    setPw2(e.target.value);
  };

  // CHECK PASSWORD
  usePwChecker({ pw, pw2, setIsValid, setIsPwSame });

  // TRIGGER SUBMIT FUNCTIONS
  const submitClicked = () => {
    pwSubmit();
  };
  const submitEntered = (event: any) => {
    event.preventDefault();
    pwSubmit();
  };

  // PASSWORD SUBMIT
  async function pwSubmit() {
    if (isValid === false) return;
    if (isPwSame === false) return;
    setIsRecentSubmitted(true);

    alert("일치 + 유효");
    console.log("일치 + 유효");

    return;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/profile/pwChange?`,
      {
        method: "POST",
        body: pw,
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error("데이터 통신 오류");
    }
    if (data) {
      router.push("/");
    }
  }

  return (
    <div className={cls.PwChangeLayout}>
      <div className={cls.innerForm}>
        <h1>비밀번호 변경</h1>

        <div className={cls.pair}> 
          <div className={cls.L}>PW 입력</div>
          <input type="password" value={pw} onChange={InputPasswordHandler} autoComplete="off"/>
        </div>

        <form onSubmit={submitEntered}>
          <div className={cls.pair}> 
            <div className={cls.L}>PW 재입력</div>
            <input type="email" value={pw2} onChange={InputPasswordHandler} autoComplete="off"/>
          </div>
        </form>
        
        {/* <p className={cls.guidance}>비밀번호 입력</p>
        <input
          type="password"
          value={pw}
          onChange={InputPasswordHandler}
          autoComplete="off"
        />
        <form onSubmit={submitEntered}>
          <p className={cls.guidance}>비밀번호 재입력</p>
          <input
            type="password"
            value={pw2}
            onChange={InputPasswordHandler2}
            autoComplete="off"
          />
        </form> */}

        {!isPwSame && pw.length >= 1 && isRecentSubmitted && (
          <p className={cls.invalid}>PW가 일치하지 않습니다.</p>
        )}

        {!isValid && isRecentSubmitted && (
          <p className={cls.invalid}>
            PW는 영문, 숫자, 특수문자 중 2가지 이상 조합하여 4자리
            이상이여야합니다.
          </p>
        )}

        <button 
          className={cls.PwSubmitBtn}
          disabled={isValid ? false : true}>
          <img
            src="/images/rental/checked.png"
            onClick={submitClicked}
          />
        </button>
      </div>
    </div>
  );
};

export default PwChange;
