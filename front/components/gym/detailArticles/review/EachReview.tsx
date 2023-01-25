import cls from "./EachReview.module.scss";
import { useState, useEffect } from "react";
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
  reviewData: reviewType[];
}

const EachReview = (props: Props) => {
  const router = useRouter();

  useEffect(() => {}, []);

  // `http://localhost:4000/rental/article?pid=${pId}`,
  // 리뷰 삭제
  const deleteReview = async (e: any) => {
    const reviewId = e.target.id;
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
    } catch (err: any) {
      alert("리뷰 DELETE 실패");
    }
  };

  // 리뷰 수정
  const updateReview = async (ele: any) => {
    const reviewId = ele.reviewId;
    const updateReviewObj = {
      articleId: ele.articleId,
      reviewId: ele.reviewId,
      userId: ele.userId,
      userName: ele.userName,
      title: ele.title,
      content: ele.content,
      rating: ele.rating,
    };

    try {
      const response = await fetch(
        `http://localhost:4000/rental/review?reviewId=${reviewId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateReviewObj),
        }
      );
      const data = await response.json();
      alert("리뷰 UPDATE 성공");
    } catch (err: any) {
      alert("리뷰 UPDATE 실패");
    }
  };

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
    <div className={cls.EachReviewLayout}>
      {props.reviewData &&
        props.reviewData.map((e, i) => (
          <div key={JSON.stringify(e)} className={cls.reviewContents}>
            <div className={cls.profileSection}>
              <div>유저 이름 : {e.data.userName}</div>
            </div>
            <div className={cls.detailInfos}>
              {/* <div>{e.createdAt}</div> */}
              <div>내용 : {e.data.content}</div>
              <div>별점 : {renderStars(e.data.rating)}</div>
            </div>
            <button
              onClick={() => {
                updateReview(e);
              }}
            >
              리뷰 수정
            </button>
            <button
              onClick={() => {
                deleteReview(e);
              }}
            >
              리뷰 삭제
            </button>
          </div>
        ))}
    </div>
  );
};

export default EachReview;
