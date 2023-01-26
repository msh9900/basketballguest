const getReview = async (pId:string) => {
  const response = await fetch(`http://localhost:4000/rental/review?pid=${pId}`);
  // const dataArray = await ;
  return response.json();
}
 
export default getReview;