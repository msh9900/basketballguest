interface replyType {
  to: string;
  id: string;
  userName: string;
  date: string;
  contents: string;
  isCreater: boolean;
}

interface commentType {
  articleId: string;
  commentId: string;
  userId: string;
  userName: string;
  date: string;
  contents: string;
  isCreater: boolean;
  replys: replyType[];
}

export default commentType;
