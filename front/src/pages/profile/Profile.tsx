import classes from './Profile.module.scss';
import { useState, useEffect } from 'react';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IsLogin } from '../../redux/modules/login';
const formData = new FormData();

export default function Profile() {
  const stateId = useSelector((state: any) => state.login.userid);
  const defaultStateImg = useSelector(
    (state: any) => state.login.defaultImgUrl,
  );
  const [pw, setPw] = useState<string>('');
  const [pw2, setPw2] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [userImg, setUserImg] = useState<any>('');
  const [isValid, setIsValid] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (pw === pw2) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [pw, pw2]);

  const InputPasswordHandler = (e: any) => {
    setPw(e.target.value);
  };
  const InputPasswordHandler2 = (e: any) => {
    setPw2(e.target.value);
  };

  const InputEmailHandler = (event: any) => {
    setEmail(event.target.value);
  };

  const InputNameHandler = (event: any) => {
    setUserName(event.target.value);
  };

  const imgHandler = async (event: any) => {
    formData.append('img', event.target.files[0]);
    setUserImg(URL.createObjectURL(event.target.files[0]));
    await fetch('http://localhost:4000/profile/img', {
      method: 'POST',
      body: formData,
    });
  };

  async function profileSumbit() {
    const response = await fetch('http://localhost:4000/profile/userdata', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        stateId,
        pw,
        email,
        userName,
        userImg,
      }),
    });
    const data = await response.json();
    try {
      if (data) {
        console.log('!');
        // dispatch(IsLogin(data));
      }
    } catch (error) {
      console.log(error);
    }
  }

  const ImgPop = (v: string) => {
    var img = new Image();
    img.src = v;
    const winWidth = 500;
    const winHeight = 500;
    const attr = `width=${winWidth}, height=${winHeight}, menubars=no, scrollbars=auto style="cursor:pointer;"`;
    var OpenWindow = window.open('', '_blank', attr) as typeof window;
    OpenWindow.document.write(
      `<img src=${v} width=100% onClick='window.close()'/>`,
    );
  };

  return (
    <form onSubmit={profileSumbit} className={classes.profile}>
      <p className={classes.header}>개인정보</p>
      <p className={classes.imgtitle}>프로필사진</p>
      <div className={classes.img}>
        <label htmlFor="asdf" className={classes.imglabel}>
          프로필 사진 넣기
          <input
            id="asdf"
            type="file"
            accept="image/*"
            onChange={imgHandler}
            className={classes.fileChoice}
          />
        </label>

        {userImg === '' ? (
          <img
            alt="profileImg"
            src={defaultStateImg}
            className={classes.imgcurrent}
            onClick={() => {
              ImgPop(defaultStateImg);
            }}
          />
        ) : (
          <img
            alt="profileImg"
            src={userImg}
            className={classes.imgcurrent}
            onClick={() => {
              ImgPop(defaultStateImg);
            }}
          />
        )}
      </div>

      <div className={classes.profileForm}>
        <div className={classes.profileTitle}>유저 정보</div>
        <p>아이디</p>
        <input type="text" defaultValue={stateId} />
        <p>비밀번호 변경</p>
        <input type="password" value={pw} onChange={InputPasswordHandler} />
        <p>비밀번호 재확인</p>
        <input type="password" value={pw2} onChange={InputPasswordHandler2} />
        <p>이메일</p>
        <input type="email" value={email} onChange={InputEmailHandler} />
        <p>이름</p>
        <input type="text" value={userName} onChange={InputNameHandler} />

        <button
          type="submit"
          className={classes.button}
          disabled={isValid ? false : true}
        >
          정보 변경
        </button>
      </div>
    </form>
  );
}
