import React, { useState } from "react";
import classes from "./Card.module.scss";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import MenuList from "./MenuList";
import MainComment from "./comment/MainComment";

export default function RecipeReviewCard(props: any) {
  const [commentMore, setCommentMore] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [writeComment, setWriteComment] = useState("");
  const [cardClick, setCardClick] = useState(false);
  // 줄 수를 계산해서 저장할 변수
  const [textareaHeight, setTextareaHeight] = useState(0);

  // 사용자 입력 값이 변경될 때마다 checkItemContent에 저장하고
  // 엔터('\n') 개수를 세서 textareaHeight에 저장
  const checkItemChangeHandler = (event: any) => {
    setTextareaHeight(event.target.value.split("\n").length - 1);
    setWriteComment(event.target.value);
  };
  const commentSubmitHandler = () => {
    //댓글 입력 post 구현
    console.log(writeComment);
    console.log(props.data.contentidx);
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
    setCommentMore(!commentMore);
  };
  const cardClickHandler = () => {
    setCardClick(!cardClick);
  };

  return (
    <>
      <Card
        className={classes.Card}
        variant="outlined"
        onClick={cardClickHandler}
      >
        <CardHeader title={props.data.title} subheader={props.data.date} />
      </Card>
      {cardClick && (
        <Card className={classes.textContent} variant="outlined">
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" src="">
                R
              </Avatar>
            }
            action={<MenuList idx={props.data.contentidx} />}
            title={props.data.id}
            subheader={props.data.date}
          />

          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {props.data.content}
            </Typography>
          </CardContent>

          {props.data.image && (
            <CardMedia
              component="img"
              height="194"
              image=""
              alt="사진 이미지"
            />
          )}
          <div className={classes.comment}>
            <Avatar aria-label="recipe" src="">
              R
            </Avatar>
            <textarea
              className={classes.comment_input}
              placeholder="댓글을 입력해주세요"
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
          <div className={classes.firstComment}>
            <MainComment
              key={props.data.comment[0].commentidx}
              data={props.data.comment[0]}
            />
          </div>
          <div>
            {!commentMore && (
              <div className={classes.commentMore} onClick={handleExpandClick}>
                댓글 더보기
              </div>
            )}
          </div>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              {props.data.comment.map((val: any) => {
                if (val.commentidx !== 1) {
                  return <MainComment key={val.commentidx} data={val} />;
                } else {
                  return "";
                }
              })}
            </CardContent>
          </Collapse>
        </Card>
      )}
    </>
  );
}
