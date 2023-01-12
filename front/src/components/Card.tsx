import * as React from 'react';
import classes from './Card.module.scss';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import MenuList from '../components/MenuList';
import MainComment from './comment/MainComment';

export default function RecipeReviewCard(props: any) {
  //임시 데이터 댓글
  const data = [
    {
      commentidx: 1,
      id: 'test1',
      content: '안녕하세요 게스트 구하려고 하는데 몇명정도 구하시나요',
    },
    {
      commentidx: 2,
      id: 'test2',
      content: 'test2 댓글 입니다',
    },
    {
      commentidx: 3,
      id: 'test3',
      content: 'test3 댓글 입니다',
    },
  ];
  const [commentMore, setCommentMore] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [cardClick, setCardClick] = React.useState(false);
  // 줄 수를 계산해서 저장할 변수
  const [textareaHeight, setTextareaHeight] = React.useState(0);

  // 사용자 입력 값이 변경될 때마다 checkItemContent에 저장하고
  // 엔터('\n') 개수를 세서 textareaHeight에 저장
  const checkItemChangeHandler = (event: any) => {
    setTextareaHeight(event.target.value.split('\n').length - 1);
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
            avatar={<Avatar aria-label="recipe">R</Avatar>}
            action={<MenuList />}
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
              image="/static/images/cards/paella.jpg"
              alt="사진 이미지"
            />
          )}
          <div className={classes.comment}>
            <Avatar aria-label="recipe">R</Avatar>
            <textarea
              className={classes.comment_input}
              placeholder="댓글을 입력해주세요"
              onChange={checkItemChangeHandler}
              style={{ height: 50 + textareaHeight * 24 + 'px' }}
            />
            <div className={classes.comment_submit}>전송</div>
          </div>
          <div className={classes.firstComment}>
            <MainComment key={data[0].commentidx} data={data[0]} />
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
              {data.map((val) => {
                if (val.commentidx !== 1) {
                  return <MainComment key={val.commentidx} data={val} />;
                } else {
                  return '';
                }
              })}
            </CardContent>
          </Collapse>
        </Card>
      )}
    </>
  );
}
