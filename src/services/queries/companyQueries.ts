import { useMutation, useQuery } from "@tanstack/react-query";
import { Client } from "./clientsQueries";
import { getHeaders } from "../../utils/utils";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const SCRAPER_URL = "https://google-review-rating-scraper.onrender.com/api";
const API_URL = import.meta.env.VITE_API_URL;

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
  id?: number;
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

// export const useGetCompanies = (companyId: number | undefined) => {
//   return useQuery({
//     enabled: companyId ? true : false,
//     queryKey: ["companies", companyId],
//     queryFn: async (): Promise<Company[]> => {
//       const response = await axios.get(COMPANIES_URL + `/${companyId}`, {
//         headers: getHeaders(),
//       });
//       return response.data;
//     },
//   });
// };

// type Ratings = {
//   company: string;
//   address: string;
//   rating: string;
//   totalReviews: number;
//   ratingCount: number[];
// };

type Ratings = {
  rating: string;
  reviews: number;
  stars: number[];
};

export const useGetCompanyRatings = (companyId?: number) => {
  return useQuery({
    enabled: companyId ? true : false,
    queryKey: ["ratings", companyId],
    queryFn: async (): Promise<Ratings> => {
      const response = await axios.get(API_URL + `/ratings/${companyId}`, {
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
      toast.error(err.message);
    },
  });

  return {
    companyReviews,
    setCompanyReviews,
    getCompanyReviews,
    isFetchingCompanyReviews,
  };
};
