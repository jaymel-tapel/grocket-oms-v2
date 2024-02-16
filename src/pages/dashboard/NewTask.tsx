import TaskForm from "../../components/dashboard/tasks/TaskForm";
import { newTaskRoute } from "../routeTree";

const NewTask = () => {
  const orderParams = newTaskRoute.useSearch();

  return (
    <div>
      <TaskForm orderParams={orderParams} />
    </div>
  );
};

export default NewTask;
