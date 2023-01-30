import { useEffect, useState } from "react";

import path from "path";
import fs from "fs/promises";
import Card from "../../components/recruit/Card";
import classes from "./guest.module.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import Modal from "@mui/material/Modal";
import WriteModal from "../../components/recruit/WriteModal";
export default function GuestRecruitmentPage(props: any) {
  const { data } = props;
  const [contentList, setContentList] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const fetchMoreData = () => {
    if (contentList < data.length) {
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
            {data.slice(0, contentList).map((val: any) => (
              <Card key={val.contentidx} data={val} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
}
export async function getServerSideProps() {
  // Fetch data from external API
  const filePath = path.join(process.cwd(), "data", "guest-data.json");
  const jsonData: any = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  // Pass data to the page via props
  return { props: { data: data.data } };
}
