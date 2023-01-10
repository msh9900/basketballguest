import classes from './Profile.module.scss';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IsLogin } from '../../redux/modules/login';
const formData = new FormData();

export default function Profile() {
  const stateId = useSelector((state: any) => state.login.userid);
  const stateUserName = useSelector((state: any) => state.login.userName);
  const stateUserEmail = useSelector((state: any) => state.login.email);
  const stateUserImg = useSelector((state: any) => state.login.userImg);
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
    setUserName(stateUserName);
    setEmail(stateUserEmail);
    setUserImg(stateUserImg);
  }, []);

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
  };

  async function profileSumbit(event: any) {
    event.preventDefault();
    formData.append('id', JSON.stringify(stateId));
    formData.append('pw', JSON.stringify(pw));
    formData.append('email', JSON.stringify(email));
    formData.append('userName', JSON.stringify(userName));
    formData.append('userImg', JSON.stringify(userImg));
    const response = await fetch('http://localhost:4000/profile/userdata', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error('데이터 통신 오류');
    }
    if (data) {
      alert('프로필 변경 완료');
      navigate('/');
      dispatch(IsLogin(data));
      return data;
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
              ImgPop(userImg);
            }}
          />
        )}
      </div>

      <div className={classes.profileForm}>
        <div className={classes.profileTitle}>유저 정보</div>
        <p>아이디</p>
        <input type="text" defaultValue={stateId} />
        <p>비밀번호 변경</p>
        <input
          type="password"
          value={pw}
          onChange={InputPasswordHandler}
          autoComplete="off"
        />
        <p>비밀번호 재확인</p>
        <input
          type="password"
          value={pw2}
          onChange={InputPasswordHandler2}
          autoComplete="off"
        />
        <p>이메일</p>
        <input
          type="email"
          value={email}
          onChange={InputEmailHandler}
          placeholder={`${stateUserEmail}`}
        />
        <p>이름</p>
        <input
          type="text"
          value={userName}
          onChange={InputNameHandler}
          placeholder={`${stateUserName}`}
        />

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
