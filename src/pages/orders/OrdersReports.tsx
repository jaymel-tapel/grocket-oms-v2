import OrdersChartPaymentCount from "../../components/orders/ordersReport/OrdersChartPaymentCount";
import OrdersChartPaymentAmount from "../../components/orders/ordersReport/OrdersChartPaymentAmount";
import OrdersCircleChart from "../../components/orders/ordersReport/OrdersCircleChart";
import OrdersChartStatusCount from "../../components/orders/ordersReport/OrdersChartStatusCount";
import OrdersChartStatusAmount from "../../components/orders/ordersReport/OrdersChartStatusAmount";
import { useMemo, useState } from "react";
import DropdownText from "../../components/tools/dropdowntext/DropdownText";
import BarLineChart from "../../components/tools/charts/BarLineChart";
import StatsCards from "../../components/tools/cards/StatsCards";

const filtersList = [
  { id: "currentWeek", label: "Current Week" },
  { id: "currentMonth", label: "Current Month" },
  { id: "last90days", label: "Last 90 days" },
  { id: "custom", label: "Custom" },
];

const OrdersReports = () => {
  const [searchFilter, setSearchFilter] = useState({
    id: "currentWeek",
    label: "Current Week",
  });

  const handleChangeFilter = (newFilter: (typeof filtersList)[number]) => {
    setSearchFilter(newFilter);
  };

  const paidOrdersData = useMemo(() => {
    return [
      {
        name: "Paid Orders",
        data: [
          { x: "Sep", y: Math.floor(Math.random() * 101) },
          { x: "Oct", y: Math.floor(Math.random() * 101) },
          { x: "Nov", y: Math.floor(Math.random() * 101) },
          { x: "Dec", y: Math.floor(Math.random() * 101) },
          { x: "Jan", y: Math.floor(Math.random() * 101) },
          { x: "Feb", y: Math.floor(Math.random() * 101) },
          { x: "Mar", y: Math.floor(Math.random() * 101) },
          { x: "Apr", y: Math.floor(Math.random() * 101) },
          { x: "May", y: Math.floor(Math.random() * 101) },
          { x: "Jun", y: Math.floor(Math.random() * 101) },
          { x: "Jul", y: Math.floor(Math.random() * 101) },
          { x: "Aug", y: Math.floor(Math.random() * 101) },
        ],
      },
      {
        name: "Orders",
        data: [
          { x: "Sep", y: Math.floor(Math.random() * 101) },
          { x: "Oct", y: Math.floor(Math.random() * 101) },
          { x: "Nov", y: Math.floor(Math.random() * 101) },
          { x: "Dec", y: Math.floor(Math.random() * 101) },
          { x: "Jan", y: Math.floor(Math.random() * 101) },
          { x: "Feb", y: Math.floor(Math.random() * 101) },
          { x: "Mar", y: Math.floor(Math.random() * 101) },
          { x: "Apr", y: Math.floor(Math.random() * 101) },
          { x: "May", y: Math.floor(Math.random() * 101) },
          { x: "Jun", y: Math.floor(Math.random() * 101) },
          { x: "Jul", y: Math.floor(Math.random() * 101) },
          { x: "Aug", y: Math.floor(Math.random() * 101) },
        ],
      },
    ];
  }, []);

  const orderStats = useMemo(() => {
    // temporary data
    return [
      {
        value: 6,
        label: "Total Orders",
        percentage: { label: "Since last week", value: 2.5 },
      },
      {
        value: 0,
        label: "Paid Orders",
        percentage: { label: "Since last week", value: -1.5 },
      },
      {
        value: 1.25,
        label: "Average Amount of Reviews",
        percentage: { label: "Since last week", value: 0.5 },
      },
      {
        value: 27.6,
        label: "Average Unit Cost",
        percentage: { label: "Since last week", value: 1.5 },
      },
    ];
  }, []);

  return (
    <div>
      <div className="flex justify-end mb-4">
        <DropdownText
          value={searchFilter}
          onChange={handleChangeFilter}
          list={filtersList}
          removeBorders={true}
        />
      </div>

      <StatsCards stats={orderStats} />

      <div className="mt-6">
        <BarLineChart
          chartType="area"
          chartData={paidOrdersData}
          chartColors={["#3C50E0", "#10B981"]}
          // disableLegends={true}
          // label="Orders Count"
          // additionalData={[
          //   { label: "Paid amount", value: "$39,000.20" },
          //   { label: "Unpaid amount", value: "$25,000.20" },
          // ]}
        />
      </div>

      <div
        className="mt-4 mb-4 grid md:mt-4 md:gap-4 2xl:mt-6.5 2xl:gap-6.5"
        style={{ gridTemplateColumns: "repeat(12, minmax(0, 1fr))" }}
      >
        <OrdersChartPaymentCount /> <OrdersChartPaymentAmount />
        <OrdersCircleChart />
        <OrdersChartStatusCount /> <OrdersChartStatusAmount />
        <div>
          <OrdersCircleChart />
        </div>
      </div>
    </div>
  );
};

export default OrdersReports;
