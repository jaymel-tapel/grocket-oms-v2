import { useMemo, useState } from "react";
import StatsCards from "../../components/tools/cards/StatsCards";
// import DropdownText from "../../components/tools/dropdowntext/DropdownText";
import { useGetClientReport } from "../../services/queries/clientsQueries";
import BarLineChart from "../../components/tools/charts/BarLineChart";
import { sliceDate } from "../../utils/utils";
import { useAtom } from "jotai/react";
import { brandAtom } from "../../services/queries/brandsQueries";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

// const filtersList = [
//   { id: "currentWeek", label: "Current Week" },
//   { id: "currentMonth", label: "Current Month" },
//   { id: "last90days", label: "Last 90 days" },
//   { id: "custom", label: "Custom" },
// ];

const ClientReports: React.FC = () => {
  // const [searchFilter, setSearchFilter] = useState({
  //   id: "currentWeek",
  //   label: "Current Week",
  // });

  const today = dayjs().format("YYYY-MM-DD");
  const thirtyDaysAgo = dayjs().subtract(30, "day").format("YYYY-MM-DD");

  const [selectedBrand] = useAtom(brandAtom);
  const [startRange, setStartRange] = useState(thirtyDaysAgo);
  const [endRange, setEndRange] = useState(today);
  const { data: reportData } = useGetClientReport({
    code: selectedBrand?.code,
    startRange: dayjs(startRange).format("MM-DD-YYYY"),
    endRange: dayjs(endRange).format("MM-DD-YYYY"),
  });

  // const handleChangeFilter = (newFilter: (typeof filtersList)[number]) => {
  //   setSearchFilter(newFilter);
  // };

  const clientStats = useMemo(() => {
    // temporary data
    return [
      {
        value: reportData?.total_clients ?? 0,
        label: "Total Clients",
        // percentage: { label: "Since last week", value: 2.5 },
      },
      {
        value: reportData?.new_clients ?? 0,
        label: "New Clients",
        // percentage: { label: "Since last week", value: -1.5 },
      },
      {
        value: reportData?.clientsLoggedIn ?? 0,
        label: "Clients Logged In",
        // percentage: { label: "Since last week", value: 0.5 },
      },
    ];
  }, [reportData]);

  const clientsChartData = useMemo(() => {
    const newClientsData = reportData?.newClientsResult.map((order) => {
      return { x: sliceDate(order.date), y: order.count };
    });

    const inactiveClientsData = reportData?.inactiveClientsResult.map(
      (order) => {
        return { x: sliceDate(order.date), y: order.count };
      }
    );

    return [
      {
        name: "New Clients",
        data: newClientsData ?? [],
      },
      {
        name: "Inactive Clients",
        data: inactiveClientsData ?? [],
      },
    ];
  }, [reportData]);

  return (
    <div>
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

      <div className="max-md:py-4">
        <StatsCards stats={clientStats} />
      </div>

      <div className="mt-6">
        <BarLineChart
          chartType="area"
          chartData={clientsChartData}
          chartColors={["#3C50E0", "#DC3545"]}
        />
      </div>
    </div>
  );
};

export default ClientReports;
