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

  const orderPaymentsData = useMemo(() => {
    // temporary data
    return {
      statusCount: [
        {
          name: "Payment Status Count",
          data: [
            { x: "New", y: Math.floor(Math.random() * 101) },
            { x: "Sent Invoice", y: Math.floor(Math.random() * 101) },
            { x: "Paid", y: Math.floor(Math.random() * 101) },
            { x: "Unpaid", y: Math.floor(Math.random() * 101) },
            { x: "Payment Reminder 1", y: Math.floor(Math.random() * 101) },
            { x: "Payment Reminder 2", y: Math.floor(Math.random() * 101) },
          ],
        },
      ],
      statusAmount: [
        {
          name: "Payment Status Amount (€)",
          data: [
            { x: "New", y: Math.floor(Math.random() * 101) },
            { x: "Sent Invoice", y: Math.floor(Math.random() * 101) },
            { x: "Paid", y: Math.floor(Math.random() * 101) },
            { x: "Unpaid", y: Math.floor(Math.random() * 101) },
            { x: "Payment Reminder 1", y: Math.floor(Math.random() * 101) },
            { x: "Payment Reminder 2", y: Math.floor(Math.random() * 101) },
          ],
        },
      ],
    };
  }, []);

  const orderReviewsData = useMemo(() => {
    // temporary data
    return {
      statusCount: [
        {
          name: "Review Status Count",
          data: [
            { x: "Neu", y: Math.floor(Math.random() * 101) },
            { x: "Beufragt", y: Math.floor(Math.random() * 101) },
            { x: "Weiterleitung", y: Math.floor(Math.random() * 101) },
            { x: "Widerspruch", y: Math.floor(Math.random() * 101) },
            { x: "Geischeitert", y: Math.floor(Math.random() * 101) },
            { x: "Geloscht", y: Math.floor(Math.random() * 101) },
          ],
        },
      ],
      statusAmount: [
        {
          name: "Review Status Amount (€)",
          data: [
            { x: "Neu", y: Math.floor(Math.random() * 101) },
            { x: "Beufragt", y: Math.floor(Math.random() * 101) },
            { x: "Weiterleitung", y: Math.floor(Math.random() * 101) },
            { x: "Widerspruch", y: Math.floor(Math.random() * 101) },
            { x: "Geischeitert", y: Math.floor(Math.random() * 101) },
            { x: "Geloscht", y: Math.floor(Math.random() * 101) },
          ],
        },
      ],
    };
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
        />
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <BarLineChart
          key="statusCt"
          chartType="bar"
          chartData={orderPaymentsData.statusCount}
          chartColors={["#3C50E0"]}
          label="Payment Status Count"
        />

        <BarLineChart
          key="statusAmt"
          chartType="bar"
          chartData={orderPaymentsData.statusAmount}
          chartColors={["#3C50E0"]}
          label="Payment Status Amount (€)"
        />
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <BarLineChart
          key="statusCt"
          chartType="bar"
          chartData={orderReviewsData.statusCount}
          chartColors={["#3C50E0"]}
          label="Review Status Count"
        />

        <BarLineChart
          key="statusAmt"
          chartType="bar"
          chartData={orderReviewsData.statusAmount}
          chartColors={["#3C50E0"]}
          label="Review Status Amount (€)"
        />
      </div>
    </div>
  );
};

export default OrdersReports;
