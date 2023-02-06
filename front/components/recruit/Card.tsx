import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import classes from "./Card.module.scss";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import MenuList from "./MenuList";
import MainComment from "./comment/MainComment";
import ImgPop from "util/ImgPop";

export default function RecipeReviewCard(props: any) {
  const userId = useSelector((state: any) => state.login?.userId);
  const userImg = useSelector((state: any) => state.login?.userImg);
  const isLogin = useSelector((state: any) => state.login?.isLogin);
  const [getcomment, setGetcomment] = useState(false);
  const router = useRouter();

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
  const commentSubmitHandler = async () => {
    //댓글 입력 post 구현
    if (isLogin) {
      console.log(props.data.contentidx, writeComment, userId, userImg);
      const data = {
        contentidx: props.data.contentidx,
        id: userId,
        content: writeComment,
        userImg: userImg,
      };
      const response = await fetch("http://localhost:4000/board/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      console.log(res);
      setGetcomment(true);
    } else {
      router.replace("/login");
    }
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
    setCommentMore(!commentMore);
  };
  const cardClickHandler = () => {
    setCardClick(!cardClick);
  };
  const getData = async () => {
    const data = {
      contentidx: props.data.contentidx,
    };
    //카드에 해당되는 댓글 가져오기
    const response = await fetch("http://localhost:4000/board/comment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const res = await response.json();
  };
  useEffect(() => {
    // getData();
    console.log("최신하");
  }, [getcomment]);
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
              <Avatar aria-label="recipe" src={props.data.userImg}>
                R
              </Avatar>
            }
            action={
              props.data.id === userId ? (
                <MenuList idx={props.data.contentidx} />
              ) : (
                ""
              )
            }
            title={props.data.id}
            subheader={props.data.date}
          />

          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {props.data.content}
            </Typography>
          </CardContent>

          <div className={classes.cardImgContainer}>
            {props.data.imgsrc[0] &&
              props.data.imgsrc.map((val: string, idx: number) => (
                <CardMedia
                  key={idx}
                  component="img"
                  width="300"
                  height="194"
                  src={val}
                  alt="사진 이미지"
                  sx={{ objectFit: "contain" }}
                  onClick={() => {
                    ImgPop(val);
                  }}
                />
              ))}
          </div>
          <div className={classes.comment}>
            <Avatar aria-label="recipe" src={userImg}>
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
          {props.data.comment[0]?.commentidx && (
            <div className={classes.firstComment}>
              <MainComment
                key={props.data.comment[0].commentidx}
                data={props.data.comment[0]}
              />
            </div>
          )}
          {props.data.comment[1]?.commentidx && (
            <div>
              <div>
                {!commentMore && (
                  <div
                    className={classes.commentMore}
                    onClick={handleExpandClick}
                  >
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
            </div>
          )}
        </Card>
      )}
    </>
  );
}
