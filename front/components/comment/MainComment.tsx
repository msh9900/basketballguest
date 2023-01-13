import classes from "./MainComment.module.scss";
import Avatar from "@mui/material/Avatar";
import React, { useState } from "react";
export default function MainComment(props: any) {
  const [replyClick, setReplyClick] = useState<Boolean>(false);
  const replyHandler = () => {
    setReplyClick(true);
  };
  return (
    <div className={classes.maincontainer}>
      <div className={classes.container}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <div className={classes.content_container}>
          <div className={classes.id}>{props.data.id}</div>
          <div className={classes.content}>{props.data.content}</div>
          <div className={classes.reply} onClick={replyHandler}>
            답글
          </div>
        </div>
      </div>
      {replyClick && <div>답글 달기 부분</div>}
    </div>
  );
}
