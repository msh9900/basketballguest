import cls from './CommentSection.module.scss'
import EachComment from './EachComment';
import commentData from "./_commentData";

const CommentSection = () => {
  return (
    <>
    <div className={cls.CommentSectionLayout}>
      {commentData.map((v,idx)=>{
        return (
        <EachComment 
          key={'comment:'+ idx.toString() + Math.random().toString()}
          id={v.id}
          userName={v.userName}
          date={v.date}
          contents={v.contents}
          isCreater={v.isCreater}
          replys={v.replys}
        />)
      })}
    </div>
    </> 
  );
}
 
export default CommentSection;