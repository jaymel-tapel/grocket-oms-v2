import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

const temporaryTasks = [
  {
    _id: "111",
    name: "Mr. Restaurant",
    title: "Payment Reminder",
    email: "testemail@gmail.com",
    phone: "0171 1234567",
    description: "This is the description",
    note: "lurem ipsum dolor sit amet",
    date: "2023-01-14 4:00:00 PM",
    type: "Order",
  },
  {
    _id: "112",
    name: "Grain and Rice Inc.",
    title: "Payment Reminder",
    email: "testemail@gmail.com",
    phone: "0171 1234567",
    description: "This is the description",
    note: "lurem ipsum dolor sit amet",
    date: "2023-01-14 4:00:00 PM",
    type: "Order",
  },
  {
    _id: "113",
    name: "Big Tower Corp",
    title: "Payment Reminder",
    email: "testemail@gmail.com",
    phone: "0171 1234567",
    description: "This is the description",
    note: "lurem ipsum dolor sit amet",
    date: "2023-01-14 4:00:00 PM",
    type: "Completed",
  },
  {
    _id: "114",
    name: "Shanghai Dine",
    title: "Payment Reminder",
    email: "testemail@gmail.com",
    phone: "0171 1234567",
    description: "This is the description",
    note: "lurem ipsum dolor sit amet",
    date: "2023-01-14 4:00:00 PM",
    type: "Order",
  },
  {
    _id: "115",
    name: "Corn Bits Corp",
    title: "Payment Reminder",
    email: "testemail@gmail.com",
    phone: "0171 1234567",
    description: "This is the description",
    note: "lurem ipsum dolor sit amet",
    date: "2023-01-14 4:00:00 PM",
    type: "Order",
  },
  {
    _id: "116",
    name: "Legacy Corp",
    title: "Payment Reminder",
    email: "testemail@gmail.com",
    phone: "0171 1234567",
    description: "This is the description",
    note: "lurem ipsum dolor sit amet",
    date: "2023-01-14 4:00:00 PM",
    type: "Completed",
  },
  {
    _id: "117",
    name: "Grab Foods",
    title: "Payment Reminder",
    email: "testemail@gmail.com",
    phone: "0171 1234567",
    description: "This is the description",
    note: "lurem ipsum dolor sit amet",
    date: "2023-01-14 4:00:00 PM",
    type: "Order",
  },
];

type Tasks = typeof temporaryTasks;

const getAllTasks = (): Tasks => {
  // replace with axios api call later
  return temporaryTasks;
};

export const getTaskQuery = (taskId: string): UseQueryOptions => {
  return {
    enabled: !isNaN(+taskId),
    queryKey: ["tasks", taskId],
    queryFn: async () => {
      return temporaryTasks.find((task) => task._id === taskId);
    },
  };
};

export const useGetAllTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: getAllTasks,
  });
};

export const useGetTask = (taskId: string) => {
  return useQuery(getTaskQuery(taskId));
};

export type Task = (typeof temporaryTasks)[number];

export const useCompleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskId: string) => {
      const updatedTasks = temporaryTasks.map((task) =>
        task._id === taskId ? { ...task, type: "Completed" } : task
      );
      const foundTask = updatedTasks.find(
        (task) => task._id === taskId
      ) as Task;
      queryClient.setQueryData<Task[]>(["tasks"], (oldTasks) => {
        return oldTasks
          ? oldTasks.map((task) =>
              task._id === foundTask._id ? { ...task, type: "Completed" } : task
            )
          : [];
      });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  const mutationOptions: UseMutationOptions<{ _id: string }, Error, string> = {
    mutationFn: async (taskId: string) => {
      return { _id: taskId };
    },
    onSuccess: (data) => {
      queryClient.setQueryData<Task[]>(["tasks"], (oldTasks) => {
        return oldTasks ? oldTasks.filter((task) => task._id !== data._id) : [];
      });
    },
  };

  return useMutation<{ _id: string }, Error, string>(mutationOptions);
};
