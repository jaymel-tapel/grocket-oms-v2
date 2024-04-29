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
import { Seller } from "./sellerQueries";

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
  seller: Seller;
};

export type Industry = {
  id: number;
  name: string;
};

export type Origin = {
  id: number;
  name: string;
};

type CreateClientPayload = ClientFormSchema & {
  brandId: number;
  sellerId: number;
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
  code?: string;
};

type ClientReportParams = {
  startRange?: string;
  endRange?: string;
  sellerId?: number;
  code?: string;
};

type ClientReportResponse = {
  total_clients: number;
  new_clients: number;
  clientsLoggedIn: number;
  newClientsResult: {
    date: string;
    count: number;
  }[];
  inactiveClientsResult: {
    date: string;
    count: number;
  }[];
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
    enabled: search?.code ? true : false,
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
  keyword?: string;
}) => {
  return useQuery({
    // enabled: params.sellerId ? true : false,
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

export const useGetClientReport = (search?: ClientReportParams) => {
  return useQuery({
    enabled: search?.code ? true : false,
    queryKey: ["client-report", search],
    queryFn: async (): Promise<ClientReportResponse> => {
      const response = await axios.get(CLIENTS_URL + "/report", {
        headers: getHeaders(),
        params: search,
      });
      return response.data;
    },
  });
};

// -- POST requests

export const useCreateClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateClientPayload) => {
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
      queryClient.invalidateQueries({ queryKey: ["clients-by-seller"] });
    },
  });
};

export const useTransferClients = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { to_seller_email: string; ids: number[] }) => {
      return axios.post(CLIENTS_URL + `/transfer`, payload, {
        headers: getHeaders(),
      });
    },
    onSuccess: (_, { to_seller_email }) => {
      toast.success(`Clients transferred to ${to_seller_email}!`);
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
};

export const useSendPasswordToEmail = () => {
  return useMutation({
    mutationFn: async (payload: { password: string; clientId: number }) => {
      return await axios.post(CLIENTS_URL + "/send-email", payload, {
        headers: getHeaders(),
      });
    },
    onSuccess: () => {
      toast.success("Password sent to client's email");
    },
  });
};

// -- PATCH / PUT requests

export const useUpdateClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (arg: { id: number; payload: CreateClientPayload }) => {
      return await axios.patch(CLIENTS_URL + `/${arg.id}`, arg.payload, {
        headers: getHeaders(),
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
};

export const useGeneratePassword = () => {
  return useMutation({
    mutationFn: async (clientId: number) => {
      const response = await axios.put(
        CLIENTS_URL + `/generate-password/${clientId}`,
        null,
        {
          headers: getHeaders(),
        }
      );
      return response.data as { password_text: string };
    },
    gcTime: Infinity,
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
      queryClient.invalidateQueries({ queryKey: ["clients-by-seller"] });
    },
  });
};
