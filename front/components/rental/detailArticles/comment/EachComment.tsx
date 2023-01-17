import cls from "./EachComment.module.scss";
import { useState } from "react";

// interface commentType {
//   id: string;
//   userName: string;
//   date: string;
//   contents: string;
//   isCreater: boolean;
//   replys: replyType
// }

interface replyType {
  id: string,
  userName: string,
  date: string,
  contents: string,
  isCreater:boolean
}

interface Props {
  id: string;
  userName: string;
  date: string;
  contents: string;
  isCreater: boolean;
  replys: replyType[]
}

const calcMargin = (idx: number) => {
  const maxDepth = 10;
  return (idx % maxDepth) * 10;
};

const EachComment = (v: Props) => {
  const [isReplyFold, setIsReplyFold] = useState(true);

  return (
    <div className={cls.EachCommentLayout} key={Math.random()}>
      <div className={cls.originalComment}>
        <div className={v.isCreater === true ? cls.creater : "xxx"}>
          <button>{v.userName}</button>
          <span className={cls.time}>{v.date}</span>
        </div>
        <div>{v.contents}</div>
        <div className={cls.buttonSection}>
          <div>
            <button>답글</button>
          </div>
          <div>
            <button>수정</button>
          </div>
          <div>
            <button>삭제</button>
          </div>
        </div>
      </div>

      {isReplyFold ? (
        <>
          {(v.replys).length > 0 && (
          <div className={cls.ReplyButtonOnOff}>
            <button 
              onClick={() => {
                setIsReplyFold(false);
              }}
            >
              답글 목록 열기
            </button>
          </div>

          )}
        </>
      ) : (
        <>
          {(v.replys).map((x, idx) => {
            return (
              <div className={cls.replyLayout} key={Math.random()} style={{}}>
                <div style={{ marginLeft: calcMargin(idx) }}>
                  <div className={x.isCreater === true ? cls.creater : "xxx"}>
                    ㄴ<button>{x.userName}</button>
                    <span className={cls.time}>{x.date}</span>
                  </div>
                  <div>{x.contents}</div>
                  <div className={cls.replybuttonSection}>
                    <div>
                      <button>답글</button>
                    </div>
                    <div>
                      <button>수정</button>
                    </div>
                    <div>
                      <button>삭제</button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div className={cls.ReplyButtonOnOff}>
            <button 
              onClick={() => {
                setIsReplyFold(true);
              }}
            >
              답글 목록 접기
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default EachComment;
