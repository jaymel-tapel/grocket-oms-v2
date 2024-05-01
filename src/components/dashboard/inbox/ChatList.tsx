import { useNavigate } from "@tanstack/react-router";
import { Ref, useImperativeHandle } from "react";
import { useInView } from "react-intersection-observer";
import { ConversationNode } from "../../../services/queries/chatQueriesType";

export type ChatListRef = {
  inView: boolean;
};

type Props = {
  parentRef: Ref<ChatListRef>;
  conversations: ConversationNode[];
};

const ChatList = ({ parentRef, conversations }: Props) => {
  const navigate = useNavigate();
  const { ref, inView } = useInView();

  useImperativeHandle(parentRef, () => ({
    inView,
  }));

  const handleSelectChat = (chatId: number) => {
    navigate({ to: "/inbox/$chatId", params: { chatId } });
  };

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
            onClick={() => handleSelectChat(item.id)}
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
