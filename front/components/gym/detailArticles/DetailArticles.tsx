// component
import cls from "./DetailArticles.module.scss";
import ReviewSection from "./review/ReviewSection";
import CommentSection from "./comment/CommentSection";
import DetailArticles_EditForm from "./DetailArticles_EditForm";
// react & next
import { useState, useEffect } from "react";
import DetailArticles_GymInfo from "./DetailArticles_GymInfo";
// types
import gymArticleDataType from "util/types/gymArticleDataType";
import getArticleData from 'util/getArticleData';
import { useRouter } from 'next/router';

interface Props {
  gymInfo: gymArticleDataType;
  setGymInfo: any;
  articleUserId: any;
}

const DetailArticles = (props: Props) => {
  const [isArticleEditing, setIsArticleEditing] = useState(false);
  const [isFetchingArticles, setIsFetchingArticles] = useState(false);
  const router = useRouter()
  
  useEffect(() => {
    const articleId = router.query.articles as string
    if(isFetchingArticles){
      getArticleData(articleId, setIsFetchingArticles, props.setGymInfo)
    }
  }, [isFetchingArticles]);

  return (
    <>
      <div className={cls.DetailArticlesLayout}>
        {!isArticleEditing && !isFetchingArticles &&(
          <DetailArticles_GymInfo
            gymInfo={props.gymInfo}
            setIsArticleEditing={setIsArticleEditing}
            isFetchingArticles={isFetchingArticles}
            setIsFetchingArticles={setIsFetchingArticles}
          />
        )}
        {isArticleEditing && (
          <DetailArticles_EditForm
            gymInfo={props.gymInfo}
            setIsArticleEditing={setIsArticleEditing}
            setIsFetchingArticles={setIsFetchingArticles}
          />
        )}

        <h1>리뷰</h1>
        <div className={cls.contentBox}>
          <ReviewSection articleUserId={props.articleUserId} />
        </div>

        <h1>댓글</h1>
        <div className={cls.contentBox}>
          <CommentSection articleUserId={props.articleUserId} />
        </div>
      </div>
    </>
  );
};

export default DetailArticles;
