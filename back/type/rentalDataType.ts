//routes
export interface rentalArticleFileDataType {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}
//controllers
export interface rentalFilterDataType {
  activeAreas: string[];
  MinPrice: number;
  MaxPrice: number;
  MinPeriod: Date;
  MaxPeriod: Date;
  keyWord: string;
}

export interface rentalOrderDataType {
  isPriceOrderOn: boolean;
  isAsc: boolean;
  isDistanceOrderOn: boolean;
  lat: string;
  lng: string;
}

export interface rentalArticeDataType {
  articleId: string;
  articleUserId: string;
  userId: string;
  userName: string;
  title: string;
  content: string;
  contact: string;
  createdAt: string;
  address: string[];
  offsetX: number;
  offsetY: number;
  areaTag: string;
  price: number;
  openingHours: string;
  openingPeriod: Date[];
  openingDays: string[];
  gymImg: string[];
}

export interface rentalReviewDataType {
  articleId: string;
  reviewId: string;
  createdAt: string;
  userId: string;
  userName: string;
  title: string;
  content: string;
  rating: string;
}
export interface rentalCommentDataType {
  articleId: string;
  commentId: string;
  userId: string;
  userName: string;
  createdAt: string;
  contents: string;
  replys: [];
}
export interface rentalReplyDataType {
  articleId: string;
  commentId: string;
  replyId: string;
  indentLevel: number;
  to: string;
  userId: string;
  userName: string;
  createdAt: string;
  contents: string;
}

export interface rentalReplyUpdateDataType {
  replyId: string;
  commentId: string;
  createdAt: string;
  contents: string;
}
export interface rentalReplyDeleteDataType {
  replyId: string;
  commentId: string;
}
