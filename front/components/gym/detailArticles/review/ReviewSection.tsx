import EachReview from './EachReview';
import cls from './ReviewSection.module.scss'
import ReviewForm from './ReviewForm'
import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'

interface reviewType{
  userName: string,
  profileImg: string,
  createdDate: string,
  contents: string,
  ratings: string,
}

const initialValue = {
  userName: 'string',
  profileImg: 'string',
  createdDate: 'string',
  contents: 'string',
  ratings: '5',
}


const ReviewSection = () => {
  const [isWriting, setIsWriting] = useState(false)
  const [avgRatings, setAvgRatings] = useState(0)
  const [allReviewCount, setAllReviewCount] = useState(0)

  const writeReview = () => {
    if(isWriting) {setIsWriting(false)}
    if(!isWriting) {setIsWriting(true)}
  }

  const [reviewData, setReviewData] = useState<reviewType[]>([initialValue])
  
  useEffect(() => {
    const pageId = router.query.articles as string
    getReviewData(pageId)
  }, []);
  
  const router = useRouter()
  const getReviewData = async (pageId:string) => {
    const response = await fetch(`http://localhost:5000/gymReviews/${pageId}`);
    const data = await response.json()
    setReviewData(data.body)

    // 평균 리뷰 점수
    let ratingsArr:number[] = []
    data.body.forEach((ele:reviewType) => {
      const eachRatings = ele.ratings.toString()
      const ratingvalue = parseInt(eachRatings)
      ratingsArr.push(ratingvalue)
    });
    
    const ratingsSum = ratingsArr.reduce((acc, cur) => acc + cur);
    const avgValue = ratingsSum/data.body.length as number
    setAvgRatings(Number(avgValue.toFixed(2)))

    // 전체 리뷰 개수
    setAllReviewCount(data.body.length)
  }

  const getAverageStars = (numArr:number[]) => {
  }

  return (
    <div className={cls.ReviewSectionLayout}>
      <div className={cls.postReviewBtn}>
        <button onClick={writeReview}>리뷰 작성</button>
        {isWriting && 
          <ReviewForm
            setIsWriting={setIsWriting}
          />
        }
      </div>
      <div className={cls.reviewInfo}>
         <p>평균 리뷰 점수 : {avgRatings}</p>
         <p>전체 리뷰 개수 : {allReviewCount}</p>
      </div>
      <EachReview reviewData={reviewData}/>
      <div className={cls.moreReviewBtn}>
        <button>더불러오기...</button>
      </div>
    </div>
  );
};

export default ReviewSection;