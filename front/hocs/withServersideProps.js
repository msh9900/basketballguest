// getserversideprops (쿼리가 제대로 맞을때) 쓰이는 함수

const withGetServerSideProps = (getServerSideProps) => {
  return async (context) => {
    const pagePath = context.resolvedUrl;
    // const detailQueryId = context.query.id;

    return {
      props: {
        pagePath,
      },
    };
  };
};

export default withGetServerSideProps;
