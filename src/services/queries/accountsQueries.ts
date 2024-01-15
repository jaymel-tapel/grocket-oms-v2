import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { getHeaders } from "../../utils/utils";
import { UserFormSchema } from "../../components/accounts/usersManager/UserForm";

const API_URL = import.meta.env.VITE_API_URL;
const USERS_URL = API_URL + "/users";

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
  createdAt: string;
  updatedAt: string;
  deletedAt: undefined | string;
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

// -- POST requests

export const useCreateAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UserFormSchema) => {
      return await axios.post(USERS_URL, payload, { headers: getHeaders() });
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
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

// -- PATCH / PUT requests
