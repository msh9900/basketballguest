import Posting from 'components/gym/posting/GymRentalPost'
// Seo
import withGetServerSideProps from 'hocs/withServersideProps';
import Loading from 'components/common/loadingModule/Loading'

const post = () => {
  return (
    <>
      <Posting/>
    </>
  )
}

export default post
export const getServerSideProps = withGetServerSideProps(async (context:any) => {
	return {
		props: {},
	};
});

