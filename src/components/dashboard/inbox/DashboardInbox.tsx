import {
  ClipIcon,
  EmojiIcon,
  SendIcon,
  SmallMagnifyingIcon,
  ThreeDotIcon,
} from "../../tools/svg/DashboardInboxLogos";

const DashboardInbox: React.FC = () => {
  return (
    <div className="h-[calc(100vh-186px)] overflow-hidden sm:h-[calc(100vh-174px)]">
      <div className="h-full rounded-sm border border-stroke bg-white border-solid dark:border-strokedark dark:bg-boxdark xl:flex">
        <div className="hidden h-full flex-col xl:flex xl:w-1/4">
          <div className="sticky flex justify-between border-b border-stroke px-6 py-2">
            <span className="text-lg py-4 font-medium text-black  2xl:text-xl">
              Clients
            </span>
            <span className="rounded-md border bg-chatGray   px-2 mt-4 h-6 mb- text-base font-medium text-black ">
              1
            </span>
          </div>
          <div className="flex max-h-full flex-col overflow-auto p-5">
            <form className="sticky mb-7">
              <input
                type="text"
                className="w-full rounded border border-stroke bg-chatGray py-2.5 pl-5 pr-10 text-sm outline-none focus:border-primary dark:border-strokedark dark:bg-boxdark-2"
                placeholder="Search..."
              />
              <button className="absolute top-1/2 right-4 -translate-y-1/2">
                {SmallMagnifyingIcon}
              </button>
            </form>
            <div className="no-scrollbar max-h-full space-y-2.5 overflow-auto">
              <div className="flex cursor-pointer items-center border rounded bg-chatGray py-2 px-4 hover:bg-chatGray-2 dark:hover:bg-strokedark">
                <div className="relative mr-3.5 h-11 w-full max-w-11 rounded-full">
                  {/* <img
                    alt="profile"
                    className="h-full w-full object-cover object-center"
                  /> */}
                  <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-gray-2 bg-success"></span>
                </div>
                <div className="w-screen">
                  <h5 className="text-sm font-medium text-black">
                    Henry Dholi
                  </h5>
                  <p className="text-sm">I came across your profile and...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-full flex-col border-l border-stroke dark:border-strokedark xl:w-3/4">
          <div className="sticky flex items-center justify-between h-fit border-b border-stroke px-6 py-4.5 dark:border-strokedark">
            <div className="flex gap-auto items-center px-4 py-4">
              {/* <div className="mr-4.5 h-full w-full max-w-13 overflow-hidden rounded-full">
                <img
                  alt="avatar"
                  className="h-auto w-auto object-cover object-center"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                />
              </div> */}
              <div className="w-full ml-8">
                <h5 className="font-medium text-black">Henry Dholi</h5>
                <p className="text-sm">Reply to message</p>
              </div>
            </div>
            <div>
              <div className="relative">
                <button> {ThreeDotIcon}</button>
                <div className="absolute right-0 top-full z-40 w-40 space-y-1 rounded-sm border border-stroke bg-white p-1.5 shadow-default dark:border-strokedark dark:bg-boxdark hidden">
                  <button className="flex w-full items-center gap-2 rounded-sm py-1.5 px-4 text-left text-sm hover:bg-chatGray dark:hover:bg-meta-4">
                    <svg
                      className="fill-current"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_62_9787)">
                        <path
                          d="M15.55 2.97499C15.55 2.77499 15.475 2.57499 15.325 2.42499C15.025 2.12499 14.725 1.82499 14.45 1.52499C14.175 1.24999 13.925 0.974987 13.65 0.724987C13.525 0.574987 13.375 0.474986 13.175 0.449986C12.95 0.424986 12.75 0.474986 12.575 0.624987L10.875 2.32499H2.02495C1.17495 2.32499 0.449951 3.02499 0.449951 3.89999V14C0.449951 14.85 1.14995 15.575 2.02495 15.575H12.15C13 15.575 13.725 14.875 13.725 14V5.12499L15.35 3.49999C15.475 3.34999 15.55 3.17499 15.55 2.97499ZM8.19995 8.99999C8.17495 9.02499 8.17495 9.02499 8.14995 9.02499L6.34995 9.62499L6.94995 7.82499C6.94995 7.79999 6.97495 7.79999 6.97495 7.77499L11.475 3.27499L12.725 4.49999L8.19995 8.99999ZM12.575 14C12.575 14.25 12.375 14.45 12.125 14.45H2.02495C1.77495 14.45 1.57495 14.25 1.57495 14V3.87499C1.57495 3.62499 1.77495 3.42499 2.02495 3.42499H9.72495L6.17495 6.99999C6.04995 7.12499 5.92495 7.29999 5.87495 7.49999L4.94995 10.3C4.87495 10.5 4.92495 10.675 5.02495 10.85C5.09995 10.95 5.24995 11.1 5.52495 11.1H5.62495L8.49995 10.15C8.67495 10.1 8.84995 9.97499 8.97495 9.84999L12.575 6.24999V14ZM13.5 3.72499L12.25 2.49999L13.025 1.72499C13.225 1.92499 14.05 2.74999 14.25 2.97499L13.5 3.72499Z"
                          fill=""
                        ></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_62_9787">
                          <rect width="16" height="16" fill="white"></rect>
                        </clipPath>
                      </defs>
                    </svg>
                    Edit
                  </button>
                  <button className="flex w-full items-center gap-2 rounded-sm py-1.5 px-4 text-left text-sm hover:bg-chatGray dark:hover:bg-meta-4">
                    <svg
                      className="fill-current"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.225 2.20005H10.3V1.77505C10.3 1.02505 9.70005 0.425049 8.95005 0.425049H7.02505C6.27505 0.425049 5.67505 1.02505 5.67505 1.77505V2.20005H3.75005C3.02505 2.20005 2.42505 2.80005 2.42505 3.52505V4.27505C2.42505 4.82505 2.75005 5.27505 3.22505 5.47505L3.62505 13.75C3.67505 14.775 4.52505 15.575 5.55005 15.575H10.4C11.425 15.575 12.275 14.775 12.325 13.75L12.75 5.45005C13.225 5.25005 13.55 4.77505 13.55 4.25005V3.50005C13.55 2.80005 12.95 2.20005 12.225 2.20005ZM6.82505 1.77505C6.82505 1.65005 6.92505 1.55005 7.05005 1.55005H8.97505C9.10005 1.55005 9.20005 1.65005 9.20005 1.77505V2.20005H6.85005V1.77505H6.82505ZM3.57505 3.52505C3.57505 3.42505 3.65005 3.32505 3.77505 3.32505H12.225C12.325 3.32505 12.425 3.40005 12.425 3.52505V4.27505C12.425 4.37505 12.35 4.47505 12.225 4.47505H3.77505C3.67505 4.47505 3.57505 4.40005 3.57505 4.27505V3.52505V3.52505ZM10.425 14.45H5.57505C5.15005 14.45 4.80005 14.125 4.77505 13.675L4.40005 5.57505H11.625L11.25 13.675C11.2 14.1 10.85 14.45 10.425 14.45Z"
                        fill=""
                      ></path>
                      <path
                        d="M8.00005 8.1001C7.70005 8.1001 7.42505 8.3501 7.42505 8.6751V11.8501C7.42505 12.1501 7.67505 12.4251 8.00005 12.4251C8.30005 12.4251 8.57505 12.1751 8.57505 11.8501V8.6751C8.57505 8.3501 8.30005 8.1001 8.00005 8.1001Z"
                        fill=""
                      ></path>
                      <path
                        d="M9.99994 8.60004C9.67494 8.57504 9.42494 8.80004 9.39994 9.12504L9.24994 11.325C9.22494 11.625 9.44994 11.9 9.77494 11.925C9.79994 11.925 9.79994 11.925 9.82494 11.925C10.1249 11.925 10.3749 11.7 10.3749 11.4L10.5249 9.20004C10.5249 8.87504 10.2999 8.62504 9.99994 8.60004Z"
                        fill=""
                      ></path>
                      <path
                        d="M5.97497 8.60004C5.67497 8.62504 5.42497 8.90004 5.44997 9.20004L5.62497 11.4C5.64997 11.7 5.89997 11.925 6.17497 11.925C6.19997 11.925 6.19997 11.925 6.22497 11.925C6.52497 11.9 6.77497 11.625 6.74997 11.325L6.57497 9.12504C6.57497 8.80004 6.29997 8.57504 5.97497 8.60004Z"
                        fill=""
                      ></path>
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="no-scrollbar max-h-full space-y-3.5 overflow-auto px-6 py-7.5">
            <div className="mr-auto max-w-full ">
              <p className="mb-2.5 text-sm font-medium">Andri Thomas</p>
              <div
                style={{ maxWidth: "fit-content" }}
                className="mb-2.5 border rounded-tl-none rounded-2xl bg-chatGray py-3 px-5"
              >
                <p className="text-black">
                  I want to make an appointment tomorrow from 2:00 to 5:00pm?
                </p>
              </div>
              <p className="text-xs">1:55pm</p>
            </div>
            <div className="max-w-125">
              <p
                style={{ maxWidth: "fit-content" }}
                className="mb-2.5 ml-auto  rounded-2xl border rounded-br-none bg-chatBlue py-3 px-5"
              >
                <p className="text-white ">
                  Hello, Thomas! I will check the schedule and inform you
                </p>
              </p>
              <p className="text-right text-xs">1:55pm</p>
            </div>
            <div className="max-w-125">
              <p className="mb-2.5 text-sm font-medium">Andri Thomas</p>
              <div
                style={{ maxWidth: "fit-content" }}
                className="mb-2.5 border rounded-tl-none rounded-2xl bg-chatGray py-3 px-5"
              >
                <p className="text-black">Ok, Thanks for your reply.</p>
              </div>
              <p className="text-xs">1:55pm</p>
            </div>
            <div className="max-w-content">
              <p
                style={{ maxWidth: "fit-content" }}
                className="mb-2.5 ml-auto rounded-2xl border rounded-br-none bg-chatBlue py-3 px-5"
              >
                <p className="text-white">You are welcome!</p>
              </p>
              <p className="text-right text-xs">1:55pm</p>
            </div>
            <div className="max-w-125">
              <p className="mb-2.5 text-sm font-medium">Andri Thomas</p>
              <div
                style={{ maxWidth: "fit-content" }}
                className="mb-2.5 border rounded-tl-none rounded-2xl bg-chatGray py-3 px-5"
              >
                {" "}
                <p className="text-black">
                  I want to make an appointment tomorrow from 2:00 to 5:00pm?
                </p>
              </div>
              <p className="text-xs">1:55pm</p>
            </div>
            <div className="max-w-125">
              <p
                style={{ maxWidth: "fit-content" }}
                className="mb-2.5 ml-auto rounded-2xl border rounded-br-none bg-chatBlue py-3 px-5"
              >
                {" "}
                <p className="text-white text-justify">
                  Hello, Thomas! I will check the schedule and inform you
                </p>
              </p>
              <p className="text-right text-xs">1:55pm</p>
            </div>
            <div className="max-w-125">
              <p className="mb-2.5 text-sm font-medium">Andri Thomas</p>
              <div
                style={{ maxWidth: "fit-content" }}
                className="mb-2.5 border rounded-tl-none rounded-2xl bg-chatGray py-3 px-5"
              >
                <p className="text-black">Ok, Thanks for your reply.</p>
              </div>
              <p className="text-xs">1:55pm</p>
            </div>
            <div className=" max-w-125">
              <p
                style={{ maxWidth: "fit-content" }}
                className="mb-2.5 ml-auto rounded-2xl border rounded-br-none bg-chatBlue py-3 px-5"
              >
                {" "}
                <p className="text-white text-justify">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </p>
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
      </div>
    </div>
  );
};

export default DashboardInbox;
