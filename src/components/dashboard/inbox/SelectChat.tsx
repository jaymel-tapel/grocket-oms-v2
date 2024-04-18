import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";

const SelectChat = () => {
  return (
    <div className="flex h-full flex-col border-l border-stroke dark:border-strokedark xl:w-3/4">
      <div className="flex flex-col h-full justify-center items-center gap-4">
        <ChatBubbleOvalLeftEllipsisIcon className="h-12 w-12" />
        <span className="font-bold text-xl">No chat selected</span>
      </div>
    </div>
  );
};

export default SelectChat;
