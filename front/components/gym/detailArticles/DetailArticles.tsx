
// component 
import cls from "./DetailArticles.module.scss";
import SlickSlider from "./SlickSlider";
import ReviewSection from "./review/ReviewSection";
import CommentSection from "./comment/CommentSection";
import DetailArticles_EditForm from "./DetailArticles_EditForm";
// react & next
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
// types
import gymArticleDataType from "util/types/gymArticleDataType";
import gymArticleDataBase from "util/types/gymArticleDataBase";
// ------------------------------------

const DetailArticles = () => {
  const [gymInfo, setGymInfo] = useState<gymArticleDataType>(gymArticleDataBase);
  const [articleUserId, setArticleUserId] = useState('')
  const [isArticleEditing, setIsArticleEditing] = useState(false);
  const [isFetchingArticles, setIsFetchingArticles] = useState(true);
  const router = useRouter();
  

  useEffect(() => {
    getGymData(router.query.articles as string);
  }, [isFetchingArticles]);

  // GET
  const getGymData = async (pId: string) => {
    const response = await fetch(
      `http://localhost:4000/rental/article?pid=${pId}`
    );
    const data = await response.json();
    const bf = data.openingPeriod[0].slice(0,10)
    const af = data.openingPeriod[1].slice(0,10)
    data.openingPeriod = [bf, af]
    await setArticleUserId(data.articleUserId)
    await setGymInfo(data);
    await setIsFetchingArticles(false);
  };

  // DELETE
  const deleteArticle = async () => {
    const pId = router.query.articles as string;
    try {
      await fetch(`http://localhost:4000/rental/article?pid=${pId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      router.push("/gym");
    } catch (err: any) {
      alert("게시글 DELETE 실패");
    }
  };

  // etc utils...
  const getOpeningDaysFromData = () => {
    let temp: string[] = [];
    gymInfo.openingDays.forEach((ele:any) => {
      if (ele.open === true) temp.push(ele.name);
    });
    return temp;
  };

  // review, comment 섹션쪽 react.memo 처리할 것
  return (
    <>
      <div className={cls.DetailArticlesLayout}>
        {!isFetchingArticles && (
          <>
            {!isArticleEditing && (
              <>
                <h1>체육관 정보</h1>
                <div className={cls.contentBox}>
                  <div className={cls.mainContent}>
                    <div className={cls.eachContent}>
                      <div className={cls.gym_Article_title}>
                        <h2>{gymInfo.title}</h2>
                      </div>
                      <div className={cls.gym_Article_controlBtns}>
                        <button
                          onClick={() => {
                            setIsArticleEditing(true);
                          }}
                        >
                          <Image
                            src="/images/rental/pencil.png"
                            alt="수정 버튼"
                            width="25"
                            height="25"
                          />
                        </button>
                        <button onClick={deleteArticle}>
                          <Image
                            src="/images/rental/bin.png"
                            alt="삭제 버튼"
                            width="25"
                            height="25"
                          />
                        </button>
                      </div>
                    </div>

                    <div className={cls.eachContent}>
                      {gymInfo.userName} | {gymInfo.createdAt}
                    </div>
                  </div>

                  <div className={cls.imgContent}>
                    <SlickSlider 
                      gymImg = {gymInfo.gymImg}
                    />
                  </div>

                  <div className={cls.mainContent}>
                    <div className={cls.eachContent}>{gymInfo.content}</div>
                  </div>

                  <div className={cls.mainContent}>
                    <div className={cls.eachContent}>{gymInfo.contact}</div>
                  </div>

                  <div className={cls.mainContent}>
                    <h4>주소</h4>
                    <div className={cls.eachContent}>
                      우편번호 : {gymInfo.address[0].val} <br />
                      도로명주소 : {gymInfo.address[1].val} <br />
                      지번주소 : {gymInfo.address[2].val} <br />
                      상세주소 : {gymInfo.address[3].val} <br />
                      참고정보 : {gymInfo.address[4].val} <br />
                    </div>
                  </div>

                  <div className={cls.mainContent}>
                    <h4>가격</h4>
                    <div className={cls.eachContent}>
                      {gymInfo.price} 원/시간
                    </div>
                  </div>

                  <div className={cls.mainContent}>
                    <h4>오픈시간</h4>
                    <div className={cls.eachContent}>
                      {gymInfo.openingHours}
                    </div>
                  </div>

                  <div className={cls.mainContent}>
                    <h4>오픈기간</h4>
                    <div className={cls.eachContent}>
                      {gymInfo.openingPeriod[0].slice(0,10)} ~ {gymInfo.openingPeriod[1].slice(0,10)}
                    </div>
                  </div>

                  <div className={cls.mainContent}>
                    <h4>영업일</h4>
                    <div className={cls.eachContent}>
                      {getOpeningDaysFromData()}
                    </div>
                  </div>
                </div>
              </>
            )}

            {isArticleEditing && (
              <>
                <DetailArticles_EditForm
                  gymInfo={gymInfo}
                  setIsArticleEditing={setIsArticleEditing}
                  setIsFetchingArticles={setIsFetchingArticles}
                />
              </>
            )}
          </>
        )}
        <h1>리뷰</h1>
        <div className={cls.contentBox}>
          <ReviewSection />
        </div>

        <h1>댓글</h1>
        <div className={cls.contentBox}>
          <CommentSection 
            articleUserId={articleUserId}
          />
        </div>
      </div>
    </>
  );
};

export default DetailArticles;
