import React, { ReactNode, useEffect } from "react";
import {
  FindProspectsContext,
  useFindProspectsContext,
} from "./FindProspectsContext";
import toast from "react-hot-toast";
import ScrapedProspectsTable from "./ScrapedProspectsTable";
import { useScrapeProspectWebsite } from "../../../services/queries/prospectsQueries";

type FormProps = {
  children: ReactNode;
};

const FindProspectsFormStep2: React.FC<FormProps> = ({ children }) => {
  const { setStep, selectedProspects, hasWebsites } =
    useFindProspectsContext() as FindProspectsContext;

  const { scrapeWebsite, stopScrapeWebsite } = useScrapeProspectWebsite();

  const handleSubmmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedProspects.length === 0) {
      toast.error("Please select 1 or more prospects");
      return;
    }

    stopScrapeWebsite();
    setStep(3);
  };

  useEffect(() => {
    if (!hasWebsites) {
      scrapeWebsite();
    }
    //eslint-disable-next-line
  }, [hasWebsites]);

  return (
    <form onSubmit={handleSubmmit}>
      <ScrapedProspectsTable />
      {children}
    </form>
  );
};

export default FindProspectsFormStep2;
