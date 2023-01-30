import cls from "./EachReply.module.scss";
import Image from 'next/image'

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

interface Props{
  replys:replyType
  setIsReplyEditing:React.Dispatch<React.SetStateAction<boolean>>;
}

const EditForm = (props:Props) => {
  return ( <>
      <div className={cls.replyCommentEditForm}>
      { props.replys.to.length !== 0 && <span className={cls.to}> to {props.replys.to}</span> }
      <div><textarea/></div>
      <div className={cls.btnArea}>
        <button className={cls.cancelBtn} onClick={()=>{props.setIsReplyEditing(false)}}>
        x
        </button>
        <button className={cls.submitBtn}>
          <Image src='/images/rental/submit.png' alt='submit' width="20" height="20"/>
        </button>
      </div>
    </div>
  </> 
  );
}
 
export default EditForm;