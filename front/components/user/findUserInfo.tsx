import cls from "./findUserInfo.module.scss";
import Link from "next/link";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const findUserInfo = () => {

  const [email, setEmail] = useState("");
  const [searchTarget, setSearchTarget] = useState("");
  const router = useRouter()

  useEffect(() => {
    if(router.asPath == '/findUserPw'){
      setSearchTarget('비밀번호')
    }
    if(router.asPath == '/findUserId'){
      setSearchTarget('아이디')
    }
  }, [router.asPath]);

  const onChange = (e: any) => {
    setEmail(e.target.value);
  };

  const cancel = () => {
    router.push('/')
  }
  const submit = () => {
    // 이메일이 DB에 없는 경우 :
    // alert('이메일이 존재하지 않습니다.')
    
    // 이메일이 DB에 있는 경우 :
    alert('이메일을 확인해 주세요')
  }

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
          <p>이메일 계정을 통해 등록한 <b>{searchTarget}</b>를 찾아보세요</p>
          <input
            type="text"
            className={cls.email}
            value={email}
            placeholder="email"
            onChange={onChange}
          />
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
