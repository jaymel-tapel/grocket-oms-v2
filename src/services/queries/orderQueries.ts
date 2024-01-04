import { UseQueryOptions, useQuery } from "@tanstack/react-query";

const temporaryOrders = [
  {
    date: "09/15/2022 2:04:59 PM",
    _id: "1021",
    client: "John Doe",
    total: "$3.99",
    reviews: [
      { _id: "1", name: "Micheal", status: "Positive" },
      { _id: "2", name: "Alex", status: "Neutral" },
    ],
    payment_status: "Completed",
    remarks: "Great service!",
  },
  {
    date: "09/16/2022 3:15:30 PM",
    _id: "1022",
    client: "Jane Smith",
    total: "$2.99",
    reviews: [
      { _id: "3", name: "Sophie", status: "Negative" },
      { _id: "4", name: "David", status: "Positive" },
    ],
    payment_status: "Pending",
    remarks: "Waiting for payment confirmation",
  },
  {
    date: "09/17/2022 4:30:45 PM",
    _id: "1023",
    client: "Bob Johnson",
    total: "$5.49",
    reviews: [
      { _id: "5", name: "Jessica", status: "Neutral" },
      { _id: "6", name: "Chris", status: "Negative" },
    ],
    payment_status: "Failed",
    remarks: "Card declined, please contact customer",
  },
  {
    date: "09/18/2022 5:45:15 PM",
    _id: "1024",
    client: "Alice Williams",
    total: "$1.89",
    reviews: [
      { _id: "7", name: "Tom", status: "Positive" },
      { _id: "8", name: "Linda", status: "Negative" },
    ],
    payment_status: "New",
    remarks: "First-time customer",
  },
  {
    date: "09/19/2022 6:55:22 PM",
    _id: "1025",
    client: "Charlie Brown",
    total: "$4.79",
    reviews: [
      { _id: "9", name: "Olivia", status: "Positive" },
      { _id: "10", name: "Michael", status: "Neutral" },
    ],
    payment_status: "Completed",
    remarks: "Fast delivery, excellent service",
  },
  {
    date: "09/20/2022 7:10:11 PM",
    _id: "1026",
    client: "Eva Davis",
    total: "$6.99",
    reviews: [
      { _id: "11", name: "William", status: "Negative" },
      { _id: "12", name: "Emily", status: "Positive" },
    ],
    payment_status: "Pending",
    remarks: "Awaiting product availability",
  },
  {
    date: "09/21/2022 8:25:36 PM",
    _id: "1027",
    client: "Frank Miller",
    total: "$3.29",
    reviews: [
      { _id: "13", name: "Daniel", status: "Positive" },
      { _id: "14", name: "Ava", status: "Negative" },
    ],
    payment_status: "Failed",
    remarks: "Incorrect shipping address, resend required",
  },
  {
    date: "09/22/2022 9:40:19 PM",
    _id: "1028",
    client: "Grace Taylor",
    total: "$2.49",
    reviews: [
      { _id: "15", name: "James", status: "Neutral" },
      { _id: "16", name: "Sophia", status: "Positive" },
    ],
    payment_status: "Completed",
    remarks: "Happy with the purchase",
  },
  {
    date: "09/23/2022 10:55:42 PM",
    _id: "1029",
    client: "Harry Martin",
    total: "$7.19",
    reviews: [
      { _id: "17", name: "Logan", status: "Negative" },
      { _id: "18", name: "Emma", status: "Neutral" },
    ],
    payment_status: "New",
    remarks: "Unsatisfied with the product, seeking refund",
  },
  {
    date: "09/24/2022 11:59:59 PM",
    _id: "1030",
    client: "Ivy Clark",
    total: "$4.59",
    reviews: [
      { _id: "19", name: "Mia", status: "Positive" },
      { _id: "20", name: "Jackson", status: "Negative" },
    ],
    payment_status: "Completed",
    remarks: "Good quality, would recommend",
  },
];

export type Orders = typeof temporaryOrders;

const getAllOrders = (): Orders => {
  // replace with axios api call later
  return temporaryOrders;
};

export const getOrderQuery = (orderId: string): UseQueryOptions => {
  return {
    enabled: !isNaN(+orderId),
    queryKey: ["orders", orderId],
    queryFn: async () => {
      return temporaryOrders.find((order) => order._id === orderId);
    },
  };
};

export const useGetAllOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
  });
};

export const useGetOrder = (orderId: string) => {
  return useQuery(getOrderQuery(orderId));
};
