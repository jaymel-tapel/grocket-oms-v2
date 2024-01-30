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
import {
  useCompleteTasks,
  useDeleteTask,
  useGetAllTasksActive,
  useGetAllTasksCompleted,
} from "../../../services/queries/taskQueries";
import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "../../tools/buttons/Button";
import Spinner from "../../tools/spinner/Spinner";

const DashboardTasks: React.FC = () => {
  const [activeButton, setActiveButtton] = useState("currentTasks");
  const {
    data: { nodes: tasksActive = [] } = {},
    isLoading: activeLoading,
    isError: activeError,
  } = useGetAllTasksActive();
  console.log("test:", tasksActive);

  const {
    data: { nodes: tasksCompleted = [] } = {},
    isLoading: completedLoading,
    isError: completedError,
  } = useGetAllTasksCompleted();
  const { mutate: completeTask } = useCompleteTasks();
  const { mutate: deleteTask } = useDeleteTask();

  const tasksToDisplay =
    activeButton === "currentTasks" ? tasksActive : tasksCompleted;

  const navigate = useNavigate();

  const handleTasks = () => {
    navigate({ to: "/tasks/new" });
  };

  const handleClick = (taskId: number) => {
    navigate({ to: "/tasks/$taskId", params: { taskId } });
  };

  const handleTaskAction = async (
    taskId: number,
    action: "Completed" | "Delete"
  ) => {
    try {
      if (action === "Completed") {
        await completeTask(taskId);
      } else if (action === "Delete") {
        await deleteTask(taskId);
      } else {
        console.error(`Invalid action: ${action}`);
      }
    } catch (error) {
      console.error(
        `Error ${action === "Completed" ? "Completing" : "Deleting"} task:`,
        error
      );
    }
  };

  if (activeLoading || completedLoading) {
    return <Spinner className="py-40 px-96" />;
  }

  if (activeError || completedError) {
    return <p className="py-40 px-96 ">Error fetching tasks.</p>;
  }

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
            <Button
              type="button"
              className="rounded bg-chatBlue px-2 py-2 h-10 w-36 font-medium text-base text-white shadow-sm  hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#41B2E9]"
              onClick={handleTasks}
            >
              Add Task
            </Button>
          </div>
        </div>
        <div>
          {tasksToDisplay.length > 0 ? (
            tasksToDisplay.map((task, i) => (
              <div
                key={i}
                className="flex justify-between gap-96 h-auto rounded-sm mt-9 border shadow-lg border-stroke  shadow-default max-lg:flex-col-1 max-md:p-6 md:p-6 xl:p-9 bg-white"
              >
                <div className="grid grid-cols-2   ">
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
                                handleTaskAction(task.taskId, "Completed");
                              } else if (icon === PencilAlt) {
                                handleClick(task.taskId);
                              } else if (icon === TrashIcon) {
                                handleTaskAction(task.taskId, "Delete");
                              }
                            }}
                          >
                            {icon}
                          </button>
                        )
                      )}
                      <span className="border-r-2"></span>
                      {[EnvelopeIcon, PhoneIcon, PaperAirplaneIcon].map(
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
                            params={{ taskId: task.taskId }}
                            className="mt-2"
                          >
                            <button>{icon}</button>
                          </Link>
                        )
                      )}
                    </div>
                  </div>

                  <div className="w-96 ml-72">
                    <div className="flex gap-2 ">
                      <button>{CalendarIcon}</button>
                      <p className="text-black">{task.task_date}</p>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button>{LinkIcon}</button>
                      <p className="text-black">Order {task.taskId}</p>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button>{BuildingIcon}</button>
                      <p className="text-black">{task.name}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#FFEFBC] m-[-2.3rem] ">
                  <p className="mt-8 ml-8 mr-28">Remarks: {task.remarks}</p>
                  <div className="mt-2 ml-8 mr-28">
                    <p>Note:</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="py-40 px-96 ">Fetching Tasks Available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardTasks;
