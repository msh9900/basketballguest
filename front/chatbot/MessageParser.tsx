import React from "react";

const MessageParser = ({ children, actions }: any) => {
  const parse = (message: any) => {
    console.log(message);
    if (message.includes("hello")) {
      actions.handleHello();
    }

    if (message.includes("dog")) {
      actions.handleDog();
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
