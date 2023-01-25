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
  setIsWriting: React.Dispatch<React.SetStateAction<boolean>>;
  replys: replyType[];
}

const EachComment = (props: Props) => {
  const [replyToggle, setReplyToggle] = useState(true);
  const [isPostReplyFormOpen, setIsPostReplyFormOpen] = useState(false);
  const [toInfo, setToInfo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [fixedCommentValue, setFixedCommentValue] = useState("");

  const setReplyList = () => {
    setReplyToggle((prev) => !prev);
  };

  const ReplyPostFormToggle = (userName: string) => {
    if (toInfo === userName) {
      setIsPostReplyFormOpen((prev) => !prev);
    }
    setToInfo(userName);
  };

  const updateComment = async (e: any) => {

    const ele = document.querySelector('#fixingComment') as HTMLTextAreaElement
    const changedValue = ele.value

    props.setIsFetching(true)
    const commentId = e.target.id;
    const updateCommentObj = {
      articleId: props.articleId,
      commentId: props.commentId,
      userId: props.userId,
      userName: props.userName,
      date: "2099-01-01",
      contents: changedValue,
      isCreater: props.isCreater,
      replys: props.replys,
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
      await props.setIsFetching(false)
      await props.setIsWriting(false)
    } catch (err: any) {
    }
  };

  const deleteComment = async (e: any) => {
    await props.setIsFetching(true)
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
      await props.setIsFetching(false)
    } catch (err: any) {
      console.log('comment delete error', err)
    }
  };

  return (
    <>
      {!props.isFetching && (
        <div className={cls.EachCommentLayout} key={Math.random()}>
          {isEditing && (
            <div className={cls.originCommentEditForm}>
              <div>
                <textarea
                  id='fixingComment'
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
            <div className={cls.originalComment} id={props.commentId}>
              <div className={cls.topSection}>
                <div className={cls.topLeft}>{props.contents}</div>
                <div className={cls.topRight}></div>
              </div>

              <div className={cls.bottomSection}>
                {/* L */}
                <div className={cls.bottomLeft}>
                  <div className={props.isCreater === true ? cls.creater : "vvv"}>
                    <button className={cls.userName}>{props.userName}</button>
                    <span className={cls.time}>{props.date}</span>
                  </div>
                </div>

                <div className={cls.bottomRight}>
                  <button
                    onClick={() => {setIsEditing(true);}}>
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
