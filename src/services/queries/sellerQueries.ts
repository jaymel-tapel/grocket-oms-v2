import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AlternateEmail, Pagination } from "./accountsQueries";
import { getHeaders } from "../../utils/utils";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;
const SELLERS_URL = API_URL + "/sellers";

export type Seller = {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  name: string;
  email: string;
  role: string;
  profile_image: string;
  contact_url: string;
  phone: string;
  status: string;
};

type SellersResponse = {
  data: Seller[];
  meta: Pagination;
};

type SellersParams = {
  keyword?: string;
  from?: string;
  to?: string;
  filter?: string;
  page?: number;
  perPage?: number;
};

// GET

const getSellers = async (params?: SellersParams): Promise<SellersResponse> => {
  const response = await axios.get(SELLERS_URL, {
    params,
    headers: getHeaders(),
  });
  return response.data;
};

export const getSellersOptions = (search?: SellersParams) => {
  return {
    queryKey: ["sellers", search],
    queryFn: () => getSellers(search),
  };
};

export const useGetSellers = (search?: SellersParams) => {
  return useQuery(getSellersOptions(search));
};

type SellerWithAltEmails = Seller & {
  alternateEmails: AlternateEmail[];
};

export const useGetAllSellers = () => {
  return useQuery({
    queryKey: ["sellers"],
    queryFn: async (): Promise<SellerWithAltEmails[]> => {
      const response = await axios.get(SELLERS_URL + "/all", {
        headers: getHeaders(),
      });

      const sellersWithAlternateEmails = response.data.flatMap((seller) => {
        // Main email object
        const mainSeller = { ...seller };

        // Alternate emails objects
        const alternateEmailSellers = seller.alternateEmails.map(
          (altEmail) => ({
            ...seller,
            email: altEmail.email,
          })
        );

        // Combine main email object with alternate emails objects
        return [mainSeller, ...alternateEmailSellers];
      });

      return sellersWithAlternateEmails;
    },
  });
};

// POST

export const useTransferOrders = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: {
      to_seller_email: string;
      emails: string[];
    }) => {
      return axios.post(SELLERS_URL + `/transfer`, payload, {
        headers: getHeaders(),
      });
    },
    onSuccess: (_, { to_seller_email }) => {
      toast.success(`Orders transferred to ${to_seller_email}!`);
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};
