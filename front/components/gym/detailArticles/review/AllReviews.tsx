import cls from "./AllReviews.module.scss";
import EachReviews from "./EachReviews";
// import { useEffect } from "react";

interface reviewType {
  articleId: string;
  reviewId: string;
  userId: string;
  userName: string;
  title: string;
  content: string;
  rating: string;
}
// reviewId, userId
interface Props {
  reviewData: reviewType[];
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
}

const AllReviews = (props: Props) => {
  // useEffect(() => {
  //   console.log("props.reviewData", props.reviewData);
  // });

  return (
    <div className={cls.AllReviewsLayout}>
      {props.reviewData &&
        props.reviewData.map((item, idx) => (
          <EachReviews
            key={Date.now() + Math.random()}
            e={item}
            i={idx}
            setIsFetching={props.setIsFetching}
          />
        ))}
    </div>
  );
};

export default AllReviews;

// setIsFetching
