import { createChatBotMessage } from "react-chatbot-kit";
import CustomUserAvartar from "./CustomUserAvartar";
import DogPicture from "./DogPicture";
import FirstMessage from "./FirstMessage";
import SiteGuidance from "./SiteGuidance";

const config = {
  botName: "BPT",
  initialMessages: [
    createChatBotMessage(`안녕하세요 BPT입니다. 무엇을 도와드릴까요?`, {
      widget: "firstMessage",
    }),
    createChatBotMessage("1.고객문의 2.BPT소개", {
      delay: 1000,
    }),
  ],
  widgets: [
    {
      widgetName: "dogPicture",
      widgetFunc: (props: any) => <DogPicture {...props} />,
      props: "",
      mapStateToProps: [],
    },
    {
      widgetName: "firstMessage",
      widgetFunc: (props: any) => <FirstMessage {...props} />,
      props: "",
      mapStateToProps: [],
    },
    {
      widgetName: "siteGuidance",
      widgetFunc: (props: any) => <SiteGuidance {...props} />,
      props: "",
      mapStateToProps: [],
    },
  ],
  customComponents: {
    userAvatar: (props: any) => <CustomUserAvartar {...props} />,
  },
};

export default config;
