import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { getHeaders } from "../../utils/utils";
import { Pagination, User } from "./accountsQueries";
import { ClientFormSchema } from "../../components/clients/clientsManager/ClientForm";

const API_URL = import.meta.env.VITE_API_URL;
const CLIENTS_URL = API_URL + "/clients";

type ClientInfo = {
  id: string;
  sourceId: number;
  industryId: number;
  phone: string | null;
  sentOffer: boolean;
  hasLoggedIn: boolean;
  thirdPartyId: string | null;
  default_unit_cost: number;
  status: "ACTIVE" | "DELETED" | "BLOCKED";
  language: "GERMAN" | "ENGLISH";
  tier: "FREE" | "PREMIUM" | "VIP";
};

export type Client = {
  id: number;
  name: string;
  email: string;
  sellerId: number;
  seller: User;
  clientInfo: ClientInfo;
  phone: undefined | string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: undefined | string;
};

type ClientsResponse = {
  data: Client[];
  meta: Pagination;
};

export type ClientsParams = {
  keyword?: string;
  from?: string;
  to?: string;
  filter?: string;
  page?: number;
  perPage?: number;
};

// -- GET requests

const getAllClients = async (
  params?: ClientsParams
): Promise<ClientsResponse> => {
  const response = await axios.get(CLIENTS_URL, {
    params,
    headers: getHeaders(),
  });
  return response.data;
};

const getClient = async (id: number): Promise<Client> => {
  const response = await axios.get(CLIENTS_URL + `/${id}`, {
    headers: getHeaders(),
  });
  return response.data;
};

export const getAllClientsOptions = (search?: ClientsParams) => {
  return {
    queryKey: ["clients", search],
    queryFn: () => getAllClients(search),
  };
};

export const getClientOption = (id: number) => {
  return queryOptions({
    enabled: id ? !isNaN(id) : false,
    queryKey: ["clients", id],
    queryFn: () => getClient(id),
  });
};

export const useGetAllClients = (search?: ClientsParams) => {
  return useQuery(getAllClientsOptions(search));
};

export const useGetClient = (id: number) => {
  return useQuery(getClientOption(id));
};

// -- POST requests

export const useCreateClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: ClientFormSchema) => {
      return await axios.post(CLIENTS_URL, payload, { headers: getHeaders() });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
};

// -- PATCH / PUT requests

export const useUpdateClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (arg: { id: number; payload: ClientFormSchema }) => {
      return await axios.patch(CLIENTS_URL + `/${arg.id}`, arg.payload, {
        headers: getHeaders(),
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
};
