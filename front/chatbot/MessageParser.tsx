import React, { useState } from "react";
import { useSelector } from "react-redux";

const MessageParser = ({ children, actions }: any) => {
  const [inquiry, setInquiry] = useState(false);
  const stateId = useSelector((state: any) => state.login.userId);
  const parse = async (message: string) => {
    if (inquiry) {
      const data = {
        userId: stateId,
        message: message,
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/service/chat`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      const res = await response.json();
      console.log(res);
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
