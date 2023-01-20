import cls from "./EachReply.module.scss";
import Image from 'next/image'
import {useState} from 'react'

interface replys {
  to: string;
  id: string;
  userName: string;
  date: string;
  contents: string;
  isCreater: boolean;
}

interface Props{
  x:replys
  idx:number
  toInfo:string
  isPostReplyFormOpen:boolean
  setIsPostReplyFormOpen:React.Dispatch<React.SetStateAction<boolean>>;
  setToInfo:React.Dispatch<React.SetStateAction<string>>;
  // ReplyPostFormToggle:ReplyPostFormToggle;
}

const calcMargin = (idx: number) => {
  const maxDepth = 10;
  return (idx % maxDepth) * 10;
};


const EachReply = (p:Props) => {

  const [isEditing, setIsEditing] = useState(false)

  const replyFormToggler = (userName:string) => {
    p.setToInfo(userName)
    
    // 닫혀있으면 무조건 열기
    if(p.isPostReplyFormOpen === false){
      p.setIsPostReplyFormOpen(true)
      return
    }
    // 열려있으면 이름이 다를때만 유지하고 같으면 닫기
    if(userName !== p.toInfo){
      p.setIsPostReplyFormOpen(true)
      return
    }
    p.setIsPostReplyFormOpen(false)
  }
  

  if(isEditing){
    return (
    <div className={cls.replyCommentEditForm}>
      { p.x.to.length !== 0 && <span className={cls.to}> to {p.x.to}</span> }
      <div><textarea></textarea></div>
      <div className={cls.btnArea}>
        <button className={cls.cancelBtn} onClick={()=>{setIsEditing(false)}}>
        x
        </button>
        <button className={cls.submitBtn}>
          <Image src='/images/rental/submit.png' alt='submit' width="20" height="20"/>
        </button>
      </div>
    </div>
    )
  }

  else
  return (
    <>
      <div className={cls.replyLayout} key={Math.random()} style={{}}>
        <div style={{ marginLeft: calcMargin(p.idx) }}>
          
          <div className={cls.contents}>
            <span className={cls.to}>ㄴ@{p.x.to}</span> 
            <span className={cls.contents}>{p.x.contents}</span>
          </div>
          
          <div className={cls.bottomSection}>
            {/* L */}
            <div className={cls.bottomLeft}>
              <div className={p.x.isCreater === true ? cls.creater : "xxx"}>
                <button className={cls.userName}>{p.x.userName}</button>
                <span className={cls.time}>{p.x.date}</span>
              </div>
            </div>

            {/* R */}
            <div className={cls.bottomRight}>
            <button onClick={()=>{setIsEditing(true)}}>
              <Image src='/images/rental/comment/pencil.png' alt='pencil' width="20" height="20"/>
            </button>
            <button>
              <Image src='/images/rental/comment/bin.png' alt='bin' width="20" height="20"/>
            </button>
            <button onClick={()=>{replyFormToggler(p.x.userName)}}>
              <Image src='/images/rental/comment/down-right.png' alt='down-right' width="20" height="20"/>
            </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EachReply;
