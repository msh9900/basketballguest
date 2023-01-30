
시작 컴포넌트는 EachComment
component/gym/detailArticles/comment/EachComment 

REPLY 컴포넌트 구조
EachComment
  EachReply
    EditReply 
  PostReply 

REPLY CRUD 위치 
C : PostReply - postReply
R : EachComment (setIsFetching 처리)
U : EditReply - editReply
D : EachReply - deleteReply