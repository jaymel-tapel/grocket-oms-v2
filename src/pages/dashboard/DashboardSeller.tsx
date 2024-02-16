import LoggedSection from "../../components/sections/LoggedSection";
import StatsCards from "../../components/tools/cards/StatsCards";
import { useGetAdminDashboard } from "../../services/queries/userQueries";
import { useMemo, useState } from "react";
import ClientsOverviewTable from "../../components/dashboard/dashboard/ClientsOverviewTable";
import { Link } from "@tanstack/react-router";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useAtom } from "jotai/react";
import { brandAtom } from "../../services/queries/brandsQueries";
import LastFiveOrdersTable from "../../components/dashboard/dashboard/LastFiveOrdersTable";

dayjs.extend(utc);

const DashboardSeller: React.FC = () => {
  const today = dayjs().format("YYYY-MM-DD");
  const thirtyDaysAgo = dayjs().subtract(7, "day").format("YYYY-MM-DD");

  const [selectedBrand] = useAtom(brandAtom);
  const [startRange, setStartRange] = useState(thirtyDaysAgo);
  const [endRange, setEndRange] = useState(today);
  const { statsData } = useGetAdminDashboard({
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
        label: "Unpaid Commissions",
        value: statsData.revenue.toFixed(2),
      },
      {
        label: "Current Commissions",
        value: statsData.revenue.toFixed(2),
      },
    ];
  }, [statsData]);

  const lastFiveOrderData = useMemo(() => {
    return [
      {
        orderId: 1,
        name: "Client 1",
        date: "2-16-2024",
        total: 100,
        reviews: 5,
        payment_status: "NEW",
        remarks: "Test",
      },
      {
        orderId: 2,
        name: "Client 2",
        date: "2-16-2024",
        total: 100,
        reviews: 5,
        payment_status: "NEW",
        remarks: "Test",
      },
      {
        orderId: 3,
        name: "Client 3",
        date: "2-16-2024",
        total: 100,
        reviews: 5,
        payment_status: "NEW",
        remarks: "Test",
      },
      {
        orderId: 4,
        name: "Client 4",
        date: "2-16-2024",
        total: 100,
        reviews: 5,
        payment_status: "NEW",
        remarks: "Test",
      },
      {
        orderId: 5,
        name: "Client 5",
        date: "2-16-2024",
        total: 100,
        reviews: 5,
        payment_status: "NEW",
        remarks: "Test",
      },
    ];
  }, []);

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

      <div className="mt-16 bg-white">
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
        <LastFiveOrdersTable orders={lastFiveOrderData} />
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

export default DashboardSeller;
