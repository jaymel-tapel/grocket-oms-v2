import TaskForm from "../../components/dashboard/tasks/TaskForm";
import { taskRoute } from "../routeTree";

const Task = () => {
  const { taskId } = taskRoute.useParams();

  return (
    <div>
      <TaskForm taskId={taskId} />
    </div>
  );
};

export default Task;
