import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Step1Schema } from "../../components/prospects/findProspects/FindProspectsFormStep1";
import { useFindProspectsContext } from "../../components/prospects/findProspects/FindProspectsContext";

// const API_URL = import.meta.env.VITE_API_URL;
const SCRAPER_URL = import.meta.env.VITE_SCRAPER_API_URL;

export type Prospect = {
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
  const { setProspects } = useFindProspectsContext();

  return useMutation({
    mutationFn: async (
      payload: Step1Schema
    ): Promise<ScrapeProspectsResponse> => {
      const response = await axios.post(SCRAPER_URL + "/search", payload);
      return response.data;
    },
    onSuccess: (data) => {
      setProspects(data.results);
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
