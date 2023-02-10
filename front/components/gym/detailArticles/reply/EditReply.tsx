import cls from "./EachReply.module.scss";
import Image from "next/image";
import replyType from "util/types/gymReplyType";
import { useState } from "react";
import { useSelector } from "react-redux";
interface Props {
  replys: replyType;
  setIsReplyEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
}

const separateFront = (text: string) => {
  return text.split("_")[0];
};
const separateBack = (text: string) => {
  const wholeText = text.split("_")[1];
  if (wholeText?.length > 10) return wholeText.slice(0, 10) + "...";
  return wholeText;
};

const EditReply = (props: Props) => {
  const stateId = useSelector((state: any) => state.login.userId);
  const stateName = useSelector((state: any) => state.login.userName);
  const [fixedContent, setFixedContent] = useState(props.replys.contents);
  const onChangeHandler = (e: any) => {
    setFixedContent(e.target.value);
  };

  const editReply = async () => {
    const replyId = props.replys.replyId;
    const commentId = props.replys.commentId;
    const replyObj = {
      // commentId,
      // replyId,
      // createdAt: props.replys.createdAt,
      // userId: props.replys.userId,
      // userName: props.replys.userName,
      // to: props.replys.to,
      contents: fixedContent,
      // indentLevel: props.replys.indentLevel,
    };
    
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/rental/reply?replyId=${replyId}&commentId=${commentId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(replyObj),
        }
      );
    } catch (err: any) {}

    await props.setIsFetching(true);
    await props.setIsReplyEditing(false);
  };

  return (
    <>
      <div className={cls.replyCommentEditForm}>
        {props.replys && props.replys.to.length !== 0 && (
          <>
            <span className={cls.to}> @{separateFront(props.replys.to)}</span>
            <span className={cls.toText}> {separateBack(props.replys.to)}</span>
          </>
        )}
        <div>
          <textarea value={fixedContent} onChange={onChangeHandler} />
        </div>
        <div className={cls.btnArea}>
          <button className={cls.submitBtn} onClick={editReply}>
            <Image
              src="/images/rental/checked.png"
              alt="check"
              width="20"
              height="20"
            />
          </button>
          <button
            className={cls.cancelBtn}
            onClick={() => {
              props.setIsReplyEditing(false);
            }}
          >
            <Image
              src="/images/rental/cancel.png"
              alt="cancel"
              width="20"
              height="20"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default EditReply;
