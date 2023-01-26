// style
import cls from "./EachComment.module.scss";
// library
import { useState, useEffect } from "react";
import Image from "next/image";
// component
import EachReply from "components/gym/detailArticles/reply/EachReply";
import PostReplyForm from "components/gym/detailArticles/reply/PostReplyForm";
import EditComment from './EditComment';
interface replyType {
  commentId: string;
  replyId: string;
  to: string;
  userId: string;
  userName: string;
  date: string;
  contents: string;
  isCreater: boolean;
  indentLevel:number;
}

interface Props {
  articleId: string;
  commentId: string;
  userId: string;
  userName: string;
  date: string;
  contents: string;
  isCreater: boolean;
  isFetching: boolean;
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCommentWriting: React.Dispatch<React.SetStateAction<boolean>>;
  replys: replyType[];
}

const EachComment = (props: Props) => {
  const [isReplyWriting, setIsReplyWriting] = useState(false);
  const [toInfo, setToInfo] = useState("");
  const [isCommentEditing, setIsCommentEditing] = useState(false); // comment

  const ReplyPostFormToggle = (userName: string) => {
    setToInfo(userName);
    if(isReplyWriting == false){
      setIsReplyWriting(true)
      return
    }
    if (toInfo === userName) {
      setIsReplyWriting((prev) => !prev);
    }
  };

  const deleteComment = async (e: any) => {
    await props.setIsFetching(true);
    const commentId = e.target.id;
    try {
      const response = await fetch(
        `http://localhost:4000/rental/comment?commentId=${commentId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      await props.setIsFetching(false);
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
              commentId={props.commentId}
              userId={props.userId}
              userName={props.userName}
              isCreater={props.isCreater}
              setIsFetching={props.setIsFetching}
              setIsCommentWriting={props.setIsCommentWriting}
              setIsCommentEditing={setIsCommentEditing}
              replys={props.replys}
            />
          )}
          {!isCommentEditing && (
            <div className={cls.originalComment} id={props.commentId}>
              <div className={cls.topSection}>
                <div className={cls.topLeft}>{props.contents}</div>
                <div className={cls.topRight}></div>
              </div>

              <div className={cls.bottomSection}>
                <div className={cls.bottomLeft}>
                  <div
                    className={props.isCreater === true ? cls.creater : "vvv"}
                  >
                    <button className={cls.userName}>{props.userName}</button>
                    <span className={cls.time}>{props.date}</span>
                  </div>
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
                      ReplyPostFormToggle(props.userName);
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

          {props.replys && props.replys.map((item, idx) => {
            return (
              <div key={Math.random()}>
                <EachReply
                  replys={item}
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
            <PostReplyForm
              setIsReplyWriting={setIsReplyWriting}
              setIsFetching={props.setIsFetching}
              toInfo={toInfo}
            />
          )}
        </div>
      )}
    </>
  );
};

export default EachComment;