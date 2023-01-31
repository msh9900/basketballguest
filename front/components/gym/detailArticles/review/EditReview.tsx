import cls from "./AllReviews.module.scss";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import updateReview from "./reviewUtils/updateReview";
import reviewType from "components/gym/posting/utils/reviewType";
interface Props {
  eachReview: reviewType;
  i: number;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditReview = (props: Props) => {
  const userId = useSelector((state: any) => state.login.userId);
  const userName = useSelector((state: any) => state.login.userName);

  const [fixedTitle, setFixedTitle] = useState(props.eachReview.title);
  const [fixedContent, setFixedContent] = useState(props.eachReview.content);
  const [fixedRatings, setFixedRatings] = useState("3.0");

  const contentChangeHandler = (e: any) => {
    setFixedContent(e.target.value);
  };
  const fixRatings = (e: any) => {
    let str = e.target.value;
    if (str.length === 1) str += ".0";
    setFixedRatings(str);
  };
  const titleChangeHandler = (e: any) => {
    setFixedTitle(e.target.value);
  };

  // REVIEW UPDATE API LOADER
  const loadReviewUpdater = async (eachReview: reviewType) => {
    const reviewId = eachReview.reviewId;
    const updateReviewObj = {
      articleId: eachReview.articleId,
      reviewId: reviewId,
      userId: userId,
      userName: userName,
      title: fixedTitle,
      content: fixedContent,
      rating: fixedRatings,
    };
    
    try {
      await updateReview(reviewId, updateReviewObj);
      await fetch(
        `http://localhost:4000/rental/review?reviewId=${reviewId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateReviewObj),
        }
      );
      await props.setIsFetching(true);
      await props.setIsEditing(false)
    } catch (err: any) {
      alert("리뷰 UPDATE 실패");
    }
  };

  return (
    <>
      <div className={cls.reviewEditForm}>
        <input type="text" onChange={titleChangeHandler} value={fixedTitle} />
        <div className={cls.rangeValue}>
          <input
            type="range"
            min="0"
            max="5"
            step="0.5"
            value={fixedRatings}
            onChange={fixRatings}
          /> &nbsp;
          <span>{fixedRatings}점</span>
        </div>

        <textarea onChange={contentChangeHandler} value={fixedContent} />
        <div className={cls.editControlBtns}>
          <button
            onClick={() => {
              loadReviewUpdater(props.eachReview);
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

export default EditReview;
