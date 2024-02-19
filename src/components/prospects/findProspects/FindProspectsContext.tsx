import React, { ReactNode, createContext, useContext, useState } from "react";
import { Prospect } from "../../../services/queries/prospectsQueries";

type ProspectFinder = {
  search: string;
  location: string;
  limit: number;
};

export type ProspectsEmails = {
  id: number;
  emails: string[];
  status: "pending" | "queued" | "error" | "success";
};

export type FindProspectsContext = {
  step: number;
  prospectFinder: ProspectFinder;
  isScraping: boolean;
  prospects: Prospect[];
  hasWebsites: boolean;
  selectedProspects: Prospect[];
  prospectsEmails: ProspectsEmails[];
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setProspectFinder: React.Dispatch<React.SetStateAction<ProspectFinder>>;
  setIsScraping: React.Dispatch<React.SetStateAction<boolean>>;
  setProspects: React.Dispatch<React.SetStateAction<Prospect[]>>;
  setHasWebsites: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedProspects: React.Dispatch<React.SetStateAction<Prospect[]>>;
  setProspectsEmail: React.Dispatch<React.SetStateAction<ProspectsEmails[]>>;
};

export const FindProspectsContext = createContext<FindProspectsContext>({
  step: 10,
  prospectFinder: { search: "", location: "", limit: 1 },
  isScraping: false,
  prospects: [],
  hasWebsites: true,
  selectedProspects: [],
  prospectsEmails: [],
  setStep: () => {},
  setProspectFinder: () => {},
  setIsScraping: () => {},
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
    location: "",
    limit: 10,
  });
  const [isScraping, setIsScraping] = useState(false);
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [hasWebsites, setHasWebsites] = useState(true);
  const [selectedProspects, setSelectedProspects] = useState<Prospect[]>([]);
  const [prospectsEmails, setProspectsEmail] = useState<ProspectsEmails[]>([]);

  return (
    <FindProspectsContext.Provider
      value={{
        step,
        prospectFinder,
        isScraping,
        prospects,
        hasWebsites,
        selectedProspects,
        prospectsEmails,
        setStep,
        setIsScraping,
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
