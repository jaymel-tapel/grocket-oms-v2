import React, { ReactNode } from "react";
import SelectedProspectsTable from "./SelectedProspectsTable";

type FormProps = {
  children: ReactNode;
};

const FindProspectsFormStep4: React.FC<FormProps> = ({ children }) => {
  return (
    <form>
      <SelectedProspectsTable />
      {children}
    </form>
  );
};

export default FindProspectsFormStep4;
