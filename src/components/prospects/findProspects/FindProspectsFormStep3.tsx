import React, { ReactNode, useEffect } from "react";
import {
  FindProspectsContext,
  useFindProspectsContext,
} from "./FindProspectsContext";
import ScrapedProspectsTable from "./ScrapedProspectsTable";
import { useScrapeProspectWebsite } from "../../../services/queries/prospectsQueries";

type FormProps = {
  children: ReactNode;
};

const FindProspectsFormStep3: React.FC<FormProps> = ({ children }) => {
  const { setStep, hasWebsites } =
    useFindProspectsContext() as FindProspectsContext;

  const { scrapeWebsite, stopScrapeWebsite } = useScrapeProspectWebsite();

  const handleSubmmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (selectedProspects.length === 0) {
    //   toast.error("Please select 1 or more prospects");
    //   return;
    // }

    stopScrapeWebsite();
    setStep(3);
  };

  useEffect(() => {
    if (!hasWebsites) {
      scrapeWebsite();
    }
    //eslint-disable-next-line
  }, []);

  return (
    <form onSubmit={handleSubmmit}>
      <ScrapedProspectsTable />
      {children}
    </form>
  );
};

export default FindProspectsFormStep3;
