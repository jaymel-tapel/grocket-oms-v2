import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { Step1Schema } from "../../components/prospects/findProspects/FindProspectsFormStep1";
import {
  City,
  ProspectsEmails,
  useFindProspectsContext,
} from "../../components/prospects/findProspects/FindProspectsContext";
import { useRef, useState } from "react";
import { getHeaders } from "../../utils/utils";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;
const SCRAPER_URL = API_URL + "/scraper";
const PROSPECTS_URL = API_URL + "/prospects";
const EMAIL_TEMPLATES_URL = API_URL + "/templates";

type Reviewer = {
  id: number;
  createdAt: string;
  updatedAt: string;
  prospectId: number;
  name: string;
  image: string;
  rating: number;
  google_review_id: string;
};

export type Prospect = {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  emails: string[];
  stars: number[];
  note: string;
  phone: string;
  mapsUrl: string;
  url: string;
  reviewers: Reviewer[];
  templateId: number;
  status?: "pending" | "queued" | "error" | "success";
};

type Country = {
  country: string;
  cities: string[];
  iso2: string;
  iso3: string;
};

type ScrapeProspectsResponse = {
  message: string;
  prospects: Prospect[];
};

type ScrapeWebsiteResponse = {
  website: string;
  phone: string;
};

type ScrapeEmailsResponse = {
  emails: string[];
};

export type ProspectColumn = {
  id: string;
  name: string;
  templateId: number;
  prospects: Prospect[];
};

export type NewEmailTemplate = {
  name: string;
  subject: string;
  content: string;
};

export type EmailTemplate = NewEmailTemplate & {
  id: number;
  prospects: Prospect[];
};

export type Estimate = {
  estimated_search: string;
  estimated_web: string;
  estimated_email: string;
  total_estimated_time: string;
};

export type EmailLogsResponse = {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  prospectId: number;
  template: string;
  by: string;
  action: string;
}[];

export const useGetMyProspects = () => {
  return useQuery({
    queryKey: ["my-prospects"],
    queryFn: async (): Promise<EmailTemplate[]> => {
      const response = await axios.get(EMAIL_TEMPLATES_URL, {
        headers: getHeaders(),
      });
      return response.data;
    },
    staleTime: Infinity,
  });
};

const getProspectDetails = async (prospectId: number): Promise<Prospect> => {
  const response = await axios.get(PROSPECTS_URL + `/${prospectId}`, {
    headers: getHeaders(),
  });
  return response.data;
};

const getProspectEmailLogs = async (
  prospectId: number
): Promise<EmailLogsResponse> => {
  const response = await axios.get(API_URL + `/prospect-logs/${prospectId}`, {
    headers: getHeaders(),
  });
  return response.data;
};

export const getProspectDetailsOption = (prospectId: number) => {
  return queryOptions({
    enabled: prospectId ? !isNaN(prospectId) : false,
    queryKey: ["my-prospects", prospectId],
    queryFn: () => getProspectDetails(prospectId),
  });
};

export const getProspectEmailLogsOption = (prospectId: number) => {
  return queryOptions({
    enabled: prospectId ? !isNaN(prospectId) : false,
    queryKey: ["email-logs", prospectId],
    queryFn: () => getProspectEmailLogs(prospectId),
  });
};

export const useGetProspectDetails = (prospectId: number) => {
  return useQuery(getProspectDetailsOption(prospectId));
};

export const useGetProspectEmailLogs = (prospectId: number) => {
  return useQuery(getProspectEmailLogsOption(prospectId));
};

export const useMoveProspect = () => {
  return useMutation({
    mutationFn: async (arg: {
      templateId: number;
      payload: { newProspectIds: string };
    }) => {
      return axios.put(
        EMAIL_TEMPLATES_URL + `/position/${arg.templateId}`,
        arg.payload,
        { headers: getHeaders() }
      );
    },
  });
};

// -- PROSPECT FORM -- //

type UpdateProspectPayload = {
  name?: string;
  emails?: string[];
  url?: string;
  phone?: string;
  note?: string;
  industryId?: number;
  templateId?: number;
};

export const useUpdateProspectDetails = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (arg: {
      prospectId: number;
      payload: UpdateProspectPayload;
    }) => {
      return await axios.patch(
        PROSPECTS_URL + `/${arg.prospectId}`,
        arg.payload,
        {
          headers: getHeaders(),
        }
      );
    },
    onSuccess: () => {
      toast.success("Prospect has been updated!");
      queryClient.invalidateQueries({ queryKey: ["my-prospects"] });
    },
  });
};

