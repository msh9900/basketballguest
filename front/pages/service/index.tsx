import withGetServerSideProps from "hocs/withServersideProps";
import React from "react";
import dynamic from "next/dynamic";

import config from "chatbot/config";
import MessageParser from "chatbot/MessageParser";
import ActionProvider from "chatbot/ActionProvider";

const Chatbot = dynamic(() => import("react-chatbot-kit"), {
  ssr: false,
});
export default function Service() {
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
