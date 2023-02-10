import withGetServerSideProps from 'hocs/withServersideProps';
import Comp from '../../components/user/findUserInfo';

const findUserPw = () => {
  return (
    <Comp/>
  );
};

export default findUserPw;
export const getServerSideProps = withGetServerSideProps(async (context:any) => {
	return {
		props: {},
	};
});