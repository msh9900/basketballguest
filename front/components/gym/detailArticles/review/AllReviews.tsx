import cls from "./AllReviews.module.scss";
import EachReviews from './EachReviews';
import reviewType from 'components/gym/posting/utils/reviewType';
interface data{
  data:reviewType
}
interface Props {
  allReviewData: data[];
  setIsFetching:React.Dispatch<React.SetStateAction<boolean>>
}

const AllReviews = (props: Props) => {
  return (
    <div className={cls.AllReviewsLayout}>
      {props.allReviewData &&
        props.allReviewData.map((eachReview, idx) => (
          <EachReviews
            key={Date.now() + Math.random()} 
            eachReview={eachReview.data} 
            i={idx}
            setIsFetching={props.setIsFetching}
          />
        ))}
    </div>
  );
};

export default AllReviews;
// setIsFetching