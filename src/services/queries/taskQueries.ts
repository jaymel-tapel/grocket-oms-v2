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
import { Pagination } from "./accountsQueries";

const API_URL = import.meta.env.VITE_API_URL;
const TASKS_URL = API_URL + "/tasks";

export type Tasks = {
  id: number;
  taskId: number;
  orderId: number;
  name: string;
  task_date?: string;
  title: string;
  description: string;
  remarks?: string;
  email: string;
  status: string;
  note: string;
  taskNotes: { note: string } /* taskNote here is for taskForm */;
  task: {
    taskNotes: { note: string };
    orderId: string;
    order: {
      company: {
        name: string;
        url: string;
      };
    };
  } /* This one is for dashboard */;
  taskAccountant: {
    taskId: number;
    orderId: number;
    description: string;
    email: string;
    remarks?: string;
    task_date?: string;
    status: string;
    title: string;
  } | null;
  taskSeller: {
    taskId: number;
    orderId: number;
    description: string;
    email: string;
    remarks?: string;
    status: string;
    task_date?: string;
    title: string;
  } | null;
  client: {
    email: string;
  };
  order: {
    company: {
      name: string;
    };
  };
};

type TaskResponse = {
  data: Tasks[];
  meta: Pagination;
};

export type TasksParams = {
  completed?: boolean;
  page?: number;
  perPage?: number;
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

export const getAllTaskOptionActive = (search?: TasksParams) => {
  return {
    queryKey: ["tasksActive", search],
    queryFn: () => getAllTasksActive(search),
  };
};

export const getAllTaskOptionCompleted = (search?: TasksParams) => {
  return {
    queryKey: ["tasksCompleted", search],
    queryFn: () => getAllTasksCompleted(search),
  };
};

export const getTaskOption = (id: number) => {
  return queryOptions({
    enabled: id > 0 ? true : false,
    queryKey: ["tasks", id],
    queryFn: () => getTasks(id),
  });
};

export const useGetAllTasksActive = (search?: TasksParams) => {
  return useQuery(getAllTaskOptionActive(search));
};

export const useGetAllTasksCompleted = (search?: TasksParams) => {
  return useQuery(getAllTaskOptionCompleted(search));
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
      const response = await axios.patch(
        TASKS_URL + `/complete/${id}`,
        {},
        { headers: getHeaders() }
      );

      return response.data;
    },
    onSuccess: () => {
      toast.success("Task updated");
    },
    onSettled: () => {
      return queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

// -- Update for Active tasks

export const useActiveTasks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await axios.patch(
        TASKS_URL + `/active/${id}`,
        {},
        { headers: getHeaders() }
      );

      return response.data;
    },
    onSuccess: () => {
      toast.success("Task updated");
    },
    onSettled: () => {
      return queryClient.invalidateQueries({ queryKey: ["tasks"] });
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
