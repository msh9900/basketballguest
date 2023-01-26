import cls from "./DetailArticles.module.scss";
import SlickSlider from "./SlickSlider";
import ReviewSection from "./review/ReviewSection";
import CommentSection from "./comment/CommentSection";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import DetailArticles_EditForm from './DetailArticles_EditForm';

// types
import gymArticleDataType from "util/types/gymArticleDataType";
import gymArticleDataBase from "util/types/gymArticleDataBase";

const DetailArticles = () => {
  const [gymInfo, setGymInfo] =
    useState<gymArticleDataType>(gymArticleDataBase);
  const [isArticleEditing, setIsArticleEditing] = useState(false);
  const [isFetchingArticles, setIsFetchingArticles] = useState(true)
  const [openingDays, setOpeningDays] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    getGymData(router.query.articles as string);
    setOpeningDays(getOpeningDaysFromData());
  }, [isFetchingArticles]);
  
  const getGymData = async (pId: string) => {
    const response = await fetch(
      `http://localhost:4000/rental/article?pid=${pId}`
    );
    const data = await response.json();
    await setGymInfo(data.data);
    await setIsFetchingArticles(false)
  };

  const deleteArticle = async () => {
    const pId = router.query.articles as string;
    try {
      const response = await fetch(
        `http://localhost:4000/rental/article?pid=${pId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      alert("게시글 DELETE 성공");
      router.push("/gym");
    } catch (err: any) {
      alert("게시글 DELETE 실패");
    }
  };

  const getOpeningDaysFromData = () => {
    let temp: string[] = [];
    gymInfo.openingDays.forEach((ele) => {
      if (ele.open === true) temp.push(ele.name);
    });
    return temp;
  };

  // review, comment 섹션쪽은 react.memo 처리할 것

  return (
    <>
      <div className={cls.DetailArticlesLayout}>
        {!isArticleEditing && (
          <>
            <h1>체육관 정보</h1>
            <div className={cls.contentBox}>
              <div className={cls.mainContent}>
                <h2>제목</h2>
                <div className={cls.eachContent}>{gymInfo.title}</div>
                <button onClick={()=>{setIsArticleEditing(true)}}>글 수정</button>
                <button onClick={deleteArticle}>글 삭제</button>
              </div>

              <div className={cls.imgContent}>
                <SlickSlider />
              </div>

              <div className={cls.mainContent}>
                <h2>내용</h2>
                <div className={cls.eachContent}>{gymInfo.content}</div>
              </div>

              <div className={cls.mainContent}>
                <h2>연락처</h2>
                <div className={cls.eachContent}>{gymInfo.contact}</div>
              </div>

              <div className={cls.mainContent}>
                <h2>주소</h2>
                <div className={cls.eachContent}>
                  우편번호 : {gymInfo.address[0].val} <br />
                  도로명주소 : {gymInfo.address[1].val} <br />
                  지번주소 : {gymInfo.address[2].val} <br />
                  상세주소 : {gymInfo.address[3].val} <br />
                  참고정보 : {gymInfo.address[4].val} <br />
                </div>
              </div>

              <div className={cls.mainContent}>
                <h2>가격</h2>
                <div className={cls.eachContent}>{gymInfo.price}원/시간</div>
              </div>

              <div className={cls.mainContent}>
                <h2>오픈시간</h2>
                <div className={cls.eachContent}>
                  {gymInfo.openingHours}
                </div>
              </div>

              <div className={cls.mainContent}>
                <h2>오픈기간</h2>
                <div className={cls.eachContent}>
                  {gymInfo.openingPeriod[0]}~{gymInfo.openingPeriod[1]}
                </div>
              </div>

              <div className={cls.mainContent}>
                <h2>영업일</h2>
                <div className={cls.eachContent}>
                  {openingDays.map((ele, i) => (
                    <li key={"openingDays" + i}>{ele}</li>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {isArticleEditing && (<>
          <DetailArticles_EditForm
            gymInfo={gymInfo}
            setIsArticleEditing={setIsArticleEditing}
            setIsFetchingArticles={setIsFetchingArticles}
          />
        </>)}

        <h1>리뷰</h1>
        <div className={cls.contentBox}>
          <ReviewSection />
        </div>

        <h1>댓글</h1>
        <div className={cls.contentBox}>
          <CommentSection />
        </div>
      </div>
    </>
  );
};

export default DetailArticles;
