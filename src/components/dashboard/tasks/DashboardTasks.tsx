import { useMemo, useState } from "react";
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
import {
  useCompleteTask,
  useDeleteTask,
  useGetAllTasks,
} from "../../../services/queries/taskQueries";
import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "../../tools/buttons/Button";

const DashboardTasks: React.FC = () => {
  const [activeButton, setActiveButtton] = useState("currentTasks");
  const { data: tasks } = useGetAllTasks();
  const { mutateAsync: completeTaskAsync } = useCompleteTask();
  const { mutate: deleteTask } = useDeleteTask();

  const filterTasks = useMemo(() => {
    if (!tasks) return [];

    if (activeButton === "currentTasks") {
      return tasks.filter((task) => task.type === "Order");
    } else if (activeButton === "completedTasks") {
      return tasks.filter((task) => task.type === "Completed");
    } else {
      return tasks;
    }
  }, [tasks, activeButton]);

  const navigate = useNavigate();

  const handleTasks = () => {
    navigate({ to: "/tasks/new" });
  };

  const handleClick = (taskId: string) => {
    navigate({ to: "/tasks/$taskId", params: { taskId } });
  };

  const handleTaskAction = async (
    taskId: string,
    action: "complete" | "delete"
  ) => {
    try {
      if (action === "complete") {
        await completeTaskAsync(taskId);
        console.log("Task completed", taskId);
      } else if (action === "delete") {
        await deleteTask(taskId);
        console.log("Task deleted", taskId);
      }
    } catch (error) {
      console.error(
        `Error ${action === "complete" ? "completing" : "deleting"} task:`,
        error
      );
    }
  };

  return (
    <>
      <div>
        <div className="flex justify-between items-center pt-8 max-md:flex-col max-md:gap-4">
          <div className="flex gap-7 max-md:flex-col">
            <Button
              type="button"
              onClick={() => setActiveButtton("currentTasks")}
              variant={activeButton === "currentTasks" ? "default" : "inactive"}
            >
              Current Tasks
            </Button>
            <Button
              type="button"
              onClick={() => setActiveButtton("completedTasks")}
              variant={
                activeButton === "completedTasks" ? "default" : "inactive"
              }
            >
              Completed Tasks
            </Button>
          </div>
          <div className="">
            <button
              type="button"
              className="rounded bg-chatBlue px-2 py-2 h-10 w-36 font-medium text-base text-white shadow-sm  hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#41B2E9]"
              onClick={handleTasks}
            >
              Add Task
            </button>
          </div>
        </div>

        <div>
          {filterTasks?.map((task, i) => (
            <div
              key={i}
              className="rounded-sm mt-9 border shadow-lg border-stroke  shadow-default max-md:p-6 md:p-6 xl:p-9 bg-white"
            >
              <div className="flex justify-between ">
                <div>
                  <p className="text-black text-sm mb-1">{task.title}</p>
                  <p className="text-slate text-sm mb-1 mt-4">
                    {task.description}
                  </p>
                  <div className="flex flex-1 gap-6 mt-4">
                    {[CheckCircle, PencilAlt, TrashIcon].map(
                      (icon, iconIndex) => (
                        <button
                          key={iconIndex}
                          onClick={() => {
                            if (icon === CheckCircle) {
                              handleTaskAction(task._id, "complete");
                            } else if (icon === PencilAlt) {
                              handleClick(task._id);
                            } else if (icon === TrashIcon) {
                              handleTaskAction(task._id, "delete");
                            }
                          }}
                        >
                          {icon}
                        </button>
                      )
                    )}
                    <span className="border-r-2"></span>
                    {/* {[EnvelopeIcon, PhoneIcon, PaperAirplaneIcon].map(
                      (icon, iconIndex) => (
                        <Link
                          key={iconIndex}
                          to={
                            icon === EnvelopeIcon
                              ? "/inbox"
                              : icon === PhoneIcon
                              ? "/inbox"
                              : undefined
                          }
                        >
                          <button>{icon}</button>
                        </Link>
                      )
                    )} */}
                    {[EnvelopeIcon, PhoneIcon, PaperAirplaneIcon].map(
                      (icon, iconIndex) => {
                        if (icon === PhoneIcon) {
                          return (
                            <a key={iconIndex} href={`tel:${task.phone}`}>
                              <button>{icon}</button>
                            </a>
                          );
                        } else {
                          return (
                            <Link
                              key={iconIndex}
                              to={
                                icon === EnvelopeIcon
                                  ? "/inbox"
                                  : icon === PaperAirplaneIcon
                                  ? "/inbox"
                                  : undefined
                              }
                            >
                              <button>{icon}</button>
                            </Link>
                          );
                        }
                      }
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex gap-2">
                    <button>{CalendarIcon}</button>
                    <p className="text-black">{task.date}</p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button>{LinkIcon}</button>
                    <p className="text-black">Order {task._id}</p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button>{BuildingIcon}</button>
                    <p className="text-black">{task.name}</p>
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
