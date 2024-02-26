import { useMemo } from "react";
import DashboardTasks from "../../components/dashboard/tasks/DashboardTasks";
import {
  useGetAllTasksActive,
  useGetAllTasksCompleted,
} from "../../services/queries/taskQueries";
import { tasksIndexRoute } from "../routeTree";

const Index: React.FC = () => {
  const tasksSearch = tasksIndexRoute.useSearch();
  const { data: active } = useGetAllTasksActive(tasksSearch);
  const { data: completed } = useGetAllTasksCompleted(tasksSearch);

  const tasks = useMemo(() => {
    if (!active)
      return {
        active: [],
        pagination: {
          total: 0,
          currentPage: 1,
          lastPage: 1,
          next: null,
          prev: null,
        },
      };
    return {
      active: active.data,
      pagination: active.meta,
    };
  }, [active]);

  const tasksCompleted = useMemo(() => {
    if (!completed)
      return {
        completed: [],
        pagination: {
          total: 0,
          currentPage: 1,
          lastPage: 1,
          next: null,
          prev: null,
        },
      };
    return {
      completed: completed.data,
      pagination: completed.meta,
    };
  }, [completed]);

  return (
    <>
      <DashboardTasks
        pagination={tasks.pagination}
        completed={tasksCompleted.pagination}
      />
    </>
  );
};

export default Index;
