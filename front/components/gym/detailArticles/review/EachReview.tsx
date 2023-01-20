import cls from './EachReview.module.scss';
import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'

interface reviewType{
  userName: string,
  profileImg: string,
  createdDate: string,
  contents: string,
  ratings: string,
}

interface Props{
  reviewData:reviewType[]
}
const EachReview = (props:Props) => {

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
      {props.reviewData && props.reviewData.map((e, i) => (
        <div key={JSON.stringify(e)} className={cls.reviewContents}>
          <div className={cls.profileSection}>
            <div>Img</div>
            <div>{e.userName}</div>
          </div>
          <div className={cls.detailInfos}>
            <div>{e.createdDate}</div>
            <div>{e.contents}</div>
            <div>{renderStars(e.ratings)}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EachReview;
