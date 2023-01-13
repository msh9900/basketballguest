import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import classes from './RegisterForm.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { IsLogin } from '../redux/modules/login';

export default function LoginForm(props: any) {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  // const [isValid, setIsValid] = useState(false);
  // const [isRecentSubmitted, setIsRecentSubmitted] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: id,
        pw: pw,
        email: email,
        userName: userName,
      }),
    });
    const data = await response.json();
    console.log(data);
    try {
      if (data.msg === '회원가입 완료') {
        alert('회원 가입성공');
        dispatch(IsLogin(data));
        navigate('/login');
      } else {
        alert('중복된 회원 존재');
      }
    } catch {
      throw new Error('통신 에러');
    }
  };

  return (
    <>
      <form onSubmit={registerFormHandler} className={classes.loginForm}>
        <div className={classes.logo}>
          <Link to="/" className={classes.title}>
            <SportsBasketballIcon fontSize="inherit" className={classes.ball} />
            BPT
          </Link>
        </div>
        <div className={classes.register}>
          <input
            type="email"
            className={classes.email}
            placeholder="이메일"
            value={email}
            onChange={handleEmail}
            // onClick={() => {
            //   setIsRecentSubmitted(false);
            // }}
          />
          <input
            type="text"
            className={classes.id}
            placeholder="아이디"
            value={id}
            onChange={handleId}
            // onClick={() => {
            //   setIsRecentSubmitted(false);
            // }}
          />
          <input
            type="password"
            className={classes.id}
            placeholder="비밀번호"
            value={pw}
            autoComplete="off"
            onChange={handlePw}
            // onClick={() => {
            //   setIsRecentSubmitted(false);
            // }}
          />
          <input
            type="text"
            className={classes.id}
            placeholder="이름"
            value={userName}
            onChange={handleUserName}
            // onClick={() => {
            //   setIsRecentSubmitted(false);
            // }}
          />
          <Button type="submit">
            <p>가입하기</p>
          </Button>
          <Link to="/login" className={classes.loginBtn}>
            <p>로그인</p>
          </Link>
        </div>
      </form>
    </>
  );
}