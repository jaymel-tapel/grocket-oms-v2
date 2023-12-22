import DashboardCircleChart from "../../components/dashboard/dashboard/DashboardCircleChart";
import DashboardTable from "../../components/dashboard/dashboard/DashboardTable";
import LoggedSection from "../../components/sections/LoggedSection";
import BarLineChart from "../../components/tools/charts/BarLineChart";
import StatsCards from "../../components/tools/cards/StatsCards";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const Dashboard: React.FC = () => {
  const dataCards = [
    {
      label: "New Orders",
      value: 104,
      percentage: {
        label: "Since Last Week",
        value: -10,
      },
    },
    {
      label: "New Clients",
      value: 90,
      percentage: {
        label: "Since Last Week",
        value: 10,
      },
    },
    {
      label: "Paid Invoice",
      value: "$ 9,999",
      percentage: {
        label: "Since Last Week",
        value: 5,
      },
    },
  ];

  const dataBar = [
    {
      name: "2022",
      data: [
        { y: 80, x: "Jan" },
        { y: 70, x: "Feb" },
        { y: 85, x: "Mar" },
        { y: 78, x: "Apr" },
        { y: 95, x: "May" },
        { y: 90, x: "Jun" },
        { y: 96, x: "Jul" },
        { y: 98, x: "Aug" },
        { y: 93, x: "Sep" },
        { y: 98, x: "Oct" },
        { y: 85, x: "Nov" },
        { y: 90, x: "Dec" },
      ],
    },
    {
      name: "2023",
      data: [
        { y: 50, x: "Jan" },
        { y: 77, x: "Feb" },
        { y: 90, x: "Mar" },
        { y: 85, x: "Apr" },
        { y: 90, x: "May" },
        { y: 89, x: "Jun" },
        { y: 97, x: "Jul" },
        { y: 86, x: "Aug" },
        { y: 90, x: "Sep" },
        { y: 91, x: "Oct" },
        { y: 95, x: "Nov" },
        { y: 90, x: "Dec" },
      ],
    },
  ];

  const dataLabel = [
    { label: "Received Amount", value: "$45,070.00" },
    { label: "Unpaid Amount", value: "$32,400.00" },
  ];

  const ColorsChart = ["#3C50E0", "#C7D2E2"];

  return (
    <LoggedSection>
      <div className="flex justify-between mb-8">
        <span className="text-2xl text-gray-900 font-bold decoration-black	">
          This Week's Overview
        </span>
        <span className="flex gap-2 text-base font-medium items-end">
          Current Week <ChevronDownIcon className="w-5 h-5" />
        </span>
      </div>
      <div className="pb-8">
        <StatsCards stats={dataCards} />
      </div>

      <div className="flex flex-col-2 max-sm:flex-col md:gap-6 2xl:mt-6.5 2xl:gap-6.5">
        <div className="w-[670px] md:w-[670px] 2xl:w-screen">
          <BarLineChart
            chartColors={ColorsChart}
            chartData={dataBar}
            additionalData={dataLabel}
            disableLegends={true}
            label="Revenue Overview"
            chartType="area"
          />
        </div>
        <div className="">
          <DashboardCircleChart />
        </div>
      </div>
      <div className="pt-16">
        <DashboardTable />
      </div>
    </LoggedSection>
  );
};

export default Dashboard;
