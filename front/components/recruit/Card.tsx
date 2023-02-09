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
  const globalSearchValue = useSelector(
    (state: any) => state.search?.searchValue
  );
  const globalSearchNeeded = useSelector(
    (state: any) => state.search?.globalSearchNeeded
  );
  const [getDataClick, setGetDataClick] = useState(true);
  const [contentData, setContentData] = useState<any>();
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
      const data = {
        contentIdx: contentData.contentIdx,
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
  const getData = async () => {
    console.log(globalSearchNeeded);
    if (globalSearchNeeded && globalSearchValue === "") {
      const data = {
        keyWord: globalSearchValue,
      };
      const response = await fetch("http://localhost:4000/board/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      setContentData(res);
    } else {
      const response = await fetch(
        `http://localhost:4000/board/comment?contentIdx=${props.data.contentIdx}`
      );
      const res = await response.json();
      setContentData(res);
    }
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
              title={contentData.title}
              subheader={contentData.date}
            />
          </Card>
          {cardClick && (
            <Card className={classes.textContent} variant="outlined">
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" src={contentData.userImg}>
                    R
                  </Avatar>
                }
                action={
                  contentData.id === userId ? (
                    <MenuList idx={contentData.contentIdx} />
                  ) : (
                    ""
                  )
                }
                title={contentData.id}
                subheader={contentData.date}
              />

              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {contentData.content}
                </Typography>
              </CardContent>

              <div className={classes.cardImgContainer}>
                {contentData.imgSrc[0] &&
                  contentData.imgSrc.map((val: string, idx: number) => (
                    <CardMedia
                      key={idx}
                      component="img"
                      width="200"
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
              {contentData.comment[0]?.commentIdx && (
                <div className={classes.firstComment}>
                  <MainComment
                    key={contentData.comment[0].commentIdx}
                    data={contentData.comment[0]}
                    setGetDataClick={setGetDataClick}
                  />
                </div>
              )}
              {contentData.comment[1]?.commentIdx && (
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
                      {contentData.comment.map((val: any, idx: any) => {
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
                      })}
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
