import LoggedSection from "../../components/sections/LoggedSection";
import BarLineChart from "../../components/tools/charts/BarLineChart";
import StatsCards from "../../components/tools/cards/StatsCards";
import DonutChart from "../../components/tools/charts/DonutChart";
import { useGetAdminDashboard } from "../../services/queries/userQueries";
import { useMemo, useState } from "react";
import { sliceDate } from "../../utils/utils";
import ClientsOverviewTable from "../../components/dashboard/dashboard/ClientsOverviewTable";
import { Link } from "@tanstack/react-router";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useAtom } from "jotai/react";
import { brandAtom } from "../../services/queries/brandsQueries";

dayjs.extend(utc);

const DashboardAdmin: React.FC = () => {
  const today = dayjs().format("YYYY-MM-DD");
  const thirtyDaysAgo = dayjs().subtract(7, "day").format("YYYY-MM-DD");

  const [selectedBrand] = useAtom(brandAtom);
  const [startRange, setStartRange] = useState(thirtyDaysAgo);
  const [endRange, setEndRange] = useState(today);
  const { statsData, graphData } = useGetAdminDashboard({
    startRange: dayjs(startRange).format("MM-DD-YYYY"),
    endRange: dayjs(endRange).format("MM-DD-YYYY"),
    code: selectedBrand?.code,
  });

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
      <div className="flex justify-end mb-4">
        <div className="flex gap-4 items-center">
          <input
            type="date"
            id="startRange"
            value={startRange}
            onChange={(e) =>
              setStartRange(dayjs(e.target.value).format("YYYY-MM-DD"))
            }
            className="ml-auto block w-full max-w-[12rem] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          />
          <span>-</span>
          <input
            type="date"
            id="endRange"
            value={endRange}
            onChange={(e) =>
              setEndRange(dayjs(e.target.value).format("YYYY-MM-DD"))
            }
            className="ml-auto block w-full max-w-[12rem] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          />
        </div>
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
            tickAmount={barChart.data[0]?.data?.length > 15 ? 10 : undefined}
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
            search={{ code: undefined }}
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
