interface replyType {
  commentId: string;
  replyId: string;
  createdAt: string;
  userId: string;
  userName: string;
  to: string;
  contents: string;
  isCreater: boolean;
  indentLevel: number;
}

export default replyType;