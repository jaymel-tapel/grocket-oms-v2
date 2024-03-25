import LoggedSection from "../../../components/sections/LoggedSection";
import { Outlet } from "@tanstack/react-router";

const EmailTemplates = () => {
  return (
    <LoggedSection>
      <Outlet />
    </LoggedSection>
  );
};

export default EmailTemplates;
