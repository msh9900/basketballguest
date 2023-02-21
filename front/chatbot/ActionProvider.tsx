import React from "react";

const ActionProvider = ({ createChatBotMessage, setState, children }: any) => {
  const handleHello = () => {
    const botMessage = createChatBotMessage("Hello. Nice to meet you.");

    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleDog = () => {
    const botMessage = createChatBotMessage(
      "Here's a nice dog picture for you!",
      {
        widget: "dogPicture",
      }
    );
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const handleStartInquiry = () => {
    const botMessage = createChatBotMessage(
      "문의하실 내용을 입력해주세요.",
      {}
    );
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const handleEndInquiry = () => {
    const botMessage = createChatBotMessage(
      "내용이 정상적으로 등록 되었습니다",
      {}
    );
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleSiteGuidance = () => {
    const botMessage = createChatBotMessage(
      "BPT는 다음과 같이 구성되어 있습니다.",
      {
        widget: "siteGuidance",
      }
    );
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  // Put the handleHello and handleDog function in the actions object to pass to the MessageParser
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            handleDog,
            handleSiteGuidance,
            handleStartInquiry,
            handleEndInquiry,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
