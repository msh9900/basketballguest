// style
import cls from "./EachComment.module.scss";
// library
import { useState } from "react";
import Image from "next/image";
// component
import EachReply from "components/gym/detailArticles/reply/EachReply";
import PostReply from "components/gym/detailArticles/reply/PostReply";
import EditComment from "./EditComment";
// Type
import replyType from "util/types/gymReplyType";
import { useSelector } from "react-redux";

interface Props {
  // value for post
  articleId: string;
  articleUserId: string;
  commentId: string;
  userId: string;
  userName: string;
  createdAt: string;
  contents: string;
  isFetching: boolean;
  replys: replyType[];

  // activate rerender
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;

  // toggle
  setIsCommentWriting: React.Dispatch<React.SetStateAction<boolean>>;
}

const EachComment = (props: Props) => {
  const [isReplyWriting, setIsReplyWriting] = useState(false);
  const [toInfo, setToInfo] = useState("");
  const [indent, setIndent] = useState(1);
  const stateId = useSelector((state: any) => state.login.userId);
  const [isCommentEditing, setIsCommentEditing] = useState(false); // comment
  
  const ReplyPostFormToggle = (userName: string, contents: string) => {
    setToInfo(userName + "_" + contents);
    if (isReplyWriting == false) {
      if (stateId == "") {
        alert("로그인이 필요합니다.");
        return;
      }
      setIsReplyWriting(true);
      return;
    }
    if (toInfo === userName) {
      setIsReplyWriting((prev) => !prev);
    }
  };

  const deleteComment = async (e: any) => {
    const commentId = e.target.id;
    try {
      await fetch(
        `http://localhost:4000/rental/comment?commentId=${commentId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      await props.setIsFetching(true);
    } catch (err: any) {
      console.log("댓글 삭제 실패", err);
    }
  };

  return (
    <>
      {!props.isFetching && (
        <div className={cls.EachCommentLayout} key={Math.random()}>
          {isCommentEditing && (
            <EditComment
              articleId={props.articleId}
              articleUserId={props.articleUserId}
              commentId={props.commentId}
              userId={props.userId}
              userName={props.userName}
              contents={props.contents}
              setIsFetching={props.setIsFetching}
              setIsCommentWriting={props.setIsCommentWriting}
              setIsCommentEditing={setIsCommentEditing}
              replys={props.replys}
            />
          )}
          {/* 댓글 평상시 */}
          {!isCommentEditing && (
            <div className={cls.originalComment} id={props.commentId}>
              <div>
                <button className={props.articleUserId === props.userId ? cls.creater : cls.userName}>
                  {props.userName}
                </button>
              </div>

              <div className={cls.topSection}>
                <div className={cls.topLeft}>{props.contents}</div>
                <div className={cls.topRight}></div>
              </div>

              <div className={cls.bottomSection}>
                <div className={cls.bottomLeft}>
                  <span className={cls.time}>{props.createdAt}</span>
                </div>

                <div className={cls.bottomRight}>
                  <button
                    onClick={() => {
                      setIsCommentEditing(true);
                    }}
                  >
                    <Image
                      src="/images/rental/comment/pencil.png"
                      alt="댓글 수정"
                      width="20"
                      height="20"
                    />
                  </button>
                  <button>
                    <Image
                      id={props.commentId}
                      src="/images/rental/comment/bin.png"
                      alt="댓글 삭제"
                      width="20"
                      height="20"
                      onClick={deleteComment}
                    />
                  </button>
                  <button
                    onClick={() => {
                      ReplyPostFormToggle(props.userName, props.contents);
                    }}
                  >
                    <Image
                      src="/images/rental/comment/down-right.png"
                      alt="답글 작성"
                      width="20"
                      height="20"
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          {props.replys &&
            props.replys.map((item, idx) => {
              return (
                <div key={Math.random()}>
                  <EachReply
                    replys={item}
                    commentId={props.commentId}
                    articleUserId={props.articleUserId}
                    setIndent={setIndent}
                    indent={indent}
                    idx={idx}
                    isReplyWriting={isReplyWriting}
                    setIsReplyWriting={setIsReplyWriting}
                    toInfo={toInfo}
                    setToInfo={setToInfo}
                    setIsFetching={props.setIsFetching}
                  />
                </div>
              );
            })}
          {isReplyWriting && (
            <PostReply
              setIsReplyWriting={setIsReplyWriting}
              setIsFetching={props.setIsFetching}
              toInfo={toInfo}
              commentId={props.commentId}
              indent={indent}
            />
          )}
        </div>
      )}
    </>
  );
};

export default EachComment;
