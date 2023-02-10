import cls from "./CommentSection.module.scss";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Image from "next/image";
import PostComment from "./PostComment";
import EachComment from "./EachComment";

// types
import commentType from "util/types/gymCommentDataType";

interface Props {
  articleUserId : string
}

const CommentSection = (props:Props) => {

  const [commentData, setCommentData] = useState<commentType[]>([]);
  const [isCommentWriting, setIsCommentWriting] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const stateId = useSelector((state: any) => state.login.userId);
  const router = useRouter();

  useEffect(() => {
    if (isFetching) getCommentData();
  }, [isFetching]);

  const getCommentData = async () => {
    try {
      const pId = router.query.articles as string;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/rental/comment?pid=${pId}`
      );
      const res = await response.json();
      await setCommentData(res);
      await setIsFetching(false);
    } catch (err: any) {}
  };

  const postCommentBtnClicked = () => {
    if (stateId == "") {
      alert("로그인이 필요합니다.");
      return;
    }
    if (isCommentWriting) setIsCommentWriting(false);
    if (!isCommentWriting) setIsCommentWriting(true);
  };

  return (
    <>
      {!isFetching && (
        <>
          <div className={cls.CommentSectionLayout}>
            <div className={cls.postComment}>
              <button onClick={postCommentBtnClicked}>
                <Image
                  src="/images/rental/postComment.png"
                  alt="댓글 작성"
                  width="20"
                  height="20"
                />
              </button>
            </div>

            {isCommentWriting && (
              <PostComment
                setIsCommentWriting={setIsCommentWriting}
                setIsFetching={setIsFetching}
              />
            )}

            {commentData &&
              commentData.length > 0 &&
              commentData.map((item, idx) => {
                return (
                  <EachComment
                    key={"comment:" + idx.toString() + Math.random().toString()}
                    articleId={item.articleId}
                    articleUserId={props.articleUserId}
                    commentId={item.commentId}
                    userId={item.userId}
                    userName={item.userName}
                    createdAt={item.createdAt}
                    contents={item.contents}
                    replys={item.replys}
                    isFetching={isFetching}
                    setIsFetching={setIsFetching}
                    setIsCommentWriting={setIsCommentWriting}
                  />
                );
              })}

            <div className={cls.moreComments}>
              <button>더 불러오기</button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CommentSection;
