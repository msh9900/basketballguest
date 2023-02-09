import { useEffect, useState } from "react";

import Card from "../../components/recruit/Card";
import classes from "./guest.module.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import Modal from "@mui/material/Modal";
import WriteModal from "../../components/recruit/WriteModal";
import ModeIcon from "@mui/icons-material/Mode";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
export default function GuestRecruitmentPage(props: any) {
  const router = useRouter();
  const isLogin = useSelector((state: any) => state.login?.isLogin);
  const globalSearchValue = useSelector(
    (state: any) => state.search.searchValue
  );
  const globalSearchNeeded = useSelector(
    (state: any) => state.search.globalSearchNeeded
  );
  const [guestdata, setGuestData] = useState([]);
  const [contentList, setContentList] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    if (isLogin) {
      setOpen(true);
    } else {
      router.replace("/login");
    }
  };
  const handleClose = () => setOpen(false);
  const fetchMoreData = () => {
    if (contentList < guestdata.length) {
      setTimeout(() => {
        setContentList(contentList + 10);
        setHasMore(true);
      }, 500);
    } else {
      setHasMore(false);
    }
  };

  const getData = async () => {
    if (globalSearchNeeded && globalSearchValue !== "") {
      const data = {
        keyWord: globalSearchValue,
      };
      const response = await fetch("http://localhost:4000/board/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      setGuestData(res);
    } else {
      setGuestData(props.data);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className={classes.writeButton} onClick={handleOpen}>
        <ModeIcon />
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
            {guestdata.slice(0, contentList).map((val: any) => (
              <Card key={val.contentIdx} data={val} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
}
export async function getServerSideProps() {
  //여기서 글데이터 다 받아야됨.
  const response = await fetch("http://localhost:4000/board/article");
  const res = await response.json();
  console.log(res);

  // Pass data to the page via props
  return { props: { data: res } };
}
