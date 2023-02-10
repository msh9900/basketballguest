
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
// import gymArticleDataType from "util/types/gymArticleDataType";
// import gymArticleDataBase from "util/types/gymArticleDataBase";
// ------------------------------------

interface Props{
  gymInfo:any, 
  setGymInfo:any, 
  articleUserId:any, 
  setArticleUserId:any, 
  isFetchingArticles:any, 
  setIsFetchingArticles:any, 
}

const DetailArticles = (props:Props) => {
  const [isArticleEditing, setIsArticleEditing] = useState(false);
  const router = useRouter();

  // DELETE
  const deleteArticle = async () => {
    const pId = router.query.articles as string;
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/rental/article?pid=${pId}`, {
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
    props.gymInfo.openingDays.forEach((ele:any) => {
      if (ele.open === true) temp.push(ele.name);
    });
    return temp;
  };

  // review, comment 섹션쪽 react.memo 처리할 것
  return (
    <>
      <div className={cls.DetailArticlesLayout}>
        {/* {!props.isFetchingArticles && ( */}
          {/* <> */}
            {!isArticleEditing && (
              <>
                <h1>체육관 정보</h1>
                <div className={cls.contentBox}>
                  <div className={cls.mainContent}>
                    <div className={cls.eachContent}>
                      <div className={cls.gym_Article_title}>
                        <h2>{props.gymInfo.title}</h2>
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
                      {props.gymInfo.userName} | {props.gymInfo.createdAt}
                    </div>
                  </div>

                  <div className={cls.imgContent}>
                    <SlickSlider 
                      gymImg = {props.gymInfo.gymImg}
                    />
                  </div>

                  <div className={cls.mainContent}>
                    <div className={cls.eachContent}>{props.gymInfo.content}</div>
                  </div>

                  <div className={cls.mainContent}>
                    <div className={cls.eachContent}>{props.gymInfo.contact}</div>
                  </div>

                  <div className={cls.mainContent}>
                    <h4>주소</h4>
                    <div className={cls.eachContent}>
                      우편번호 : {props.gymInfo.address[0].val} <br />
                      도로명주소 : {props.gymInfo.address[1].val} <br />
                      지번주소 : {props.gymInfo.address[2].val} <br />
                      상세주소 : {props.gymInfo.address[3].val} <br />
                      참고정보 : {props.gymInfo.address[4].val} <br />
                    </div>
                  </div>

                  <div className={cls.mainContent}>
                    <h4>가격</h4>
                    <div className={cls.eachContent}>
                      {props.gymInfo.price} 원/시간
                    </div>
                  </div>

                  <div className={cls.mainContent}>
                    <h4>오픈시간</h4>
                    <div className={cls.eachContent}>
                      {props.gymInfo.openingHours}
                    </div>
                  </div>

                  <div className={cls.mainContent}>
                    <h4>오픈기간</h4>
                    <div className={cls.eachContent}>
                      {props.gymInfo.openingPeriod[0].slice(0,10)} ~ {props.gymInfo.openingPeriod[1].slice(0,10)}
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
                  gymInfo={props.gymInfo}
                  setIsArticleEditing={setIsArticleEditing}
                  setIsFetchingArticles={props.setIsFetchingArticles}
                />
              </>
            )}
          {/* </> */}
        {/* )} */}
        <h1>리뷰</h1>
        <div className={cls.contentBox}>
          <ReviewSection
          articleUserId={props.articleUserId}/>
        </div>

        <h1>댓글</h1>
        <div className={cls.contentBox}>
          <CommentSection 
            articleUserId={props.articleUserId}
          />
        </div>
      </div>
    </>
  );
};

export default DetailArticles;
