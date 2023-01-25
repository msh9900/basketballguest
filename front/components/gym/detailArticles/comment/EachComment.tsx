// style
import cls from "./EachComment.module.scss";
// library
import { useState, useEffect } from "react";
import Image from "next/image";
// component
import EachReply from "./EachReply";
import PostReplyForm from "./PostReplyForm";

interface replyType {
  commentId: string;
  replyId: string;
  to: string;
  userId: string;
  userName: string;
  date: string;
  contents: string;
  isCreater: boolean;
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
  replys: replyType[];
}

const EachComment = (v: Props) => {
  const [replyToggle, setReplyToggle] = useState(true);
  const [isPostReplyFormOpen, setIsPostReplyFormOpen] = useState(false);
  const [toInfo, setToInfo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [fixedCommentValue, setFixedCommentValue] = useState("");

  // useEffect(() => {
  //   if (v.isFetching === false) {
  //     console.log("v", v);
  //   }
  // }, [v.isFetching]);

  const setReplyList = () => {
    setReplyToggle((prev) => !prev);
  };

  const ReplyPostFormToggle = (userName: string) => {
    if (toInfo === userName) {
      setIsPostReplyFormOpen((prev) => !prev);
    }
    setToInfo(userName);
  };

  const onChangeCommentValue = (e: any) => {
    setFixedCommentValue(e.target.value);
  };

  const updateComment = async (e: any) => {
    const commentId = e.target.id;
    const updateCommentObj = {
      articleId: v.articleId,
      commentId: v.commentId,
      userId: v.userId,
      userName: v.userName,
      date: "2099-01-01",
      contents: fixedCommentValue,
      isCreater: v.isCreater,
      replys: v.replys,
    };
    try {
      const response = await fetch(
        `http://localhost:4000/rental/comment?commentId=${commentId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateCommentObj),
        }
      );
      const data = await response.json();
      alert("댓글 UPDATE 성공");
    } catch (err: any) {
      alert("댓글 UPDATE 실패");
    }
  };

  const deleteComment = async (e: any) => {
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
      alert("댓글 DELETE 성공");
    } catch (err: any) {
      alert("댓글 DELETE 실패");
    }
  };

  return (
    <>
      {!v.isFetching && (
        <div className={cls.EachCommentLayout} key={Math.random()}>
          {isEditing && (
            <div className={cls.originCommentEditForm}>
              <div>
                <textarea
                  onChange={onChangeCommentValue}
                  value={fixedCommentValue}
                ></textarea>
              </div>
              <div className={cls.btnArea}>
                <button className={cls.submitBtn} onClick={updateComment}>
                  <Image
                    src="/images/rental/checked.png"
                    alt="submit"
                    width="20"
                    height="20"/>
                </button>
                <button
                  className={cls.cancelBtn}
                  onClick={() => {setIsEditing(false);}}>
                  <Image
                    src="/images/rental/cancel.png"
                    alt="cancel"
                    width="20"
                    height="20"/>
                </button>
              </div>
            </div>
          )}
          {!isEditing && (
            <div className={cls.originalComment} id={v.commentId}>
              <div className={cls.topSection}>
                <div className={cls.topLeft}>{v.contents}</div>
                <div className={cls.topRight}></div>
              </div>

              <div className={cls.bottomSection}>
                {/* L */}
                <div className={cls.bottomLeft}>
                  <div className={v.isCreater === true ? cls.creater : "vvv"}>
                    <button className={cls.userName}>{v.userName}</button>
                    <span className={cls.time}>{v.date}</span>
                  </div>
                </div>

                <div className={cls.bottomRight}>
                  <button
                    onClick={() => {setIsEditing(true);}}>
                    <Image
                      id={v.commentId}
                      src="/images/rental/comment/pencil.png"
                      alt="댓글 수정"
                      width="20"
                      height="20"
                    />
                  </button>
                  <button>
                    <Image
                      id={v.commentId}
                      src="/images/rental/comment/bin.png"
                      alt="댓글 삭제"
                      width="20"
                      height="20"
                      onClick={deleteComment}
                    />
                  </button>

                  {/* {v.replys.length > 0 && (
                    <div className={cls.ReplyButtonOnOff}>
                      <button onClick={setReplyList}>
                        <Image
                          src="/images/rental/comment/list.png"
                          alt="답글 목록"
                          width="20"
                          height="20"
                        />
                      </button>
                    </div>
                  )} */}

                  <button
                    onClick={() => {
                      ReplyPostFormToggle(v.userName);
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

          {/* {replyToggle && (
              <>
                {v.replys.map((x, idx) => {
                  return (
                    <div key={Math.random()}>
                      <EachReply
                        x={x}
                        idx={idx}
                        isPostReplyFormOpen={isPostReplyFormOpen}
                        setIsPostReplyFormOpen={setIsPostReplyFormOpen}
                        toInfo={toInfo}
                        setToInfo={setToInfo}
                      />
                    </div>
                  );
                })}
              </>
            )}
            {isPostReplyFormOpen && (
              <PostReplyForm
                setIsPostReplyFormOpen={setIsPostReplyFormOpen}
                toInfo={toInfo}
              />
            )} */}
        </div>
      )}
    </>
  );
};

export default EachComment;
