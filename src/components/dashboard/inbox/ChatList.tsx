import { useNavigate } from "@tanstack/react-router";
import { Ref, useEffect, useImperativeHandle } from "react";
import { useInView } from "react-intersection-observer";
import { ConversationNode } from "../../../services/queries/chatQueriesType";
import { useChatContext } from "./context/ChatContext";

export type ChatListRef = {
  inView: boolean;
};

type Props = {
  parentRef: Ref<ChatListRef>;
  conversations: ConversationNode[];
  chatId?: number;
};

const ChatList = ({ parentRef, conversations, chatId }: Props) => {
  const navigate = useNavigate();
  const { ref, inView } = useInView();
  const { selectedConversation, setSelectedConversation } = useChatContext();

  useImperativeHandle(parentRef, () => ({
    inView,
  }));

  const handleSelectChat = (chat: ConversationNode) => {
    setSelectedConversation(chat);
    navigate({ to: "/inbox/$chatId", params: { chatId: chat.id } });
  };

  useEffect(() => {
    if (chatId && !selectedConversation) {
      const foundChat = conversations.find((chat) => chat.id === chatId);
      if (!foundChat) return;

      setSelectedConversation(foundChat);
    }
  }, [conversations, selectedConversation, setSelectedConversation, chatId]);

  return (
    <div className="max-h-full space-y-2.5 overflow-auto">
      {conversations.map((item) => {
        const receiver = item.participants.find(
          (participant) => "clientId" in participant
        );

        if (!receiver) return null;

        return (
          <div
            key={item.id}
            onClick={() => handleSelectChat(item)}
            className="flex cursor-pointer items-center rounded p-2 hover:bg-[#f7f9fc]"
          >
            <div className="relative mr-3.5 h-11 w-auto aspect-square">
              <div className="h-full w-full flex items-center justify-center rounded-full capitalize bg-gray-200 text-gray-600 font-semibold">
                {receiver.client.name[0]}
              </div>
              <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-gray-2 bg-green-500"></span>
            </div>
            <div className="w-screen">
              <h5 className="text-sm font-medium text-black">
                {receiver.client.name}
              </h5>
              <p className="text-sm line-clamp-2">
                {"content" in item.messages[0] ? item.messages[0].content : ""}
              </p>
            </div>
          </div>
        );
      })}

      <div ref={ref} />
    </div>
  );
};

export default ChatList;
