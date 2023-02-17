import { useEffect, useRef, useState } from "react";

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
import useIntersectionObserver from "hooks/useIntersectionObserver";
import AnimationBox from "../../components/LoadingAnimation";
import GuestHead from "components/common/headTags/guestHead";

import {
  PropsInterface,
  PropDataInterface,
} from "../../components/interfaces/guest.interface";

export default function GuestRecruitmentPage(props: PropsInterface) {
  const router = useRouter();
  const isLogin = useSelector((state: any) => state.login?.isLogin);
  const globalSearchValue = useSelector(
    (state: any) => state.search.searchValue
  );
  const globalSearchNeeded = useSelector(
    (state: any) => state.search.globalSearchNeeded
  );
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<PropDataInterface[]>(props.data);

  const [isMounted, setIsMounted] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  
  const bundleIdx = useRef<number>(1);
  const bundleSize: number = 10;

  const getData = async (bundleIdx: number) => {
    const pid = bundleIdx * bundleSize;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/board/article?pid=${pid}`
    );
    const res = await response.json();
    console.log("res", res);
    setData((prev) => [...prev, ...res]);
  };

  // GET DATA FIRST TIME
  useEffect(() => {
    console.log("isMounted", isMounted);
  }, []);

  // TOGGLE LOADING COMPONENT
  const checkAllLoaded = () => {
    if (bundleSize * bundleIdx.current > props.dataLength) {
      return true;
    } else {
      return false;
    }
  };

  // SET OBSERVER
  const onIntersect: IntersectionObserverCallback = async ([
    { isIntersecting },
  ]) => {
    if (isIntersecting) {
      console.log("실행...");
      setTimeout(()=>{
        Controller();
      }, 500)
      return;
    }
  };

  const Controller = async () => {
    bundleIdx.current += 1
    console.log('bundleIdx.current', bundleIdx.current)
    await getData(bundleIdx.current);

    const isAllLoaded = checkAllLoaded();
    if (isAllLoaded) {
      console.log("isAllLoaded", isAllLoaded);
      setAllLoaded(true);
    }
  };

  const { setTarget } = useIntersectionObserver({ onIntersect });

  const handleOpen = () => {
    if (isLogin) {
      setOpen(true);
    } else {
      router.replace("/login");
    }
  };
  const handleClose = () => setOpen(false);

  // const getData = async () => {
  //   await setGuestData(props.data);
  // };

  // const globalGetData = async () => {
  //   const data = {
  //     keyWord: globalSearchValue,
  //   };

  //   const response = await fetch(
  //     `${process.env.NEXT_PUBLIC_BASE_URL}/board/search`,
  //     {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(data),
  //     }
  //   );
  //   const res = await response.json();
  //   setGuestData(res);
  //   const stateObj = {
  //     searchValue: "",
  //     globalSearchNeeded: false,
  //   };
  //   dispatch(search(stateObj));
  // };

  // useEffect(() => {
  //   if (globalSearchNeeded) {
  //     globalGetData();
  //   }
  // }, [globalSearchNeeded]);

  return (
    <>
      <GuestHead />
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

      <div className={classes.wrap}>
        <div className={classes.container}>
          {data.map((val: PropDataInterface) => (
            <Card
              key={val.contentIdx}
              data={val}
              setIsMounted={setIsMounted}
              isMounted={isMounted}
            />
          ))}
        </div>

        {isMounted && data.length && (
          <>
            {!allLoaded && (
              <div ref={setTarget} className="test">
                로딩 애니메이션 박스
              </div>
            )}
          </>
        )}
      </div>

      {/* {!allLoaded && (
        <>
          <AnimationBox>
            <div ref={setTarget} className="loader"></div>
          </AnimationBox>
        </>
      )} */}
    </>
  );
}

export async function getServerSideProps() {
  // 여기서 글데이터 다 받아야됨.

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/board/article?pid=0`
  );
  const res = await response.json();

  return {
    props: {
      data: res[0],
      dataLength: res[1],
    },
  };
}
