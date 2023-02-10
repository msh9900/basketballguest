import cls from "./AllArticles.module.scss";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import gymArticleDataType from "util/types/gymArticleDataType";

// GLOBAL STATE
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { search } from "redux/modules/search";

interface Props {
  order: any;
  filter: any;
  searchVal: any;
  needToSearch: any;
  setNeedToSearch: any;
  setSearchRes: any;
  setShowSearchRes: any;
}

const AllArticles = (props: Props) => {
  const [articles, setArticles] = useState<gymArticleDataType[]>([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const globalSearchValue = useSelector(
    (state: any) => state.search.searchValue
  );
  const globalSearchNeeded = useSelector(
    (state: any) => state.search.globalSearchNeeded
  );

  // BRANCH OF TRIGGERING GETDATA LOGIC
  useEffect(() => {
    if (props.needToSearch && !globalSearchNeeded) {
      const keyWord = props.searchVal;
      getArticleData(keyWord);
      // const stateObj = { searchValue: globalSearchValue, globalSearchNeeded: false };
      // dispatch(search(stateObj));
    }
  }, [props.needToSearch]);

  useEffect(() => {
    if (globalSearchNeeded) {
      const keyWord = globalSearchValue;
      props.setSearchRes(globalSearchValue);
      props.setShowSearchRes(true);
      getArticleData(keyWord);
      // const stateObj = { searchValue: globalSearchValue, globalSearchNeeded: false };
      // dispatch(search(stateObj));
    }
  }, [globalSearchNeeded]);

  // GETDATA FUNCTION
  const getArticleData = async (keyWord: string) => {
    const defaultSearch = !(
      (
        props.filter.activeAreas.length > 0 ||
        props.filter.isPeriodActive ||
        props.filter.isPriceActive ||
        props.order.isDistanceOrderOn ||
        props.order.isPriceOrderOn ||
        keyWord.length > 0
      )
    );

    // 특정 목록
    if (!defaultSearch) {
      let fetchDataBody = {
        order: props.order,
        filter: props.filter,
        keyWord,
      };

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/rental/search`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(fetchDataBody),
        });
        const res = await response.json();
        await setArticles(res);
        // console.log("툴 적용 검색 성공 : ", res);
      } catch (err: any) {
        console.log("툴 적용 검색 실패 : ", err);
      }
    }
    // 전체 목록
    else {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/rental/articles`);
        const res = await response.json();
        await setArticles(res);
        // console.log("기본 검색 성공 : ", res);
      } catch (err: any) {
        console.log("기본 검색 실패 : ", err);
      }
    }
    const stateObj = { searchValue: globalSearchValue, globalSearchNeeded: false };
    dispatch(search(stateObj));
    await props.setNeedToSearch(false);
  };

  const moveToDetailPage = (num: string) => {
    router.push(`/gym/${num}/`);
  };

  return (
    <>
      {props.needToSearch && <>검색중</>}
      {!props.needToSearch && (
        <div className={cls.boxContainer}>
          {articles &&
            articles.length > 0 &&
            articles.map((item, idx) => {
              return (
                <div
                  key={Date.now() + "게시글" + idx}
                  className={cls.boxItem}
                  onClick={() => {
                    moveToDetailPage(item.articleId);
                  }}
                >
                  <li className={cls.li}>
                    <div className={cls.imgBox}>
                      <img src={item.gymImg[0]} alt="체육관 이미지" />
                    </div>
                    <div className={cls.textBox}>
                      <div className={cls.title}>{item.title}</div>
                      <div className={cls.price}>{item.price} 원/시간</div>
                      <div className={cls.areatag}>{item.areaTag}</div>
                      {item.content.length > 60 && (
                        <div className={cls.content}>
                          {item.content.slice(0, 60)} ...{" "}
                        </div>
                      )}
                      {item.content.length < 60 && (
                        <div className={cls.content}>{item.content}</div>
                      )}
                    </div>
                  </li>
                </div>
              );
            })}
          {articles && articles.length == 0 && (
            <>
              <div>
                <p>검색 결과가 없습니다.</p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AllArticles;
