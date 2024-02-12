import { useMemo } from "react";
import StatsCards from "../../components/tools/cards/StatsCards";
// import DropdownText from "../../components/tools/dropdowntext/DropdownText";
import { useGetClientReport } from "../../services/queries/clientsQueries";
import BarLineChart from "../../components/tools/charts/BarLineChart";
import { sliceDate } from "../../utils/utils";

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

  const { data: reportData } = useGetClientReport();

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
      {/* <div className="flex justify-end mb-4">
        <DropdownText
          value={searchFilter}
          onChange={handleChangeFilter}
          list={filtersList}
          removeBorders={true}
        />
      </div> */}

      <StatsCards stats={clientStats} />

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
