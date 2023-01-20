interface addressType{
  "category": string,
  "val": string
}
interface userInfoType{
  "userId": string,
  "userName": string,
  "email": string
}
interface openingDaysType{
  name:string,
  open:boolean,
}
interface gymArticleDataType{
  "id": string,
  "title": string,
  "content": string,
  "contact": string,
  "address": addressType[],
  "price":string,
  "openingHours": string[],
  "openingPeriod": string[],
  "openingDays": openingDaysType[],
  "userInfo": userInfoType,
}

export default gymArticleDataType;