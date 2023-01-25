import cls from "./CommentSection.module.scss";
import EachComment from "./EachComment";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Image from 'next/image'

// types
import commentType from "util/types/gymCommentDataType";

const CommentSection = () => {
  const [commentData, setCommentData] = useState<commentType[]>([]);
  const [isWriting, setIsWriting] = useState(false);
  const [writingText, setWritingText] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  const router = useRouter();
  // const pId = router.query.articles as string;

  const stateId = useSelector((state: any) => state.login.userId);
  const stateUserName = useSelector((state: any) => state.login.userName);

  useEffect(() => {
    getCommentData();
  }, []);

  const getCommentData = async () => {
    try {
      const pId = router.query.articles as string;
      const response = await fetch(
        `http://localhost:4000/rental/comment?pid=${pId}`
      );
      const data = await response.json();
      await setCommentData(data);
      await setIsFetching(false);
    } catch (err: any) {}
  };

  const checkSamePerson = () => {
    // 게시글 정보마다 유저아이디가 있으면
    // articleId => articcle 작성자 확인 가능?
    // 작성자랑 아래 댓글작성자랑 일치할때 isCreater true
  };

  // 댓글 생성 (gymArticle id별 (== gymComments Id))
  const postGymComment = async () => {
    const postDataforComment = {
      articleId: router.query.articles as string,
      userId: stateId,
      userName: stateUserName,
      date: "2023-01-01",
      contents: writingText,
      isCreater: false,
      replys: [],
    };
    // comment Id 필드는 백엔드에서 생성됨
    try {
      const res = await fetch("http://localhost:4000/rental/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postDataforComment),
      }).then((response) => console.log("jsonserverPost response", response));
      alert("댓글 작성 성공");

      await setIsFetching(true);
      await getCommentData();
    } catch (err: any) {
      alert("댓글 작성 실패");
    }
  };

  // 유저 데이터도 추가
  const postCommentToUserInfo = () => {
    const postDataforUser = {};
    // 나중엔 유저 데이터도 처리할 것!...
    return false;
  };

  const postComment = async () => {
    await postGymComment();
    // await postCommentToUserInfo()
  };

  const textAreaHandler = (e: any) => {
    setWritingText(e.target.value);
  };

  return (
    <>
      <div className={cls.CommentSectionLayout}>
        <div className={cls.postComment}>
          <button
            onClick={() => {
              setIsWriting(true);
            }}
          >
          <Image
            src="/images/rental/postComment.png"
            alt="댓글 삭제"
            width="20"
            height="20"
          />
          </button>
        </div>

        {isWriting && (
          <div className={cls.commentPostFormLayout}>
            <div>
              <textarea onChange={textAreaHandler} value={writingText} />
            </div>
            <div className={cls.flexbox}>
              <div>
                <button onClick={postComment}>작성</button>
              </div>
              <div>
                <button
                  onClick={() => {
                    setIsWriting(false);
                  }}
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        )}

        {commentData &&
          commentData.length > 0 &&
          commentData.map((v, idx) => {
            return (
              <EachComment
                key={"comment:" + idx.toString() + Math.random().toString()}
                articleId={v.data.articleId}
                commentId={v.data.commentId}
                userId={v.data.userId}
                userName={v.data.userName}
                date={v.data.date}
                contents={v.data.contents}
                isCreater={v.data.isCreater}
                replys={v.data.replys}
                isFetching={isFetching}
                setIsFetching={setIsFetching}
              />
            );
          })}

        <div className={cls.moreComments}>
          <button>더 불러오기</button>
        </div>
      </div>
    </>
  );
};

export default CommentSection;
