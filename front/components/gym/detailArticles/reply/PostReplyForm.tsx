import cls from "./PostReplyForm.module.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

interface Props {
  // value for post
  commentId: string;
  toInfo: string;

  // for toggle 
  setIsReplyWriting: React.Dispatch<React.SetStateAction<boolean>>;
  // for rerender
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;

  // indent
  indent:number;
}

const PostReplyForm = (props: Props) => {

  const stateId = useSelector((state: any) => state.login.userId);
  const stateName = useSelector((state: any) => state.login.userName);
  const router = useRouter();

  const [textContent, setTextContent] = useState("");
  const onChangeText = (e: any) => {
    setTextContent(e.target.value);
  };

  const postReply = async () => {
    const body = {
      articleId: router.query.articles as string,
      commentId: props.commentId,
      contents: textContent,
      to: props.toInfo,
      userId: stateId,
      userName: stateName,
      indentLevel: props.indent
    };

    try {
      await fetch("http://localhost:4000/rental/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      alert("답글 작성 성공");
      await props.setIsFetching(true);
    } catch (err: any) {
      alert("답글 작성 실패");
      console.log("답글 작성 실패", err);
    }
  };

  const separateFront = (text: string) => {
    return text.split("_")[0];
  };
  const separateBack = (text: string) => {
    const wholeText = text.split("_")[1];
    if (wholeText?.length > 10) return wholeText.slice(0, 10);
    return wholeText;
  };

  return (
    <>
      <div className={cls.postReplyFormLayout}>
        <div className={cls.textareaDiv}>
          <span className={cls.toInfo}>@{separateFront(props.toInfo)}</span>
          <span className={cls.toText}>{separateBack(props.toInfo)}</span>
          <textarea value={textContent} onChange={onChangeText} />
        </div>
        <div className={cls.buttons}>
          <button
            onClick={() => {
              props.setIsReplyWriting(false);
            }}
          >
            취소
          </button>
          <button onClick={postReply}>전송</button>
        </div>
      </div>
    </>
  );
};

export default PostReplyForm;
