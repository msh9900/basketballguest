export interface PropsInterface {
  data: PropDataInterface[];
  dataLength: number;
}
export interface PropDataInterface {
  comment: Array<CommentInterface>;
  content: string;
  contentIdx: string;
  date: string;
  id: string;
  imgSrc: string[];
  title: string;
  userImg: string;
  _id: string;
}
export interface CommentInterface {
  commentIdx: string;
  content: string;
  date: string;
  id: string;
  replys: Array<ReplysInterface>;
  userImg: string;
}
export interface ReplysInterface {
  content: string;
  date: string;
  userId: string;
  replyIdx: string;
  userImg: string;
}

export interface CardPropInterface {
  data: PropDataInterface;
  setIsMounted: (a: boolean) => void;
  isMounted: boolean;
}

export interface MainCommentInterface {
  data: CommentInterface;
  setGetDataClick: (a: boolean) => void;
}
export interface SubCommentInterface {
  commentIdx: string;
  data: ReplysInterface;
  setGetDataClick: (a: boolean) => void;
}
