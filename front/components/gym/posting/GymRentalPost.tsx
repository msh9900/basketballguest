import cls from "./GymRentalPost.module.scss";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

//  component
import GymTitle from "./templates/GymTitle";
import GymContent from "./templates/GymContent";
import GymContact from "./templates/GymContact";
import GymAddress from "./templates/GymAddress";
import GymOpeningHours from "./templates/GymOpeningHours";
import GymOpeningPeriod from "./templates/GymOpeningPeriod";
import GymOpeningDays from "./templates/GymOpeningDays";
import GymImages from "./templates/GymImages";
import GymPrice from "./templates/GymPrice";
import Loading from "components/common/loadingModule/Loading";

// util
import isFormValid from "./utils/isFormValid";

const GymRentalPost = () => {
  const router = useRouter();
  // const [isFetching, setIsFetching] = useState(false);

  // data for posting
  const stateId = useSelector((state: any) => state.login.userId);
  const stateName = useSelector((state: any) => state.login.userName);
  const cancelPost = () => {
    router.push("/gym");
  };

  // state : form contents
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState([
    { category: "postcode", val: "" },
    { category: "roadAddress", val: "" },
    { category: "jibunAddress", val: "" },
    { category: "detailAddress", val: "" },
    { category: "extraAddress", val: "" },
  ]);
  const [price, setPrice] = useState("");
  const [openingHours, setOpeningHours] = useState("");
  const [openingPeriod, setOpeningPeriod] = useState<string[]>(["", ""]);
  const [openingDays, setOpeningDays] = useState([
    { name: "일", open: false },
    { name: "월", open: false },
    { name: "화", open: false },
    { name: "수", open: false },
    { name: "목", open: false },
    { name: "금", open: false },
    { name: "토", open: false },
  ]);

  // images
  const [imgFormData, setImgFormData] = useState<any>();
  const [inputImgs, setInputImgs] = useState<string[]>([]);

  const post = async () => {

    // 로그인 확인
    if(stateId=='') return

    // 유효성 체크
    // const isValid = await isFormValid(title, address, openingHours, openingPeriod,);
    // if (!isValid) {
    //   console.log('post : not valid form');
    //   return;
    // }

    // 텍스트 데이터 폼
    const FD = new FormData();
    FD.append("userId", stateId);
    FD.append("userName", stateName);
    FD.append("title", title);
    FD.append("content", content);
    FD.append("contact", contact);
    FD.append("userImg", JSON.stringify(inputImgs));
    FD.append("address", JSON.stringify(address));
    FD.append("price", price);
    FD.append("openingHours", JSON.stringify(openingHours));
    FD.append("openingPeriod", JSON.stringify(openingPeriod));
    FD.append("openingDays", JSON.stringify(openingDays));
    
    // 이미지 데이터 폼과 병합
    for (const pair of imgFormData.entries()) {
      FD.append(pair[0], pair[1]);
    }
    
    // 전송
    try {
      await fetch("http://localhost:4000/rental/article", {
        method: "POST",
        body: FD,
      });
      router.push("/gym");
      console.log("이미지 데이터 post 성공 : ");
    } catch (error: any) {
      console.log("이미지 데이터 post 실패 : ", error);
    }
  };

  return (
    <div className={cls.GymRentalPostLayout}>
      <h2 className={cls.formTitle}>글쓰기</h2>
      <GymImages
        imgFormData={imgFormData}
        setImgFormData={setImgFormData}
        inputImgs={inputImgs}
        setInputImgs={setInputImgs}
      />
      <form>
        <GymTitle title={title} setTitle={setTitle} />
        <GymContent content={content} setContent={setContent} />
        <GymContact contact={contact} setContact={setContact} />
        <GymAddress address={address} setAddress={setAddress} />
        <GymPrice price={price} setPrice={setPrice} />
        <GymOpeningHours
          openingHours={openingHours}
          setOpeningHours={setOpeningHours}
        />
        <GymOpeningPeriod
          openingPeriod={openingPeriod}
          setOpeningPeriod={setOpeningPeriod}
        />
        <GymOpeningDays
          openingDays={openingDays}
          setOpeningDays={setOpeningDays}
        />
      </form>
      <div className={cls.bottomBtns}>
        <button onClick={cancelPost}>취소</button>
        <button onClick={post}>글생성</button>
      </div>
    </div>
  );
};

export default GymRentalPost;
