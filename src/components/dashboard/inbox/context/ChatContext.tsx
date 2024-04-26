import { createContext, useContext, useState } from "react";
import {
  ConversationNode,
  Message,
} from "../../../../services/queries/chatQueriesType";

// const API_URL = import.meta.env.VITE_API_URL;

export type ChatContext = {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  selectedConversation: ConversationNode | null;
  setSelectedConversation: React.Dispatch<
    React.SetStateAction<ConversationNode | null>
  >;
};

export const ChatContext = createContext<ChatContext>({
  selectedConversation: null,
  messages: [],
  setSelectedConversation: () => {},
  setMessages: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useChatContext = () => useContext(ChatContext);

export const ChatContextProvider = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedConversation, setSelectedConversation] =
    useState<ConversationNode | null>(null);

  return (
    <ChatContext.Provider
      value={{
        messages,
        setMessages,
        selectedConversation,
        setSelectedConversation,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
