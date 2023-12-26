import TaskForm from "../../components/dashboard/tasks/TaskForm";

const NewTask = () => {
  return (
    <div>
      <div className="flex mt-4 mb-6">
        <div>
          <span className="flex gap-2">
            <p className="text-black text-base">Dashboard</p> /{" "}
            <p className="text-black text-base">My Task</p> /
            <p className="text-[#41B2E9] text-base">Add Task</p>
          </span>
        </div>
      </div>
      <TaskForm />
    </div>
  );
};

export default NewTask;
