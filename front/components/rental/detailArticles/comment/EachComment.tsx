// style
import cls from "./EachComment.module.scss";
// library
import { useState, useEffect } from "react";
import Image from "next/image";
// component
import EachReply from "./EachReply";
import PostReplyForm from "./PostReplyForm";

interface replyType {
  id: string;
  to: string;
  userName: string;
  date: string;
  contents: string;
  isCreater: boolean;
}

interface Props {
  id: string;
  userName: string;
  date: string;
  contents: string;
  isCreater: boolean;
  replys: replyType[];
}

const EachComment = (v: Props) => {
  const [replyToggle, setReplyToggle] = useState(true);
  const [isPostReplyFormOpen, setIsPostReplyFormOpen] = useState(false);
  const [toInfo, setToInfo] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const setReplyList = () => {
    setReplyToggle((prev) => !prev);
  };

  const ReplyPostFormToggle = (userName: string) => {
    if (toInfo === userName) {
      setIsPostReplyFormOpen((prev) => !prev);
    }
    setToInfo(userName);
  };

  return (
    <div className={cls.EachCommentLayout} key={Math.random()}>
      
      {isEditing && (
        <div className={cls.originCommentEditForm}>
          <div><textarea></textarea></div>
          <div className={cls.btnArea}>
            <button className={cls.cancelBtn} onClick={() => {setIsEditing(false)}}>
              x
            </button>
            <button className={cls.submitBtn}>
              <Image src='/images/rental/submit.png' alt='submit' width="20" height="20"/>
            </button>
          </div>
        </div>
      )}
      {!isEditing && (
        <div className={cls.originalComment} id={v.id}>
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

            {/* R */}
            <div className={cls.bottomRight}>

              <button
                onClick={() => {
                  setIsEditing(true);
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
                  src="/images/rental/comment/bin.png"
                  alt="댓글 삭제"
                  width="20"
                  height="20"
                />
              </button>
              {v.replys.length > 0 && (
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
              )}
              <button onClick={() => {ReplyPostFormToggle(v.userName)}}>
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

      {replyToggle && (
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
      )}
    </div>
  );
};

export default EachComment;
