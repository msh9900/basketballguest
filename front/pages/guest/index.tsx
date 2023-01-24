import { useState } from "react";
import Card from "../../components/recruit/Card";
import classes from "./guest.module.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import Modal from "@mui/material/Modal";
import WriteModal from "../../components/recruit/WriteModal";
export default function GuestRecruitmentPage() {
  //임시 데이터 카드
  const data = [
    {
      contentidx: 1,
      id: "테스트1",
      title: "[대구] 농구 게스트 구합니다",
      content: "안녕하세요 체육관 대여 할려고 하는데 비용이 얼마정도 나오나요?",
      image: "src주소 1",
      date: "1시간전",
      comment: [
        {
          commentidx: 1,
          id: "test1",
          content: "안녕하세요 게스트 구하려고 하는데 몇명정도 구하시나요",
        },
        {
          commentidx: 2,
          id: "test2",
          content: "test2 댓글 입니다",
        },
        {
          commentidx: 3,
          id: "test3",
          content: "test3 댓글 입니다",
        },
      ],
    },
    {
      contentidx: 2,
      id: "테스트2",
      title: "[이태원] 농구 게스트 구합니다",
      content: "테스트2 입니다",
      date: "1시간전",
      comment: [
        {
          commentidx: 1,
          id: "test1",
          content: "안녕하세요 게스트 구하려고 하는데 몇명정도 구하시나요",
        },
        {
          commentidx: 2,
          id: "test2",
          content: "가나다라마바사",
        },
        {
          commentidx: 3,
          id: "test3",
          content: "test3 댓글 입니다",
        },
      ],
    },
  ];
  for (let i = 3; i < 100; i++) {
    data.push({
      contentidx: i,
      id: "테스트2",
      title: "[이태원] 농구 게스트 구합니다",
      content: "테스트2 입니다",
      date: "1시간전",
      comment: [
        {
          commentidx: 1,
          id: "test1",
          content: "안녕하세요 게스트 구하려고 하는데 몇명정도 구하시나요",
        },
        {
          commentidx: 2,
          id: "test2",
          content: "ㅁㄴㅇㅁㄴㅇ",
        },
        {
          commentidx: 3,
          id: "test3",
          content: "test3 ㅁㄴㅇㅇㅇ 입니다",
        },
      ],
    });
  }

  const [contentList, setContentList] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const fetchMoreData = () => {
    if (contentList < 150) {
      setTimeout(() => {
        setContentList(contentList + 10);
      }, 500);
    } else {
      setHasMore(false);
    }
  };
  return (
    <>
      <div className={classes.writeButton} onClick={handleOpen}>
        글쓰기 버튼
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={classes.modal}>
          <WriteModal />
        </div>
      </Modal>
      <div id="parentScrollDiv" className={classes.wrap}>
        <InfiniteScroll
          dataLength={contentList}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<p>Loading...</p>}
          scrollableTarget="parentScrollDiv"
        >
          <div className={classes.container}>
            {data.slice(0, contentList).map((val) => (
              <Card key={val.contentidx} data={val} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
}
