import DetailArticles from "components/gym/detailArticles/DetailArticles";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
// import HEAD from 'next/headers'

import gymArticleDataType from "util/types/gymArticleDataType";
// import gymArticleDataBase from "util/types/gymArticleDataBase";

interface Props{
  gymData:any, 
  articleUserId:any, 
}
const articles = (props:Props) => {

  const [gymInfo, setGymInfo] = useState<gymArticleDataType>(props.gymData);
  const [articleUserId, setArticleUserId] = useState('')
  const [isFetchingArticles, setIsFetchingArticles] = useState(true);

  return (
    <>
      {/* <HEAD></HEAD> */}
      <DetailArticles 
        gymInfo={gymInfo}
        setGymInfo={setGymInfo}
        articleUserId={articleUserId}
        setArticleUserId={setArticleUserId}
        isFetchingArticles={isFetchingArticles}
        setIsFetchingArticles={setIsFetchingArticles}
      />
    </>
  );
};

export default articles;

export async function getServerSideProps(context:any) {

  // const [gymInfo, setGymInfo] = useState<gymArticleDataType>(gymArticleDataBase);
  // const [articleUserId, setArticleUserId] = useState('')
  // const [isFetchingArticles, setIsFetchingArticles] = useState(true);
  
  const pId = context.query.articles
  const url = `http://localhost:4000/rental/article?pid=${pId}`
  const response = await fetch(url);
  const data = await response.json();
  const bf = data.openingPeriod[0].slice(0,10)
  const af = data.openingPeriod[1].slice(0,10)
  data.openingPeriod = [bf, af]

  // await setArticleUserId(data.articleUserId)
  // await setGymInfo(data);
  // await setIsFetchingArticles(false);

  return {
    props: {
      gymData : data,
      articleUserId : data.articleUserId
    }, 
  }
}