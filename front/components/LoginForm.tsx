import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import classes from './LoginForm.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { IsLogin } from '../redux/modules/login';

export default function LoginForm(props: any) {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [isIdPwValid, setIsIdPwValid] = useState(false);
  const [isRecentSubmitted, setIsRecentSubmitted] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id.length > 3 && pw.length > 3) {
      setIsIdPwValid(true);
    } else {
      setIsIdPwValid(false);
    }
  }, [id, pw]);

  const handleId = (e: any) => {
    setId(e.target.value);
  };

  const handlePw = (e: any) => {
    setPw(e.target.value);
  };

  const loginFormHandler = async (event: any) => {
    event.preventDefault();
    setIsRecentSubmitted(true);

    if (isIdPwValid === false) {
      return;
    }

    const response: any = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: id,
        pw: pw,
      }),
    });
    const data = await response.json();

    try {
      if (data.msg === '로그인 실패') {
        alert('아이디나 패스워드를 확인해주세요');
      } else {
        alert('로그인성공');
        navigate('/');
        dispatch(IsLogin(data));
      }
    } catch {
      throw new Error('통신 에러');
    }
  };

  return (
    <>
      <form onSubmit={loginFormHandler} className={classes.loginForm}>
        <div className={classes.logo}>
          <Link to="/" className={classes.title}>
            <SportsBasketballIcon fontSize="inherit" className={classes.ball} />
            BPT
          </Link>
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
            autoComplete="off"
            onClick={() => {
              setIsRecentSubmitted(false);
            }}
          />

          {!isIdPwValid && isRecentSubmitted && (
            <p className={classes.invalid}>ID와 PW값은 4글자 이상입니다.</p>
          )}

          <Button type="submit">로그인</Button>
          <Link to="/register" className={classes.register}>
            <p>회원가입</p>
          </Link>
        </div>
      </form>
    </>
  );
}