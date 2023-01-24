import cls from "./EachReview.module.scss";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

interface reviewType {
  articleId: string;
  id: string;
  userName: string;
  title: string;
  content: string;
  rating: string;
}

interface Props {
  reviewData: reviewType[];
}

const EachReview = (props: Props) => {
  useEffect(() => {
    console.log("props.reviewData", props.reviewData);
  }, []);

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
              <div>유저이름 : {e.data.userName}</div>
            </div>
            <div className={cls.detailInfos}>
              {/* <div>{e.createdAt}</div> */}
              <div>내용 : {e.data.content}</div>
              <div>별점 : {renderStars(e.data.rating)}</div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default EachReview;
