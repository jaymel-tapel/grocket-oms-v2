import React, { useEffect, useState } from "react";
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
import dayjs from "dayjs";
import { Pagination } from "../../../services/queries/accountsQueries";
import TablePagination, {
  PaginationNavs,
} from "../../tools/table/TablePagination";
import { tasksIndexRoute } from "../../../pages/routeTree";

type tasksProps = {
  pagination: Pagination;
  completed: Pagination;
};

const DashboardTasks: React.FC<tasksProps> = ({ pagination, completed }) => {
  const tasksSearch = tasksIndexRoute.useSearch();
  const [activeButton, setActiveButtton] = useState("currentTasks");
  const [taskState, setTaskState] = useState<"Active" | "Completed">("Active");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageCompleted, setCurrentPageCompleted] = useState(1);

  const [hiddenTasks, setHiddenTasks] = useState<number[]>([]);
  const {
    data: { data: tasksActive = [] } = {},
    isLoading: activeLoading,
    isError: activeError,
    refetch: refetchActiveTasks,
  } = useGetAllTasksActive(tasksSearch);

  const {
    data: { data: tasksCompleted = [] } = {},
    isError: completedError,
    refetch: refetchCompletedTasks,
  } = useGetAllTasksCompleted(tasksSearch);
  const { mutateAsync: completeTask } = useCompleteTasks();
  const { mutateAsync: activeTask } = useActiveTasks();
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

  const handleTaskToActive = async (taskId: number) => {
    try {
      if (taskState === "Active") {
        await activeTask(taskId);
        refetchCompletedTasks();
        setTaskState("Active");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleTaskToCompleted = async (taskId: number) => {
    try {
      if (taskState === "Active") {
        await completeTask(taskId);
        refetchActiveTasks();
        setTaskState("Active");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async (taskId: number, action: "Delete") => {
    try {
      if (action === "Delete") {
        deleteTask(taskId);
        setHiddenTasks([...hiddenTasks, taskId]);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const itemsPerPage = 10;

  const handlePageChange = (value: number | PaginationNavs) => {
    if (typeof value === "number") {
      setCurrentPage(value);
      return;
    }

    const lastPage = pagination.lastPage;

    if (value === "first") {
      setCurrentPage(1);
    } else if (value === "prev") {
      if (currentPage !== 1) {
        setCurrentPage(currentPage - 1);
      }
    } else if (value === "next") {
      if (currentPage !== lastPage) {
        setCurrentPage(currentPage + 1);
      }
    } else if (value === "last") {
      setCurrentPage(lastPage);
    }
  };

  const itemsPerPageCompleted = 10;

  const handlePageChangeCompleted = (value: number | PaginationNavs) => {
    if (typeof value === "number") {
      setCurrentPage(value);
      return;
    }

    const lastPage = completed.lastPage;

    if (value === "first") {
      setCurrentPageCompleted(1);
    } else if (value === "prev") {
      if (currentPageCompleted !== 1) {
        setCurrentPageCompleted(currentPageCompleted - 1);
      }
    } else if (value === "next") {
      if (currentPageCompleted !== lastPage) {
        setCurrentPageCompleted(currentPageCompleted + 1);
      }
    } else if (value === "last") {
      setCurrentPageCompleted(lastPage);
    }
  };

  useEffect(() => {
    navigate({
      search: (tasksSearch) => {
        return {
          ...tasksSearch,
          page: currentPageCompleted,
          perPage: itemsPerPageCompleted,
        };
      },
      params: true,
    });
  }, [currentPageCompleted]);

  useEffect(() => {
    navigate({
      search: (tasksSearch) => {
        return {
          ...tasksSearch,
          page: currentPage,
          perPage: itemsPerPage,
        };
      },
      params: true,
    });
  }, [currentPage]);

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
          {activeLoading ? (
            <div className="flex justify-center">
              <Spinner />
            </div>
          ) : (
            ""
          )}
          {!activeLoading && tasksToDisplay.length === 0 && (
            <div className="text-center">No tasks available.</div>
          )}
          {tasksToDisplay.map((task, i) => (
            <div
              key={i}
              className={` ${hiddenTasks.includes(task.taskId) ? "hidden" : ""
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
                      <button
                        type="button"
                        className="hover:scale-125 transition-transform "
                        onClick={() => {
                          if (activeButton === "currentTasks") {
                            handleTaskToCompleted(task.taskId);
                          } else if (activeButton === "completedTasks") {
                            handleTaskToActive(task.taskId);
                          }
                        }}
                      >
                        {CheckCircle}
                      </button>
                      <button
                        type="button"
                        className="hover:scale-125 transition-transform"
                        onClick={() => {
                          handleClick(task.taskId);
                        }}
                      >
                        {PencilAlt}
                      </button>
                      <button
                        type="button"
                        className="hover:scale-125 transition-transform"
                        onClick={() => {
                          handleDelete(task.taskId, "Delete");
                        }}
                      >
                        {TrashIcon}
                      </button>
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

                <div className="w-96 ml-36 max-lg:ml-0 max-md:gap-10 max-lg:pb-10">
                  <div className="flex gap-2 ">
                    {CalendarIcon}
                    <p className="text-black">
                      {task.task_date ? dayjs(task.task_date).format("YYYY-DD-MM") : ' '}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    {LinkIcon}
                    <p className="text-black">Order {task.task.orderId}</p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    {BuildingIcon}
                    <p className="text-black">{task.task.order.company.name}</p>
                  </div>

                </div>
              </div>
              {task.task.taskNotes[0]?.note && (
                <div className="bg-grYellow-base m-[-2.3rem] max-lg:m-[-2.3rem] max-lg:mb-[-1.5rem] max-lg:pl-5 max-lg:pb-5 ">
                  <div className="text-black text-base text mt-9 w-56 ml-4 ">
                    <div>
                      <p className="text-grYellow-dark">Remarks: </p>
                      <label>{task.remarks}</label>

                    </div>
                    <div className="mt-6 ">
                      <p className="text-grYellow-dark">
                        Personal Note:{" "}
                      </p>
                      <label>
                        {task.task.taskNotes[0]?.note.length > 55
                          ? `${task.task.taskNotes[0]?.note.slice(0, 55)}...`
                          : task.task.taskNotes[0]?.note}
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {activeButton === "currentTasks" ? (
        <TablePagination
          itemsPerPage={10}
          currentPage={currentPage}
          lastPage={pagination.lastPage}
          handlePageChange={handlePageChange}
          totalItems={pagination.total}
        />
      ) : (
        <TablePagination
          itemsPerPage={10}
          currentPage={currentPageCompleted}
          lastPage={completed.lastPage}
          handlePageChange={handlePageChangeCompleted}
          totalItems={completed.total}
        />
      )}
    </>
  );
};

export default DashboardTasks;
