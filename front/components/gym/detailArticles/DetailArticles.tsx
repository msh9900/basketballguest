// component
import cls from "./DetailArticles.module.scss";
import ReviewSection from "./review/ReviewSection";
import CommentSection from "./comment/CommentSection";
import DetailArticles_EditForm from "./DetailArticles_EditForm";
// react & next
import { useState } from "react";
import DetailArticles_GymInfo from "./DetailArticles_GymInfo";
// types
import gymArticleDataType from "util/types/gymArticleDataType";
// import gymArticleDataBase from "util/types/gymArticleDataBase";

interface Props {
  gymInfo: gymArticleDataType;
  setGymInfo: any;
  articleUserId: any;
  setArticleUserId: any;
  isFetchingArticles: any;
  setIsFetchingArticles: any;
}

const DetailArticles = (props: Props) => {
  const [isArticleEditing, setIsArticleEditing] = useState(false);

  return (
    <>
      <div className={cls.DetailArticlesLayout}>
        {!isArticleEditing && (
          <DetailArticles_GymInfo
            gymInfo={props.gymInfo}
            setIsArticleEditing={setIsArticleEditing}
          />
        )}
        {isArticleEditing && (
          <DetailArticles_EditForm
            gymInfo={props.gymInfo}
            setIsArticleEditing={setIsArticleEditing}
            setIsFetchingArticles={props.setIsFetchingArticles}
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
