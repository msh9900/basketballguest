import classes from "./MainComment.module.scss";
import Avatar from "@mui/material/Avatar";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import SubComment from "./SubComment";
export default function MainComment(props: any) {
  const userId = useSelector((state: any) => state.login?.userId);
  const userImg = useSelector((state: any) => state.login?.userImg);
  const isLogin = useSelector((state: any) => state.login?.isLogin);
  const router = useRouter();
  const [textareaHeight, setTextareaHeight] = useState(0);
  const [writeReplyClick, setWriteReplyClick] = useState<Boolean>(false);
  const [updateReplyClick, setUpdateReplyClick] = useState<Boolean>(false);
  const [writeComment, setWriteComment] = useState("");
  const [getData, setGetData] = useState(false);

  const replyWriteHandler = () => {
    if (isLogin) {
      setUpdateReplyClick(false);
      setWriteReplyClick(true);
    } else {
      router.replace("/login");
    }
  };
  const replyDeleteHandler = () => {
    console.log(props.data);
    console.log(props.data.commentidx); //이 맨트를 지운다
  };
  const replyUpdateHandler = () => {
    setWriteReplyClick(false);
    setUpdateReplyClick(true);
    setWriteComment(props.data.content);
  };
  const commentSubmitHandler = () => {
    //댓글 입력 post 구현
    console.log(writeComment);
    console.log(props.data);
  };
  const commentUpdateHandler = () => {
    //댓글 update 구현.
    console.log("댓글 수정");
  };
  const checkItemChangeHandler = (event: any) => {
    setTextareaHeight(event.target.value.split("\n").length - 1);
    setWriteComment(event.target.value); //시준이형꺼 처럼 구현하기 db 전송
    //답글 남기기 fetch 구현
  };
  useEffect(() => {}, []);
  return (
    <div className={classes.maincontainer}>
      <div className={classes.container}>
        <Avatar alt="Remy Sharp" src={props.data.userImg} />
        <div className={classes.content_container}>
          <div className={classes.id}>{props.data.id}</div>
          <div className={classes.content}>{props.data.content}</div>
          <div className={classes.reply_container}>
            <div className={classes.reply} onClick={replyWriteHandler}>
              답글 달기
            </div>
            {props.data.id === userId && (
              <div className={classes.reply} onClick={replyUpdateHandler}>
                수정
              </div>
            )}
            {props.data.id === userId && (
              <div className={classes.reply} onClick={replyDeleteHandler}>
                삭제
              </div>
            )}
          </div>
        </div>
      </div>
      <SubComment />
      {writeReplyClick && (
        <div className={classes.comment}>
          <Avatar aria-label="recipe" src={userImg}>
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
      {updateReplyClick && (
        <div className={classes.comment}>
          <Avatar aria-label="recipe" src={userImg}>
            R
          </Avatar>
          <textarea
            className={classes.comment_input}
            placeholder="답글을 입력해주세요"
            value={writeComment}
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
