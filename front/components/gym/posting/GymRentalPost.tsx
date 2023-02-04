import cls from "./GymRentalPost.module.scss";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useState } from "react";

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
  const [imgNum, setImgNum] = useState<number>(0);
  const [isCreating, setIsCreating] = useState(false);
  const [lastRender, setLastRender] = useState(false);

  const post = async () => {

    // 유효성 체크
    const isValid = await isFormValid(
      title,
      address,
      openingHours,
      openingPeriod,
      imgNum
    );
    if (!isValid) return;

    await setIsCreating(true);
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
    FD.append("openingHours", openingHours);
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
      await setIsCreating(false);
      await setLastRender(true)
      await router.push("/gym");
    } catch (error: any) {
      console.log("이미지 데이터 post 실패 : ", error);
    }
  };

  return (
    <>
      {isCreating && (
        <div className={cls.isLoading}>
          <h3>글 작성중...</h3>
          <p>
            입력받은 주소를 <span>위경도</span>로 변환하고 있습니다.
          </p>
          <p>
            <span>위경도</span> 값은 거리순 정렬에 활용됩니다.
          </p>
        </div>
      )}

      {!isCreating && !lastRender && (
        <div className={cls.GymRentalPostLayout}>
          <h2 className={cls.formTitle}>글쓰기</h2>
          <GymImages
            imgFormData={imgFormData}
            setImgFormData={setImgFormData}
            inputImgs={inputImgs}
            setInputImgs={setInputImgs}
            setImgNum={setImgNum}
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
      )}
    </>
  );
};

export default GymRentalPost;
