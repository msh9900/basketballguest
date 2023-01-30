import cls from "./AllReviews.module.scss";

import { useState } from "react";
import Image from "next/image";
// type
import reviewType from "components/gym/posting/utils/reviewType";
// comp
import EditReview from "./EditReview";
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

  // DELETE Review
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
            <div className={cls.top}>
              <div className={cls.titleSection}> 
                <div>{props.eachReview.title} </div>
                <div className={cls.controlBtns}>
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

            <div className={cls.otherInfos}>
              <span className={cls.s1}> 평가 : <b>{renderStars(props.eachReview.rating)}</b></span>
              <span className={cls.partition}>|</span>
              <span className={cls.s2}>{props.eachReview.userName}</span>
              <span className={cls.partition}>|</span>
              <span className={cls.s3}>{props.eachReview.createdAt}</span>
            </div>


            <div className={cls.contents}>
              <div> {props.eachReview.content} </div>
            </div>


          </div>
        </div>
      )}
      {/* 수정 모드 */}
      {isEditing && (
        <EditReview
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
