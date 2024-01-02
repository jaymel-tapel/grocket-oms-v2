import TextArea from "../../tools/textArea/TextArea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

const TaskSchema = z.object({
  date: z.coerce.date(),
  id: z.coerce.number().nonnegative().gt(0, { message: "ID number required" }),
  email: z.string().email().min(1, { message: "Invalid Email Address" }),
  taskName: z.string().min(1, { message: "Task name required" }),
  remarks: z.string().min(1, { message: "Remarks is Required" }),
  description: z.string().optional(),
  note: z.string().optional(),
});

type taskSchema = z.infer<typeof TaskSchema>;

const TaskForm = () => {
  // 1. Add navigate to '/tasks/${task._id}' to the tasks cards (not in this component)
  // 2. Get task id using taskRoute's params
  // 3. Use the task id for the useGetTask query
  // 4. If there is a returned data from the query, use them as values for the form
  // 5. Make sure that the fields of the temporary API data matches the fields/schema of the form

  // Improvements
  // * Hide order ID field when adding a new task. Show the field only if we are editing / updating an existing task
  // * Add navigate to /tasks/new to the Add Task button (not in this component)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<taskSchema>({
    resolver: zodResolver(TaskSchema),
  });

  const onSubmit: SubmitHandler<taskSchema> = (data) => {
    console.log("test", data);
  };

  return (
    <div className="rounded-sm w-auto h-auto border bg-white shadow-lg ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <ul className="flex flex-col mt-14 ml-14">
          <div className="mb-7 w-5/12 max-sm:w-11/12">
            <label className="block text-sm font-medium text-black">Date</label>
            <input
              type="date"
              className="mt-1 p-2 border rounded-sm w-full"
              {...register("date")}
            />
          </div>
          <li className="flex w-auto gap-20 max-sm:flex-col ">
            <div className="mb-4 w-5/12 max-sm:w-11/12">
              <label className="block text-sm font-medium text-black">
                Order ID
              </label>
              <input
                type="number"
                className="mt-1 p-2 border rounded-sm w-full"
                {...register("id")}
              />
              <span>{errors.id?.message}</span>
            </div>
            <div className="mb-4 w-5/12 max-sm:w-11/12">
              <label className="block text-sm font-medium text-black">
                Client Email Address
              </label>
              <input
                type="text"
                className="mt-1 p-2 border rounded-sm w-full"
                {...register("email")}
              />
              <span>{errors.email?.message}</span>
            </div>
          </li>
          <li className="border-t mt-12 mr-24 mb-10 max-sm:w-11/12"></li>

          <li className="mb-8">
            <p className="font-bold text-black text-sm">Task Details</p>
          </li>

          <li className="flex w-auto gap-20 mb-9 max-sm:flex-col ">
            <div className="mb-4 w-5/12 max-sm:w-11/12">
              <label className="block text-sm font-medium text-black">
                Task Name
              </label>
              <input
                type="text"
                className="mt-1 p-2 border rounded-sm w-full"
                {...register("taskName")}
              />
              <span>{errors.taskName?.message}</span>
            </div>
            <div className="mb-4 w-5/12 max-sm:w-11/12">
              <label className="block text-sm font-medium text-black">
                Remarks
              </label>
              <input
                type="text"
                className="mt-1 p-2 border rounded-sm w-full"
                {...register("remarks")}
              />
              {errors.remarks?.message}
            </div>
          </li>

          <li className="w-11/12 mb-7">
            <TextArea
              id="description"
              label="Task Description"
              {...register("description")}
            />
          </li>

          <li className="w-11/12 mb-16">
            <TextArea id="note" label="Personal note" {...register("note")} />
          </li>
          <li className="border-t mt-12 mr-20 mb-8 max-sm:w-11/12"></li>

          <li className="mr-20 mb-12">
            <div className="flex justify-end  mb-4 gap-4 max-sm:justify-center">
              <button className="border rounded-md bg-white text-black px-8 h-10">
                Cancel
              </button>

              <button className="border rounded-md bg-[#3C50E0] text-white  h-10 px-8">
                Add Task
              </button>
            </div>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default TaskForm;
