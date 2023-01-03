import classes from './Profile.module.scss';
import { useState } from 'react';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const formData = new FormData();

export default function Profile() {
  const [id, setId] = useState();
  const [pw, setPw] = useState();
  const [email, setEmail] = useState();
  const [userName, setUserName] = useState();
  const [userImg, setUserImg] = useState();

  const naviagate = useNavigate();
  const dispatch = useDispatch();

  async function imgHandler(e: any) {
    formData.append('img', e.target.files[0]);
    console.log(formData);
  }
  async function profileSumbit() {
    const response = await fetch('http://localhost:4000/profile/', {
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        id,
        pw,
        email,
        userName,
        userImg,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data) {
      setId(data.id);
    }
  }
  return (
    <form onSubmit={profileSumbit} className={classes.profile}>
      <Button>개인정보</Button>
      <div className={classes.img}>
        <p>프로필사진</p>
        <img></img>
        <input type="file" value={userImg} onChange={imgHandler} />
      </div>
      <div className={classes.ProfileForm}>
        <p>유저 정보</p>
        <p>아이디</p>
        <input type="text" value={id}></input>
        <p>비밀번호 변경</p>
        <input type="password" />
        <p>비밀번호 재확인</p>
        <input type="password" />
        <p>이메일</p>
        <input type="text" value={email} />
        <p>이름</p>
        <input type="text" value={userName} />
        <Button type="submit">정보 변경</Button>
      </div>
    </form>
  );
}
