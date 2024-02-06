import { useMutation } from "@tanstack/react-query";
import { Client } from "./clientsQueries";
import { getHeaders } from "../../utils/utils";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

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

type Ratings = {
  company: string;
  address: string;
  rating: string;
  totalReviews: number;
  ratingCount: number[];
};

export const useGetCompanyRatings = () => {
  const [ratings, setRatings] = useState<Ratings>();

  const { mutateAsync: getGoogleRatings, isPending: isFetchingRatings } =
    useMutation({
      mutationFn: (payload: { url: string }) => {
        return axios.post(SCRAPER_URL + "/v2/fetch-review-stats", payload, {
          headers: getHeaders(),
        });
      },
      onSuccess: ({ data }) => {
        const company = {
          company: data?.placeInfo?.title,
          address: data?.placeInfo?.address,
          rating: data?.placeInfo?.rating,
          totalReviews: data?.placeInfo?.reviews,
          ratingCount: data.reviews,
        };

        setRatings(company);
      },
      onError: () => {
        setRatings(undefined);
      },
    });

  return {
    ratings,
    getGoogleRatings,
    isFetchingRatings,
  };
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
