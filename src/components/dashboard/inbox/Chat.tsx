import {
  ClipIcon,
  EmojiIcon,
  SendIcon,
} from "../../tools/svg/DashboardInboxLogos";

const Chat = () => {
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
        {/* <div>
              <div className="relative">
                <button>{ThreeDotIcon}</button>
              </div>
            </div> */}
      </div>
      <div className="no-scrollbar max-h-full space-y-3.5 overflow-auto px-6 py-7.5">
        <div className="max-w-[31.25rem]">
          <p className="mb-2.5 text-sm font-medium">Andri Thomas</p>
          <div className="mb-2.5 border rounded-tl-none rounded-2xl bg-chatGray py-3 px-5">
            <p className="text-black">
              I want to make an appointment tomorrow from 2:00 to 5:00pm?
            </p>
          </div>
          <p className="text-xs">1:55pm</p>
        </div>
        <div className="ml-auto max-w-[31.25rem]">
          <div className="mb-2.5 ml-auto max-w-fit rounded-2xl border rounded-br-none bg-chatBlue py-3 px-5">
            <p className="text-white ">
              Hello, Thomas! I will check the schedule and inform you
            </p>
          </div>
          <p className="text-right text-xs">1:55pm</p>
        </div>
        <div className="max-w-[31.25rem]">
          <p className="mb-2.5 text-sm font-medium">Andri Thomas</p>
          <div className="mb-2.5 border rounded-tl-none rounded-2xl bg-chatGray py-3 px-5">
            <p className="text-black">Ok, Thanks for your reply.</p>
          </div>
          <p className="text-xs">1:55pm</p>
        </div>
        <div className="ml-auto max-w-[31.25rem]">
          <p className="mb-2.5 ml-auto rounded-2xl border rounded-br-none bg-chatBlue py-3 px-5">
            <p className="text-white">You are welcome!</p>
          </p>
          <p className="text-right text-xs">1:55pm</p>
        </div>
        <div className="max-w-[31.25rem]">
          <p className="mb-2.5 text-sm font-medium">Andri Thomas</p>
          <div className="mb-2.5 border rounded-tl-none rounded-2xl bg-chatGray py-3 px-5">
            <p className="text-black">
              I want to make an appointment tomorrow from 2:00 to 5:00pm?
            </p>
          </div>
          <p className="text-xs">1:55pm</p>
        </div>
        <div className="ml-auto max-w-[31.25rem]">
          <div className="mb-2.5 ml-auto rounded-2xl border rounded-br-none bg-chatBlue py-3 px-5">
            <p className="text-white text-justify">
              Hello, Thomas! I will check the schedule and inform you
            </p>
          </div>
          <p className="text-right text-xs">1:55pm</p>
        </div>
        <div className="max-w-[31.25rem]">
          <p className="mb-2.5 text-sm font-medium">Andri Thomas</p>
          <div className="mb-2.5 border rounded-tl-none rounded-2xl bg-chatGray py-3 px-5">
            <p className="text-black">Ok, Thanks for your reply.</p>
          </div>
          <p className="text-xs">1:55pm</p>
        </div>
        <div className="ml-auto max-w-[31.25rem]">
          <div className="mb-2.5 ml-auto rounded-2xl border rounded-br-none bg-chatBlue py-3 px-5">
            <p className="text-white text-justify">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
          <p className="text-right text-xs">1:55pm</p>
        </div>
      </div>
      <div className="sticky bottom-0 border-t border-stroke bg-white py-5 px-6 dark:border-strokedark dark:bg-boxdark">
        <form className="flex items-center gap-2 justify-between space-x-4.5">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Type something here..."
              className="h-14 w-full rounded-md border border-stroke bg-chatGray pl-5 pr-19  placeholder-body outline-none focus:border-primary dark:border-strokedark"
            />
            <div className="absolute right-5 top-1/2 inline-flex -translate-y-1/2 items-center justify-end space-x-4">
              <button className="hover:text-primary">{ClipIcon}</button>
              <button className="hover:text-[#3C50E0]">{EmojiIcon}</button>
            </div>
          </div>
          <button className="flex h-13 w-full max-w-[3.25rem] items-center justify-center border rounded-md bg-white text-white hover:bg-opacity-90">
            {SendIcon}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
