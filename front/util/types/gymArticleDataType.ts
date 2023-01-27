interface addressType {
  category: string;
  val: string;
}
interface openingDaysType {
  name: string;
  open: boolean;
}
interface gymArticleDataType {
  articleId: string;
  userId:string;
  userName:string;
  title: string;
  content: string;
  contact: string;
  price: string;
  openingHours: string[];
  openingPeriod: string[];
  openingDays: openingDaysType[];
  address: addressType[];
}

export default gymArticleDataType;
