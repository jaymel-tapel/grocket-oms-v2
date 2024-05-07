import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getHeaders } from "../../utils/utils";
import axios from "axios";
import toast from "react-hot-toast";
import { Pagination, User } from "./accountsQueries";
import { Client } from "./clientsQueries";
import { Company, PendingReview } from "./companyQueries";
import { OrderInformationSchema } from "../../pages/orders/ordersManager/Order";
import { ordersManagerIndexRoute } from "../../pages/routeTree";

const API_URL = import.meta.env.VITE_API_URL;
const ORDERS_URL = API_URL + "/orders";
const REVIEWS_URL = API_URL + "/order-reviews";

export type Order = {
  id: number;
  client: Client;
  seller: User;
  seller_email: string;
  sellerId: number;
  clientId: number;
  brandId: number;
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
  company: Company;
};

type OrdersResponse = {
  data: Order[];
  meta: Pagination;
  order_revenue_summary: {
    total: number;
    unpaid_invoices: number;
    paid_commission: number;
    current_commission: number;
  };
};

export type OrdersParams = {
  keyword?: string;
  from?: string;
  to?: string;
  filter?: string;
  page?: number;
  perPage?: number;
  code?: string;
  showDeleted?: boolean;
};

type OrderReportParams = {
  startRange?: string;
  endRange?: string;
  sellerId?: number;
  code?: string;
};

type OrderReportResponse = {
  total_orders: number;
  total_paid_orders: number;
  avg_amount_of_reviews: number;
  avg_unit_cost: number;
  orders: {
    date: string;
    count: number;
  }[];
  paidOrders: {
    date: string;
    count: number;
  }[];
};

type OrderGraphResponse = {
  orderPaymentStatus: {
    count: number;
    amount: number;
    percentage: number;
    payment_status: string;
  }[];
  orderReviewStatus: {
    count: number;
    amount: number;
    percentage: number;
    order_review_status: string;
  }[];
};

// -- GET requests

const getAllOrders = async (params?: OrdersParams): Promise<OrdersResponse> => {
  const response = await axios.get(ORDERS_URL, {
    params,
    headers: getHeaders(),
  });
  return response.data;
};

const getDeletedOrders = async (
  params?: OrdersParams
): Promise<OrdersResponse> => {
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
    enabled: search?.code !== undefined ? true : false,
    queryKey: ["orders", search],
    queryFn: () => getAllOrders(search),
  };
};

export const getDeletedOrdersOptions = (search?: OrdersParams) => {
  return {
    enabled: search?.code !== undefined ? true : false,
    queryKey: ["orders", search],
    queryFn: () => getDeletedOrders(search),
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

export const useGetDeletedOrders = (search?: OrdersParams) => {
  return useQuery(getDeletedOrdersOptions(search));
};

export const useGetOrderReport = (search?: OrderReportParams) => {
  return useQuery({
    enabled: search?.code !== undefined ? true : false,
    queryKey: ["order-stats", search],
    queryFn: async (): Promise<OrderReportResponse> => {
      const response = await axios.get(ORDERS_URL + "/report", {
        headers: getHeaders(),
        params: search,
      });
      return response.data;
    },
  });
};

export const useGetOrderGraph = (search?: OrderReportParams) => {
  return useQuery({
    enabled: search?.code !== undefined ? true : false,
    queryKey: ["order-graph", search],
    queryFn: async (): Promise<OrderGraphResponse> => {
      const response = await axios.get(ORDERS_URL + "/graph", {
        headers: getHeaders(),
        params: search,
      });
      return response.data;
    },
  });
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

export const useUploadOrderInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (arg: { orderId: number; payload: FormData }) => {
      return axios.post(ORDERS_URL + `/upload/${arg.orderId}`, arg.payload, {
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

type UpdateStatusPayload = {
  payment_status: string;
  seller_name: string;
  seller_email: string;
  client_name: string;
  client_email: string;
  sourceId: number;
  companyId: number;
  brandId: number;
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();
  const search = ordersManagerIndexRoute.useSearch();

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
      queryClient.invalidateQueries({ queryKey: ["orders", search] });
    },
  });
};

export const useUpdatePaymentStatus = () => {
  const queryClient = useQueryClient();
  const search = ordersManagerIndexRoute.useSearch();

  return useMutation({
    mutationFn: async (arg: {
      payload: UpdateStatusPayload;
      orderId: number;
    }) => {
      return axios.patch(ORDERS_URL + `/${arg.orderId}`, arg.payload, {
        headers: getHeaders(),
      });
    },
    onSuccess: () => {
      toast.success("Order updated!");
      queryClient.invalidateQueries({ queryKey: ["orders", search] });
    },
  });
};

export const useUpdateReviewStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-order"],
    mutationFn: async (arg: { reviewId: number; payload: ReviewPayload }) => {
      return axios.patch(REVIEWS_URL + `/${arg.reviewId}`, arg.payload, {
        headers: getHeaders(),
      });
    },
    onSuccess: (_, { payload }) => {
      toast.success("Review status updated!");
      queryClient.invalidateQueries({ queryKey: ["orders", payload.orderId] });
    },
  });
};

// DELETE

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderId: number) => {
      return await axios.delete(ORDERS_URL + `/${orderId}`, {
        headers: getHeaders(),
      });
    },
    onSuccess: () => {
      toast.success("Order deleted!");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

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

export const useGenerateInvoicePDF = (orderId?: number) => {
  return useQuery({
    enabled: false,
    queryKey: ["invoicePDF"],
    queryFn: async () => {
      if (!orderId) return true;

      const response = await axios.get(
        ORDERS_URL + `/generate-pdf/${orderId}`,
        {
          responseType: "blob",
          headers: getHeaders(),
        }
      );
      const blob = new Blob([response.data], { type: "application/pdf" });
      const downloadLink = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadLink;
      a.download = `order#_${orderId}_invoice.pdf`; // Set the desired file name
      document.body.appendChild(a);
      a.click();

      return true;
    },
  });
};
