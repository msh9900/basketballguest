import AllReviews from "./AllReviews";
import cls from "./ReviewSection.module.scss";
import ReviewPostForm from "./ReviewPostForm";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import getReview from './reviewUtils/getReview';

const ReviewSection = () => {
  const [isWriting, setIsWriting] = useState(false);
  const [avgRatings, setAvgRatings] = useState(0);
  const [allReviewCount, setAllReviewCount] = useState(0);
  const [isFetching, setIsFetching] = useState(true);
  const [allReviewData, setAllReviewData] = useState<[]>([]);
  const router = useRouter();

  // 패치마다 새로 GET REVIEW 호출
  useEffect(() => {
    getallReviewData();
  }, [isFetching]);

  // 리뷰 포스트 폼 토글
  const writeReview = () => {
    if (isWriting) setIsWriting(false);
    if (!isWriting) setIsWriting(true);
  };

  // GET REVIEW API LOADER
  const getallReviewData = async () => {
    try {
      const pId = router.query.articles as string;
      const dataArray = await getReview(pId)
      setAllReviewData(dataArray);

      // 평균 리뷰 점수 계산
      let ratingsArr: number[] = [];
      allReviewData.forEach((item:any) => {
        const eachRatings = item.data.rating.toString();
        const ratingvalue = parseInt(eachRatings);
        ratingsArr.push(ratingvalue);
      });

      const ratingsSum = ratingsArr.reduce((acc, cur) => acc + cur, 0);
      const avgValue = (ratingsSum / allReviewData.length) as number;
      setAvgRatings(Number(avgValue.toFixed(2)));

      // 전체 리뷰 개수
      setAllReviewCount(allReviewData.length);
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
            <button onClick={writeReview}>
              <Image
                src="/images/rental/posting.png"
                alt="댓글 수정"
                width="25"
                height="25"
              />
            </button>
            {isWriting && <ReviewPostForm setIsWriting={setIsWriting} setIsFetching={setIsFetching}/>}
          </div>
          <div className={cls.reviewInfo}>
            <p>평균 점수 : {avgRatings} &nbsp;|&nbsp; 리뷰 개수 : {allReviewCount}</p>
          </div>
          <AllReviews allReviewData={allReviewData} setIsFetching={setIsFetching}/>
          <div className={cls.moreReviewBtn}>
            <button>더불러오기...</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewSection;
