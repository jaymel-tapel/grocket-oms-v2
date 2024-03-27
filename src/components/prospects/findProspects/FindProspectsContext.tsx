import React, { ReactNode, createContext, useContext, useState } from "react";
import { Estimate, Prospect } from "../../../services/queries/prospectsQueries";

type ProspectFinder = {
  search: string;
  country: string;
  limit: number;
  countryCode: string;
};

export type ProspectsEmails = {
  id: number;
  emails: string[];
  status: "pending" | "queued" | "error" | "success";
};

export type City = {
  name: string;
  checked: boolean;
  status: "pending" | "queued" | "error" | "success";
};

export type FindProspectsContext = {
  step: number;
  prospectFinder: ProspectFinder;
  prospects: Prospect[];
  hasWebsites: boolean;
  selectedProspects: Prospect[];
  prospectsEmails: ProspectsEmails[];
  cities: City[];
  estimates: Estimate;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setProspectFinder: React.Dispatch<React.SetStateAction<ProspectFinder>>;
  setProspects: React.Dispatch<React.SetStateAction<Prospect[]>>;
  setHasWebsites: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedProspects: React.Dispatch<React.SetStateAction<Prospect[]>>;
  setProspectsEmail: React.Dispatch<React.SetStateAction<ProspectsEmails[]>>;
  setCities: React.Dispatch<React.SetStateAction<City[]>>;
  setEstimates: React.Dispatch<React.SetStateAction<Estimate>>;
};

export const FindProspectsContext = createContext<FindProspectsContext>({
  step: 10,
  prospectFinder: { search: "", country: "", limit: 1, countryCode: "" },
  cities: [],
  estimates: {
    estimated_email: "",
    estimated_search: "",
    estimated_web: "",
    total_estimated_time: "",
  },
  prospects: [],
  hasWebsites: true,
  selectedProspects: [],
  prospectsEmails: [],
  setStep: () => {},
  setCities: () => {},
  setEstimates: () => {},
  setProspectFinder: () => {},
  setProspects: () => {},
  setHasWebsites: () => {},
  setSelectedProspects: () => {},
  setProspectsEmail: () => {},
});

export const useFindProspectsContext = () => useContext(FindProspectsContext);

type ProviderProps = {
  children: ReactNode;
};

export const FindProspectsProvider: React.FC<ProviderProps> = ({
  children,
}) => {
  const [step, setStep] = useState(1);
  const [prospectFinder, setProspectFinder] = useState<ProspectFinder>({
    search: "",
    country: "",
    countryCode: "",
    limit: 10,
  });
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [hasWebsites, setHasWebsites] = useState(false);
  const [cities, setCities] = useState<City[]>([]);
  const [estimates, setEstimates] = useState({
    estimated_email: "",
    estimated_search: "",
    estimated_web: "",
    total_estimated_time: "",
  });
  const [selectedProspects, setSelectedProspects] = useState<Prospect[]>([]);
  const [prospectsEmails, setProspectsEmail] = useState<ProspectsEmails[]>([]);

  return (
    <FindProspectsContext.Provider
      value={{
        step,
        prospectFinder,
        prospects,
        hasWebsites,
        selectedProspects,
        prospectsEmails,
        cities,
        estimates,
        setStep,
        setCities,
        setEstimates,
        setProspectFinder,
        setProspects,
        setHasWebsites,
        setSelectedProspects,
        setProspectsEmail,
      }}
    >
      {children}
    </FindProspectsContext.Provider>
  );
};

export default FindProspectsProvider;
