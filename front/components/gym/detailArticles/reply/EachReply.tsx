import cls from "./EachReply.module.scss";
import Image from "next/image";
import { useState, useEffect } from "react";
import EditReply from "./EditReply";
import replyType from "util/types/gymReplyType";

interface Props {
  indent: number;
  setIndent: React.Dispatch<React.SetStateAction<number>>;
  replys: replyType;
  commentId: string;
  idx: number;
  toInfo: string;
  isReplyWriting: boolean;
  setIsReplyWriting: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
  setToInfo: React.Dispatch<React.SetStateAction<string>>;
  // ReplyPostFormToggle:ReplyPostFormToggle;
}

const calcMargin = (idx: number) => {
  const maxDepth = 10;
  return (idx % maxDepth) * 10;
};

const EachReply = (props: Props) => {
  const [isReplyEditing, setIsReplyEditing] = useState(false);
  const replyFormToggler = (
    userName: string,
    indentValue: number,
    preText: string
  ) => {
    // 답글 대상에 대한 정보 입력
    props.setToInfo(userName + "_" + preText);
    props.setIndent(indentValue + 1);

    // 닫힘 => 무조건 열기
    if (props.isReplyWriting === false) {
      props.setIsReplyWriting(true);
      return;
    }
    // 열림 => 이름 같으면(동일인) 닫기, 다를 땐 유지
    if (userName !== props.toInfo) {
      props.setIsReplyWriting(true);
      return;
    }
    props.setIsReplyWriting(false);
  };

  const separateFront = (text: string) => {
    return text.split("_")[0];
  };
  const separateBack = (text: string) => {
    const wholeText = text.split("_")[1];
    if (wholeText?.length > 10) return wholeText.slice(0, 10)+'...';
    return wholeText;
  };

  // DELETE REPLY
  const deleteReply = async () => {
    const replyId = props.replys.replyId;
    try {
      await fetch(
        `http://localhost:4000/rental/comments?replyId=${replyId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (err: any) {
      console.log('REPLY DELETE FAIL',err);
    }
    await props.setIsFetching(true);
  }

  // EDIT MODE
  if (isReplyEditing) {
    return (
      <EditForm 
      replys={props.replys} 
      setIsReplyEditing={setIsReplyEditing} 
      setIsFetching={props.setIsFetching} />
    );
  }

  // NORMAL MODE
  else
    return (
      <>
        <div className={cls.replyLayout} key={Math.random()}>
          <div style={{ marginLeft: calcMargin(props.replys.indentLevel) }}>
            <div className={props.replys.isCreater ? cls.creater : "xxx"}>
              <button className={cls.userName}>{props.replys.userName}</button>
            </div>
            <div>
              <div className={cls.contents}>
                <div>
                  <span className={cls.to}>
                    @{separateFront(props.replys.to)} :{" "}
                  </span>
                  <span className={cls.toText}>
                    {separateBack(props.replys.to)}
                  </span>
                </div>
                <span className={cls.contents}>{props.replys.contents}</span>
              </div>

              <div className={cls.bottomSection}>
                <div className={cls.bottomLeft}>
                  <span className={cls.time}>{props.replys.createdAt}</span>
                </div>
                
                <div className={cls.bottomRight}>
                  <button
                    onClick={() => {
                      setIsReplyEditing(true);
                    }}
                  >
                    <Image
                      src="/images/rental/comment/pencil.png"
                      alt="pencil"
                      width="20"
                      height="20"
                    />
                  </button>
                  <button onClick={deleteReply}>
                    <Image
                      src="/images/rental/comment/bin.png"
                      alt="bin"
                      width="20"
                      height="20"
                    />
                  </button>
                  <button
                    onClick={() => {
                      replyFormToggler(
                        props.replys.userName,
                        props.replys.indentLevel,
                        props.replys.contents
                      );
                    }}
                  >
                    <Image
                      src="/images/rental/comment/down-right.png"
                      alt="down-right"
                      width="20"
                      height="20"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
};

export default EachReply;
