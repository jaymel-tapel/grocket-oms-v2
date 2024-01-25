import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Step1Schema } from "../../components/prospects/findProspects/FindProspectsFormStep1";
import { useFindProspectsContext } from "../../components/prospects/findProspects/FindProspectsContext";
import { useRef } from "react";

// const API_URL = import.meta.env.VITE_API_URL;
const SCRAPER_URL = import.meta.env.VITE_SCRAPER_API_URL + "/api";

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
    mutationKey: ["scrape-prospects"],
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
  const { selectedProspects, prospectsEmails, setProspectsEmail } =
    useFindProspectsContext();

  const scrapeEmailsQuery = useMutation({
    mutationKey: ["scrape-emails"],
    mutationFn: async (arg: {
      payload: { url: string };
      index: number;
    }): Promise<ScrapeEmailsResponse> => {
      const response = await axios.post(
        SCRAPER_URL + "/get-emails",
        arg.payload
      );
      return response.data;
    },
    onMutate: (arg) => {
      const newEmails = [...prospectsEmails];
      newEmails[arg.index] = { emails: [], status: "pending" };
      setProspectsEmail(newEmails);
    },
    onError: (_, arg) => {
      const newEmails = [...prospectsEmails];
      newEmails[arg.index] = { emails: [], status: "error" };
      setProspectsEmail(newEmails);
    },
    onSuccess: (data, arg) => {
      const newEmails = [...prospectsEmails];
      newEmails[arg.index] = {
        emails: data.emails,
        status: "success",
      };
      setProspectsEmail(newEmails);
    },
  });

  const stopScrapingRef = useRef(false);

  const scrapeEmails = async () => {
    stopScrapingRef.current = false;

    for (const prospect of selectedProspects.filter(
      (prospect) => prospect.website
    )) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const index = selectedProspects.indexOf(prospect);

      if (stopScrapingRef.current) {
        break;
      } else {
        await scrapeEmailsQuery.mutateAsync({
          payload: { url: prospect.website },
          index,
        });
      }
    }
  };

  const stopScrapeEmails = () => {
    stopScrapingRef.current = true;
  };

  return {
    scrapeEmails,
    stopScrapeEmails,
  };
};
