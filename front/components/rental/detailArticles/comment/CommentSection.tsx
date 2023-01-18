import cls from './CommentSection.module.scss'
import EachComment from './EachComment';
import commentData from "./_commentData";

const CommentSection = () => {
  return (
    <>
    <div className={cls.CommentSectionLayout}>
      <div className={cls.postComment}>
        <button>댓글 작성하기</button>
      </div>
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
      <div className={cls.moreComments}>
        <button>더 불러오기</button>
      </div>
    </div>
    </> 
  );
}
 
export default CommentSection;