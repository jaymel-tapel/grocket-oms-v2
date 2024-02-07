import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { getHeaders } from "../../utils/utils";
import { Pagination } from "./accountsQueries";
import { ClientFormSchema } from "../../components/clients/clientsManager/ClientForm";
import { Company } from "./companyQueries";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;
const CLIENTS_URL = API_URL + "/clients";
const COMPANIES_URL = API_URL + "/companies";

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
  companies: Company[];
  clientInfo: ClientInfo;
  phone: undefined | string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: undefined | string;
};

export type Industry = {
  id: number;
  name: string;
};

export type Origin = {
  id: number;
  name: string;
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

export const useGetClientBySellers = (params: {
  sellerId?: number;
  keyword: string;
}) => {
  return useQuery({
    enabled: params.sellerId ? true : false,
    queryKey: ["clients-by-seller", params.keyword],
    queryFn: async (): Promise<Client[]> => {
      const response = await axios.get(CLIENTS_URL + "/search", {
        headers: getHeaders(),
        params,
      });
      return response.data;
    },
  });
};

export const useGetClientIndustries = () => {
  return useQuery({
    queryKey: ["industries"],
    queryFn: async (): Promise<Industry[]> => {
      const response = await axios.get(CLIENTS_URL + "/industries", {
        headers: getHeaders(),
      });
      return response.data;
    },
    staleTime: Infinity,
  });
};

export const useGetClientOrigins = () => {
  return useQuery({
    queryKey: ["origins"],
    queryFn: async (): Promise<Origin[]> => {
      const response = await axios.get(CLIENTS_URL + "/source", {
        headers: getHeaders(),
      });
      return response.data;
    },
    staleTime: Infinity,
  });
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

type NewCompanyPayload = {
  clientId: number;
  name: string;
  url: string;
};

export const useAddClientCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: NewCompanyPayload) => {
      return await axios.post(COMPANIES_URL, payload, {
        headers: getHeaders(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
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

// DELETE

export const useDeleteClientCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (companyId: number) => {
      return await axios.delete(COMPANIES_URL + `/${companyId}`, {
        headers: getHeaders(),
      });
    },
    onSuccess: () => {
      toast.success("Company deleted!");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
};
