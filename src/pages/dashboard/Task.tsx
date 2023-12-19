import DashboardTasks from "../../components/dashboard/tasks/DashboardTasks";
import LoggedSection from "../../components/sections/LoggedSection";

const Tasks: React.FC = () => {
  return (
    <LoggedSection>
      <DashboardTasks />
    </LoggedSection>
  );
};

export default Tasks;
