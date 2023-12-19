import LoggedSection from "../../components/sections/LoggedSection";
import { Outlet } from "@tanstack/react-router";

const Prospects = () => {
  return (
    <LoggedSection>
      <Outlet />
    </LoggedSection>
  );
};

export default Prospects;
