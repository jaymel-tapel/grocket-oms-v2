import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { getHeaders, getLocalStorageBrand } from "../../utils/utils";
import { BrandFormSchema } from "../../components/brands/brandsManager/BrandsForm";
import toast from "react-hot-toast";
import { atomWithStorage } from "jotai/utils";

const API_URL = import.meta.env.VITE_API_URL;
const BRANDS_URL = API_URL + "/brands";

export const brandAtom = atomWithStorage<Brands | undefined>(
  "brand",
  getLocalStorageBrand()
);

export type Brands = {
  id: number;
  name: string;
  code: string;
  currency: string;
  address: string;
  logo: undefined | string;
};

// -- Get Brands
const getAllBrands = async (): Promise<Brands[]> => {
  const response = await axios.get(BRANDS_URL, {
    headers: getHeaders(),
  });

  return response.data;
};

const getBrands = async (id: number): Promise<Brands> => {
  const response = await axios.get(BRANDS_URL + `/${id}`, {
    headers: getHeaders(),
  });

  return response.data;
};

export const getAllBrandsOptions = () => {
  return {
    queryKey: ["brands"],
    queryFn: () => getAllBrands(),
    refetchOnWindowFocus: true,
  };
};

export const getBrandOption = (id: number) => {
  return queryOptions({
    enabled: id ? !isNaN(id) : false,
    queryKey: ["brands", id],
    queryFn: () => getBrands(id),
  });
};

export const useGetAllBrand = () => {
  return useQuery(getAllBrandsOptions());
};

export const useGetBrand = (id: number) => {
  return useQuery(getBrandOption(id));
};

// -- Post Create Brand

export const useCreateBrands = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: FormData) => {
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
    onSuccess: () => {
      toast.success(`Logo saved successfully`);
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

// -- delete Brands

export const useDeleteBrands = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      return await axios.delete(BRANDS_URL + `/${id}`, {
        headers: getHeaders(),
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });
};
