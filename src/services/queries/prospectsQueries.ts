import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Step1Schema } from "../../components/prospects/findProspects/FindProspectsFormStep1";
import { useFindProspectsContext } from "../../components/prospects/findProspects/FindProspectsContext";

// const API_URL = import.meta.env.VITE_API_URL;
const SCRAPER_URL = import.meta.env.VITE_SCRAPER_API_URL;

export type Prospect = {
  id: number;
  businessName: string;
  rating: string;
  reviews: string;
  phone: string;
  mapsUrl: string;
  website: string;
};

type ScrapeProspectsResponse = {
  message: string;
  results: Prospect[];
};

type ScrapeEmailsResponse = {
  emails: string[];
};

export const useScrapeProspects = () => {
  const { setProspects, setIsScraping } = useFindProspectsContext();

  return useMutation({
    mutationFn: async (
      payload: Step1Schema
    ): Promise<ScrapeProspectsResponse> => {
      const response = await axios.post(SCRAPER_URL + "/search", payload);
      return response.data;
    },
    onMutate: () => {
      setIsScraping(true);
    },
    onSuccess: (data) => {
      const prospectsWithId = data.results.map((prospect, index) => {
        return { ...prospect, id: index + 1 };
      });

      setProspects(prospectsWithId);
    },
    onSettled: () => {
      setIsScraping(false);
    },
  });
};

export const useScrapeProspectEmails = () => {
  const { setProspectsEmail } = useFindProspectsContext();

  return useMutation({
    mutationFn: async (payload: {
      url: string;
    }): Promise<ScrapeEmailsResponse> => {
      const response = await axios.post(SCRAPER_URL + "/get-emails", payload);
      return response.data;
    },
    onSuccess: (data) => {
      setProspectsEmail(data.emails);
    },
  });
};
