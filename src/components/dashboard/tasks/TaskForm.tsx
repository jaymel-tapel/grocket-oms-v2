import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";
import {
  useCreateTasks,
  useGetTask,
  useUpdateTasks,
} from "../../../services/queries/taskQueries";
import { newTaskRoute, taskRoute } from "../../../pages/routeTree";
import { Button } from "../../tools/buttons/Button";
import Spinner from "../../tools/spinner/Spinner";
import { useEffect } from "react";

const TaskSchema = z.object({
  name: z.string(),
  task_date: z.string().min(1, { message: "Date required" }),
  email: z.string().nullable(),
  title: z.string().min(1, { message: "Task name required" }),
  remarks: z.string(),
  description: z.string(),
  note: z.string(),
  orderId: z.coerce.number().optional().nullable(),
});

export type taskSchema = z.infer<typeof TaskSchema>;

const TaskForm: React.FC = () => {
  const { taskId } = taskRoute.useParams();
  const { data: tasks } = useGetTask(taskId ?? "");
  const { orderParams } = newTaskRoute.useSearch();

  const navigate = useNavigate();
  const { mutateAsync: createTasks, isPending: isCreating } = useCreateTasks();
  const { mutateAsync: updateTasks, isPending: isUpdating } = useUpdateTasks();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<taskSchema>({
    resolver: zodResolver(TaskSchema),
    defaultValues: taskId
      ? {
          ...tasks?.taskAccountant,
          ...tasks?.taskSeller,
          task_date: tasks?.taskSeller?.task_date
            ? new Date(tasks.taskSeller.task_date).toLocaleDateString("en-CA")
            : tasks?.taskAccountant?.task_date
            ? new Date(tasks.taskAccountant.task_date).toLocaleDateString(
                "en-CA"
              )
            : "",
          note: tasks?.taskNotes[0]?.note || "",
        }
      : orderParams
      ? {
          orderId: orderParams.orderId,
          email: orderParams.clientEmail,
        }
      : undefined,
  });

  useEffect(() => {
    if (tasks) {
      reset({
        ...tasks?.taskAccountant,
        ...tasks?.taskSeller,
        task_date: tasks?.taskSeller?.task_date
          ? new Date(tasks.taskSeller.task_date).toLocaleDateString("en-CA")
          : tasks?.taskAccountant?.task_date
          ? new Date(tasks.taskAccountant.task_date).toLocaleDateString("en-CA")
          : "",
        note: tasks?.taskNotes[0]?.note || "",
      });
    }
  }, [taskId, tasks, reset]);

  const onSubmit: SubmitHandler<taskSchema> = async (data) => {
    const payload = { ...data };

    if (!data.orderId) {
      delete payload.orderId;
    }

    try {
      const response = taskId
        ? await updateTasks({ taskId, payload })
        : await createTasks(payload);

      if (response.status === 200 || response.status === 201) {
        navigate({ to: "/tasks" });
      }
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };

  const handleClose = () => {
    navigate({ to: "/tasks" });
  };

  return (
    <>
      <div className="flex mt-4 mb-6">
        <div>
          <span className="flex gap-2">
            <p className="text-black text-base">Dashboard</p> /{" "}
            <p className="text-black text-base">My Task</p> /
            <p className="text-grBlue-light text-base">
              {taskId ? `Edit Task` : "Add Tasks"}
            </p>
          </span>
        </div>
      </div>
      <div className="rounded-sm w-auto h-auto border bg-white shadow-lg ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <ul className="flex flex-col mt-14 ml-14">
            <li className="mb-8 grid grid-cols-2 gap-x-12 gap-y-4 max-sm:grid-cols-1">
              <div>
                <label
                  htmlFor="taskdate"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Date
                </label>
                <div className="w-full mt-2">
                  <input
                    type="date"
                    id="taskdate"
                    {...register("task_date")}
                    className={`block w-11/12 mb-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 disabled:bg-gray-100 `}
                  />

                  <span className="text-xs italic text-red-500 mt-2">
                    {errors.task_date?.message}
                  </span>
                </div>
              </div>
              <div>
                <label
                  htmlFor="orderId"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Order ID
                </label>
                <div className="w-full mt-2">
                  <input
                    type="text"
                    id="orderId"
                    {...register("orderId")}
                    className={`block w-10/12 max-sm:w-11/12 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 disabled:bg-gray-100 `}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="taskName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Business Name
                </label>
                <div className="w-full mt-2">
                  <input
                    type="text"
                    id="taskName"
                    {...register("name")}
                    className={`block w-11/12 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 disabled:bg-gray-100 `}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="taskEmail"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Client Email Address
                </label>
                <div className="w-full mt-2">
                  <input
                    type="text"
                    id="taskEmail"
                    {...register("email")}
                    className={`block w-10/12 max-sm:w-11/12 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 disabled:bg-gray-100 `}
                  />
                </div>
              </div>
            </li>

            <li className="border-t mt-12 mr-[5.5rem] mb-10 max-sm:w-11/12"></li>

            <li className="mb-8">
              <p className="font-bold text-black text-sm">Task Details</p>
            </li>

            <li className="mb-8 grid grid-cols-2 gap-x-12 gap-y-4 max-sm:grid-cols-1">
              <div>
                <label
                  htmlFor="taskName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Task Name
                </label>
                <div className="w-full mt-2">
                  <input
                    type="text"
                    id="taskName"
                    {...register("title")}
                    className={`block w-11/12 mb-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 disabled:bg-gray-100 `}
                  />

                  <span className="text-xs italic text-red-500 mt-2">
                    {errors.title?.message}
                  </span>
                </div>
              </div>
              <div>
                <label
                  htmlFor="taskRemarks"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Remarks
                </label>
                <div className="w-full mt-2">
                  <input
                    type="text"
                    id="taskRemarks"
                    {...register("remarks")}
                    className={`block w-10/12  max-sm:w-11/12 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 disabled:bg-gray-100 `}
                  />
                </div>
              </div>
            </li>

            <li className="w-11/12 mb-7">
              <div className="col-span-full">
                <label
                  htmlFor="taskDescription"
                  className="block text-sm font-medium leading-6 text-black"
                >
                  Task Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="taskDescription"
                    className="block w-full h-[197px] rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm"
                    {...register("description")}
                  />
                </div>
              </div>
            </li>

            <li className="w-11/12 mb-16">
              <div className="col-span-full">
                <label
                  htmlFor="taskNote"
                  className="block text-sm font-medium leading-6 text-black"
                >
                  Personal note
                </label>
                <div className="mt-2">
                  <textarea
                    id="taskNote"
                    placeholder=" "
                    className="block w-full h-[197px] rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                    {...register("note")}
                  />
                </div>
              </div>
            </li>
            <li className="border-t mt-12 mr-[5.5rem] mb-8 max-sm:w-11/12"></li>

            <li className="mr-[5.5rem] mb-12">
              <div className="flex justify-between  mb-4 gap-4 max-sm:flex-col max-sm:ml-12 max-sm:justify-center">
                <Button onClick={handleClose} variant="delete">
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className="border rounded-md bg-[#3C50E0] text-white  h-10 px-8"
                  disabled={isCreating || isUpdating}
                >
                  {isCreating ? (
                    <>
                      Submitting
                      <Spinner />
                    </>
                  ) : isUpdating ? (
                    <>
                      Updating
                      <Spinner />
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </li>
          </ul>
        </form>
      </div>
    </>
  );
};

export default TaskForm;
