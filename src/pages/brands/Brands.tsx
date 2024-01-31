import { Outlet } from "@tanstack/react-router";
import LoggedSection from "../../components/sections/LoggedSection";

const Brands = () => {
  return (
    <LoggedSection>
      <Outlet />
    </LoggedSection>
  );
};

export default Brands;
