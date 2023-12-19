import DashboardInbox from "../../components/dashboard/inbox/DashboardInbox";
import LoggedSection from "../../components/sections/LoggedSection";

const Inbox: React.FC = () => {
  return (
    <LoggedSection>
      <DashboardInbox />
    </LoggedSection>
  );
};

export default Inbox;
