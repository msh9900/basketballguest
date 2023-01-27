import cls from "./AllReviews.module.scss";

import { useState } from "react";
import Image from "next/image";
// type
import reviewType from "components/gym/posting/utils/reviewType";
// comp
import ReviewEditForm from "./ReviewEditForm";
// util
import deleteReview from "./reviewUtils/deleteReview";
import renderStars from "./reviewUtils/renderStars";

interface Props {
  eachReview: reviewType;
  i: number;
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
}

const EachReviews = (props: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  // DELETE Review API Loader
  const loadDeleteReview = async (eachReview: any) => {
    const reviewId = eachReview.reviewId;
    await props.setIsFetching(false);
    try {
      deleteReview(reviewId);
    } catch (err: any) {}
    await props.setIsFetching(true);
  };

  return (
    <>
      {/* 기본 모드 */}
      {!isEditing && (
        <div
          key={JSON.stringify(props.eachReview)}
          className={cls.reviewContents}
        >
          <div className={cls.detailInfos}>
            <div className={cls.topSection}>
              <div className={cls.title}> {props.eachReview.title} </div>
            </div>
            <div className={cls.contents}>
              <div> {props.eachReview.content} </div>
            </div>
            <div className={cls.bottomSection}>
              <div className={cls.left}>
                <span>{props.eachReview.userId}</span> &nbsp;
                <span>{props.eachReview.userName}</span> &nbsp;
                <span>{props.eachReview.createdAt}</span> &nbsp;
                <span>{renderStars(props.eachReview.rating)}</span> &nbsp;
              </div>
              <div className={cls.right}>
                <button
                  onClick={() => {
                    setIsEditing(true);
                  }}
                >
                  <Image
                    src="/images/rental/pencil.png"
                    alt="수정"
                    width="20"
                    height="20"
                  />
                </button>
                <button
                  onClick={() => {
                    loadDeleteReview(props.eachReview);
                  }}
                >
                  <Image
                    src="/images/rental/bin.png"
                    alt="삭제"
                    width="20"
                    height="20"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* 수정 모드 */}
      {isEditing && (
        <ReviewEditForm
          eachReview={props.eachReview}
          i={props.i}
          setIsEditing={setIsEditing}
          setIsFetching={props.setIsFetching}
        />
      )}
    </>
  );
};

export default EachReviews;
