import cls from "./AllReviews.module.scss";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import updateReview from './reviewUtils/updateReview';
import reviewType from 'components/gym/posting/utils/reviewType';
interface Props {
  eachReview: reviewType;
  i: number;
  setIsEditing : React.Dispatch<React.SetStateAction<boolean>>;
  setIsFetching : React.Dispatch<React.SetStateAction<boolean>>;
}

const ReviewEditForm = (props:Props) => {

  const [fixedTitle, setFixedTitle] = useState(props.eachReview.title);
  const [fixedContent, setFixedContent] = useState(props.eachReview.content);
  const [fixedRatings, setFixedRatings] = useState("3.0");
  const userId = useSelector((state: any) => state.login.userId);
  const userName = useSelector((state: any) => state.login.userName);

  const contentChangeHandler = (e: any) => {
    setFixedContent(e.target.value);
  };
  const fixRatings = (e: any) => {
    let str = e.target.value;
    if (str.length === 1) str += ".0";
    setFixedRatings(str);
  };
  const titleChangeHandler = (e:any) => {
    setFixedTitle(e.target.value);
  };

  // REVIEW UPDATE API LOADER
  const loadReviewUpdater = async (eachReview: reviewType) => {
    const reviewId = eachReview.reviewId
    const updateReviewObj = {
      articleId: eachReview.articleId,
      reviewId: reviewId,
      userId: userId,
      userName: userName,
      title: fixedTitle,
      content: fixedContent,
      rating: fixedRatings,
    };
    props.setIsFetching(true)
    try {
      await updateReview(reviewId, updateReviewObj)
      alert("리뷰 UPDATE 성공");
    } catch (err: any) {
      alert("리뷰 UPDATE 실패");
    }
    props.setIsFetching(false)
  }

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

export default ReviewEditForm;
