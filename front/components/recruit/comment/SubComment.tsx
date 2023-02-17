import classes from "./SubComment.module.scss";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import { SubCommentInterface } from "../../../components/interfaces/guest.interface";

export default function SubComment(props: SubCommentInterface) {
  const userId = useSelector((state: any) => state.login?.userId);
  const userImg = useSelector((state: any) => state.login?.userImg);

  const [textareaHeight, setTextareaHeight] = useState(0);
  const [writeReplyClick, setWriteReplyClick] = useState<Boolean>(false);
  const [updateReplyClick, setUpdateReplyClick] = useState<Boolean>(false);
  const writeComment = useRef<HTMLTextAreaElement>(null);
  const updateComment = useRef<HTMLTextAreaElement>(null);

  const replyDeleteHandler = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/board/reply?replyIdx=${props.data.replyIdx}&commentIdx=${props.commentIdx}`,
      {
        method: "DELETE",
      }
    );
    props.setGetDataClick(true);
  };
  const replyUpdateHandler = () => {
    setWriteReplyClick(false);
    setUpdateReplyClick(true);
  };
  const checkItemChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTextareaHeight(event.target.value.split("\n").length - 1);
  };
  const commentUpdateHandler = async () => {
    //댓글 update 구현.
    const data = {
      commentIdx: props.commentIdx,
      replyIdx: props.data.replyIdx,
      content: updateComment.current!.value,
    };
    console.log(data);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/board/reply`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    const res = await response.json();

    props.setGetDataClick(true);
  };

  return (
    <div className={classes.maincontainer} style={{ marginLeft: "25px" }}>
      <div className={classes.container}>
        <Avatar alt="Remy Sharp" src={props.data.userImg} />
        <div className={classes.content_container}>
          <div className={classes.id}>{props.data.userId}</div>
          <div className={classes.content}>{props.data.content}</div>
          <div className={classes.reply_container}>
            {props.data.userId === userId && (
              <div className={classes.reply} onClick={replyUpdateHandler}>
                수정
              </div>
            )}
            {props.data.userId === userId && (
              <div className={classes.reply} onClick={replyDeleteHandler}>
                삭제
              </div>
            )}
          </div>
        </div>
      </div>
      {updateReplyClick && (
        <div className={classes.comment}>
          <Avatar aria-label="recipe" src={userImg}>
            R
          </Avatar>
          <textarea
            className={classes.comment_input}
            placeholder="답글을 입력해주세요"
            ref={writeComment}
            onChange={checkItemChangeHandler}
            style={{ height: 50 + textareaHeight * 24 + "px" }}
          />
          <div
            className={classes.comment_submit}
            onClick={commentUpdateHandler}
          >
            전송
          </div>
        </div>
      )}
    </div>
  );
}
