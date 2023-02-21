import withGetServerSideProps from "hocs/withServersideProps";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";

import config from "chatbot/config";
import MessageParser from "chatbot/MessageParser";
import ActionProvider from "chatbot/ActionProvider";
import { useSelector } from "react-redux";
import router from "next/router";

const Chatbot = dynamic(() => import("react-chatbot-kit"), {
  ssr: false,
});
export default function Service() {
  const isLogin = useSelector((state: any) => state.login?.isLogin);
  useEffect(() => {
    if (!isLogin) {
      router.replace("/login");
    }
  }, []);

  return (
    <div>
      <Chatbot
        config={config}
        headerText="BPT Chat Bot"
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
  );
}
export const getServerSideProps = withGetServerSideProps(
  async (context: any) => {
    return {
      props: {},
    };
  }
);
