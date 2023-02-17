import Head from "next/head";

const GuestHead = () => {
  const serviceTitle = "BPT";
  const pageTitle = "게스트 모집";
  const pageDesc = "게스트 모집 페이지";
  const pageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}`;
  const ogImageSrc = `/images/basketball1.jpg`;

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="keywords" content="농구, 게스트모집, 체육관대여" />
      <meta name="description" content={pageDesc} />
      <link
        rel="shortcut icon"
        type="image/x-icon"
        href="/images/logos/favicon.ico"
      />

      <meta name="application-name" content={serviceTitle} />
      <meta name="msapplication-tooltip" content={serviceTitle} />
      <meta name="msapplication-starturl" content={pageUrl} />

      {/* Open Graph (Naver & Kakao */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:site_name" content={serviceTitle} />
      <meta property="og:description" content={pageDesc} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogImageSrc} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="600" />

      {/* OP: Twitter */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDesc} />
      <meta name="twitter:url" content={pageUrl} />
      <meta name="twitter:image" content={ogImageSrc} />
      <title>
        {serviceTitle} : {pageTitle}
      </title>
    </Head>
  );
};
export default GuestHead;
