import cls from "./AllReviews.module.scss";
import EachReviews from './EachReviews';
import reviewType from 'components/gym/posting/utils/reviewType';
import {useEffect} from 'react'

interface Props {
  allReviewData: reviewType[];
  setIsFetching:React.Dispatch<React.SetStateAction<boolean>>
}

const AllReviews = (props: Props) => {

  return (
    <div className={cls.AllReviewsLayout}>
      {props.allReviewData &&
        props.allReviewData.map((eachReview, idx) => (
          <EachReviews
            key={Date.now() + Math.random()} 
            eachReview={eachReview} 
            i={idx}
            setIsFetching={props.setIsFetching}
          />
        ))}
    </div>
  );
};



export default AllReviews;
// setIsFetching
