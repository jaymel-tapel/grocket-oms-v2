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
import CustomDatePicker from "../../components/tools/customDatePicker/CustomDatePicker";

dayjs.extend(utc);

const ClientReports: React.FC = () => {
  const today = dayjs().format("MM/DD/YYYY");
  const thirtyDaysAgo = dayjs().subtract(7, "day").format("MM/DD/YYYY");

  const [selectedBrand] = useAtom(brandAtom);
  const [startRange, setStartRange] = useState(thirtyDaysAgo);
  const [endRange, setEndRange] = useState(today);
  const { data: reportData } = useGetClientReport({
    code: selectedBrand?.code,
    startRange,
    endRange,
  });

  const dateValue = useMemo(() => {
    return {
      from: startRange ? new Date(startRange.replace(/-/g, "/")) : null,
      to: endRange ? new Date(endRange.replace(/-/g, "/")) : null,
    };
  }, [startRange, endRange]);

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
        value: reportData?.clients_logged_in ?? 0,
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
