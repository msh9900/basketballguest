import withGetServerSideProps from 'hocs/withServersideProps';
import CertPW from "components/user/CertPW";

const lostPW = () => {
  return <CertPW />;
};

export default lostPW;
export const getServerSideProps = withGetServerSideProps(async (context:any) => {
	return {
		props: {},
	};
});