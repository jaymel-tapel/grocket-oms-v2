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
  name: string;
  task_date: string;
  title: string;
  description: string;
  remarks: string;
  email: string;
  note: string;
  taskNotes: {};
  taskSeller: {
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
};

// -- Get Tasks

const getAllTasks = async (params?: TasksParams): Promise<TaskResponse> => {
  // replace with axios api call later
  const response = await axios.get(TASKS_URL, {
    params,
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

export const getAllTaskOption = (taskId?: number) => {
  return {
    queryKey: ["tasks", taskId],
    queryFn: () => getAllTasks(),
  };
};

export const getTaskOption = (id: number) => {
  return queryOptions({
    enabled: id ? !isNaN(id) : false,
    queryKey: ["tasks", id],
    queryFn: () => getTasks(id),
  });
};

export const useGetAllTasks = (taskId?: number) => {
  return useQuery(getAllTaskOption(taskId));
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
    mutationFn: async (arg: { id: number; payload: taskSchema }) => {
      return await axios.patch(TASKS_URL + `/${arg.id}`, arg.payload, {
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
    mutationFn: async (arg: { id: number }) => {
      return await axios.patch(
        TASKS_URL + `/complete/${arg.id}`,
        {},
        { headers: getHeaders() }
      );
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
    mutationFn: (arg: { id: number }) => {
      return axios.delete(TASKS_URL + `/${arg.id}`, {
        headers: getHeaders(),
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
