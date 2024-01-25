import React, { ReactNode } from "react";
import SelectedProspectsTable from "./SelectedProspectsTable";

type FormProps = {
  children: ReactNode;
};

const FindProspectsFormStep4: React.FC<FormProps> = ({ children }) => {
  const handleSubmmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmmit}>
      <SelectedProspectsTable />
      {children}
    </form>
  );
};

export default FindProspectsFormStep4;
