import withGetServerSideProps from 'hocs/withServersideProps';
import Comp from 'components/user/findUserInfo'

const findUserId = () => {
  return (
    <Comp/>
  );
};

export default findUserId;
export const getServerSideProps = withGetServerSideProps(async (context:any) => {
	return {
		props: {},
	};
});