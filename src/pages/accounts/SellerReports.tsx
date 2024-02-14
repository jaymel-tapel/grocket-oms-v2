import { useMemo } from "react";
import StatsCards from "../../components/tools/cards/StatsCards";
// import DropdownText from "../../components/tools/dropdowntext/DropdownText";
import BarLineChart from "../../components/tools/charts/BarLineChart";
import { sliceDate } from "../../utils/utils";
import { useAtom } from "jotai/react";
import { brandAtom } from "../../services/queries/brandsQueries";
import {
  useGetSellerReport,
  useGetSellerStats,
} from "../../services/queries/accountsQueries";

// const filtersList = [
//   { id: "currentWeek", label: "Current Week" },
//   { id: "currentMonth", label: "Current Month" },
//   { id: "last90days", label: "Last 90 days" },
//   { id: "custom", label: "Custom" },
// ];

const SellerReports: React.FC = () => {
  // const [searchFilter, setSearchFilter] = useState({
  //   id: "currentWeek",
  //   label: "Current Week",
  // });

  const [selectedBrand] = useAtom(brandAtom);
  const { data: statsData } = useGetSellerStats({ code: selectedBrand?.code });
  const { data: reportData } = useGetSellerReport({
    code: selectedBrand?.code,
  });

  // const handleChangeFilter = (newFilter: (typeof filtersList)[number]) => {
  //   setSearchFilter(newFilter);
  // };

  const clientStats = useMemo(() => {
    // temporary data
    return [
      {
        value: statsData?.allSellers ?? 0,
        label: "Total Sellers",
        // percentage: { label: "Since last week", value: 2.5 },
      },
      {
        value: statsData?.activeSellers ?? 0,
        label: "Active Sellers",
        // percentage: { label: "Since last week", value: -1.5 },
      },
      {
        value: statsData?.inactiveSellers ?? 0,
        label: "Inactive Sellers",
        // percentage: { label: "Since last week", value: 0.5 },
      },
    ];
  }, [statsData]);

  const clientsChartData = useMemo(() => {
    const activeSellers = reportData?.activeSellerCount.map((item) => {
      return { x: sliceDate(item.date), y: item.activeSellerCount };
    });

    const inactiveSellers = reportData?.inactiveSellerCount.map((item) => {
      return { x: sliceDate(item.date), y: item.inactiveSellerCount };
    });

    return [
      {
        name: "Active Sellers",
        data: activeSellers ?? [],
      },
      {
        name: "Inactive Sellers",
        data: inactiveSellers ?? [],
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

export default SellerReports;
