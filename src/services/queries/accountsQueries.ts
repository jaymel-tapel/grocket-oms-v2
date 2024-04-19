import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { getHeaders } from "../../utils/utils";
import { UserFormSchema } from "../../components/accounts/usersManager/UserForm";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;
const USERS_URL = API_URL + "/users";
const SELLERS_URL = API_URL + "/sellers";

export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  forgot_password_code: undefined | string;
  profile_image: undefined | string;
  contact_url: undefined | string;
  phone: undefined | string;
  status: string;
  alternateEmails?: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: undefined | string;
};

export type Pagination = {
  currentPage: number;
  lastPage: number;
  perPage?: number;
  next: number | null;
  prev: number | null;
  total: number;
};

type UsersResponse = {
  data: User[];
  meta: Pagination;
};

export type UsersParams = {
  keyword?: string;
  from?: string;
  to?: string;
  filter?: string;
  page?: number;
  perPage?: number;
};

type SellerReportParams = {
  startRange?: string;
  endRange?: string;
  sellerId?: number;
  code?: string;
};

type SellerStatsResponse = {
  allSellers: number;
  activeSellers: number;
  inactiveSellers: number;
};

type SellerChartResponse = {
  activeSellerCount: {
    date: string;
    activeSellerCount: number;
  }[];
  inactiveSellerCount: {
    date: string;
    inactiveSellerCount: number;
  }[];
};

// -- GET requests

const getAllUsers = async (params?: UsersParams): Promise<UsersResponse> => {
  const response = await axios.get(USERS_URL, {
    params,
    headers: getHeaders(),
  });
  return response.data;
};

const getUser = async (id: number): Promise<User> => {
  const response = await axios.get(USERS_URL + `/${id}`, {
    headers: getHeaders(),
  });
  return response.data;
};

export const getAllUsersOptions = (search?: UsersParams) => {
  return {
    queryKey: ["users", search],
    queryFn: () => getAllUsers(search),
  };
};

export const getUserOption = (id: number) => {
  return queryOptions({
    enabled: id ? !isNaN(id) : false,
    queryKey: ["users", id],
    queryFn: () => getUser(id),
  });
};

export const useGetAllUsers = (search?: UsersParams) => {
  return useQuery(getAllUsersOptions(search));
};

export const useGetUser = (id: number) => {
  return useQuery(getUserOption(id));
};

export const useGetSellerStats = (search?: SellerReportParams) => {
  return useQuery({
    enabled: search?.code !== undefined ? true : false,
    queryKey: ["seller-stats", search],
    queryFn: async (): Promise<SellerStatsResponse> => {
      const response = await axios.get(SELLERS_URL + "/count", {
        headers: getHeaders(),
        params: search,
      });
      return response.data;
    },
  });
};

export const useGetSellerReport = (search?: SellerReportParams) => {
  return useQuery({
    enabled: search?.code !== undefined ? true : false,
    queryKey: ["seller-report", search],
    queryFn: async (): Promise<SellerChartResponse> => {
      const response = await axios.get(SELLERS_URL + "/chart", {
        headers: getHeaders(),
        params: search,
      });
      return response.data;
    },
  });
};

// -- POST requests

export const useCreateAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UserFormSchema) => {
      return await axios.post(USERS_URL, payload, { headers: getHeaders() });
    },
    onSuccess: () => {
      toast.success("Created account successfully!");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useUpdateUserPhoto = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (arg: { id: number; payload: FormData }) => {
      return await axios.post(
        API_URL + `/profile/upload/${arg.id}`,
        arg.payload,
        { headers: getHeaders() }
      );
    },
    onSuccess: () => {
      toast.success("User photo updated!");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

// -- PATCH / PUT requests

export const useUpdateAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (arg: { id: number; payload: UserFormSchema }) => {
      return await axios.patch(USERS_URL + `/${arg.id}`, arg.payload, {
        headers: getHeaders(),
      });
    },
    onSuccess: () => {
      toast.success("User profile updated!");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useRestoreUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: number) => {
      return await axios.patch(USERS_URL + `/restore/${userId}`, {
        headers: getHeaders(),
      });
    },
    onSuccess: () => {
      toast.success("User restored!");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
