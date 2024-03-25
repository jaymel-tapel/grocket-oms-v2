import React, { ReactNode } from "react";
import SelectedProspectsTable from "./SelectedProspectsTable";

type FormProps = {
  children: ReactNode;
};

const FindProspectsFormStep5: React.FC<FormProps> = ({ children }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <SelectedProspectsTable />
      {children}
    </form>
  );
};

export default FindProspectsFormStep5;
