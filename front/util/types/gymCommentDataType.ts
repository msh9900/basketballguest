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
