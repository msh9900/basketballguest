import cls from "./CommentSection.module.scss";
import EachComment from "./EachComment";
import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'

// types
import commentType from 'util/types/gymCommentDataType';

const CommentSection = () => {

  const [commentData, setCommentData] = useState<commentType[]>([])

  useEffect(() => {
    const pageId = router.query.articles as string
    getCommentData(pageId)
  }, []);
  
  const router = useRouter()
  const getCommentData = async (pageId:string) => {
    const response = await fetch(`http://localhost:5000/gymComments/${pageId}`);
    const data = await response.json()
    setCommentData(data.body)
  }

  return (
    <>
      <div className={cls.CommentSectionLayout}>
        <div className={cls.postComment}>
          <button>댓글 작성하기</button>
        </div>
        {commentData.length>0 && commentData.map((v, idx) => {
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
