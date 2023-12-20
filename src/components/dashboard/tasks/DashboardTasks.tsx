import {
  BuildingIcon,
  CalendarIcon,
  CheckCircle,
  EnvelopeIcon,
  LinkIcon,
  PaperAirplaneIcon,
  PencilAlt,
  PhoneIcon,
  TrashIcon,
} from "../../tools/svg/DashboardTasksLogos";

const DashboardTasks: React.FC = () => {
  const remindersData = [
    {
      title: "Payment Reminder",
      description: "This is the description",
      date: "2023-01-14 4:00:00 PM",
      type: "Order",
    },
    {
      title: "Payment Reminder",
      description: "This is the description",
      date: "2023-01-14 4:00:00 PM",
      type: "Order",
    },
    {
      title: "Payment Reminder",
      description: "This is the description",
      date: "2023-01-14 4:00:00 PM",
      type: "Order",
    },
    {
      title: "Payment Reminder",
      description: "This is the description",
      date: "2023-01-14 4:00:00 PM",
      type: "Order",
    },
    {
      title: "Payment Reminder",
      description: "This is the description",
      date: "2023-01-14 4:00:00 PM",
      type: "Order",
    },
    {
      title: "Payment Reminder",
      description: "This is the description",
      date: "2023-01-14 4:00:00 PM",
      type: "Order",
    },
    {
      title: "Payment Reminder",
      description: "This is the description",
      date: "2023-01-14 4:00:00 PM",
      type: "Order",
    },
  ];

  return (
    <>
      <div>
        <div className="flex justify-between items-center pb-8 pt-8">
          <div className="flex gap-8">
            <button
              type="button"
              className="rounded bg-black px-2 py-2 h-10 font-medium text-base  text-white shadow-sm hover:bg-slate-800"
            >
              Completed Tasks
            </button>
            <button
              type="button"
              className=" rounded bg-black px-2 py-2 h-10 font-medium text-base text-white shadow-sm hover:bg-slate-800"
            >
              Current Tasks
            </button>
          </div>
          <div className="">
            <button
              type="button"
              className="rounded bg-chatBlue px-2 py-2 h-10 w-36 font-medium text-base text-white shadow-sm hover:bg- focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#41B2E9]"
            >
              Add Task
            </button>
          </div>
        </div>
        {/* 
      <div className="rounded-sm mt-4 border shadow-lg border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9">
        <div className="flex justify-between ">
          <div>
            <p className="text-black text-sm mb-1 ">Payment Reminder</p>
            <p className="text-slate text-sm mb-1 mt-4">
              This is the description
            </p>
            <div className="flex flex-1 gap-2 mt-4">
              <button>{CheckCircle}</button>
              <button>{PencilAlt} </button>
              <button>{TrashIcon}</button>

              <span className="border-r-2"></span>

              <button> {EnvelopeIcon}</button>
              <button>{PhoneIcon}</button>
              <button> {PaperAirplaneIcon}</button>
            </div>
          </div>

          <div>
            <div className="flex gap-2">
              <button>{CalendarIcon}</button>
              <p className="text-black">2023-01-14 4:00:00 PM</p>
            </div>
            <div className="flex gap-2 mt-4">
              <button> {LinkIcon}</button>
              <p className="text-black">Order</p>
            </div>
            <div className="flex gap-2 mt-4">
              <button>{BuildingIcon}</button>
              <p className="text-black">2023-01-14 4:00:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-sm mt-8 border shadow-lg border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9">
        <div className="flex ">
          <div>
            <p className="text-black text-sm mb-1 ">Payment Reminder</p>
            <p className="text-slate text-sm mb-1 mt-4">
              This is the description
            </p>
            <div className="flex flex-1 gap-2 mt-4">
              <button>{CheckCircle}</button>
              <button>{PencilAlt} </button>
              <button>{TrashIcon}</button>

              <span className="border-r-2"></span>

              <button> {EnvelopeIcon}</button>
              <button>{PhoneIcon}</button>
              <button> {PaperAirplaneIcon}</button>
            </div>
          </div>

          <div className="ml-auto">
            <div className="flex gap-2">
              <button>{CalendarIcon}</button>
              <p className="text-black">2023-01-14 4:00:00 PM</p>
            </div>
            <div className="flex gap-2 mt-4">
              <button> {LinkIcon}</button>
              <p className="text-black">Order</p>
            </div>
            <div className="flex gap-2 mt-4">
              <button>{BuildingIcon}</button>
              <p className="text-black">2023-01-14 4:00:00 PM</p>
            </div>
          </div>

          <div className="sticky bg-[#FFEFBC]  p-0 m-0 px-8 py-5">
            <p>Remarks</p>
            <p>
              Personal Notes: <span>Test</span>
            </p>
          </div>
        </div>
      </div>
      <div className="rounded-sm mt-8 border shadow-lg border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9">
        <div className="flex justify-between ">
          <div>
            <p className="text-black text-sm mb-1 ">Payment Reminder</p>
            <p className="text-slate text-sm mb-1 mt-4">
              This is the description
            </p>
            <div className="flex flex-1 gap-2 mt-4">
              <button>{CheckCircle}</button>
              <button>{PencilAlt} </button>
              <button>{TrashIcon}</button>

              <span className="border-r-2"></span>

              <button> {EnvelopeIcon}</button>
              <button>{PhoneIcon}</button>
              <button> {PaperAirplaneIcon}</button>
            </div>
          </div>

          <div>
            <div className="flex gap-2">
              <button>{CalendarIcon}</button>
              <p className="text-black">2023-01-14 4:00:00 PM</p>
            </div>
            <div className="flex gap-2 mt-4">
              <button> {LinkIcon}</button>
              <p className="text-black">Order</p>
            </div>
            <div className="flex gap-2 mt-4">
              <button>{BuildingIcon}</button>
              <p className="text-black">2023-01-14 4:00:00 PM</p>
            </div>
          </div>
        </div>
      </div> */}
        <div>
          {remindersData.map((reminder, i) => (
            <div
              key={i}
              className="rounded-sm mt-4 border shadow-lg border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9"
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-black text-sm mb-1">{reminder.title}</p>
                  <p className="text-slate text-sm mb-1 mt-4">
                    {reminder.description}
                  </p>
                  <div className="flex flex-1 gap-6 mt-4">
                    {[CheckCircle, PencilAlt, TrashIcon].map(
                      (icon, iconIndex) => (
                        <button key={iconIndex}>{icon}</button>
                      )
                    )}
                    <span className="border-r-2"></span>
                    {[EnvelopeIcon, PhoneIcon, PaperAirplaneIcon].map(
                      (icon, iconIndex) => (
                        <button key={iconIndex}>{icon}</button>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex gap-2">
                    <button>{CalendarIcon}</button>
                    <p className="text-black">{reminder.date}</p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button>{LinkIcon}</button>
                    <p className="text-black">{reminder.type}</p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button>{BuildingIcon}</button>
                    <p className="text-black">{reminder.date}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DashboardTasks;
