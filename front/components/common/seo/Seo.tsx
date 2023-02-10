import Head from 'next/head';
// import Script from 'next/script';
import getTitleFromPath from './getTitleFromPath';
import getDescFromPath from './getDescFromPath';

interface Props {
  pagePath:string
}

const Seo = (props:Props) => {
  const pagePath = props.pagePath
  const serviceTitle = 'BPT'
	const pageTitle = getTitleFromPath(pagePath);
	const pageDesc = getDescFromPath(pagePath);
  const pageUrl = 'www.bpt.com' // 배포할 사이트 경로 
  // const ogImageSrc =	'https://res.cloudinary.com/dtq075vja/image/upload/v1669879703/9gle/ogImage_uki29n.png';

	return (
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
	);
};

export default Seo;
