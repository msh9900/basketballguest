import cls from "./EachReply.module.scss";
import Image from "next/image";
import { useState, useEffect } from "react";
import EditForm from "./EditForm";
import replyType from 'util/types/gymReplyType';

interface Props {
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

  useEffect(()=>{
    // console.log(props)
  }, [])

  const [isReplyEditing, setIsReplyEditing] = useState(false);

  const replyFormToggler = (userName: string) => {
    // 답글 대상에 대한 정보 입력
    props.setToInfo(userName);
    props.setIndent(props.replys.indentLevel + 1);

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

  // 편집
  if (isReplyEditing) {
    return (
      <EditForm replys={props.replys} setIsReplyEditing={setIsReplyEditing} />
    );
  }

  // 일반
  else
    return (
      <>
        <div className={cls.replyLayout} key={Math.random()} style={{}}>
          {/* <div style={{ marginLeft: calcMargin(props.idx) }}> */}
          <div>
            <div className={cls.contents}>
              <span className={cls.to}>ㄴ@{props.replys.to}</span>
              <span className={cls.contents}>{props.replys.contents}</span>
              <span>들여쓰기레벨 : {props.replys.indentLevel}</span>
            </div>

            <div className={cls.bottomSection}>
              <div className={cls.bottomLeft}>
                <div
                  className={
                    props.replys.isCreater === true ? cls.creater : "xxx"
                  }
                >
                  <button className={cls.userName}>
                    {props.replys.userName}
                  </button>
                  <span className={cls.time}>{props.replys.date}</span>
                </div>
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
                <button>
                  <Image
                    src="/images/rental/comment/bin.png"
                    alt="bin"
                    width="20"
                    height="20"
                  />
                </button>
                <button
                  onClick={() => {
                    replyFormToggler(props.replys.userName);
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
      </>
    );
};

export default EachReply;
