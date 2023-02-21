import React, { useState } from "react";

const MessageParser = ({ children, actions }: any) => {
  const [inquiry, setInquiry] = useState(false);
  const parse = (message: any) => {
    if (inquiry) {
      //고객문의 데이터전송 하고 나서 메시지 액션 작성
      actions.handleEndInquiry();
      setInquiry(false);
    } else {
      if (message.includes("hello")) {
        actions.handleHello();
      }
      if (message.includes("dog")) {
        actions.handleDog();
      }
      if (message.includes("BPT소개")) {
        actions.handleSiteGuidance();
      }
      if (message.includes("고객문의")) {
        actions.handleStartInquiry();
        setInquiry(true);
      }
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;
