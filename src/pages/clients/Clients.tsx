import { Outlet } from "@tanstack/react-router";
import LoggedSection from "../../components/sections/LoggedSection";

const Clients = () => {
  return (
    <LoggedSection>
      <Outlet />;
    </LoggedSection>
  );
};

export default Clients;
