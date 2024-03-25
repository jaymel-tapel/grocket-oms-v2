import React, { ReactNode, useEffect } from "react";
import {
  FindProspectsContext,
  ProspectsEmails,
  useFindProspectsContext,
} from "./FindProspectsContext";
import SelectedProspectsTable from "./SelectedProspectsTable";
import { useScrapeProspectEmails } from "../../../services/queries/prospectsQueries";

type FormProps = {
  children: ReactNode;
};

const FindProspectsFormStep4: React.FC<FormProps> = ({ children }) => {
  const { setStep, prospects, setProspectsEmail } =
    useFindProspectsContext() as FindProspectsContext;

  const { scrapeEmails, stopScrapeEmails } = useScrapeProspectEmails();

  const handleSubmmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    stopScrapeEmails();
    setStep(4);
  };

  useEffect(() => {
    const initialProspectEmails: ProspectsEmails[] = prospects.map(
      (prospect) => {
        return {
          id: prospect?.id,
          status: prospect?.website ? "queued" : "success",
          emails: [],
        };
      }
    );

    setProspectsEmail(initialProspectEmails);
    scrapeEmails();
    //eslint-disable-next-line
  }, []);

  return (
    <form onSubmit={handleSubmmit}>
      <SelectedProspectsTable />
      {children}
    </form>
  );
};

export default FindProspectsFormStep4;
