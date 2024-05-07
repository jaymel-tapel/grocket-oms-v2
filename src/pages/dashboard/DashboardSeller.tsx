import LoggedSection from "../../components/sections/LoggedSection";
import StatsCards from "../../components/tools/cards/StatsCards";
import { useGetSellerDashboard } from "../../services/queries/userQueries";
import { useMemo, useState } from "react";
import ClientsOverviewTable from "../../components/dashboard/dashboard/ClientsOverviewTable";
import { Link } from "@tanstack/react-router";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useAtom } from "jotai/react";
import { brandAtom } from "../../services/queries/brandsQueries";
import LastFiveOrdersTable from "../../components/dashboard/dashboard/LastFiveOrdersTable";
import { sliceDate } from "../../utils/utils";
import BarLineChart from "../../components/tools/charts/BarLineChart";
import CustomDatePicker from "../../components/tools/customDatePicker/CustomDatePicker";

dayjs.extend(utc);

const DashboardSeller: React.FC = () => {
  const today = dayjs().format("YYYY-MM-DD");
  const thirtyDaysAgo = dayjs().subtract(7, "day").format("YYYY-MM-DD");

  const [selectedBrand] = useAtom(brandAtom);
  const [startRange, setStartRange] = useState(thirtyDaysAgo);
  const [endRange, setEndRange] = useState(today);
  const { statsData, graphData } = useGetSellerDashboard({
    startRange: dayjs(startRange).format("MM-DD-YYYY"),
    endRange: dayjs(endRange).format("MM-DD-YYYY"),
    code: selectedBrand?.code,
  });

  const dateValue = useMemo(() => {
    return {
      from: startRange ? new Date(startRange) : null,
      to: endRange ? new Date(endRange) : null,
    };
  }, [startRange, endRange]);

  const dashboardStats = useMemo(() => {
    return [
      {
        label: "New Orders",
        value: statsData ? statsData.newOrdersCount ?? 0 : 0,
      },
      {
        label: "New Clients",
        value: statsData ? statsData.newClientsCount ?? 0 : 0,
      },
      {
        label: "Unpaid Commissions",
        value: statsData ? statsData.unpaidCommission.toFixed(2) : 0,
      },
      {
        label: "Current Commissions",
        value: statsData ? statsData.currentCommission.toFixed(2) : 0,
      },
    ];
  }, [statsData]);

  const barChart = useMemo(() => {
    if (!graphData) return { data: [], colors: ["#3C50E0"] };

    const paidReviews = graphData?.newOrdersStat.map((item) => {
      return { x: sliceDate(item.date), y: item.paidReviewsCount };
    });

    const data = [
      {
        name: "Paid Reviews",
        data: paidReviews ?? [],
      },
    ];

    const colors = ["#3C50E0"];

    return { data, colors };
  }, [graphData]);

  const lastFiveOrderData = useMemo(() => {
    return statsData?.ordersOverview.map((data) => {
      return {
        orderId: data.id,
        name: data.client,
        date: data.date,
        total: data.total,
        reviews: data.reviews,
        payment_status: data.payment_status,
        remarks: data.remarks,
      };
    });
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

      <div>
        <BarLineChart
          chartColors={barChart.colors}
          chartData={barChart.data}
          disableLegends={true}
          label="Paid Reviews"
          chartType="area"
          height={350}
          tickAmount={barChart.data[0]?.data?.length > 15 ? 10 : undefined}
        />
      </div>

      <div className="mt-8 bg-white">
        <div className="p-6 flex justify-between items-center">
          <span className="text-lg font-bold">Last 5 Orders</span>
          <Link
            to={"/orders/orders_manager"}
            search={{ code: undefined }}
            className="text-sm text-grBlue-dark"
          >
            View All Orders
          </Link>
        </div>
        <LastFiveOrdersTable orders={lastFiveOrderData ?? []} />
      </div>

      <div className="mt-8 bg-white">
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

export default DashboardSeller;
