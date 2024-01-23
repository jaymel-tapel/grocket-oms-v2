import React, { ReactNode } from "react";
import {
  FindProspectsContext,
  useFindProspectsContext,
} from "./FindProspectsContext";
import toast from "react-hot-toast";
import ScrapedProspectsTable from "./ScrapedProspectsTable";
import Spinner from "../../tools/spinner/Spinner";
import { useScrapeProspects } from "../../../services/queries/prospectsQueries";

type FormProps = {
  children: ReactNode;
};

const FindProspectsFormStep2: React.FC<FormProps> = ({ children }) => {
  const { setStep, selectedProspects } =
    useFindProspectsContext() as FindProspectsContext;

  const { isPending } = useScrapeProspects();

  const handleSubmmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedProspects.length === 0) {
      toast.error("Please select 1 or more prospects");
      return;
    }

    setStep(3);
  };

  return (
    <form onSubmit={handleSubmmit}>
      {isPending ? <Spinner /> : <ScrapedProspectsTable />}
      {children}
    </form>
  );
};

export default FindProspectsFormStep2;
