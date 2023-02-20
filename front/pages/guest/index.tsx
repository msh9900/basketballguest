// style
import classes from "./guest.module.scss";
import ModeIcon from "@mui/icons-material/Mode";
import Modal from "@mui/material/Modal";

// hooks
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { search } from "redux/modules/search";
import useIntersectionObserver from "hooks/useIntersectionObserver";

// custom utils
import globalGetData from "util/data/globalgetData";
import getData from "util/data/getData";

// components
import WriteModal from "components/recruit/WriteModal";
import Card from "components/recruit/Card";
import AnimationBox from "components/LoadingAnimation";
import GuestHead from "components/common/headTags/guestHead";

import {
  PropsInterface,
  PropDataInterface,
} from "components/interfaces/guest.interface";

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
  const [data, setData] = useState<PropDataInterface[]>([]);

  const [searchAdapted, setSearchAdapted] = useState(globalSearchNeeded);
  // globalSearchNeeded : 새로고침할 때 false가 된다...
  // 검색버튼 누르면 true 되어야 하는데,...
  // 그런데
  const [allLoaded, setAllLoaded] = useState(false);

  const bundleIdx = useRef<number>(0);
  const bundleSize: number = 10;

  useEffect(() => {
    // console.log("globalSearchNeeded 값", globalSearchNeeded);
    // console.log("searchAdapted", searchAdapted);
    console.log;
    if (globalSearchNeeded) {
      setAllLoaded(false);
      setData([]);
      bundleIdx.current = 0;
      setSearchAdapted(true);
      const stateObj = {
        searchValue: globalSearchValue,
        globalSearchNeeded: false,
      };
      dispatch(search(stateObj));
    }
  }, [globalSearchNeeded]);

  // TOGGLE LOADING COMPONENT
  const checkAllLoaded = (dataLength: number) => {
    if (bundleSize * bundleIdx.current > dataLength) {
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
      console.log("searchAdapted:", searchAdapted);
      console.log("globalSearchNeeded:", globalSearchNeeded);
      console.log("globalSearchValue:", globalSearchValue);

      setTimeout(() => {
        Controller();
      }, 500);
      return;
    }
  };

  // CONTROL WHEN OBSERVED...
  const Controller = async () => {
    bundleIdx.current += 1;
    // globalSearchNeeded 일때 한번 검색하고 false 처리해둘예정?
    console.log("searchAdapted:", searchAdapted);
    let dataLen = 0;
    // 검색
    if (searchAdapted) {
      dataLen = await globalGetData(
        bundleIdx.current,
        bundleSize,
        setData,
        globalSearchValue
      );
    }

    // 기본값
    else {
      dataLen = await getData(bundleIdx.current, bundleSize, setData);
    }
    if (checkAllLoaded(dataLen)) setAllLoaded(true);
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
            <Card key={val.contentIdx} data={val} />
          ))}
        </div>

        {!allLoaded && (
          <div className={classes.outerBox}>
            <AnimationBox>
              <div ref={setTarget} className="loader"></div>
            </AnimationBox>
          </div>
        )}
      </div>
    </>
  );
}

// export async function getServerSideProps() {
//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL}/board/article?pid=0`
//   );
//   const res = await response.json();

//   return {
//     props: {
//       data: res[0],
//       dataLength: res[1],
//     },
//   };
// }
