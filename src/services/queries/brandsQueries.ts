import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { getHeaders } from "../../utils/utils";
import { BrandFormSchema } from "../../components/brands/brandsManager/BrandsForm";

const API_URL = import.meta.env.VITE_API_URL;
const BRANDS_URL = API_URL + "/brands";

export type Brands = {
  id: number;
  name: string;
  code: string;
  currency: string;
  address: string;
  logo: string | undefined;
};

type BrandResponse = {
  data: Brands[];
};

// -- Get Brands
const getAllBrands = async (): Promise<BrandResponse> => {
  const response = await axios.get(BRANDS_URL, {
    headers: getHeaders(),
  });

  console.log("get All brands:", response.data);

  return response.data;
};

const getBrands = async (id: number): Promise<Brands> => {
  const response = await axios.get(BRANDS_URL + `/${id}`, {
    headers: getHeaders(),
  });

  console.log("get brands:", response.data);

  return response.data;
};

export const getAllBrandsOptions = (id: number) => {
  return {
    queryKey: ["users", id],
    queryFn: () => getAllBrands(),
  };
};

export const getBrandOption = (id: number) => {
  return queryOptions({
    enabled: id ? !isNaN(id) : false,
    queryKey: ["users", id],
    queryFn: () => getBrands(id),
  });
};

export const useGetAllBrand = (id: number) => {
  return useQuery(getAllBrandsOptions(id));
};

export const useGetBrand = (id: number) => {
  return useQuery(getBrandOption(id));
};

// -- Post Create Brand

export const useCreateBrands = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: BrandFormSchema) => {
      return await axios.post(BRANDS_URL, payload, { headers: getHeaders() });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });
};

// -- Post Upload Brand Photo

export const useUpdateBrandLogo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (arg: { id: number; payload: FormData }) => {
      return await axios.post(BRANDS_URL + `/logo/${arg.id}`, arg.payload, {
        headers: getHeaders(),
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });
};

// -- patch / update brands

export const useUpdateBrands = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (arg: { id: number; payload: BrandFormSchema }) => {
      return await axios.patch(BRANDS_URL + `/${arg.id}`, arg.payload, {
        headers: getHeaders(),
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });
};
