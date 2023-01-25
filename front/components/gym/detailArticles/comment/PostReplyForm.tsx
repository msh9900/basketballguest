import cls from './PostReplyForm.module.scss'
import {useState} from 'react'

interface ReplyPostFormToggle {
  (userName:string):void;
}
interface Props {
  toInfo:string
  setIsPostReplyFormOpen:React.Dispatch<React.SetStateAction<boolean>>;
}

const PostReplyForm = (p:Props) => {

  const [textContent, setTextContent] = useState('')
  const onChangeText = (e:any) => {
    setTextContent(e.target.value)
  }
  return ( 
    <>
      <div className={cls.postReplyFormLayout}>
        <div className={cls.textareaDiv}>
          <span className={cls.toInfo}>@{p.toInfo}</span>
          <textarea value={textContent} onChange={onChangeText}/> 
        </div>
        <div className={cls.buttons}>
          <button onClick={()=>{p.setIsPostReplyFormOpen(false)}}>취소</button>
          <button>전송</button>
        </div>
      </div>
    </> 
  );
}
 
export default PostReplyForm;