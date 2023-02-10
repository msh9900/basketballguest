import withGetServerSideProps from 'hocs/withServersideProps';
import CertID from "components/user/CertID";

const lostID = () => {
  return <CertID />;
};

export default lostID;
export const getServerSideProps = withGetServerSideProps(async (context:any) => {
	return {
		props: {},
	};
});