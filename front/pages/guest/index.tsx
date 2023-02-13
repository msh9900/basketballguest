import { useEffect, useState } from "react";

import Card from "../../components/recruit/Card";
import classes from "./guest.module.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import Modal from "@mui/material/Modal";
import WriteModal from "../../components/recruit/WriteModal";
import ModeIcon from "@mui/icons-material/Mode";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { search } from "redux/modules/search";
import Head from "next/head";

export default function GuestRecruitmentPage(props: any) {
  const router = useRouter();
  const isLogin = useSelector((state: any) => state.login?.isLogin);
  const globalSearchValue = useSelector(
    (state: any) => state.search.searchValue
  );
  const globalSearchNeeded = useSelector(
    (state: any) => state.search.globalSearchNeeded
  );
  const dispatch = useDispatch();
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
    setGuestData(props.data);
  };
  const globalGetData = async () => {
    const data = {
      keyWord: globalSearchValue,
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/board/search`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    const res = await response.json();
    setGuestData(res);
    const stateObj = {
      searchValue: "",
      globalSearchNeeded: false,
    };
    dispatch(search(stateObj));
  };
  useEffect(() => {
    if (globalSearchNeeded) {
      globalGetData();
    }
  }, [globalSearchNeeded]);
  useEffect(() => {
    if (!globalSearchNeeded) {
      getData();
    }
  }, []);

  const serviceTitle = "BPT";
  const pageTitle = "게스트 모집";
  const pageDesc = "게스트 모집 페이지";
  const pageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}`;
  const ogImageSrc = `/images/basketball1.jpg`;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="농구, 게스트모집, 체육관대여" />
        <meta name="description" content={pageDesc} />
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="/images/favicon_64.ico"
        />

        <meta name="application-name" content={serviceTitle} />
        <meta name="msapplication-tooltip" content={serviceTitle} />
        <meta name="msapplication-starturl" content={pageUrl} />

        {/* Open Graph (Naver & Kakao */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:site_name" content={serviceTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale" content="ko_KR" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={ogImageSrc} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="600" />

        {/* OP: Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />
        <meta name="twitter:url" content={pageUrl} />
        <meta name="twitter:image" content={ogImageSrc} />
        <title>
          {serviceTitle} : {pageTitle}
        </title>
      </Head>

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

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/board/article`
  );
  const res = await response.json();

  // Pass data to the page via props
  return { props: { data: res } };
}
