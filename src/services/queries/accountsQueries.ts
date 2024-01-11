import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import axios from "axios";
import { getHeaders } from "../../utils/utils";

const API_URL = import.meta.env.VITE_API_URL;
const USERS_URL = API_URL + "/users";

export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  forgot_password_code: null | string;
  profile_image: null | string;
  contact_url: null | string;
  phone: null | string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
};

type PageInfo = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: number;
  endCursor: number;
};

type UsersResponse = {
  edges: Array<{
    cursor: string;
    node: User;
  }>;
  pageInfo: PageInfo;
  totalCount: number;
};

export type UsersParams = {
  keyword?: string;
  from?: string;
  to?: string;
  filter?: string;
  first?: number;
  last?: number;
  after?: number;
  before?: number;
};

// -- GET functions

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
    enabled: !isNaN(id),
    queryKey: ["users", id],
    queryFn: () => getUser(id),
  });
};

export const useGetAllUsers = (search?: UsersParams) => {
  return useQuery(getAllUsersOptions(search));
};

export const useGetUser = (id: number) => {
  return useSuspenseQuery(getUserOption(id));
};
