import cls from "./AllArticles.module.scss";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import gymArticleDataType from "util/types/gymArticleDataType";
// import gymArticleDataBase from 'util/types/gymArticleDataBase';

interface Props {
  orderStatus: any;
  filterStatus: any;
  searchRes: any;
  needToSearch: any;
  setNeedToSearch: any;
}
const AllArticles = (props: Props) => {
  const [articles, setArticles] = useState<gymArticleDataType[]>([]);

  useEffect(() => {
    // console.log("props.needToSearch", props.needToSearch);
    if (props.needToSearch) {
      const keyWord = props.searchRes;
      getArticleData(keyWord);
    }
  }, [props.needToSearch]);

  const getArticleData = async (keyWord: string) => {
    let res: any;

    // 필터링한 검색
    if (keyWord !== "") {
      const body = {
        filter: props.filterStatus,
        order: props.orderStatus,
        keyWord: keyWord,
      };

      try {
        const response = await fetch("http://localhost:4000/rental/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        res = await response.json();
        console.log("검색 결과 : ", res);
      } catch (err: any) {
        console.log("필터,정렬 적용한 검색 실패 : ", err);
      }
    }

    // 전체 검색
    else {
      try {
        const response = await fetch("http://localhost:4000/rental/articles");
        res = await response.json();
        console.log("검색 결과 : ", res);
      } catch (err: any) {
        console.log("기본 검색 실패 : ", err);
      }
    }
    props.setNeedToSearch(false);
    setArticles(res);
  };

  const router = useRouter();
  const moveToDetailPage = (num: string) => {
    router.push(`/gym/${num}/`);
  };

  return (
    <>
      <div className={cls.boxContainer}>
        {articles &&
          articles.map((item, idx) => {
            return (
              <div
                key={Date.now() + idx}
                className={cls.boxItem}
                onClick={() => {
                  moveToDetailPage(item.data.articleId);
                }}
              >
                <li className={cls.li}>
                  <div className={cls.imgBox}></div>
                  <div className={cls.title}>제목 : {item.data.title}</div>
                  <div className={cls.price}>
                    대관료 : {item.data.price}원/시간
                  </div>
                  <div className={cls.content}>내용 : {item.data.content}</div>
                </li>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default AllArticles;
