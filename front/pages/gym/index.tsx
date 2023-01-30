import Gym from '../../components/gym/Gym'
import withGetServerSideProps from 'hocs/withServersideProps';

export default function Index() {
  return (
    <Gym/>
  ); 
}

export const getServerSideProps = withGetServerSideProps(async (context:any) => {
	return {
		props: {},
	};
});

// export async function getServerSideProps(context:any) {
//   return {
//     props: {}, // will be passed to the page component as props
//   }
// }