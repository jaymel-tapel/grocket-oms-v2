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

  const dashboardStats = useMemo(() => {
    if (!statsData) return [];

    return [
      {
        label: "New Orders",
        value: statsData.newOrdersCount ?? 0,
      },
      {
        label: "New Clients",
        value: statsData.newClientsCount ?? 0,
      },
      {
        label: "Unpaid Commissions",
        value: statsData.unpaidCommission.toFixed(2),
      },
      {
        label: "Current Commissions",
        value: statsData.currentCommission.toFixed(2),
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
