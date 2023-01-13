import EachReview from './EachReview';
import cls from './ReviewSection.module.scss'
import ReviewForm from './ReviewForm'
import {useState} from 'react'

const ReviewSection = () => {
  const [isWriting, setIsWriting] = useState(false)
  const writeReview = () => {
    if(isWriting) {setIsWriting(false)}
    if(!isWriting) {setIsWriting(true)}
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
      <EachReview/>
      <div className={cls.moreReviewBtn}>
        <button>더불러오기...</button>
      </div>
    </div>
  );
};

export default ReviewSection;

