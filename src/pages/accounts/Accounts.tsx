import { Outlet } from "@tanstack/react-router";
import LoggedSection from "../../components/sections/LoggedSection";

const Accounts = () => {
  return (
    <LoggedSection>
      <Outlet />
    </LoggedSection>
  );
};

export default Accounts;
