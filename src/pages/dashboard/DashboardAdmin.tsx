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
import CustomDatePicker from "../../components/tools/customDatePicker/CustomDatePicker";

dayjs.extend(utc);

const DashboardAdmin: React.FC = () => {
  const today = dayjs().format("MM/DD/YYYY");
  const thirtyDaysAgo = dayjs().subtract(7, "day").format("MM/DD/YYYY");

  const [selectedBrand] = useAtom(brandAtom);
  const [startRange, setStartRange] = useState(thirtyDaysAgo);
  const [endRange, setEndRange] = useState(today);
  const { statsData, graphData } = useGetAdminDashboard({
    startRange,
    endRange,
    code: selectedBrand?.code,
  });

  const dateValue = useMemo(() => {
    return {
      from: startRange ? new Date(startRange.replace(/-/g, "/")) : null,
      to: endRange ? new Date(endRange.replace(/-/g, "/")) : null,
    };
  }, [startRange, endRange]);

  const dashboardStats = useMemo(() => {
    return [
      {
        label: "New Orders",
        value: statsData ? statsData.ordersOverview.newOrdersCount ?? 0 : 0,
      },
      {
        label: "New Clients",
        value: statsData ? statsData.newClientsCount ?? 0 : 0,
      },
      {
        label: "Paid Invoice",
        value: statsData ? statsData.revenue.toFixed(2) : 0,
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
      { label: "Received Amount", value: graphData.receivedAmount.toFixed(2) },
      { label: "Unpaid Amount", value: graphData.unpaidAmount.toFixed(2) },
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
      <div className="flex sm:justify-end sm:mb-6">
        <div className="flex gap-4 items-center">
          <CustomDatePicker
            label="Start Date:"
            value={dateValue.from}
            onChange={setStartRange}
          />
          <CustomDatePicker
            label="End Date:"
            value={dateValue.to}
            onChange={setEndRange}
          />
        </div>
      </div>

      <div className="max-md:pt-4 pb-8">
        <StatsCards stats={dashboardStats} />
      </div>

      <div className="flex w-full max-xl:grid max-xl:grid-cols-1 gap-7">
        <div className="w-3/4 max-xl:w-full">
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
        <div className="w-6/12 max-xl:w-full ">
          <DonutChart chartData={donutChart} label="Orders Overview" />
        </div>
      </div>

      <div className="mt-8 bg-white">
        <div className="p-6 flex justify-between items-center">
          <span className="text-lg font-bold">Clients Overview</span>
          <Link
            to={"/clients/clients-manager"}
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
