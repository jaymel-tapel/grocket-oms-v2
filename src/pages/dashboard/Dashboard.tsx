import DashboardChart from "../../components/dashboard/dashboard/DashboardChart";
import DashboardCircleChart from "../../components/dashboard/dashboard/DashboardCircleChart";
import DashboardBoxData from "../../components/dashboard/dashboard/DashboardBoxData";
import DashboardTable from "../../components/dashboard/dashboard/DashboardTable";
import LoggedSection from "../../components/sections/LoggedSection";

const Dashboard: React.FC = () => {
  return (
    <LoggedSection>
      <div className="flex justify-between mb-8">
        <span className="text-2xl text-gray-900 font-bold decoration-black	">
          This Week's Overview
        </span>
        <span className="text-sm font-medium items-end"> Current Week</span>
      </div>
      <DashboardBoxData />
      <div
        className="mt-4 mb-4 grid gap-2 md:mt-4 md:gap-4 2xl:mt-6.5 2xl:gap-6.5"
        style={{ gridTemplateColumns: "repeat(13, minmax(0, 1fr))" }}
      >
        <DashboardChart />
        <DashboardCircleChart />
      </div>
      <DashboardTable />
    </LoggedSection>
  );
};

export default Dashboard;
