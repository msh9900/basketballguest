import Rental from '../../components/rental/Rental'
// Seo
import withGetServerSideProps from 'hocs/withServersideProps';

export default function Index() {
  return (
    <Rental/>
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