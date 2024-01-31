import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { getHeaders } from "../../utils/utils";
import { taskSchema } from "../../components/dashboard/tasks/TaskForm";

const API_URL = import.meta.env.VITE_API_URL;
const TASKS_URL = API_URL + "/tasks";

export type Tasks = {
  id: number;
  taskId: number;
  name: string;
  task_date: string;
  title: string;
  description: string;
  remarks: string;
  email: string;
  note: string;
  task: { taskNotes: { note: string } };
  taskAccountant: {
    taskId: number;
    description: string;
    email: string;
    remarks: string;
    task_date: string;
    title: string;
  } | null;
  taskSeller: {
    taskId: number;
    description: string;
    email: string;
    remarks: string;
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
    enabled: id ? !isNaN(id) : false,
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
      try {
        queryClient.setQueryData<TaskResponse>(["tasks"], (oldData) => {
          if (!oldData) return oldData;

          return {
            nodes: oldData.nodes.map((task) =>
              task.id === id ? { ...task, completed: true } : task
            ),
          };
        });

        const response = await axios.patch(
          TASKS_URL + `/complete/${id}`,
          {},
          { headers: getHeaders() }
        );

        return response.data;
      } catch (error) {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
        throw error;
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

// -- delete tasks

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskId: number) => {
      try {
        queryClient.setQueryData<TaskResponse>(["tasksActive"], (oldData) => {
          if (!oldData) return oldData;

          return {
            nodes: oldData.nodes.filter((task) => task.id !== taskId),
          };
        });

        queryClient.setQueryData<Tasks>(["tasks", taskId], (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
          };
        });

        const response = await axios.delete(TASKS_URL + `/${taskId}`, {
          headers: getHeaders(),
        });

        return response.data;
      } catch (error) {
        queryClient.invalidateQueries({ queryKey: ["tasksActive"] });
        queryClient.invalidateQueries({ queryKey: ["tasks", taskId] });

        throw error;
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasksActive"] });
    },
  });
};
