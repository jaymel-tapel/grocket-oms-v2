import { useState } from "react";
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
  const [activeButton, setActiveButtton] = useState("currentTasks");
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
        <div className="flex justify-between items-center pt-8 max-md:flex-col max-md:gap-4">
          <div className="flex gap-7 max-md:flex-col">
            <button
              type="button"
              onClick={() => setActiveButtton("currentTasks")}
              className={`rounded border  px-2 py-2 h-10 w-36 font-medium text-base 
              ${
                activeButton === "currentTasks"
                  ? "text-white bg-buttonBlack shadow-lg"
                  : "text-black bg-chatGray shadow-sm"
              }
               hover:shadow-lg`}
            >
              Current Tasks
            </button>
            <button
              type="button"
              onClick={() => setActiveButtton("completedTasks")}
              className={`rounded border  px-2 py-2 h-10 w-44 font-medium text-base 
              ${
                activeButton === "completedTasks"
                  ? "text-white  shadow-sm bg-buttonBlack "
                  : "text-black shadow-sm bg-chatGray"
              }
               hover:shadow-lg`}
            >
              Completed Tasks
            </button>
          </div>
          <div className="">
            <button
              type="button"
              className="rounded bg-chatBlue px-2 py-2 h-10 w-36 font-medium text-base text-white shadow-sm  hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#41B2E9]"
            >
              Add Task
            </button>
          </div>
        </div>

        <div>
          {remindersData.map((reminder, i) => (
            <div
              key={i}
              className="rounded-sm mt-9 border shadow-lg border-stroke bg-white shadow-default max-md:p-6 md:p-6 xl:p-9"
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
