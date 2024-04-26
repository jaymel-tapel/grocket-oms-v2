import { Outlet } from "@tanstack/react-router";
import { SmallMagnifyingIcon } from "../../tools/svg/DashboardInboxLogos";
import ChatList, { ChatListRef } from "./ChatList";
import { useEffect, useRef } from "react";
import { useGetAllConversations } from "../../../services/queries/chatQueries";

const DashboardInbox: React.FC = () => {
  const { data, fetchNextPage } = useGetAllConversations();
  const chatListRef = useRef<ChatListRef>(null);

  console.log(data);

  useEffect(() => {
    if (chatListRef.current?.inView) {
      fetchNextPage();
    }
    //eslint-disable-next-line
  }, [chatListRef]);

  return (
    <div className="h-[calc(100vh-186px)] overflow-hidden sm:h-[calc(100vh-128px)]">
      <div className="h-full rounded-sm border border-stroke bg-white border-solid dark:border-strokedark dark:bg-boxdark xl:flex">
        <div className="hidden h-full flex-col xl:flex xl:w-1/4">
          <div className="sticky flex justify-between border-b border-stroke px-6 py-2">
            <span className="text-lg py-4 font-medium text-black  2xl:text-xl">
              Clients
            </span>
            <span className="rounded-md border bg-chatGray px-2 mt-4 h-6 mb- text-base font-medium text-black ">
              1
            </span>
          </div>
          <div className="flex max-h-full flex-col overflow-auto p-5">
            <form className="sticky mb-7">
              <input
                type="text"
                className="w-full rounded border border-stroke border-gray-200 bg-[#f7f9fc] py-2.5 pl-5 pr-10 text-sm outline-none focus:ring-0 focus:border-grBlue-dark dark:border-strokedark dark:bg-boxdark-2"
                placeholder="Search..."
              />
              <button className="absolute top-1/2 right-4 -translate-y-1/2">
                {SmallMagnifyingIcon}
              </button>
            </form>
            <ChatList parentRef={chatListRef} />
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardInbox;
