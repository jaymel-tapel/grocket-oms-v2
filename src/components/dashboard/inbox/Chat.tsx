import { useEffect, useRef } from "react";
import Message from "./Message";
import MessageInput from "./MessageInput";
import useGetMessages from "./hooks/useGetMessages";
import { useInView } from "react-intersection-observer";
import { useChatContext } from "./context/ChatContext";

const Chat = () => {
  const { ref, inView } = useInView();
  const { selectedConversation } = useChatContext();

  const receiver = selectedConversation?.participants.find(
    (participant) => "clientId" in participant
  );

  const { messages, fetchNextPage } = useGetMessages();
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
    //eslint-disable-next-line
  }, [inView]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView();
  }, []);

  return (
    <div className="flex h-full flex-col border-l border-stroke dark:border-strokedark xl:w-3/4">
      <div className="sticky flex items-center justify-between h-fit border-b border-stroke px-6 py-4.5 dark:border-strokedark">
        <div className="flex gap-4.5 items-center px-4 py-4 basis-full">
          <div>
            {/* <img
              alt="avatar"
              className="h-auto w-auto object-cover object-center"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            /> */}
            <div className="h-12 w-12 flex items-center justify-center rounded-full capitalize bg-gray-200 text-gray-600 text-xl font-semibold">
              {receiver?.client.name[0] ?? ""}
            </div>
          </div>
          <div className="basis-full ml-8">
            <h5 className="font-medium text-black">
              {receiver?.client.name ?? ""}
            </h5>
            <p className="text-sm">Reply to message</p>
          </div>
        </div>
      </div>
      <div className="no-scrollbar flex flex-col justify-end h-full space-y-3.5 overflow-auto px-6 py-7.5">
        <div ref={ref} />
        {messages.map((message) => {
          const sentByReceiver = message.senderId === receiver?.id ?? 0;

          return (
            <Message
              message={message}
              key={message.id}
              isFromMe={!sentByReceiver}
            />
          );
        })}
        <div ref={lastMessageRef} />
      </div>
      <MessageInput />
    </div>
  );
};

export default Chat;