export const useSendColdEmail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (arg: {
      prospectId: number;
      payload: { templateId: number };
    }) => {
      return await axios.post(
        PROSPECTS_URL + `/send-email/manual/${arg.prospectId}`,
        arg.payload,
        { headers: getHeaders() }
      );
    },
    onSuccess: (_, { prospectId }) => {
      toast.success("Prospect has been updated!");
      queryClient.invalidateQueries({ queryKey: ["my-prospects", prospectId] });
    },
  });
};

// -- SCRAPER -- //

export const useGetCountries = () => {
  return useQuery({
    queryKey: ["countries"],
    queryFn: async (): Promise<Country[]> => {
      const response = await axios.get(
        "https://countriesnow.space/api/v0.1/countries"
      );
      return response.data.data;
    },
    staleTime: Infinity,
  });
};

export const useGetCities = (countryCode: string) => {
  return useQuery({
    enabled: countryCode.length > 0 ? true : false,
    queryKey: ["cities", countryCode],
    queryFn: async (): Promise<City[]> => {
      const response = await axios.get("https://api.api-ninjas.com/v1/city", {
        params: {
          min_population: 500000,
          limit: 30,
          country: countryCode,
        },
        headers: { "X-Api-Key": import.meta.env.VITE_API_NINJA_KEY },
      });

      const cities: City[] = response.data.map((city) => {
        return { name: city.name, checked: true, status: "queued" };
      });

      return cities;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};

export const useGetScraperEstimate = (params: {
  limit: number;
  no_of_cities: number;
}) => {
  const { setEstimates } = useFindProspectsContext();

  return useQuery({
    enabled: params.no_of_cities > 0 && params.limit > 0 ? true : false,
    queryKey: ["estimate", params],
    queryFn: async (): Promise<Estimate> => {
      const response = await axios.get(SCRAPER_URL + "/estimate", {
        params,
        headers: getHeaders(),
      });

      setEstimates(response.data);
      return response.data;
    },
  });
};

export const useScrapeProspects = () => {
  const [currentCity, setCurrentCity] = useState("");

  const {
    setStep,
    cities,
    setCities,
    prospectFinder,
    prospects,
    setProspects,
    setProspectsEmail,
    setHasWebsites,
  } = useFindProspectsContext();

  const scrapeProspectsQuery = useMutation({
    // meta: { dontNotifyError: true },
    mutationKey: ["scrape-prospects"],
    mutationFn: async (arg: {
      payload: Step1Schema & { city: string };
      index: number;
    }): Promise<ScrapeProspectsResponse> => {
      const response = await axios.post(SCRAPER_URL + "/search", arg.payload, {
        headers: getHeaders(),
      });
      return response.data;
    },
    onMutate: ({ index }) => {
      const newCities = [...cities];
      newCities[index] = { ...newCities[index], status: "pending" };
      setCities(newCities);
    },
    onSuccess: (data, { index }) => {
      // update city status
      const newCities = [...cities];
      newCities[index] = { ...newCities[index], status: "success" };
      setCities(newCities);

      // set prospect on prep for next step
      setProspects((prevProspects) => {
        const updatedProspects = new Array(data.prospects.length);

        for (let index = 0; index < data.prospects.length; index++) {
          updatedProspects[index] = {
            ...data.prospects[index],
            status: data.prospects[index]?.url ? "success" : "queued",
          };
        }

        return [...prevProspects, ...updatedProspects];
      });

      // set initial emails if done scraping all cities
      if (index + 1 === cities.filter((city) => city.checked).length) {
        // check if last index
        setHasWebsites(false);
        const newEmails: ProspectsEmails[] = prospects.map((prospect) => {
          const hasEmails = prospect.emails.length > 0;
          return {
            id: prospect?.id,
            status: hasEmails ? "success" : "queued",
            emails: prospect.emails,
          };
        });

        const newEmails2: ProspectsEmails[] = data.prospects.map(
          (nProspect) => {
            const hasEmails = nProspect.emails.length > 0;
            return {
              id: nProspect.id,
              status: hasEmails ? "success" : "queued",
              emails: nProspect.emails,
            };
          }
        );

        setProspectsEmail([...newEmails, ...newEmails2]);
      }
    },
    onError: (_, { index }) => {
      const newCities = [...cities];
      newCities[index] = { ...newCities[index], status: "error" };
      setCities(newCities);

      if (index + 1 === cities.filter((city) => city.checked).length) {
        if (prospects.length === 0) {
          setHasWebsites(true);
          return;
        }

        const newEmails: ProspectsEmails[] = prospects.map((prospect) => {
          const hasEmails = prospect?.emails?.length > 0 ?? false;

          return {
            id: prospect?.id,
            status: hasEmails ? "success" : "queued",
            emails: prospect.emails,
          };
        });

        setProspects(
          prospects.map((prospect) => {
            return {
              ...prospect,
              status: prospect?.url ? "success" : "queued",
            };
          })
        );

        setProspectsEmail([...newEmails]);
      }
    },
  });

  const stopScrapingRef = useRef(false);
  const stopScrapeProspects = () => {
    stopScrapingRef.current = true;
  };

  const scrapeProspects = async () => {
    stopScrapingRef.current = false;

    for (const city of cities) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (!city.checked) {
        continue;
      }

      const index = cities.filter((city) => city.checked).indexOf(city);

      if (stopScrapingRef.current) {
        break;
      } else {
        setCurrentCity(city.name);

        try {
          await scrapeProspectsQuery.mutateAsync({
            payload: { ...prospectFinder, city: city.name },
            index,
          });
        } catch (error) {
          console.error(`Error scraping prospects for ${city.name}:`, error);
        }
      }
    }

    setCurrentCity("");
    stopScrapeProspects();
    setStep(3);
  };

  return {
    currentCity,
    scrapeProspects,
    stopScrapeProspects,
  };
};

export const useScrapeProspectWebsite = () => {
  const {
    setStep,
    prospects,
    setProspects,
    prospectsEmails,
    setProspectsEmail,
    setHasWebsites,
  } = useFindProspectsContext();

  const scrapeWebsiteQuery = useMutation({
    meta: { dontNotifyError: true },
    mutationKey: ["scrape-website"],
    mutationFn: async (arg: {
      payload: { url: string };
      index: number;
      prospectId: number;
    }): Promise<ScrapeWebsiteResponse> => {
      const response = await axios.post(
        SCRAPER_URL + `/website/${arg.prospectId}`,
        arg.payload,
        { headers: getHeaders() }
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

      const newEmails = [...prospectsEmails];
      newEmails[index] = {
        ...newEmails[index],
        status: "skip",
      };
      setProspectsEmail(newEmails);
    },
    onSuccess: (data, { index }) => {
      const newProspects = [...prospects];
      newProspects[index] = {
        ...newProspects[index],
        ...data,
        url: data.website,
        status: "success",
      };
      setProspects(newProspects);

      const hasEmails = prospects[index].emails.length > 0;
      if (hasEmails) return;

      const hasUrl = data.website.length > 0 ?? false;
      const newEmails = [...prospectsEmails];
      newEmails[index] = {
        ...newEmails[index],
        status: hasUrl ? "queued" : "success",
      };
      setProspectsEmail(newEmails);
    },
  });

  const stopScrapingRef = useRef(false);
  const stopScrapeWebsite = () => {
    stopScrapingRef.current = true;
  };

  const scrapeWebsite = async () => {
    stopScrapingRef.current = false;
    setHasWebsites(true);

    for (const prospect of prospects.filter((prospect) => !prospect?.url)) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const index = prospects.indexOf(prospect);

      if (stopScrapingRef.current) {
        break;
      } else {
        try {
          await scrapeWebsiteQuery.mutateAsync({
            payload: { url: prospect.mapsUrl },
            index,
            prospectId: prospect.id,
          });
        } catch (error) {
          console.error(`Error scraping details for ${prospect.name}:`, error);
        }
      }
    }

    stopScrapeWebsite();
    setStep(4);
  };

  return {
    scrapeWebsite,
    stopScrapeWebsite,
  };
};

export const useScrapeProspectEmails = () => {
  const { setStep, prospects, prospectsEmails, setProspectsEmail } =
    useFindProspectsContext();

  const scrapeEmailsQuery = useMutation({
    meta: { dontNotifyError: true },
    mutationKey: ["scrape-emails"],
    mutationFn: async (arg: {
      payload: { url: string };
      index: number;
      prospectId: number;
    }): Promise<ScrapeEmailsResponse> => {
      const response = await axios.post(
        SCRAPER_URL + `/email/${arg.prospectId}`,
        arg.payload,
        { headers: getHeaders() }
      );
      return response.data;
    },
    onMutate: (arg) => {
      const newEmails = [...prospectsEmails];
      newEmails[arg.index] = {
        ...newEmails[arg.index],
        emails: [],
        status: "pending",
      };
      setProspectsEmail(newEmails);
    },
    onError: (_, arg) => {
      const newEmails = [...prospectsEmails];
      newEmails[arg.index] = {
        ...newEmails[arg.index],
        emails: [],
        status: "error",
      };
      setProspectsEmail(newEmails);
    },
    onSuccess: (data, arg) => {
      const newEmails = [...prospectsEmails];
      const excludedDomains = [
        "wixpress.com",
        ".png",
        ".jpg",
        ".webp",
        ".gif",
        ".svg",
        ".tiff",
        ".bmp",
      ];
      const filteredEmails = data.emails.filter((email) => {
        return !excludedDomains.some((domain) => email.includes(domain));
      });

      newEmails[arg.index] = {
        ...newEmails[arg.index],
        emails: filteredEmails,
        status: "success",
      };

      setProspectsEmail(newEmails);
    },
  });

  const stopScrapingRef = useRef(false);
  const stopScrapeEmails = () => {
    stopScrapingRef.current = true;
  };

  const scrapeEmails = async () => {
    stopScrapingRef.current = false;

    for (const prospect of prospects) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const index = prospects.indexOf(prospect);

      if (prospectsEmails[index].status !== "queued") {
        continue;
      }

      if (stopScrapingRef.current) {
        break;
      } else {
        try {
          await scrapeEmailsQuery.mutateAsync({
            payload: { url: prospect.url },
            index,
            prospectId: prospect.id,
          });
        } catch (error) {
          console.error(
            `Error scraping emails for ${prospect.name}'s website:`,
            error
          );
        }
      }
    }

    stopScrapeEmails();
    setStep(5);
    toast.success(
      "Scraping is finished. Prospects are saved to My Prospects page",
      {
        duration: Infinity,
      }
    );
  };

  return {
    scrapeEmails,
    stopScrapeEmails,
  };
};

export const useGetEmailTemplates = () => {
  return useQuery({
    queryKey: ["email_templates"],
    queryFn: async (): Promise<EmailTemplate[]> => {
      const response = await axios.get(EMAIL_TEMPLATES_URL, {
        headers: getHeaders(),
      });
      return response.data;
    },
  });
};

const getEmailTemplate = async (templateId: number): Promise<EmailTemplate> => {
  const response = await axios.get(EMAIL_TEMPLATES_URL + `/${templateId}`, {
    headers: getHeaders(),
  });
  return response.data;
};

export const getEmailTemplateOptions = (templateId: number) => {
  return {
    enabled: templateId ? true : false,
    queryKey: ["email_templates", templateId],
    queryFn: () => getEmailTemplate(templateId),
  };
};

export const useGetEmailTemplate = (templateId: number) => {
  return useQuery(getEmailTemplateOptions(templateId));
};

export const useCreateEmailTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: NewEmailTemplate) => {
      return await axios.post(EMAIL_TEMPLATES_URL, payload, {
        headers: getHeaders(),
      });
    },
    onSuccess: () => {
      toast.success("Email template created!");
      queryClient.invalidateQueries({ queryKey: ["email_templates"] });
    },
  });
};

export const useUpdateEmailTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (arg: { id: number; payload: NewEmailTemplate }) => {
      return await axios.patch(
        EMAIL_TEMPLATES_URL + `/${arg.id}`,
        arg.payload,
        {
          headers: getHeaders(),
        }
      );
    },
    onSuccess: () => {
      toast.success("Email template updated!");
      queryClient.invalidateQueries({ queryKey: ["email_templates"] });
    },
  });
};

export const useDeleteEmailTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (templateId: number) => {
      return await axios.delete(EMAIL_TEMPLATES_URL + `/${templateId}`, {
        headers: getHeaders(),
      });
    },
    onSuccess: () => {
      toast.success("Email template deleted!");
      queryClient.invalidateQueries({ queryKey: ["email_templates"] });
    },
  });
};
