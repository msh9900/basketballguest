import cls from "./AllReviews.module.scss";
import { useState } from "react";
import Image from "next/image";

interface reviewType {
  articleId: string;
  reviewId: string;
  userId: string;
  userName: string;
  title: string;
  content: string;
  rating: string;
}

interface Props {
  e: reviewType;
  i: number;
  setIsEditing : React.Dispatch<React.SetStateAction<boolean>>;
}

const ReviewEditForm = (props:Props) => {

  const [fixedTitle, setFixedTitle] = useState(props.e.data.title);
  const [fixedContent, setFixedContent] = useState(props.e.data.content);
  const [fixedRatings, setFixedRatings] = useState("3.0");

  const contentChangeHandler = (e: any) => {
    setFixedContent(e.target.value);
  };
  const fixRatings = (e: any) => {
    let str = e.target.value;
    if (str.length === 1) {
      str += ".0";
    }
    setFixedRatings(str);
  };
  const titleChangeHandler = (e:any) => {
    setFixedTitle(e.target.value);
  };

    // 리뷰 수정
    const updateReview = async (ele: any) => {
      const reviewId = ele.reviewId;
      const updateReviewObj = {
        articleId: ele.articleId,
        reviewId: ele.reviewId,
        userId: ele.userId,
        userName: ele.userName,
        title: fixedTitle,
        content: fixedContent,
        rating: fixedRatings,
      };
  
      try {
        const response = await fetch(
          `http://localhost:4000/rental/review?reviewId=${reviewId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updateReviewObj),
          }
        );
        const data = await response.json();
        alert("리뷰 UPDATE 성공");
      } catch (err: any) {
        alert("리뷰 UPDATE 실패");
      }
    };

  return (
    <>
      <div className={cls.reviewEditForm}>
        <input type="text" onChange={titleChangeHandler} value={fixedTitle} />
        <textarea onChange={contentChangeHandler} value={fixedContent} />
        <input
          type="range"
          min="0"
          max="5"
          step="0.5"
          value={fixedRatings}
          onChange={fixRatings}
        />
        <span>{fixedRatings}점</span>
        <div className={cls.editControlBtns}>
          <button
            onClick={() => {
              updateReview(props.e);
            }}
          >
            <Image
              src="/images/rental/checked.png"
              alt="완료"
              width="20"
              height="20"
            />
          </button>
          <button
            onClick={() => {
              props.setIsEditing(false);
            }}
          >
            <Image
              src="/images/rental/cancel.png"
              alt="완료"
              width="20"
              height="20"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default ReviewEditForm;
