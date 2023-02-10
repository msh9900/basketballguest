// style
import cls from "./AllReviews.module.scss";
// react next
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
// type
import reviewType from "components/gym/posting/utils/reviewType";
// comp
import EditReview from "./EditReview";
// util
import renderStars from "./reviewUtils/renderStars";

interface Props {
  eachReview: reviewType;
  i: number;
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
}

const EachReviews = (props: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const stateId = useSelector((state: any) => state.login.userId);
  useEffect(() => {
    console.log('stateId', stateId)
    console.log('reviewId', props.eachReview.userId)
  }, []);

  // DELETE
  const loadDeleteReview = async (eachReview: any) => {
    const reviewId = eachReview.reviewId;
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/rental/review?reviewId=${reviewId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      await props.setIsFetching(true);
    } catch (err: any) {}
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
                  className={props.eachReview.userId === stateId ? cls.block : cls.none}
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
                  className={props.eachReview.userId === stateId ? cls.block : cls.none}
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
