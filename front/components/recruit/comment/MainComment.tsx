import classes from "./MainComment.module.scss";
import Avatar from "@mui/material/Avatar";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function MainComment(props: any) {
  const userId = useSelector((state: any) => state.login?.userId);
  const userImg = useSelector((state: any) => state.login?.userImg);
  const [textareaHeight, setTextareaHeight] = useState(0);
  const [replyClick, setReplyClick] = useState<Boolean>(false);
  const [writeComment, setWriteComment] = useState("");
  const replyHandler = () => {
    setReplyClick(true);
  };
  const commentSubmitHandler = () => {
    //댓글 입력 post 구현
    console.log(writeComment);
    console.log(props.data);
  };
  const checkItemChangeHandler = (event: any) => {
    setTextareaHeight(event.target.value.split("\n").length - 1);
    setWriteComment(event.target.value); //시준이형꺼 처럼 구현하기 db 전송
    //답글 남기기 fetch 구현
  };

  return (
    <div className={classes.maincontainer}>
      <div className={classes.container}>
        <Avatar alt="Remy Sharp" src="" />
        <div className={classes.content_container}>
          <div className={classes.id}>{props.data.id}</div>
          <div className={classes.content}>{props.data.content}</div>
          <div className={classes.reply} onClick={replyHandler}>
            답글 달기
          </div>
        </div>
      </div>
      {replyClick && (
        <div className={classes.comment}>
          <Avatar aria-label="recipe" src="">
            R
          </Avatar>
          <textarea
            className={classes.comment_input}
            placeholder="답글을 입력해주세요"
            onChange={checkItemChangeHandler}
            style={{ height: 50 + textareaHeight * 24 + "px" }}
          />
          <div
            className={classes.comment_submit}
            onClick={commentSubmitHandler}
          >
            전송
          </div>
        </div>
      )}
    </div>
  );
}
