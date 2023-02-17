import React, { useState, useEffect, useRef } from "react";
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
import Grid from "@mui/material/Grid";

import {
  CardPropInterace,
  PropDataInterface,
  CommentInterface,
} from "../../components/interfaces/guest.interface";

export default function RecipeReviewCard(props: CardPropInterace) {
  const userId = useSelector((state: any) => state.login?.userId);
  const userImg = useSelector((state: any) => state.login?.userImg);
  const isLogin = useSelector((state: any) => state.login?.isLogin);
  const [getDataClick, setGetDataClick] = useState(true);
  const [contentData, setContentData] = useState<PropDataInterface>();
  const router = useRouter();
  const [commentMore, setCommentMore] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const writeComment = useRef<HTMLTextAreaElement>(null);
  const [cardClick, setCardClick] = useState(false);
  // 줄 수를 계산해서 저장할 변수
  const [textareaHeight, setTextareaHeight] = useState(0);

  // 사용자 입력 값이 변경될 때마다 checkItemContent에 저장하고
  // 엔터('\n') 개수를 세서 textareaHeight에 저장
  const checkItemChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTextareaHeight(event.target.value.split("\n").length - 1);
  };
  const commentSubmitHandler = async () => {
    //댓글 입력 post 구현
    if (isLogin) {
      const data = {
        contentIdx: contentData!.contentIdx,
        id: userId,
        content: writeComment.current!.value,
        userImg: userImg,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/board/comment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      const res = await response.json();
      setGetDataClick(true);
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
  function convertDate(date: string) {
    const convertDate = new Date(date);
    var year = convertDate.getFullYear();
    var month = ("0" + (1 + convertDate.getMonth())).slice(-2);
    var day = ("0" + convertDate.getDate()).slice(-2);
    var hours = ("0" + convertDate.getHours()).slice(-2);
    const today = new Date();
    const started = new Date(
      year,
      Number(month) - 1,
      Number(day),
      Number(hours)
    );

    const daysPassed = Math.ceil((+started - +today) / (1000 * 60 * 60 * 24));
    const hoursPassed = Math.ceil((+started - +today) / (1000 * 60 * 60));

    let result = "";

    if (Math.abs(daysPassed) === 0) {
      result = Math.abs(hoursPassed) + "시간전";
    } else if (Math.abs(daysPassed) > 0 && Math.abs(daysPassed) < 8) {
      result = Math.abs(daysPassed) + "일전";
    } else {
      result = `${year}년 ${month}월 ${day} 일`;
    }
    return result;
  }
  const getData = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/board/comment?contentIdx=${props.data.contentIdx}`
    );
    const res = await response.json();

    const Date = convertDate(res.date);
    res.date = Date;
    setContentData(res);
    setGetDataClick(false);
  };
  useEffect(() => {
    if (getDataClick) {
      getData();
    }
  }, [getDataClick]);

  return (
    <>
      {!getDataClick && (
        <>
          <Card
            className={classes.Card}
            variant="outlined"
            onClick={cardClickHandler}
          >
            <CardHeader
              title={contentData!.title}
              subheader={contentData!.date}
            />
          </Card>
          {cardClick && (
            <Card className={classes.textContent} variant="outlined">
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" src={contentData!.userImg}>
                    R
                  </Avatar>
                }
                action={
                  contentData!.id === userId ? (
                    <MenuList
                      idx={contentData!.contentIdx}
                      data={contentData}
                    />
                  ) : (
                    ""
                  )
                }
                title={contentData!.id}
                subheader={contentData!.date}
              />

              <CardContent>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: 24 }}
                >
                  {contentData!.content}
                </Typography>
              </CardContent>

              <Grid container>
                {contentData!.imgSrc[0] &&
                  contentData!.imgSrc.map((val: string, idx: number) => (
                    <Grid key={idx} item xs={6} md={2}>
                      <CardMedia
                        component="img"
                        width="200"
                        height="194"
                        src={val}
                        alt="사진 이미지"
                        sx={{ objectFit: "cover", cursor: "pointer" }}
                        onClick={() => {
                          ImgPop(val);
                        }}
                      />
                    </Grid>
                  ))}
              </Grid>

              <div className={classes.comment}>
                <Avatar aria-label="recipe" src={userImg}>
                  R
                </Avatar>
                <textarea
                  className={classes.comment_input}
                  placeholder="댓글을 입력해주세요"
                  onChange={checkItemChangeHandler}
                  ref={writeComment}
                  style={{ height: 50 + textareaHeight * 24 + "px" }}
                />
                <div
                  className={classes.comment_submit}
                  onClick={commentSubmitHandler}
                >
                  전송
                </div>
              </div>
              {contentData!.comment[0]?.commentIdx && (
                <div className={classes.firstComment}>
                  <MainComment
                    key={contentData!.comment[0].commentIdx}
                    data={contentData!.comment[0]}
                    setGetDataClick={setGetDataClick}
                  />
                </div>
              )}
              {contentData!.comment[1]?.commentIdx && (
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
                      {contentData!.comment.map(
                        (val: CommentInterface, idx: number) => {
                          if (idx !== 0) {
                            return (
                              <MainComment
                                key={val.commentIdx}
                                data={val}
                                setGetDataClick={setGetDataClick}
                              />
                            );
                          } else {
                            return "";
                          }
                        }
                      )}
                    </CardContent>
                  </Collapse>
                </div>
              )}
            </Card>
          )}
        </>
      )}
    </>
  );
}
