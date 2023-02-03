import AllReviews from "./AllReviews";
import cls from "./ReviewSection.module.scss";
import PostReview from "./PostReview";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Image from "next/image";

const ReviewSection = () => {
  const [isWriting, setIsWriting] = useState(false);
  const [avgRatings, setAvgRatings] = useState(0);
  const [allReviewCount, setAllReviewCount] = useState(0);
  const [isFetching, setIsFetching] = useState(true);
  const [allReviewData, setAllReviewData] = useState<[]>([]);
  const stateId = useSelector((state: any) => state.login.userId);
  const router = useRouter();

  useEffect(() => {
    if (isFetching) getReviewData();
  }, [isFetching]);

  const writeReview = () => {
    if (!isWriting) {
      if (stateId == "") {
        alert("로그인이 필요합니다.");
        return;
      }
      setIsWriting(true);
      return;
    }
    setIsWriting(false);
  };

  const getReviewData = async () => {
    try {
      const pId = router.query.articles as string;
      const response = await fetch(`http://localhost:4000/rental/review?pid=${pId}`);
      const res = await response.json();
      await setAllReviewData(res);
      await setIsFetching(false);

      // 평점
      let ratingsArr: number[] = [];
      res.forEach((item: any) => {
        const eachRatings = item.rating.toString();
        const ratingvalue = parseInt(eachRatings);
        ratingsArr.push(ratingvalue);
      });
      const ratingsSum = ratingsArr.reduce((acc, cur) => acc + cur, 0);
      const avgValue = (ratingsSum / res.length) as number;
      setAvgRatings(Number(avgValue.toFixed(2)));

      // 개수
      setAllReviewCount(res.length);
    } catch (err: any) {
      console.log("err", err);
    }
    
  };

  return (
    <>
      <div className={cls.ReviewSectionLayout}>
        <div className={cls.postReviewBtn}>
          <button onClick={writeReview}>
            <Image
              src="/images/rental/posting.png"
              alt="리뷰 작성"
              width="25"
              height="25"
            />
          </button>
          {isWriting && (
            <PostReview
              setIsWriting={setIsWriting}
              setIsFetching={setIsFetching}
            />
          )}
        </div>

        {!isFetching && (
          <>
            <div className={cls.reviewInfo}>
              <p>
                평균 점수 : {avgRatings} &nbsp; | &nbsp; 리뷰 개수 :
                {allReviewCount}
              </p>
            </div>
            <AllReviews
              allReviewData={allReviewData}
              setIsFetching={setIsFetching}
            />
          </>
        )}
        {isFetching && <>
          <div>
            리뷰 로딩중
          </div>
        </>
        }

        <div className={cls.moreReviewBtn}>
          <button>더 불러오기...</button>
        </div>
      </div>
    </>
  );
};

export default ReviewSection;
