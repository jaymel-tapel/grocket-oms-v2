import { useNavigate } from "@tanstack/react-router";

type Props = {
  ref: (node?: Element | null | undefined) => void;
};
const ChatList = ({ ref }: Props) => {
  const navigate = useNavigate();

  const handleSelectChat = (chatId: number) => {
    navigate({ to: "/inbox/$chatId", params: { chatId } });
  };

  return (
    <div className="max-h-full space-y-2.5 overflow-auto">
      <div
        onClick={() => handleSelectChat(1)}
        className="flex cursor-pointer items-center rounded py-2 px-4 hover:bg-[#f7f9fc]"
      >
        <div className="relative mr-3.5 h-11 w-auto aspect-square">
          <img
            alt="profile"
            className="h-auto w-full object-cover object-center rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          />
          <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-gray-2 bg-green-500"></span>
        </div>
        <div className="w-screen">
          <h5 className="text-sm font-medium text-black">Henry Dholi</h5>
          <p className="text-sm line-clamp-2">
            I came across your profile and asdasdasdasdasd...
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
