import { ApexOptions } from "apexcharts";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

interface ChartThreeState {
  series: number[];
}

const options: ApexOptions = {
  chart: {
    type: "donut",
  },
  colors: ["#10B981", "#375E83", "#259AE6"],
  labels: ["New", "Send", "Invoice"],
  legend: {
    show: true,
    position: "bottom",
  },

  plotOptions: {
    pie: {
      donut: {
        size: "70%",
        background: "transparent",
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 310,
          height: 350,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};

const OrdersCircleChart: React.FC = () => {
  const [state] = useState<ChartThreeState>({
    series: [34, 12, 56],
  });

  return (
    <div className="mr-2 mt-10">
      <div id="chartThree" className="mx-auto flex">
        <ReactApexChart options={options} series={state.series} type="donut" />
      </div>
    </div>
  );
};

export default OrdersCircleChart;
