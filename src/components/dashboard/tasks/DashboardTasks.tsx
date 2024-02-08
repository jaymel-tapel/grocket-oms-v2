import { useEffect, useState } from "react";
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
  useActiveTasks,
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
  const [taskState, setTaskState] = useState("Completed");
  const [hiddenTasks, setHiddenTasks] = useState<number[]>([]);
  const [hideCompleted, setHideCompleted] = useState<number[]>([]);
  const {
    data: { nodes: tasksActive = [] } = {},
    isLoading: activeLoading,
    isError: activeError,
    refetch: refetchActiveTasks,
  } = useGetAllTasksActive();

  const {
    data: { nodes: tasksCompleted = [] } = {},
    isLoading: completedLoading,
    isError: completedError,
    refetch: refetchCompletedTasks,
  } = useGetAllTasksCompleted();
  const { mutate: completeTask } = useCompleteTasks();
  const { mutate: activeTask } = useActiveTasks();
  const { mutate: deleteTask } = useDeleteTask();

  const tasksToDisplay =
    activeButton === "currentTasks" ? tasksActive : tasksCompleted;

  useEffect(() => {
    let fetchInterval;
    let timeout;

    const startFetching = () => {
      fetchInterval = setInterval(() => {
        if (activeButton === "currentTasks") {
          refetchActiveTasks();
        } else {
          refetchCompletedTasks();
        }
      }, 1000);

      timeout = setTimeout(() => {
        clearInterval(fetchInterval);
      }, 6000);
    };

    startFetching();

    return () => {
      clearInterval(fetchInterval);
      clearTimeout(timeout);
    };
  }, [activeButton, taskState, refetchActiveTasks, refetchCompletedTasks]);

  const navigate = useNavigate();

  const handleTasks = () => {
    navigate({ to: "/tasks/new" });
  };

  const handleClick = (taskId: number) => {
    /* @ts-expect-error idk why this is giving error all of a sudden */
    navigate({ to: "/tasks/$taskId", params: { taskId } });
  };

  const handleTaskAction = async (
    taskId: number,
    action: "Completed" | "Delete" | "Active"
  ) => {
    try {
      if (action === "Completed") {
        completeTask(taskId);
        const hideTasks = () => {
          setHideCompleted([...hideCompleted, taskId]);
          setTimeout(() => {
            setHideCompleted([]);
          }, 3000);
        };
        hideTasks();
      } else if (action === "Active") {
        activeTask(taskId);
        const hideTasks = () => {
          setHideCompleted([...hideCompleted, taskId]);
          setTimeout(() => {
            setHideCompleted([]);
          }, 3000);
        };
        hideTasks();
      } else if (action === "Delete") {
        deleteTask(taskId);
        setHiddenTasks([...hiddenTasks, taskId]);
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
    return (
      <p className="text-center">
        Loading task. <Spinner />
      </p>
    );
  }

  if (activeError || completedError) {
    return <p className="text-center">Error fetching tasks.</p>;
  }

  return (
    <>
      <div>
        <div className="flex justify-between items-center pt-8 max-md:flex-col max-md:gap-4">
          <div className="flex gap-7 max-md:flex-col">
            <Button
              type="button"
              onClick={() => {
                setActiveButtton("currentTasks");
                refetchActiveTasks();
              }}
              variant={activeButton === "currentTasks" ? "default" : "inactive"}
            >
              Current Tasks
            </Button>
            <Button
              type="button"
              onClick={() => {
                setActiveButtton("completedTasks");
                refetchCompletedTasks();
              }}
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
              variant="lightBlue"
              className="w-36"
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
                className={` ${
                  hideCompleted.includes(task.taskId) ||
                  hiddenTasks.includes(task.taskId)
                    ? "hidden"
                    : ""
                }  flex overflow-hidden justify-between gap-96 h-auto rounded-sm mt-9 border  border-stroke hover:shadow-lg shadow-default max-md:p-6 md:p-6 xl:p-9 bg-white max-lg:grid max-lg:grid-cols-1  max-lg:gap-2 max-md:grip-cols-1 `}
              >
                <div className="grid grid-cols-2 gap-56  max-lg:grid-cols-1 max-lg:gap-0 ">
                  <div className="max-lg:gap-0">
                    <p className="text-black text-sm mb-1">{task.title}</p>
                    <p className="text-slate text-sm mb-1 mt-4">
                      {task.description}
                    </p>
                    <div className="flex flex-1 gap-6 max-lg:gap-6 max-lg:flex-none">
                      <div className="gap-6 mt-2 flex ">
                        {[CheckCircle, PencilAlt, TrashIcon].map(
                          (icon, iconIndex) => (
                            <button
                              key={iconIndex}
                              onClick={() => {
                                if (icon === CheckCircle) {
                                  const newTaskState =
                                    taskState === "Active"
                                      ? "Completed"
                                      : "Active";
                                  setTaskState(newTaskState);
                                  handleTaskAction(task.taskId, newTaskState);
                                } else if (icon === PencilAlt) {
                                  handleClick(task.taskId);
                                } else if (icon === TrashIcon) {
                                  handleTaskAction(task.taskId, "Delete");
                                }
                              }}
                              className="hover:scale-125 transition-transform"
                            >
                              {icon}
                            </button>
                          )
                        )}
                      </div>

                      <span className="border-r-2 max-lg:hidden"></span>
                      <div className="gap-6 mt-2 flex">
                        {[EnvelopeIcon, PhoneIcon, PaperAirplaneIcon].map(
                          (icon, iconIndex) => (
                            <Link
                              key={iconIndex}
                              to={
                                icon === EnvelopeIcon
                                  ? "/inbox"
                                  : icon === PaperAirplaneIcon
                                  ? "/inbox"
                                  : undefined
                              }
                              params={{ taskId: task.taskId }}
                              className="mt-2"
                            >
                              <button className="hover:scale-125 transition-transform">
                                {icon}
                              </button>
                            </Link>
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="w-96 ml-40 max-lg:ml-0 max-md:gap-10 max-lg:pb-10">
                    <div className="flex gap-2 ">
                      {CalendarIcon}
                      <p className="text-black">{task.task_date}</p>
                    </div>
                    <div className="flex gap-2 mt-4">
                      {LinkIcon}
                      <p className="text-black">Order {task.taskId}</p>
                    </div>
                    <div className="flex gap-2 mt-4">
                      {BuildingIcon}
                      <p className="text-black">{task.name}</p>
                    </div>
                  </div>
                </div>
                {task.task.taskNotes[0]?.note && (
                  <div className="bg-grYellow-base m-[-2.3rem] max-lg:m-[-2.3rem] max-lg:mb-[-1.5rem] max-lg:pl-5 max-lg:pb-5 ">
                    <div className="text-black text-base text mt-9 w-56 ml-4 ">
                      <p>
                        <label className="text-grYellow-dark">Remarks: </label>
                        {task.remarks}
                      </p>
                      <p className="mt-6 ">
                        <label className="text-grYellow-dark">
                          Personal Note:{" "}
                        </label>
                        {task.task.taskNotes[0]?.note.length > 55
                          ? `${task.task.taskNotes[0]?.note.slice(0, 55)}...`
                          : task.task.taskNotes[0]?.note}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center gap-2">
              <p>No task available.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardTasks;
