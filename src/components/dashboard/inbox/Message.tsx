import React from "react";
import { Message as MessageType } from "../../../services/queries/chatQueriesType";

type Props = {
  message: MessageType;
};

const Message: React.FC<Props> = ({ message }) => {
  const isFromMe = message.senderId === 2;

  const senderName = isFromMe ? "Me" : "You";
  const messageContainerStyle = isFromMe
    ? "ml-auto rounded-br-none bg-chatBlue"
    : "rounded-tl-none bg-chatGray";
  const messageStyle = isFromMe ? "text-white" : "text-black";

  return (
    <div
      className={`max-w-[31.25rem] w-fit ${
        isFromMe ? "ml-auto text-right" : ""
      }`}
    >
      <p className="mb-2.5 text-sm font-medium">{senderName}</p>
      <div
        className={`py-3 px-5 mb-2.5 border rounded-2xl ${messageContainerStyle}`}
      >
        <p className={messageStyle}>{message.content}</p>
      </div>
      <p className="text-xs">{message.updatedAt}</p>
    </div>
  );
};

export default Message;
