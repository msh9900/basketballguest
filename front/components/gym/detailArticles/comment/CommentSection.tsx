import cls from "./CommentSection.module.scss";
import EachComment from "./EachComment";
import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import { GYM_COMMENTS_URL} from 'util/url';

// types
import commentType from 'util/types/gymCommentDataType';

const CommentSection = () => {

  const [commentData, setCommentData] = useState<commentType[]>([]);
  const [isWriting, setIsWriting] = useState(false);
  const [writingText, setWritingText] = useState('');
  const router = useRouter()
  const pageId = router.query.articles as string

  useEffect(() => {
    getCommentData()
  }, []);
  
  const getCommentData = async () => {
    const response = await fetch(GYM_COMMENTS_URL + `/${pageId}`);
    const data = await response.json()
    setCommentData(data.body)
  }
  
  // 댓글 생성 (gymArticle id별 (== gymComments Id))
  const postGymComment = async () => {
    const postDataforComment = {
      "userName":"Jane Doe",
      "date":'2023-01-01',
      "contents":writingText,
      "isCreater":false,
      "replys":[]
    }
    try{
      const res = await fetch(GYM_COMMENTS_URL +`/${pageId}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({postDataforComment}),
      }).then((response) => console.log('jsonserverPost response', response));
      console.log('res', res);
    } catch(err:any){
      console.log('err', err);
    }
  }

  // 유저 데이터도 추가
  const postCommentToUserInfo = () => {
    const postDataforUser = {}
    // 나중엔 유저 데이터도 처리할 것!...
    return false
  }

  const postComment = async () => {
    // await postGymComment()
    // await postCommentToUserInfo()
  }
  
  const textAreaHandler = (e:any) => {
    setWritingText(e.target.value)
  }


  return (
    <>
      <div className={cls.CommentSectionLayout}>
        <div className={cls.postComment}>
          <button onClick={()=>{setIsWriting(true)}}>댓글 작성하기</button>
        </div>

        {isWriting && 
          <div className={cls.commentPostFormLayout}>
            <div><textarea onChange={textAreaHandler} value={writingText}/></div>
            <div className={cls.flexbox}>
              <div><button onClick={postComment}>작성</button></div>
              <div><button onClick={()=>{setIsWriting(false)}}>취소</button></div>
            </div>
          </div>
        }


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
