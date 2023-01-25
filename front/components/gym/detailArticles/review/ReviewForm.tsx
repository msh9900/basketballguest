import cls from "./ReviewForm.module.scss";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

interface Props {
  setIsWriting: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReviewForm = (props: Props) => {
  const router = useRouter();
  const userName = useSelector((state: any) => state.login.userName);

  const cancelWriting = () => {
    props.setIsWriting(false);
  };
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState("");

  const postWriting = async () => {
    // 유효성검사
    // ...
    const reviewObj = {
      articleId: router.query.articles as string,
      reviewId: (Date.now() + Math.random()).toFixed(13),
      userName,
      title,
      content,
      rating,
    };

    const response = await fetch("http://localhost:4000/rental/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewObj),
    });
    const data = await response.json();
  };

  const checkReviewFormValid = () => {};

  const onChangeTitle = (e: any) => {
    setTitle(e.target.value);
  };
  const onChangeContent = (e: any) => {
    setContent(e.target.value);
  };
  const onChangeRating = (e: any) => {
    setRating(e.target.value);
  };

  return (
    <>
      <div className={cls.ReviewFormLayout}>
        <div>
          <div className={cls.titleInputSection}>
            <p>제목</p>
            <input type="text" value={title} onChange={onChangeTitle} />
          </div>
          <div className={cls.contentInputSection}>
            <p>내용</p>
            <textarea value={content} onChange={onChangeContent} />
          </div>
          <div className={cls.contentInputSection}>
            <p>점수</p>
            <input value={rating} onChange={onChangeRating} />
          </div>
        </div>
        <div className={cls.ReviewFormBtns}>
          <button onClick={cancelWriting}>취소</button>
          <button onClick={postWriting}>작성</button>
        </div>
      </div>
    </>
  );
};

export default ReviewForm;
