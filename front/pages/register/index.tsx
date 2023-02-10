import withGetServerSideProps from 'hocs/withServersideProps';
import React from "react";
import RegisterForm from "../../components/user/RegisterForm";
export default function Register() {
  return (
    <>
      <RegisterForm />
    </>
  );
}
export const getServerSideProps = withGetServerSideProps(async (context:any) => {
	return {
		props: {},
	};
});