import cls from "./AllArticles.module.scss";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import gymArticleDataType from "util/types/gymArticleDataType";
import Image from "next/image";
// import gymArticleDataBase from 'util/types/gymArticleDataBase';

const AllArticles = () => {
  const [articles, setArticles] = useState<gymArticleDataType[]>([]);

  useEffect(() => {
    getArticleData();
  }, []);

  const getArticleData = async () => {
    const response = await fetch("http://localhost:4000/rental/articles");
    const data = await response.json()!;
    setArticles(data);
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
                  moveToDetailPage(item.articleId);
                }}
              >
                <li className={cls.li}>
                  <div className={cls.imgBox}>
                    <img src={item.userImg[0]} />
                    {/* <Image
                      src={item.userImg[0]}
                      width="200"
                      height="100"
                      alt=""
                    /> */}
                  </div>
                  <div className={cls.title}>제목 : {item.title}</div>
                  <div className={cls.price}>대관료 : {item.price}원/시간</div>
                  <div className={cls.content}>내용 : {item.content}</div>
                </li>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default AllArticles;
