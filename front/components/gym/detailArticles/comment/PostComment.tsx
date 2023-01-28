import cls from "./CommentSection.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Image from "next/image";

interface Props {
  isFetching: boolean;
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCommentWriting: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentPostForm = (props: Props) => {
  const router = useRouter();
  const stateId = useSelector((state: any) => state.login.userId);
  const stateUserName = useSelector((state: any) => state.login.userName);
  const [writingText, setWritingText] = useState("");

  const postGymComment = async () => {
    if (stateId == "") {
      alert("로그인 필요");
    }
    const postDataforComment = {
      articleId: router.query.articles as string,
      userId: stateId,
      userName: stateUserName,
      contents: writingText,
      isCreater: false,
      replys: [],
    };
    
    try {
      await fetch("http://localhost:4000/rental/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postDataforComment),
      });
      await props.setIsFetching(true);
      await props.setIsCommentWriting(false);
    } catch (err: any) {
      alert("댓글 작성 실패");
    }
  };

  const postComment = async () => {
    await postGymComment();
    // (+) 유저 데이터 처리 (나중)
  };

  const textAreaHandler = (e: any) => {
    setWritingText(e.target.value);
  };

  return (
    <>
      <div className={cls.commentPostFormLayout}>
        <div>
          <textarea onChange={textAreaHandler} value={writingText} />
        </div>
        <div className={cls.flexbox}>
          <div>
            <button onClick={postComment}>
              <Image
                src="/images/rental/checked.png"
                alt="작성"
                width="20"
                height="20"
              />
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                props.setIsCommentWriting(false);
              }}
            >
              <Image
                src="/images/rental/cancel.png"
                alt="취소"
                width="20"
                height="20"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentPostForm;
