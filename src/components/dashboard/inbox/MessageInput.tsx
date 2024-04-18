import { EmojiIcon, SendIcon } from "../../tools/svg/DashboardInboxLogos";

const MessageInput = () => {
  return (
    <div className="sticky bottom-0 border-t border-stroke bg-white py-5 px-6 dark:border-strokedark dark:bg-boxdark">
      <form className="flex items-center gap-2 justify-between space-x-4.5">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Type something here..."
            className="h-14 w-full rounded-md border border-gray-200 bg-[#f7f9fc] pl-5 pr-19  placeholder-body outline-none focus:ring-0 focus:border-grBlue-dark dark:border-strokedark"
          />
          <div className="absolute right-5 top-1/2 inline-flex -translate-y-1/2 items-center justify-end space-x-4">
            {/* <button className="hover:text-primary">{ClipIcon}</button> */}
            <button className="hover:text-[#3C50E0]">{EmojiIcon}</button>
          </div>
        </div>
        <button className="flex h-13 w-full max-w-[3.25rem] items-center justify-center border rounded-md bg-white text-white hover:bg-opacity-90">
          {SendIcon}
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
