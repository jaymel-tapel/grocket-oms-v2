import { useMemo, useState } from "react";
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
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const SellerReports: React.FC = () => {
  const today = dayjs().format("YYYY-MM-DD");
  const thirtyDaysAgo = dayjs().subtract(30, "day").format("YYYY-MM-DD");

  const [selectedBrand] = useAtom(brandAtom);
  const [startRange, setStartRange] = useState(thirtyDaysAgo);
  const [endRange, setEndRange] = useState(today);

  const { data: statsData } = useGetSellerStats({
    code: selectedBrand?.code,
    startRange: dayjs(startRange).format("MM-DD-YYYY"),
    endRange: dayjs(endRange).format("MM-DD-YYYY"),
  });

  const { data: reportData } = useGetSellerReport({
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

      <div className="max-sm:py-4">
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

export default SellerReports;
