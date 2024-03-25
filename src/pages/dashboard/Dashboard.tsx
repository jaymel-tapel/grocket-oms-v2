import LoggedSection from "../../components/sections/LoggedSection";
import { Outlet } from "@tanstack/react-router";

const Dashboard: React.FC = () => {
  return (
    <LoggedSection>
      <Outlet />
    </LoggedSection>
  );
};

export default Dashboard;
