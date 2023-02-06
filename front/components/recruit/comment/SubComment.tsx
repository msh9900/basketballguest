import classes from "./SubComment.module.scss";
import Avatar from "@mui/material/Avatar";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
export default function SubComment() {
  const userId = useSelector((state: any) => state.login?.userId);
  const userImg = useSelector((state: any) => state.login?.userImg);
  const isLogin = useSelector((state: any) => state.login?.isLogin);
  const router = useRouter();
  const [textareaHeight, setTextareaHeight] = useState(0);
  const [writeReplyClick, setWriteReplyClick] = useState<Boolean>(false);
  const [updateReplyClick, setUpdateReplyClick] = useState<Boolean>(false);
  const [writeComment, setWriteComment] = useState("");
  const replyWriteHandler = () => {
    if (isLogin) {
      setUpdateReplyClick(false);
      setWriteReplyClick(true);
    } else {
      router.replace("/login");
    }
  };
  const replyDeleteHandler = () => {
    // console.log(props.data);
    // console.log(props.data.commentidx); //이 맨트를 지운다
  };
  const replyUpdateHandler = () => {
    setWriteReplyClick(false);
    setUpdateReplyClick(true);
    // setWriteComment(props.data.content);
  };

  return (
    <div className={classes.maincontainer} style={{ marginLeft: "25px" }}>
      <div className={classes.container}>
        <Avatar alt="Remy Sharp" src="" />
        <div className={classes.content_container}>
          <div className={classes.id}>유저아이디</div>
          <div className={classes.content}>asdasd</div>
          <div className={classes.reply_container}>
            <div className={classes.reply} onClick={replyWriteHandler}>
              답글 달기
            </div>
            {/* {props.data.id === userId && (
              <div className={classes.reply} onClick={replyUpdateHandler}>
                수정
              </div>
            )}
            {props.data.id === userId && (
              <div className={classes.reply} onClick={replyDeleteHandler}>
                삭제
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
