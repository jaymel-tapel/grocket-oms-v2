import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { getHeaders } from "../../utils/utils";
import { taskSchema } from "../../components/dashboard/tasks/TaskForm";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;
const TASKS_URL = API_URL + "/tasks";

export type Tasks = {
  id: number;
  taskId: number;
  orderId: number;
  name: string;
  task_date: string;
  title: string;
  description: string;
  remarks: string;
  email: string;
  status: string;
  note: string;
  taskNotes: { note: string } /* taskNote here is for taskForm */;
  task: { taskNotes: { note: string } } /* This one is for dashboard */;
  taskAccountant: {
    taskId: number;
    orderId: number;
    description: string;
    email: string;
    remarks: string;
    task_date: string;
    status: string;
    title: string;
  } | null;
  taskSeller: {
    taskId: number;
    orderId: number;
    description: string;
    email: string;
    remarks: string;
    status: string;
    task_date: string;
    title: string;
  } | null;
};

type TaskResponse = {
  nodes: Tasks[];
};

export type TasksParams = {
  first?: number;
  last?: number;
  after?: number;
  before?: number;
  completed?: boolean;
};

// -- Get Tasks

const getAllTasksActive = async (
  params?: TasksParams
): Promise<TaskResponse> => {
  const response = await axios.get(TASKS_URL, {
    params,
    headers: getHeaders(),
  });

  return response.data;
};

const getAllTasksCompleted = async (
  params?: TasksParams
): Promise<TaskResponse> => {
  const response = await axios.get(TASKS_URL, {
    params: { ...params, completed: true },
    headers: getHeaders(),
  });

  return response.data;
};

const getTasks = async (id: number): Promise<Tasks> => {
  const response = await axios.get(TASKS_URL + `/${id}`, {
    headers: getHeaders(),
  });

  return response.data;
};

export const getAllTaskOptionActive = (taskId?: number) => {
  return {
    queryKey: ["tasksActive", taskId],
    queryFn: () => getAllTasksActive(),
    initialData: { nodes: [] },
  };
};

export const getAllTaskOptionCompleted = (taskId?: number) => {
  return {
    queryKey: ["tasksCompleted", taskId],
    queryFn: () => getAllTasksCompleted(),
    initialData: { nodes: [] },
  };
};

export const getTaskOption = (id: number) => {
  return queryOptions({
    enabled: id > 0 ? true : false,
    queryKey: ["tasks", id],
    queryFn: () => getTasks(id),
  });
};

export const useGetAllTasksActive = (taskId?: number) => {
  return useQuery(getAllTaskOptionActive(taskId));
};

export const useGetAllTasksCompleted = (taskId?: number) => {
  return useQuery(getAllTaskOptionCompleted(taskId));
};

export const useGetTask = (id: number) => {
  return useQuery(getTaskOption(id));
};

// -- Post Tasks

export const useCreateTasks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: taskSchema) => {
      return await axios.post(TASKS_URL, payload, { headers: getHeaders() });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

// -- Patch Tasks

export const useUpdateTasks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (arg: { taskId: number; payload: taskSchema }) => {
      return await axios.patch(TASKS_URL + `/${arg.taskId}`, arg.payload, {
        headers: getHeaders(),
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

// -- Update for Completing tasks

export const useCompleteTasks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      return await axios.patch(
        TASKS_URL + `/complete/${id}`,
        {},
        { headers: getHeaders() }
      );
    },
    onSuccess: () => {
      toast.success("Task updated");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

// -- Update for Active tasks

export const useActiveTasks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      return await axios.patch(
        TASKS_URL + `/active/${id}`,
        {},
        { headers: getHeaders() }
      );
    },
    onSuccess: () => {
      toast.success("Task updated");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

// -- delete tasks

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskId: number) => {
      return await axios.delete(TASKS_URL + `/${taskId}`, {
        headers: getHeaders(),
      });
    },
    onMutate: async (taskId: number) => {
      const previousTasks = queryClient.getQueryData(["tasks"]);

      queryClient.setQueryData(
        ["tasks"],
        (oldTasks: Tasks[] | undefined) =>
          oldTasks && oldTasks.filter((task) => task.id !== taskId)
      );

      return () => queryClient.setQueryData(["tasks"], previousTasks);
    },
    onSuccess: () => {
      toast.success("Task deleted");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: () => {
      toast.error("Error deleting task");
    },
  });
};
