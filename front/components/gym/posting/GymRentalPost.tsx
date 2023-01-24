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
const BACK_SERVER = process.env.NEXT_PUBLIC_BACK_SERVER + "/rental/data";
const JSON_SERVER = process.env.NEXT_PUBLIC_JSON_SERVER_GYMARTICLES as string;

const GymRentalPost = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    console.log("hello");
  }, []);

  // data for posting
  const stateId = useSelector((state: any) => state.login.userId);
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

  const post = async () => {
    // 텍스트 데이터 유효성 체크
    // const isValid = await isFormValid(title, address, openingHours, openingPeriod,);
    // if (!isValid) {
    //   console.log('post : not valid form');
    //   return;
    // }

    // 텍스트 데이터 번들 생성
    const textData = {
      stateId,
      title,
      content,
      contact,
      address,
      price,
      openingHours,
      openingPeriod,
      openingDays,
    };
    // const testData = { id: "1" };

    // 텍스트 데이터 전송
    try {
      const response = await fetch("http://localhost:4000/rental/article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(textData),
      });
      const data = await response.json();
      // console.log("텍스트 데이터 post 성공", data);
      alert("게시글 생성 완료");
      router.push("/gym");
    } catch (err: any) {
      // console.log("텍스트 데이터 post 실패", err);
    }
    // 이미지 데이터 전송
    // await setIsLoading(true);
  };

  if (isLoading) return <Loading />;
  else
    return (
      <div className={cls.GymRentalPostLayout}>
        <h2 className={cls.formTitle}>글쓰기</h2>
        <GymImages isLoading={isLoading} setIsLoading={setIsLoading} />
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
