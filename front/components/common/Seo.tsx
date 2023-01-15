import Head from 'next/head';
import Script from 'next/script';

interface obj {
  pagePath:string
  pageTitle:string
  pageDesc:string
}

const Seo = ({ pagePath, pageTitle, pageDesc }:obj) => {

  console.log('pagePath : ', pagePath);

	let seoPath; // 배포할 사이트 경로 ex) www.bpt.com
	let seoTitle;
	let seoDesc;
	let appName;
  const prjTitle = 'BPT'
  // const ogImageSrc =	'https://res.cloudinary.com/dtq075vja/image/upload/v1669879703/9gle/ogImage_uki29n.png';
  
  // 페이지 경로에 따른 로직 구현 필요 (아래는 예시...)
	// if (pagePath === undefined && pageTitle === undefined && pageDesc === undefined) {
	// 	seoPath = process.env.NEXT_PUBLIC_OGURL_URL;
	// 	seoTitle = `Error`;
	// 	seoDesc = '에러 페이지';
	// 	appName = prjTitle
	// } else {
	// 	seoPath = process.env.NEXT_PUBLIC_OGURL_URL + pagePath;
	// 	seoTitle = pageTitle;
	// 	seoDesc = pageDesc;
	// 	appName = `${prjTitle} ${pageTitle}`;
	// }
  
  seoPath = process.env.NEXT_PUBLIC_OGURL_URL + pagePath;
  seoTitle = pageTitle;
  seoDesc = pageDesc;
  appName = `${prjTitle} ${pageTitle}`;

	return (
		<Head>
			<meta name='viewport' content='width=device-width, initial-scale=1.0' />
			<meta name='keywords' content='농구, 게스트모집, 체육관대여' />
			<meta name='description' content={seoDesc} />

			<meta name='application-name' content={appName} />
			<meta name='msapplication-tooltip' content={prjTitle} />
			<meta name='msapplication-starturl' content={seoPath} />

			{/* Open Graph (Naver & Kakao*/}
			<meta property='og:title' content={seoTitle} />
			<meta property='og:site_name' content={prjTitle} />
			<meta property='og:description' content={pageDesc} />
			<meta property='og:url' content={seoPath} />
			<meta property='og:locale' content='en_US' />
			<meta property='og:locale' content='ko_KR' />
			<meta property='og:type' content='website' />
			{/* <meta property='og:image' content={ogImageSrc} /> */}
			<meta property='og:image:width' content='1200' />
			<meta property='og:image:height' content='600' />

			{/* OP: Twitter */}
			<meta name='twitter:card' content='summary' />
			<meta name='twitter:title' content={seoTitle} />
			<meta name='twitter:description' content={seoDesc} />
			<meta name='twitter:url' content={seoPath} />
			{/* <meta name='twitter:image' content={ogImageSrc} /> */}

			<title> {prjTitle}  {seoTitle}</title>
		</Head>
	);
};

export default Seo;
