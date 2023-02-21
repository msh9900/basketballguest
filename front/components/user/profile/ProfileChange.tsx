import classes from "./ProfileChange.module.scss";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { IsLogin } from "redux/modules/login";
import ImgPop from "util/ImgPop";

const ProfileChange = () => {
  const stateId = useSelector((state: any) => state.login.userId);
  const stateUserName = useSelector((state: any) => state.login.userName);
  const stateUserEmail = useSelector((state: any) => state.login.email);
  const stateUserImg = useSelector((state: any) => state.login.userImg);
  const [email, setEmail] = useState<string>(stateUserEmail);
  const [userName, setUserName] = useState<string>(stateUserName);
  const [userImg, setUserImg] = useState<string>(stateUserImg); // for img output
  const [imgData, setImgData] = useState(); // for submit
  const [cookie, setCookie] = useCookies(["login"]);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    setEmail(stateUserEmail);
    setUserName(stateUserName);
    setUserImg(stateUserImg);
  }, []);

  async function profileSumbit(event: any) {
    event.preventDefault();
    const formData: any = new FormData();
    formData.append("img", imgData);
    formData.append("id", JSON.stringify(stateId));
    formData.append("email", JSON.stringify(email));
    formData.append("userName", JSON.stringify(userName));
    formData.append("userImg", JSON.stringify(userImg));

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
      setUserImg(data.userImg);
      alert("프로필 변경 완료");
      router.push("/");
    }
  }

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

  return (
    <>
      <form onSubmit={profileSumbit} className={classes.ProfileChangeLayout}>
        <div className={classes.profileForm}>
          {/* <h1>프로필 변경</h1> */}
          <div className={classes.profileImgBox}>
            {/* 프로필 이미지 선택*/}
            <label htmlFor="profileImgFile" className={classes.imgFileLabel}>
              프로필 사진 선택
              <input
                id="profileImgFile"
                type="file"
                accept="image/*"
                onChange={imgHandler}
                className={classes.fileChoice}
              />
            </label>

            {/* 프로필 이미지 출력*/}
            <img
              alt="profileImage"
              src={userImg}
              className={classes.imgCurrent}
              onClick={() => {
                ImgPop(userImg);
              }}
            />
          </div>

          <div className={classes.pair}>
            <div className={classes.L}>아이디</div>
            <input type="text" defaultValue={stateId} disabled />
          </div>

          <div className={classes.pair}>
            <div className={classes.L}>이메일</div>
            <input type="email" value={email} onChange={InputEmailHandler} />
          </div>

          <div className={classes.pair}>
            <div className={classes.L}>이름</div>
            <input type="text" value={userName} onChange={InputNameHandler} />
          </div>

          <button type="submit" className={classes.button}>
            <img src="/images/rental/checked.png" />
          </button>
        </div>
      </form>
    </>
  );
};

export default ProfileChange;
