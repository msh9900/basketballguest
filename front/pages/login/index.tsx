import withGetServerSideProps from 'hocs/withServersideProps';
import LoginForm from "../../components/user/LoginForm";

export default function LoginPage() {
  return (
    <>
      <LoginForm />
    </>
  );
}
export const getServerSideProps = withGetServerSideProps(async (context:any) => {
	return {
		props: {},
	};
});