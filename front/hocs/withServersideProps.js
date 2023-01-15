// getserversideprops (쿼리가 제대로 맞을때) 쓰이는 axios 함수

const path = {
  HOME: "/",
  GYM: "/gym",
  ERROR404: `/404`,
};
const getTitleByPath = {
  [path.HOME]: "홈",
  [path.GYM]: "대관",
  [path.ERROR404]: "404 에러",
};
const getDescByPath = {
  [path.HOME]: "메인 화면입니다.",
  [path.GYM]: "체육관 대관/홍보를 위한 페이지입니다",
  [path.ERROR404]: "404 에러 페이지입니다.",
};

const withGetServerSideProps = (getServerSideProps) => {
  return async (context) => {
    const pagePath = context.resolvedUrl;
    const detailQueryId = context.query.id;

    const pageTitle = pagePath;
    const pageDesc = pagePath;
    const pageData = pagePath;

    return {
      props: {
        pagePath,
        pageTitle,
        pageDesc,
        pageData,
      },
    };
  };
};

export default withGetServerSideProps;
