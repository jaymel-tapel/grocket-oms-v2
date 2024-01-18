import React, { ReactNode, createContext, useContext, useState } from "react";
import { Prospect } from "../../../services/queries/prospectsQueries";

type ProspectFinder = {
  keyword: string;
  limit: number;
};

type ProspectsEmails = Array<string> | Array<string[]>;

export type FindProspectsContext = {
  step: number;
  prospectFinder: ProspectFinder;
  prospects: Prospect[];
  prospectsEmails: ProspectsEmails;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setProspectFinder: React.Dispatch<React.SetStateAction<ProspectFinder>>;
  setProspects: React.Dispatch<React.SetStateAction<Prospect[]>>;
  setProspectsEmail: React.Dispatch<React.SetStateAction<ProspectsEmails>>;
};

export const FindProspectsContext = createContext<FindProspectsContext>({
  step: 1,
  prospectFinder: { keyword: "", limit: 1 },
  prospects: [],
  prospectsEmails: [],
  setStep: () => {},
  setProspectFinder: () => {},
  setProspects: () => {},
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
    keyword: "",
    limit: 1,
  });
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [prospectsEmails, setProspectsEmail] = useState<ProspectsEmails>([]);

  return (
    <FindProspectsContext.Provider
      value={{
        step,
        prospectFinder,
        prospects,
        prospectsEmails,
        setStep,
        setProspectFinder,
        setProspects,
        setProspectsEmail,
      }}
    >
      {children}
    </FindProspectsContext.Provider>
  );
};

export default FindProspectsProvider;
