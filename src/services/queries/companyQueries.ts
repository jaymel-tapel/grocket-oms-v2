import { useMutation, useQuery } from "@tanstack/react-query";
import { Client } from "./clientsQueries";
import { getHeaders } from "../../utils/utils";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;
const COMPANIES_URL = API_URL + "/companies";
const SCRAPER_URL = "https://google-review-rating-scraper.onrender.com/api";

export type Company = {
  id: number;
  clientId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  name: string;
  url: string;
  valid_url: boolean;
  check_url: boolean;
  latest_check: boolean;
  client: Client;
};

export type PendingReview = {
  id: number;
  name: string;
  rating?: number;
  review?: string;
  google_review_id?: string;
  status: string;
};

export type GoogleReview = {
  name: string;
  google_review_id: string;
  rating: number;
  description: string;
};

export const useGetCompanies = (clientId: number | undefined) => {
  return useQuery({
    enabled: clientId ? true : false,
    queryKey: ["companies", clientId],
    queryFn: async (): Promise<Company[]> => {
      const response = await axios.get(COMPANIES_URL + "/source", {
        headers: getHeaders(),
      });
      return response.data;
    },
  });
};

export const useGetCompanyReviews = () => {
  const [companyReviews, setCompanyReviews] = useState<GoogleReview[]>([]);

  const {
    mutateAsync: getCompanyReviews,
    isPending: isFetchingCompanyReviews,
  } = useMutation({
    mutationFn: async (payload: {
      url: string;
      quantity: number;
    }): Promise<GoogleReview[]> => {
      const response = await axios.post(
        SCRAPER_URL + "/fetch-reviewers",
        payload,
        {
          headers: getHeaders(),
        }
      );

      return response.data?.reviewers;
    },
    onSuccess: (data) => {
      setCompanyReviews(data);
    },
    onError: (err) => {
      toast(err.message);
    },
  });

  return {
    companyReviews,
    setCompanyReviews,
    getCompanyReviews,
    isFetchingCompanyReviews,
  };
};
