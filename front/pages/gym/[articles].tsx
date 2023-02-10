import DetailArticles from "components/gym/detailArticles/DetailArticles";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from 'next/head'

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
  
  const serviceTitle = 'BPT'
	const pageTitle = '상세 정보'
	const pageDesc = '게시글 상세 정보와 리뷰 댓글이 달리는 페이지입니다.'
  const pageUrl = 'www.BPT.com' // 배포할 사이트 경로 

  // const ogImageSrc =	'https://res.cloudinary.com/dtq075vja/image/upload/v1669879703/9gle/ogImage_uki29n.png';
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='keywords' content='농구, 게스트모집, 체육관대여' />
        <meta name='description' content={pageDesc} />

        <meta name='application-name' content={serviceTitle} />
        <meta name='msapplication-tooltip' content={serviceTitle} />
        <meta name='msapplication-starturl' content={pageUrl} />

        {/* Open Graph (Naver & Kakao */}
        <meta property='og:title' content={pageTitle} />
        <meta property='og:site_name' content={serviceTitle} />
        <meta property='og:description' content={pageDesc} />
        <meta property='og:url' content={pageUrl} />
        <meta property='og:locale' content='en_US' />
        <meta property='og:locale' content='ko_KR' />
        <meta property='og:type' content='website' />
        {/* <meta property='og:image' content={ogImageSrc} /> */}
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='600' />

        {/* OP: Twitter */}
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:title' content={pageTitle} />
        <meta name='twitter:description' content={pageDesc} />
        <meta name='twitter:url' content={pageUrl} />
        {/* <meta name='twitter:image' content={ogImageSrc} /> */}
        <title>{serviceTitle} : {pageTitle}</title>
      </Head>

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
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/rental/article?pid=${pId}`
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