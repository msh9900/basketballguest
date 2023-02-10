import withGetServerSideProps from 'hocs/withServersideProps';
export default function IntroducePage() {
  return <div>IntroducePage</div>;
}
export const getServerSideProps = withGetServerSideProps(async (context:any) => {
	return {
		props: {},
	};
});