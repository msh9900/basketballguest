import cls from "./PostReview.module.scss";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Image from "next/image";

interface Props {
  setIsWriting: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostReview = (props: Props) => {
  const router = useRouter();
  const userName = useSelector((state: any) => state.login.userName);
  const userId = useSelector((state: any) => state.login.userId);

  const cancelWriting = () => {
    props.setIsWriting(false);
  };
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState("3.0");

  // load POST REVIEW API
  const loadPostReviewAPI = async () => {
    const reviewObj = {
      articleId: router.query.articles as string,
      reviewId: (Date.now() + Math.random()).toFixed(13),
      userId,
      userName,
      title,
      content,
      rating,
    };
    
    try{
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/rental/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewObj),
      });
      await props.setIsFetching(true)
    }
    catch (err:any){
      console.log('REVIEW 생성 실패')
    }
    await props.setIsWriting(false);
  }

  const onChangeTitle = (e: any) => {
    setTitle(e.target.value);
  };
  const onChangeContent = (e: any) => {
    setContent(e.target.value);
  };

  const setRatings = (e: any) => {
    let str = e.target.value;
    if (str.length === 1) {
      str += ".0";
    }
    setRating(str);
  };
  return (
    <>
      <div className={cls.ReviewPostFormLayout}>
        <div>
          <div className={cls.titleInputSection}>
            <input
              type="text"
              placeholder="제목"
              value={title}
              onChange={onChangeTitle}
            />
          </div>
          <div className={cls.contentInputSection}>
            <textarea
              value={content}
              placeholder="내용"
              onChange={onChangeContent}
            />
          </div>
          <div className={cls.contentInputSection}>
            <input
              type="range"
              min="0"
              max="5"
              step="0.5"
              value={rating}
              onChange={setRatings}
            />
            &nbsp;{rating}점
          </div>
        </div>
        <div className={cls.ReviewPostFormBtns}>
          <button onClick={loadPostReviewAPI}>
            <Image
              src="/images/rental/checked.png"
              alt="완료"
              width="20"
              height="20"
            />
          </button>
          <button onClick={cancelWriting}>
            <Image
              src="/images/rental/cancel.png"
              alt="작업 취소"
              width="20"
              height="20"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default PostReview;
