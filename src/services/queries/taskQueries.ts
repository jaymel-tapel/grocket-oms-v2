import { UseQueryOptions, useQuery } from "@tanstack/react-query";

const temporaryTasks = [
  {
    _id: "111",
    title: "Payment Reminder",
    description: "This is the description",
    date: "2023-01-14 4:00:00 PM",
    type: "Order",
  },
  {
    _id: "112",
    title: "Payment Reminder",
    description: "This is the description",
    date: "2023-01-14 4:00:00 PM",
    type: "Order",
  },
  {
    _id: "113",
    title: "Payment Reminder",
    description: "This is the description",
    date: "2023-01-14 4:00:00 PM",
    type: "Order",
  },
  {
    _id: "114",
    title: "Payment Reminder",
    description: "This is the description",
    date: "2023-01-14 4:00:00 PM",
    type: "Order",
  },
  {
    _id: "115",
    title: "Payment Reminder",
    description: "This is the description",
    date: "2023-01-14 4:00:00 PM",
    type: "Order",
  },
  {
    _id: "116",
    title: "Payment Reminder",
    description: "This is the description",
    date: "2023-01-14 4:00:00 PM",
    type: "Order",
  },
  {
    _id: "117",
    title: "Payment Reminder",
    description: "This is the description",
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
