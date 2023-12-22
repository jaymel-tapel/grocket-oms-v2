import { Outlet } from "@tanstack/react-router";
import LoggedSection from "../../components/sections/LoggedSection";

const Tasks: React.FC = () => {
  return (
    <LoggedSection>
      <Outlet />
    </LoggedSection>
  );
};

export default Tasks;
