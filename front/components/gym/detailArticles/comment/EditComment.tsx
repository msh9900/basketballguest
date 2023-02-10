// style
import cls from "./EachComment.module.scss";
// library
import Image from "next/image";
import replyType from "util/types/gymReplyType";
import { useState } from "react";

interface Props {
  articleId: string;
  articleUserId: string;
  commentId: string;
  userId: string;
  userName: string;
  contents: string;
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCommentWriting: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCommentEditing: React.Dispatch<React.SetStateAction<boolean>>;
  replys: replyType[];
}

const EditComment = (props: Props) => {
  const [editedComment, setEditedComment] = useState(props.contents);
  const updateComment = async (e: any) => {
    const commentId = e.target.id;
    const updateCommentObj = {
      articleId: props.articleId,
      commentId: props.commentId,
      userId: props.userId,
      userName: props.userName,
      contents: editedComment,
      replys: props.replys,
    };

    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/rental/comment?commentId=${commentId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateCommentObj),
        }
      );
      await props.setIsFetching(true);
      await props.setIsCommentWriting(false);
    } catch (err: any) {}
  };

  const onChangeText = (e: any) => {
    setEditedComment(e.target.value);
  };

  return (
    <>
      <div className={cls.originCommentEditForm}>
        <div>
          <textarea
            id="fixingComment"
            onChange={onChangeText}
            value={editedComment}
          ></textarea>
        </div>
        <div className={cls.btnArea}>
          <button className={cls.submitBtn} onClick={updateComment}>
            <Image
              src="/images/rental/checked.png"
              alt="submit"
              width="20"
              height="20"
            />
          </button>
          <button
            className={cls.cancelBtn}
            onClick={() => {
              props.setIsCommentEditing(false);
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

export default EditComment;
