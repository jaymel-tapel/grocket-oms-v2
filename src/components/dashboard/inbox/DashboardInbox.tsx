import { Outlet } from "@tanstack/react-router";
import {
  SmallMagnifyingIcon,
  // ThreeDotIcon,
} from "../../tools/svg/DashboardInboxLogos";

// const messages = [
//   {
//     name: 'Andrei',
//     message: 'Bro?',
//     date: '11:55 PM'
//   },
// ]

const DashboardInbox: React.FC = () => {
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
            <div className="no-scrollbar max-h-full space-y-2.5 overflow-auto">
              <div className="flex cursor-pointer items-center rounded py-2 px-4 hover:bg-[#f7f9fc]">
                <div className="relative mr-3.5 h-11 w-auto aspect-square">
                  <img
                    alt="profile"
                    className="h-auto w-full object-cover object-center rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  />
                  <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-gray-2 bg-green-500"></span>
                </div>
                <div className="w-screen">
                  <h5 className="text-sm font-medium text-black">
                    Henry Dholi
                  </h5>
                  <p className="text-sm line-clamp-2">
                    I came across your profile and asdasdasdasdasd...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardInbox;
