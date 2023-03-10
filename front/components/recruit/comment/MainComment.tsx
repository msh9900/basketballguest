import classes from "./MainComment.module.scss";
import Avatar from "@mui/material/Avatar";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import SubComment from "./SubComment";
import {
  MainCommentInterface,
  ReplysInterface,
} from "../../../components/interfaces/guest.interface";

export default function MainComment(props: MainCommentInterface) {
  const userId = useSelector((state: any) => state.login?.userId);
  const userImg = useSelector((state: any) => state.login?.userImg);
  const isLogin = useSelector((state: any) => state.login?.isLogin);
  const router = useRouter();
  const [textareaHeight, setTextareaHeight] = useState(0);
  const [writeReplyClick, setWriteReplyClick] = useState<Boolean>(false);
  const [updateReplyClick, setUpdateReplyClick] = useState<Boolean>(false);
  const writeComment = useRef<HTMLTextAreaElement>(null);
  const updateComment = useRef<HTMLTextAreaElement>(null);
  const replyWriteHandler = () => {
    if (isLogin) {
      setUpdateReplyClick(false);
      setWriteReplyClick(!writeReplyClick);
    } else {
      router.replace("/login");
    }
  };
  const replyDeleteHandler = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/board/comment?commentIdx=${props.data.commentIdx}`,
      {
        method: "DELETE",
      }
    );
    const res = await response.json();
    props.setGetDataClick(true);
  };
  const replyUpdateHandler = () => {
    setWriteReplyClick(false);
    setUpdateReplyClick(!updateReplyClick);
  };
  const commentSubmitHandler = async () => {
    //댓글 입력 post 구현
    const data = {
      commentIdx: props.data.commentIdx,
      content: writeComment.current!.value,
      userId,
      userImg,
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/board/reply`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    const res = await response.json();
    props.setGetDataClick(true);
  };
  const commentUpdateHandler = async () => {
    //댓글 update 구현.
    const data = {
      commentIdx: props.data.commentIdx,
      content: updateComment.current!.value,
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/board/comment`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    const res = await response.json();

    props.setGetDataClick(true);
  };
  const checkItemChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTextareaHeight(event.target.value.split("\n").length - 1);
  };
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
      {writeReplyClick && (
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
            placeholder="수정하실 답글을 입력해주세요"
            ref={updateComment}
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
      {props.data.replys.map((val: ReplysInterface, idx: number) => (
        <SubComment
          key={idx}
          data={val}
          commentIdx={props.data.commentIdx}
          setGetDataClick={props.setGetDataClick}
        />
      ))}
    </div>
  );
}
