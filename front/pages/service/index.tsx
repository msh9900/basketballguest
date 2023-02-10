import withGetServerSideProps from 'hocs/withServersideProps';
import React from "react";

export default function Service() {
  return <div>service</div>;
}
export const getServerSideProps = withGetServerSideProps(async (context:any) => {
	return {
		props: {},
	};
});