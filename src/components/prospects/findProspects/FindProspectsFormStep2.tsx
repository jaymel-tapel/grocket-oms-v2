import React, { ReactNode } from "react";
import {
  FindProspectsContext,
  useFindProspectsContext,
} from "./FindProspectsContext";
import toast from "react-hot-toast";
import ScrapedProspectsTable from "./ScrapedProspectsTable";

type FormProps = {
  children: ReactNode;
};

const FindProspectsFormStep2: React.FC<FormProps> = ({ children }) => {
  const { setStep, selectedProspects } =
    useFindProspectsContext() as FindProspectsContext;

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
      <ScrapedProspectsTable />
      {children}
    </form>
  );
};

export default FindProspectsFormStep2;
