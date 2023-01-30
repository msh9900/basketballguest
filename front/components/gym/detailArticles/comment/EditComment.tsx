// style
import cls from "./EachComment.module.scss";
// library
import Image from "next/image";
import replyType from 'util/types/gymReplyType';
interface Props {
  articleId: string;
  commentId: string;
  userId: string;
  userName: string;
  isCreater: boolean;

  // date: string;
  // contents: string;
  
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCommentWriting: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCommentEditing: React.Dispatch<React.SetStateAction<boolean>>;
  replys: replyType[];
}

const EditComment = (props: Props) => {
  const updateComment = async (e: any) => {
    const ele = document.querySelector("#fixingComment") as HTMLTextAreaElement;
    const changedValue = ele.value;

    props.setIsFetching(true);
    const commentId = e.target.id;
    const updateCommentObj = {
      articleId: props.articleId,
      commentId: props.commentId,
      userId: props.userId,
      userName: props.userName,
      contents: changedValue,
      isCreater: props.isCreater,
      replys: props.replys,
    };

    try {
      await fetch(
        `http://localhost:4000/rental/comment?commentId=${commentId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateCommentObj),
        }
      );
      await props.setIsFetching(false);
      await props.setIsCommentWriting(false);
    } catch (err: any) {}
  };

  return (
    <>
      <div className={cls.originCommentEditForm}>
        <div>
          <textarea id="fixingComment"></textarea>
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
