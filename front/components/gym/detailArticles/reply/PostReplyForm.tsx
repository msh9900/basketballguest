import cls from './PostReplyForm.module.scss'
import {useState} from 'react'

interface ReplyPostFormToggle {
  (userName:string):void;
}
interface Props {
  toInfo:string
  setIsReplyWriting:React.Dispatch<React.SetStateAction<boolean>>;
  setIsFetching:React.Dispatch<React.SetStateAction<boolean>>;
}

const PostReplyForm = (props:Props) => {
  const [textContent, setTextContent] = useState('')
  const onChangeText = (e:any) => {
    setTextContent(e.target.value)
  }

  const postReply = async () => {
    props.setIsFetching(true);
    const body = { 
      content:textContent,
      replyId:'',
      to:'',
      userId:'',
      userName:'',
      date:'',
      contents:'',
      isCreater:'',
    }

    try {
      await fetch("http://localhost:4000/rental/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      alert("답글 작성 성공");
      await props.setIsFetching(false);
      await props.setIsReplyWriting(false);
    } catch (err: any) {
      alert("답글 작성 실패");
      console.log('답글 작성 실패', err);
    }
  }

  return ( 
    <>
      <div className={cls.postReplyFormLayout}>
        <div className={cls.textareaDiv}>
          <span className={cls.toInfo}>@{props.toInfo}</span>
          <textarea value={textContent} onChange={onChangeText}/> 
        </div>
        <div className={cls.buttons}>
          <button onClick={()=>{props.setIsReplyWriting(false)}}>취소</button>
          <button onClick={postReply}>전송</button>
        </div>
      </div>
    </> 
  );
}
 
export default PostReplyForm;