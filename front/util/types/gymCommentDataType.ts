interface replyType {
  commentId: string;
  replyId: string;
  to: string;
  userId: string;
  userName: string;
  createdAt: string;
  contents: string;
  indentLevel: number;
}

interface commentType {
  articleId: string;
  articleUserId: string;
  commentId: string;
  userId: string;
  userName: string;
  createdAt: string;
  contents: string;
  replys: replyType[];
}

export default commentType;
