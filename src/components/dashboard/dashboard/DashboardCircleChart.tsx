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
  colors: ["#3C50E0", "#375E83", "#259AE6"],
  labels: ["New", "Send Invoice", "Paid"],
  legend: {
    show: true,
    position: "bottom",
  },

  plotOptions: {
    pie: {
      donut: {
        size: "65%",
        background: "transparent",
      },
    },
  },
  dataLabels: {
    enabled: false,
  },

  responsive: [
    {
      breakpoint: 1600,
      options: {
        chart: {
          width: 340,
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

const DashboardCircleChart: React.FC = () => {
  const [state] = useState<ChartThreeState>({
    series: [34, 12, 56],
  });

  return (
    <div className="col-span-10 rounded-sm border border-stroke bg-white  pt-7.5 pb-5 shadow-default sm:px-7.5 xl:col-span-5">
      <div className="mb-3  gap-4 sm:flex">
        <h1 className="pt-4 ml-4 text-base font-bold text-black ">
          Orders Overview
        </h1>
      </div>

      <div className="mb-2">
        {" "}
        {/* <div className="flex flex-col absolute py-[6rem] px-[10rem] ">
          <h1 className="text-xl text-black font-bold">1234</h1>
          <span className="text-xm">Orders</span>
        </div> */}
        <div id="chartThree" className=" flex">
          <ReactApexChart
            options={options}
            series={state.series}
            type="donut"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardCircleChart;
