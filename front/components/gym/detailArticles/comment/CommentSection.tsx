import cls from "./CommentSection.module.scss";
import EachComment from "./EachComment";
import {useState, useEffect} from 'react'

const CommentSection = () => {

  interface replyType{
    "to": string,
    "id": string,
    "userName": string,
    "date": string,
    "contents": string,
    "isCreater": boolean
  }
  interface commentType{
    "id": string,
    "userName": string,
    "date": string,
    "contents": string,
    "isCreater": boolean,
    "replys":replyType[]
  }


  const [commentData, setCommentData] = useState<commentType[]>([])

  useEffect(() => {
    try{
      getCommentData()
    }
    catch(err:any){
      console.log('err', err);
    }
  }, []);
  
  const getCommentData = async () => {
    const response = await fetch("http://localhost:5000/comments");
    const data = await response.json()
    setCommentData(data)
  }

  return (
    <>
      <div className={cls.CommentSectionLayout}>
        <div className={cls.postComment}>
          <button>댓글 작성하기</button>
        </div>
        {commentData.map((v, idx) => {
          return (
            <EachComment
              key={"comment:" + idx.toString() + Math.random().toString()}
              id={v.id}
              userName={v.userName}
              date={v.date}
              contents={v.contents}
              isCreater={v.isCreater}
              replys={v.replys}
            />
          );
        })}
        <div className={cls.moreComments}>
          <button>더 불러오기</button>
        </div>
      </div>
    </>
  );
};

export default CommentSection;
