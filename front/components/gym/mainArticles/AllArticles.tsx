import cls from "./AllArticles.module.scss";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import gymArticleDataType from "util/types/gymArticleDataType";

interface Props {
  order: any;
  filter: any;
  searchVal: any;
  needToSearch: any;
  setNeedToSearch: any;
}
const AllArticles = (props: Props) => {
  const [articles, setArticles] = useState<gymArticleDataType[]>([]);

  useEffect(() => {
    if (props.needToSearch) {
      const keyWord = props.searchVal;
      getArticleData(keyWord);
    }
  }, [props.needToSearch]);

  const getArticleData = async (keyWord: string) => {
    let res: any;

    const defaultSearch = !(
      // filter
      (
        props.filter.activeAreas.length > 0 ||
        props.filter.isPeriodActive ||
        props.filter.isPriceActive ||
        // order
        props.order.isDistanceOrderOn ||
        props.order.isPriceOrderOn ||
        // keyWord
        keyWord.length > 0
      )
    );

    const body = {
      order: props.order,
      filter: props.filter,
      keyWord,
    };
    // 특정 목록
    if (!defaultSearch) {
      try {
        const response = await fetch("http://localhost:4000/rental/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        res = await response.json();
        await setArticles(res);
        // console.log("도구 검색 결과 : ", res);
      } catch (err: any) {
        // console.log("도구 검색 실패 : ", err);
      }
    }
    // 전체 목록
    else {
      try {
        const response = await fetch("http://localhost:4000/rental/articles");
        res = await response.json();
        await setArticles(res);
        // console.log("기본 검색 결과 : ", res);
      } catch (err: any) {
        // console.log("기본 검색 실패 : ", err);
      }
    }
    await props.setNeedToSearch(false);
  };

  const router = useRouter();
  const moveToDetailPage = (num: string) => {
    router.push(`/gym/${num}/`);
  };

  return (
    <>
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
                <p>검색된 결과가 없습니다.</p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AllArticles;
