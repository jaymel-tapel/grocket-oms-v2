import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getHeaders } from "../../utils/utils";
import axios from "axios";
import toast from "react-hot-toast";
import { Pagination } from "./accountsQueries";
import { Client } from "./clientsQueries";
import { Company, PendingReview } from "./companyQueries";
import { OrderInformationSchema } from "../../pages/orders/ordersManager/Order";

const API_URL = import.meta.env.VITE_API_URL;
const ORDERS_URL = API_URL + "/orders";
const REVIEWS_URL = API_URL + "/order-reviews";

export type Order = {
  id: number;
  clientId: number;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  order_date: string | null;
  createdBy: string;
  send_confirmation: boolean;
  unit_cost: number;
  total_price: number;
  remarks: string | null;
  payment_status: string;
  payment_status_date: string | null;
  date_paid: string | null;
  invoice_image: string | null;
  orderReviewCount: number;
  orderReviews: PendingReview[];
  client: Client;
  company: Company;
};

type OrdersResponse = {
  data: Order[];
  meta: Pagination;
};

export type OrdersParams = {
  keyword?: string;
  from?: string;
  to?: string;
  filter?: string;
  page?: number;
  perPage?: number;
};

// -- GET requests

const getAllOrders = async (params?: OrdersParams): Promise<OrdersResponse> => {
  const response = await axios.get(ORDERS_URL, {
    params,
    headers: getHeaders(),
  });
  return response.data;
};

const getOrder = async (id: number): Promise<Order> => {
  const response = await axios.get(ORDERS_URL + `/${id}`, {
    headers: getHeaders(),
  });
  return response.data;
};

export const getAllOrdersOptions = (search?: OrdersParams) => {
  return {
    queryKey: ["orders", search],
    queryFn: () => getAllOrders(search),
  };
};

export const getOrderOption = (id: number) => {
  return queryOptions({
    enabled: id ? !isNaN(id) : false,
    queryKey: ["orders", id],
    queryFn: () => getOrder(id),
  });
};

export const useGetAllOrders = (search?: OrdersParams) => {
  return useQuery(getAllOrdersOptions(search));
};

export const useGetOrder = (id: number) => {
  return useQuery(getOrderOption(id));
};

// POST / Create

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-order"],
    mutationFn: async (payload: FormData) => {
      return axios.post(ORDERS_URL, payload, { headers: getHeaders() });
    },
    onSuccess: () => {
      toast.success("Order created!");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

type ReviewPayload = {
  name: string;
  status: string;
  google_review_id?: string;
  orderId: number;
};

export const useAddOrderReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-order"],
    mutationFn: async (payload: ReviewPayload) => {
      return axios.post(REVIEWS_URL, payload, {
        headers: getHeaders(),
      });
    },
    onSuccess: (_, { orderId }) => {
      toast.success("Order updated with new review!");
      queryClient.invalidateQueries({ queryKey: ["orders", orderId] });
    },
  });
};

// PATCH / PUT

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (arg: {
      payload: OrderInformationSchema & { companyId: number; brandId: number };
      orderId: number;
    }) => {
      return axios.patch(ORDERS_URL + `/${arg.orderId}`, arg.payload, {
        headers: getHeaders(),
      });
    },
    onSuccess: () => {
      toast.success("Order updated!");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

// DELETE

export const useDeleteOrderReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reviewId: number) => {
      return await axios.delete(REVIEWS_URL + `/${reviewId}`, {
        headers: getHeaders(),
      });
    },
    onSuccess: () => {
      toast.success("Review deleted!");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};
