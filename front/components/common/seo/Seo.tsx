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
	
  // content for metatags
  let seoPath; // 배포할 사이트 경로 ex) www.bpt.com
	const seoTitle = getTitleFromPath(pagePath);
	const seoDesc = getDescFromPath(pagePath);
	let appName = serviceTitle;
  // const ogImageSrc =	'https://res.cloudinary.com/dtq075vja/image/upload/v1669879703/9gle/ogImage_uki29n.png';

	return (
		<Head>
			<meta name='viewport' content='width=device-width, initial-scale=1.0' />
			<meta name='keywords' content='농구, 게스트모집, 체육관대여' />
			<meta name='description' content={seoDesc} />

			<meta name='application-name' content={appName} />
			<meta name='msapplication-tooltip' content={serviceTitle} />
			<meta name='msapplication-starturl' content={seoPath} />

			{/* Open Graph (Naver & Kakao */}
			<meta property='og:title' content={seoTitle} />
			<meta property='og:site_name' content={serviceTitle} />
			<meta property='og:description' content={seoDesc} />
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

			<title> {seoTitle}</title>
		</Head>
	);
};

export default Seo;
