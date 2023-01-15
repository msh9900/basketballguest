import DetailArticles from "../../components/rental/detailArticles/DetailArticles";
// Seo
import withGetServerSideProps from 'hocs/withServersideProps';
import Loading from 'components/common/loadingModule/Loading'

const articles = () => {
  return (
    <>
      <DetailArticles />
    </>
  );
};

export default articles;
export const getServerSideProps = withGetServerSideProps(async (context:any) => {
	return {
		props: {},
	};
});
