import classes from './Profile.module.scss';
import { SetStateAction, useState } from 'react';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { IsLogin } from '../../redux/modules/login';

const formData = new FormData();

export default function Profile() {
  const [id, setId] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [userImg, setUserImg] = useState<any>('');
  const [isValid, setIsValid] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const InputIdHandler = (event: any) => {
    setId(event.target.value);
  };

  const InputPasswordHandler = (event: any) => {
    setPw(event.target.value);
  };
  const InputEmailHandler = (event: any) => {
    setEmail(event.target.value);
  };

  const InputNameHandler = (event: any) => {
    setUserName(event.target.value);
  };

  const imgHandler = (event: any) => {
    formData.append('img', event.target.files[0]);
    setUserImg(URL.createObjectURL(event.target.files[0]));
  };

  async function profileSumbit() {
    const resImg = await fetch('http://localhost:4000/profile/img', {
      method: 'POST',
      headers: {},
      body: formData,
    });

    const imgName = await resImg.json();

    const response = await fetch('http://localhost:4000/profile/userdata', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        id,
        pw,
        email,
        userName,
        userImg: imgName,
      }),
    });
    const data = await response.json();

    // if (data) {
    //   navigate('/login');
    // }
  }
  return (
    <form onSubmit={profileSumbit} className={classes.profile}>
      <Button>개인정보</Button>
      <div className={classes.img}>
        <p>프로필사진</p>
        <img alt="img" src={userImg} />
        <input type="file" accept="image/*" onChange={imgHandler} />
      </div>
      <div className={classes.ProfileForm}>
        <p>유저 정보</p>
        <p>아이디</p>
        <input type="text" value={id} onChange={InputIdHandler}></input>
        <p>비밀번호 변경</p>
        <input type="password" value={pw} onChange={InputPasswordHandler} />
        {/* <p>비밀번호 재확인</p>
        <input type="password" /> */}
        <p>이메일</p>
        <input type="text" value={email} onChange={InputEmailHandler} />
        <p>이름</p>
        <input type="text" value={userName} onChange={InputNameHandler} />
        <Button type="submit">정보 변경</Button>
      </div>
    </form>
  );
}
