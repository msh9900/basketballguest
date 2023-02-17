export interface guestDataType {
  contentIdx: string;
  id: string;
  title: string;
  userImg: string;
  content: string;
  date: Date;
  imgSrc: string[];
  comment: [];
}

export interface guestCommentType {
  contentIdx: string;
  id: string;
  userImg: string;
  content: string;
  date: string;
  commentIdx: string;
  replys: [];
}

export interface guestReplyType {
  replyIdx: string;
  content: string;
  date: string;
  userId: string;
  userImg: string;
}
export interface guestUpdateReplyType {
  commentIdx: string;
  replyIdx: string;
  content: string;
}
export interface guestDBCommentType {
  commentIdx: string;
  id: string;
  content: string;
  date: string;
  replys: [];
  userImg: string;
}

export interface guestDBReplyType {
  replyIdx: string;
  content: string;
  date: string;
  userId: string;
  userImg: string;
}
