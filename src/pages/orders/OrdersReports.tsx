import OrdersDataBox from "../../components/orders/ordersReport/OrdersDataBox";
import OrdersChart from "../../components/orders/ordersReport/OrdersChart";
import OrdersChartPaymentCount from "../../components/orders/ordersReport/OrdersChartPaymentCount";
import OrdersChartPaymentAmount from "../../components/orders/ordersReport/OrdersChartPaymentAmount";
import OrdersCircleChart from "../../components/orders/ordersReport/OrdersCircleChart";
import OrdersChartStatusCount from "../../components/orders/ordersReport/OrdersChartStatusCount";
import OrdersChartStatusAmount from "../../components/orders/ordersReport/OrdersChartStatusAmount";

const OrdersReports = () => {
  return (
    <>
      {/* <div className="flex mt-4 mb-6">
        <div>
          <span className="flex gap-2">
            <p>Orders</p> / <p className="text-[#41B2E9]">Orders Report</p>
          </span>
        </div>
      </div> */}
      <OrdersDataBox />
      <h1 className="pb-2">Orders Count</h1>
      <div
        className=" mb-4 grid gap-2 md:mt-4 md:gap-4 2xl:mt-6.5 2xl:gap-6.5"
        style={{ gridTemplateColumns: "repeat(12, minmax(0, 1fr))" }}
      >
        <OrdersChart />
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
    </>
  );
};

export default OrdersReports;
