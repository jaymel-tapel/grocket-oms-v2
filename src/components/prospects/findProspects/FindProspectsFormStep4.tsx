import React, { ReactNode, useEffect } from "react";
import {
  FindProspectsContext,
  useFindProspectsContext,
} from "./FindProspectsContext";
import SelectedProspectsTable from "./SelectedProspectsTable";
import { useScrapeProspectEmails } from "../../../services/queries/prospectsQueries";

type FormProps = {
  children: ReactNode;
};

const FindProspectsFormStep4: React.FC<FormProps> = ({ children }) => {
  const { setStep } = useFindProspectsContext() as FindProspectsContext;

  const { scrapeEmails, stopScrapeEmails } = useScrapeProspectEmails();

  const handleSubmmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    stopScrapeEmails();
    setStep(4);
  };

  useEffect(() => {
    // const initialProspectEmails: ProspectsEmails[] = prospects.map(
    //   (prospect) => {
    //     const hasEmails = prospect.emails.length > 0;

    //     return {
    //       id: prospect?.id,
    //       status: prospect?.url && hasEmails ? "success" : "queued",
    //       emails: [],
    //     };
    //   }
    // );

    // setProspectsEmail(initialProspectEmails);
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
