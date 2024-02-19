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
  status?: "pending" | "queued" | "error" | "success";
};

type ScrapeProspectsResponse = {
  message: string;
  hasWebSites: boolean;
  results: Prospect[];
};

type ScrapeWebsiteResponse = {
  website: string;
  phone: string;
};

type ScrapeEmailsResponse = {
  emails: string[];
};

export const useScrapeProspects = () => {
  const { setProspects, setIsScraping, setHasWebsites } =
    useFindProspectsContext();

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
      const hasWebsite = data.hasWebSites;

      const prospectsWithId: Prospect[] = data.results.map(
        (prospect, index) => {
          return {
            ...prospect,
            id: index + 1,
            status: hasWebsite ? "success" : "queued",
          };
        }
      );

      setProspects(prospectsWithId);
      setHasWebsites(hasWebsite);
    },
    onSettled: () => {
      setIsScraping(false);
    },
  });
};

export const useScrapeProspectWebsite = () => {
  const { prospects, setProspects, setHasWebsites } = useFindProspectsContext();

  const scrapeWebsiteQuery = useMutation({
    mutationKey: ["scrape-website"],
    mutationFn: async (arg: {
      payload: { url: string };
      index: number;
    }): Promise<ScrapeWebsiteResponse> => {
      const response = await axios.post(
        SCRAPER_URL + "/get-website",
        arg.payload
      );
      return response.data;
    },
    onMutate: ({ index }) => {
      const newProspects = [...prospects];
      newProspects[index] = { ...newProspects[index], status: "pending" };
      setProspects(newProspects);
    },
    onError: (_, { index }) => {
      const newProspects = [...prospects];
      newProspects[index] = { ...newProspects[index], status: "error" };
      setProspects(newProspects);
    },
    onSuccess: (data, { index }) => {
      const newProspects = [...prospects];
      newProspects[index] = {
        ...newProspects[index],
        ...data,
        status: "success",
      };
      setProspects(newProspects);
    },
  });

  const stopScrapingRef = useRef(false);

  const scrapeWebsite = async () => {
    stopScrapingRef.current = false;

    for (const prospect of prospects) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const index = prospects.indexOf(prospect);

      if (stopScrapingRef.current) {
        break;
      } else {
        await scrapeWebsiteQuery.mutateAsync({
          payload: { url: prospect.mapsUrl },
          index,
        });
      }
    }

    setHasWebsites(true);
  };

  const stopScrapeWebsite = () => {
    stopScrapingRef.current = true;
  };

  return {
    scrapeWebsite,
    stopScrapeWebsite,
  };
};

export const useScrapeProspectEmails = () => {
  const { setStep, selectedProspects, prospectsEmails, setProspectsEmail } =
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
        try {
          await scrapeEmailsQuery.mutateAsync({
            payload: { url: prospect.website },
            index,
          });
        } catch (error) {
          console.error(
            `Error scraping emails for ${prospect.website}:`,
            error
          );
        }
      }
    }

    setStep(4);
  };

  const stopScrapeEmails = () => {
    stopScrapingRef.current = true;
  };

  return {
    scrapeEmails,
    stopScrapeEmails,
  };
};
