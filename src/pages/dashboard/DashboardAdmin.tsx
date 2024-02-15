import LoggedSection from "../../components/sections/LoggedSection";
import BarLineChart from "../../components/tools/charts/BarLineChart";
import StatsCards from "../../components/tools/cards/StatsCards";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import DonutChart from "../../components/tools/charts/DonutChart";
import { useGetAdminDashboard } from "../../services/queries/userQueries";
import { useMemo } from "react";
import { sliceDate } from "../../utils/utils";
import ClientsOverviewTable from "../../components/dashboard/dashboard/ClientsOverviewTable";
import { Link } from "@tanstack/react-router";

const DashboardAdmin: React.FC = () => {
  const { statsData, graphData } = useGetAdminDashboard();

  const dashboardStats = useMemo(() => {
    if (!statsData) return [];

    return [
      {
        label: "New Orders",
        value: statsData.ordersOverview.newOrdersCount,
      },
      {
        label: "New Clients",
        value: statsData.newclientCount,
      },
      {
        label: "Paid Invoice",
        value: statsData.revenue.toFixed(2),
      },
    ];
  }, [statsData]);

  const barChart = useMemo(() => {
    if (!graphData)
      return { data: [], labels: [], colors: ["#3C50E0", "#C7D2E2"] };

    const paidReviews = graphData?.paidReviews.map((item) => {
      return { x: sliceDate(item.date), y: item.paidReviewsCount };
    });

    const unpaidReviews = graphData?.unpaidReviews.map((item) => {
      return { x: sliceDate(item.date), y: item.unpaidReviewsCount };
    });

    const data = [
      {
        name: "Paid Reviews",
        data: paidReviews ?? [],
      },
      {
        name: "Unpaid Reviews",
        data: unpaidReviews ?? [],
      },
    ];

    const labels = [
      { label: "Received Amount", value: graphData.receivedAmount },
      { label: "Unpaid Amount", value: graphData.unpaidAmount },
    ];

    const colors = ["#3C50E0", "#C7D2E2"];

    return { data, labels, colors };
  }, [graphData]);

  const donutChart = useMemo(() => {
    const data = {
      labels: [
        // "Neu",
        // "Beufragt",
        // "Weiterleitung",
        // "Widerspruch",
        // "Geischeitert",
        // "Geloscht",
        "New",
        "Sent Invoice",
        "Reminder 1",
        "Reminder 2",
        "Paid",
        "Unpaid",
      ],
      values: [
        statsData?.ordersOverview.newOrdersCount ?? 0,
        statsData?.ordersOverview.invoiceOrdersCount ?? 0,
        statsData?.ordersOverview.pr1Count ?? 0,
        statsData?.ordersOverview.pr2Count ?? 0,
        statsData?.ordersOverview.paidOrdersCount ?? 0,
        0,
      ],
      colors: [
        "#27F6C2",
        "#089063",
        "#3C50E0",
        "#6577F3",
        "#80CAEE",
        "#0FADCF",
      ],
    };

    return data;
  }, [statsData]);

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
        <StatsCards stats={dashboardStats} />
      </div>

      <div className="flex w-full max-sm:grid max-sm:grid-cols-1 gap-7">
        <div className="w-3/4 max-sm:w-full">
          <BarLineChart
            chartColors={barChart.colors}
            chartData={barChart.data}
            additionalData={barChart.labels}
            disableLegends={true}
            label="Revenue Overview"
            chartType="area"
            height={420}
          />
        </div>
        <div className="w-6/12 max-sm:w-full ">
          <DonutChart chartData={donutChart} label="Orders Overview" />
        </div>
      </div>

      <div className="mt-16 bg-white">
        <div className="p-6 flex justify-between items-center">
          <span className="text-lg font-bold">Clients Overview</span>
          <Link
            to={"/clients/clients_manager"}
            search={{ searchClients: { code: undefined } }}
            className="text-sm text-grBlue-dark"
          >
            View All Clients
          </Link>
        </div>
        <ClientsOverviewTable clients={statsData?.clientsOverview ?? []} />
      </div>
    </LoggedSection>
  );
};

export default DashboardAdmin;
