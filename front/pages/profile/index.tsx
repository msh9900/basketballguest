import withGetServerSideProps from 'hocs/withServersideProps';
import classes from "./Profile.module.scss";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { IsLogin } from "../../redux/modules/login";

const Profile = () => {
  // let formData: any = new FormData();
  const stateId = useSelector((state: any) => state.login.userId);
  const stateUserName = useSelector((state: any) => state.login.userName);
  const stateUserEmail = useSelector((state: any) => state.login.email);
  const stateUserImg = useSelector((state: any) => state.login.userImg);
  const defaultStateImg = useSelector(
    (state: any) => state.login.defaultImgUrl
  );
  const [cookie, setCookie] = useCookies(["login"]);
  const [pw, setPw] = useState<string>("");
  const [pw2, setPw2] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [userImg, setUserImg] = useState<any>("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isRecentSubmitted, setIsRecentSubmitted] = useState(false);

  const [imgData, setImgData] = useState();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      pw === pw2 &&
      pw.match(
        /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{4,}$/
      )
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [pw, pw2]);

  useEffect(() => {
    setUserName(stateUserName);
    setEmail(stateUserEmail);
    setUserImg(stateUserImg);
    // formData = new FormData();
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
    setImgData(event.target.files[0]);
    setUserImg(URL.createObjectURL(event.target.files[0]));
  };

  async function profileSumbit(event: any) {
    // console.log('formData.get("img")', formData.get("img"));
    event.preventDefault();
    setIsRecentSubmitted(true);
    const formData: any = new FormData();
    formData.append("img", imgData);
    formData.append("id", JSON.stringify(stateId));
    formData.append("pw", JSON.stringify(pw));
    formData.append("email", JSON.stringify(email));
    formData.append("userName", JSON.stringify(userName));
    formData.append("userImg", JSON.stringify(userImg));

    if (isValid === false) {
      return;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/profile/userdata`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error("데이터 통신 오류");
    }
    if (data) {
      setCookie("login", JSON.stringify(data));
      dispatch(IsLogin(data));
      alert("프로필 변경 완료");
      router.push("/");

      // return data;
    }
  }

  const ImgPop = (v: string) => {
    var img = new Image();
    img.src = v;
    const winWidth = 500;
    const winHeight = 500;
    const attr = `width=${winWidth}, height=${winHeight}, menubars=no, scrollbars=auto style="cursor:pointer;"`;
    var OpenWindow = window.open("", "_blank", attr) as typeof window;
    OpenWindow.document.write(
      `<img src=${v} width=100% style='cursor:pointer;' onClick='window.close()'/>`
    );
  };

  return (
    <form onSubmit={profileSumbit} className={classes.profile}>
      <p className={classes.headertitle}>Profile</p>
      {/* <p className={classes.imgtitle}>프로필사진</p> */}
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

        {userImg === "" ? (
          <img
            alt="profileBasicImg"
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
        <p className={classes.profileTitle}>유저 정보</p>
        <p>아이디</p>
        <input type="text" defaultValue={stateId} disabled />
        <p>비밀번호 변경</p>
        <input
          type="password"
          value={pw}
          onChange={InputPasswordHandler}
          autoComplete="off"
          onClick={() => {
            setIsRecentSubmitted(false);
          }}
        />
        <p>비밀번호 재확인</p>
        <input
          type="password"
          value={pw2}
          onChange={InputPasswordHandler2}
          autoComplete="off"
        />
        {!isValid && pw.length > 1 && (
          <p className={classes.invalid}>PW가 일치하지 않습니다.</p>
        )}
        <p>이메일</p>
        <input type="email" value={email} onChange={InputEmailHandler} />
        <p>이름</p>
        <input type="text" value={userName} onChange={InputNameHandler} />
        {!isValid && isRecentSubmitted && (
          <p className={classes.invalid}>
            PW는 영문, 숫자, 특수문자 중 2가지 이상 조합하여 4자리 이상이여야
            합니다.
          </p>
        )}
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
};
export default Profile;
export const getServerSideProps = withGetServerSideProps(async (context:any) => {
	return {
		props: {},
	};
});