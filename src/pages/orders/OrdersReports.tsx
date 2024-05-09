import { useMemo, useState } from "react";
// import DropdownText from "../../components/tools/dropdowntext/DropdownText";
import BarLineChart from "../../components/tools/charts/BarLineChart";
import StatsCards from "../../components/tools/cards/StatsCards";
import DonutChart from "../../components/tools/charts/DonutChart";
import {
  useGetOrderGraph,
  useGetOrderReport,
} from "../../services/queries/orderQueries";
import { sliceDate } from "../../utils/utils";
import { useAtom } from "jotai/react";
import { brandAtom } from "../../services/queries/brandsQueries";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import CustomDatePicker from "../../components/tools/customDatePicker/CustomDatePicker";

dayjs.extend(utc);

const OrdersReports = () => {
  const today = dayjs().format("MM/DD/YYYY");
  const thirtyDaysAgo = dayjs().subtract(7, "day").format("MM/DD/YYYY");

  const [selectedBrand] = useAtom(brandAtom);
  const [startRange, setStartRange] = useState(thirtyDaysAgo);
  const [endRange, setEndRange] = useState(today);

  const { data: reportData } = useGetOrderReport({
    code: selectedBrand?.code,
    startRange,
    endRange,
  });

  const { data: orderGraph } = useGetOrderGraph({
    code: selectedBrand?.code,
    startRange,
    endRange,
  });

  // const handleChangeFilter = (newFilter: (typeof filtersList)[number]) => {
  //   setSearchFilter(newFilter);
  // };

  const dateValue = useMemo(() => {
    return {
      from: startRange ? new Date(startRange.replace(/-/g, "/")) : null,
      to: endRange ? new Date(endRange.replace(/-/g, "/")) : null,
    };
  }, [startRange, endRange]);

  const orderStats = useMemo(() => {
    // temporary data
    return [
      {
        value: reportData?.total_orders ?? 0,
        label: "Total Orders",
        // percentage: { label: "Since last week", value: 2.5 },
      },
      {
        value: reportData?.total_paid_orders ?? 0,
        label: "Paid Orders",
        // percentage: { label: "Since last week", value: -1.5 },
      },
      {
        value: reportData?.avg_amount_of_reviews?.toFixed(2) ?? 0,
        label: "Average Amount of Reviews",
        // percentage: { label: "Since last week", value: 0.5 },
      },
      {
        value: reportData?.avg_unit_cost?.toFixed(2) ?? 0,
        label: "Average Unit Cost",
        // percentage: { label: "Since last week", value: 1.5 },
      },
    ];
  }, [reportData]);

  const paidOrdersData = useMemo(() => {
    const ordersData = reportData?.orders.map((order) => {
      return { x: sliceDate(order.date), y: order.count };
    });

    const paidOrdersData = reportData?.paidOrders.map((order) => {
      return { x: sliceDate(order.date), y: order.count };
    });

    return [
      {
        name: "Paid Orders",
        data: paidOrdersData ?? [],
      },
      {
        name: "Orders",
        data: ordersData ?? [],
      },
    ];
  }, [reportData]);

  const orderPaymentsData = useMemo(() => {
    // temporary data
    return {
      statusCount: [
        {
          name: "Payment Status Count",
          data: [
            {
              x: "New",
              y: orderGraph?.orderPaymentStatus[0].count ?? 0,
              fillColor: "#27F6C2",
            },
            {
              x: "Sent Invoice",
              y: orderGraph?.orderPaymentStatus[1].count ?? 0,
              fillColor: "#089063",
            },
            {
              x: "Paid",
              y: orderGraph?.orderPaymentStatus[4].count ?? 0,
              fillColor: "#3C50E0",
            },
            {
              x: "Unpaid",
              y: orderGraph?.orderPaymentStatus[5].count ?? 0,
              fillColor: "#6577F3",
            },
            {
              x: "Payment Reminder 1",
              y: orderGraph?.orderPaymentStatus[2].count ?? 0,
              fillColor: "#80CAEE",
            },
            {
              x: "Payment Reminder 2",
              y: orderGraph?.orderPaymentStatus[3].count ?? 0,
              fillColor: "#0FADCF",
            },
          ],
        },
      ],
      statusAmount: [
        {
          name: "Payment Status Amount (€)",
          data: [
            {
              x: "New",
              y: orderGraph?.orderPaymentStatus[0].amount ?? 0,
              fillColor: "#27F6C2",
            },
            {
              x: "Sent Invoice",
              y: orderGraph?.orderPaymentStatus[1].amount ?? 0,
              fillColor: "#089063",
            },
            {
              x: "Paid",
              y: orderGraph?.orderPaymentStatus[4].amount ?? 0,
              fillColor: "#3C50E0",
            },
            {
              x: "Unpaid",
              y: orderGraph?.orderPaymentStatus[5].amount ?? 0,
              fillColor: "#6577F3",
            },
            {
              x: "Payment Reminder 1",
              y: orderGraph?.orderPaymentStatus[2].amount ?? 0,
              fillColor: "#80CAEE",
            },
            {
              x: "Payment Reminder 2",
              y: orderGraph?.orderPaymentStatus[3].amount ?? 0,
              fillColor: "#0FADCF",
            },
          ],
        },
      ],
      percentage: {
        labels: [
          "New",
          "Sent Invoice",
          "Paid",
          "Unpaid",
          "Reminder 1",
          "Reminder 2",
        ],
        values: [
          orderGraph?.orderPaymentStatus[0].percentage ?? 0,
          orderGraph?.orderPaymentStatus[1].percentage ?? 0,
          orderGraph?.orderPaymentStatus[4].percentage ?? 0,
          orderGraph?.orderPaymentStatus[5].percentage ?? 0,
          orderGraph?.orderPaymentStatus[2].percentage ?? 0,
          orderGraph?.orderPaymentStatus[3].percentage ?? 0,
        ],
        colors: [
          "#27F6C2",
          "#089063",
          "#3C50E0",
          "#6577F3",
          "#80CAEE",
          "#0FADCF",
        ],
      },
    };
  }, [orderGraph]);

  const orderReviewsData = useMemo(() => {
    // temporary data
    return {
      statusCount: [
        {
          name: "Payment Status Count",
          data: [
            {
              x: "Neu",
              y: orderGraph?.orderReviewStatus[0].count ?? 0,
              fillColor: "#27F6C2",
            },
            {
              x: "Beufragt",
              y: orderGraph?.orderReviewStatus[1].count ?? 0,
              fillColor: "#089063",
            },
            {
              x: "Weiterleitung",
              y: orderGraph?.orderReviewStatus[2].count ?? 0,
              fillColor: "#3C50E0",
            },
            {
              x: "Widerspruch",
              y: orderGraph?.orderReviewStatus[4].count ?? 0,
              fillColor: "#6577F3",
            },
            {
              x: "Geischeitert",
              y: orderGraph?.orderReviewStatus[3].count ?? 0,
              fillColor: "#80CAEE",
            },
            {
              x: "Geloscht",
              y: orderGraph?.orderReviewStatus[5].count ?? 0,
              fillColor: "#0FADCF",
            },
          ],
        },
      ],
      statusAmount: [
        {
          name: "Payment Status Amount (€)",
          data: [
            {
              x: "Neu",
              y: orderGraph?.orderReviewStatus[0].amount ?? 0,
              fillColor: "#27F6C2",
            },
            {
              x: "Beufragt",
              y: orderGraph?.orderReviewStatus[1].amount ?? 0,
              fillColor: "#089063",
            },
            {
              x: "Weiterleitung",
              y: orderGraph?.orderReviewStatus[2].amount ?? 0,
              fillColor: "#3C50E0",
            },
            {
              x: "Widerspruch",
              y: orderGraph?.orderReviewStatus[4].amount ?? 0,
              fillColor: "#6577F3",
            },
            {
              x: "Geischeitert",
              y: orderGraph?.orderReviewStatus[3].amount ?? 0,
              fillColor: "#80CAEE",
            },
            {
              x: "Geloscht",
              y: orderGraph?.orderReviewStatus[5].amount ?? 0,
              fillColor: "#0FADCF",
            },
          ],
        },
      ],
      percentage: {
        labels: [
          "Neu",
          "Beufragt",
          "Weiterleitung",
          "Widerspruch",
          "Geischeitert",
          "Geloscht",
        ],
        values: [
          orderGraph?.orderReviewStatus[0].percentage ?? 0,
          orderGraph?.orderReviewStatus[1].percentage ?? 0,
          orderGraph?.orderReviewStatus[2].percentage ?? 0,
          orderGraph?.orderReviewStatus[4].percentage ?? 0,
          orderGraph?.orderReviewStatus[3].percentage ?? 0,
          orderGraph?.orderReviewStatus[5].percentage ?? 0,
        ],
        colors: [
          "#27F6C2",
          "#089063",
          "#3C50E0",
          "#6577F3",
          "#80CAEE",
          "#0FADCF",
        ],
      },
    };
  }, [orderGraph]);

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
        <StatsCards stats={orderStats} />
      </div>

      <div className="mt-6">
        <BarLineChart
          chartType="area"
          chartData={paidOrdersData}
          chartColors={["#3C50E0", "#10B981"]}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
        <BarLineChart
          key="paymentStatusCt"
          chartType="bar"
          chartData={orderPaymentsData.statusCount}
          chartColors={["#3C50E0"]}
          label="Payment Status Count"
        />

        <BarLineChart
          key="paymentStatusAmt"
          chartType="bar"
          chartData={orderPaymentsData.statusAmount}
          chartColors={[
            "#F44336",
            "#E91E63",
            "#9C27B0",
            "#F44336",
            "#E91E63",
            "#9C27B0",
          ]}
          label="Payment Status Amount (€)"
        />

        <DonutChart chartData={orderPaymentsData.percentage} />
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
        <BarLineChart
          key="reviewStatusCt"
          chartType="bar"
          chartData={orderReviewsData.statusCount}
          chartColors={["#3C50E0"]}
          label="Review Status Count"
        />

        <BarLineChart
          key="reviewStatusAmt"
          chartType="bar"
          chartData={orderReviewsData.statusAmount}
          chartColors={["#3C50E0"]}
          label="Review Status Amount (€)"
        />

        <DonutChart chartData={orderReviewsData.percentage} />
      </div>
    </div>
  );
};

export default OrdersReports;
