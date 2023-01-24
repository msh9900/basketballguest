import EachReview from "./EachReview";
import cls from "./ReviewSection.module.scss";
import ReviewForm from "./ReviewForm";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

interface reviewType {
  articleId: string;
  id: string;
  userName: string;
  title: string;
  content: string;
  rating: string;
}
const initialValue = {
  articleId: "",
  id: "",
  userName: "",
  title: "",
  content: "",
  rating: "1",
};

const ReviewSection = () => {
  const [isWriting, setIsWriting] = useState(false);
  const [avgRatings, setAvgRatings] = useState(0);
  const [allReviewCount, setAllReviewCount] = useState(0);
  const [isFetching, setIsFetching] = useState(true);

  const writeReview = () => {
    if (isWriting) {
      setIsWriting(false);
    }
    if (!isWriting) {
      setIsWriting(true);
    }
  };
  const [reviewData, setReviewData] = useState<reviewType[]>([initialValue]);

  useEffect(() => {
    getReviewData();
  }, []);

  const router = useRouter();
  const getReviewData = async () => {
    try {
      const pId = router.query.articles as string;
      const response = await fetch(
        `http://localhost:4000/rental/review?pid=${pId}`
      );
      const dataArray = await response.json();
      console.log(" RETURN된 리뷰 ", dataArray);
      setReviewData(dataArray);

      // 평균 리뷰 점수 계산
      let ratingsArr: number[] = [];
      reviewData.forEach((ele: reviewType) => {
        const eachRatings = ele.data.rating.toString();
        const ratingvalue = parseInt(eachRatings);
        ratingsArr.push(ratingvalue);
      });

      const ratingsSum = ratingsArr.reduce((acc, cur) => acc + cur, 0);
      const avgValue = (ratingsSum / reviewData.length) as number;
      setAvgRatings(Number(avgValue.toFixed(2)));

      // 전체 리뷰 개수
      setAllReviewCount(reviewData.length);
    } catch (err: any) {
      console.log("err", err);
    }
    setIsFetching(false);
  };

  return (
    <>
      {!isFetching && (
        <div className={cls.ReviewSectionLayout}>
          <div className={cls.postReviewBtn}>
            <button onClick={writeReview}>리뷰 작성</button>
            {isWriting && <ReviewForm setIsWriting={setIsWriting} />}
          </div>
          <div className={cls.reviewInfo}>
            <p>평균 리뷰 점수 : {avgRatings}</p>
            <p>전체 리뷰 개수 : {allReviewCount}</p>
          </div>
          <EachReview reviewData={reviewData} />
          <div className={cls.moreReviewBtn}>
            <button>더불러오기...</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewSection;
