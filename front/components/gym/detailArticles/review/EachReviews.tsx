import cls from "./AllReviews.module.scss";
import ReviewEditForm from "./ReviewEditForm";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

interface reviewType {
  articleId: string;
  reviewId: string;
  userId: string;
  userName: string;
  title: string;
  content: string;
  rating: string;
}

interface Props {
  e: reviewType;
  i: number;
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
}

const EachReviews = (props: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  // 리뷰 삭제
  const deleteReview = async (e: any) => {
    const reviewId = e.data.reviewId;
    try {
      const response = await fetch(
        `http://localhost:4000/rental/review?reviewId=${reviewId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      alert("리뷰 DELETE 성공");
      props.setIsFetching(true);
    } catch (err: any) {
      alert("리뷰 DELETE 실패");
    }
  };

  // 별 찍기
  const renderStars = (str: string) => {
    const num = Number(str);
    const Blacks = Math.floor(num);
    const half = num === Math.floor(num) ? 0 : 1;
    const Whites = 5 - Blacks - half;
    const ele = [];
    for (let index = 0; index < Blacks; index++) {
      ele.push(<span key={Math.random()}>★</span>);
    }
    if (half !== 0) {
      ele.push(<span key={Math.random()}>✭</span>);
    }
    for (let index = 0; index < Whites; index++) {
      ele.push(<span key={Math.random()}>✩</span>);
    }
    return ele;
  };

  return (
    <>
      {/* 리뷰 */}
      {!isEditing && (
        <div key={JSON.stringify(props.e)} className={cls.reviewContents}>
          <div className={cls.detailInfos}>
            <div className={cls.topSection}>
              <div className={cls.title}> {props.e.data.title}</div>
            </div>
            <div className={cls.contents}>
              <div> {props.e.data.content} </div>
            </div>
            <div className={cls.bottomSection}>
              <div className={cls.left}>
                {/* <span>[사진]</span> &nbsp; */}
                <span>{props.e.data.userName}</span> &nbsp;
                <span>{renderStars(props.e.data.rating)}</span> &nbsp;
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
                    deleteReview(props.e);
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
      {/* 수정 FORM */}
      {isEditing && (
        <ReviewEditForm e={props.e} i={props.i} setIsEditing={setIsEditing} />
      )}
    </>
  );
};

export default EachReviews;
