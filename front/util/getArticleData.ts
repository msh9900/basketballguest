const getArticleData = async (
  pId:string,
  setIsFetchingArticles:React.Dispatch<React.SetStateAction<boolean>>,
  setGymInfo:any
  ) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/rental/article?pid=${pId}`
  const response = await fetch(url);
  const data = await response.json();
  const bf = data.openingPeriod[0].slice(0,10)
  const af = data.openingPeriod[1].slice(0,10)
  data.openingPeriod = [bf, af]
  setGymInfo(data)
  setIsFetchingArticles(false)
}
export default getArticleData
 


