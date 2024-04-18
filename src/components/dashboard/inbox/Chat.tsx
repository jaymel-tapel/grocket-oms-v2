import { useEffect, useRef } from "react";
import Message from "./Message";
import MessageInput from "./MessageInput";

const messages = [
  {
    id: 1,
    updatedAt: "01:55",
    content: "I want to make an appointment tomorrow from 2:00 to 5:00pm?",
    senderId: 1,
    sender: {
      name: "Andrei Thomas",
    },
  },
  {
    id: 2,
    updatedAt: "01:55",
    content: "Hello, Thomas! I will check the schedule and inform you",
    senderId: 2,
    sender: {
      name: "Test",
    },
  },
  {
    id: 3,
    updatedAt: "01:55",
    content: "Ok, Thanks for your reply.",
    senderId: 1,
    sender: {
      name: "Andrei Thomas",
    },
  },
  {
    id: 4,
    updatedAt: "01:55",
    content: "You are welcome!",
    senderId: 2,
    sender: {
      name: "Test",
    },
  },
];

const Chat = () => {
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView();
  }, []);

  return (
    <div className="flex h-full flex-col border-l border-stroke dark:border-strokedark xl:w-3/4">
      <div className="sticky flex items-center justify-between h-fit border-b border-stroke px-6 py-4.5 dark:border-strokedark">
        <div className="flex gap-auto items-center px-4 py-4">
          <div className="mr-4.5 h-13 w-full max-w-[3.25rem] overflow-hidden rounded-full">
            <img
              alt="avatar"
              className="h-auto w-auto object-cover object-center"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            />
          </div>
          <div className="w-full ml-8">
            <h5 className="font-medium text-black">Henry Dholi</h5>
            <p className="text-sm">Reply to message</p>
          </div>
        </div>
      </div>
      <div className="no-scrollbar max-h-full space-y-3.5 overflow-auto px-6 py-7.5">
        {messages.map((message) => (
          <Message message={message} key={message.id} />
        ))}
        <div ref={lastMessageRef} />
      </div>
      <MessageInput />
    </div>
  );
};

export default Chat;
