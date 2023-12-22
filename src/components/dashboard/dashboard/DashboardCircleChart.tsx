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
    fontSize: "16px",
    fontWeight: "500",
  },

  plotOptions: {
    pie: {
      donut: {
        size: "80%",
        background: "transparent",
        // labels: {
        //   show: true,
        //   name: {
        //     fontSize: "28px",
        //     fontWeight: "700",
        //     color: "black",
        //   },
        //   value: {
        //     fontSize: "26px",
        //     fontWeight: "500",
        //     color: "#637381",
        //   },
        // },
      },
    },
  },
  dataLabels: {
    enabled: false,
    style: {},
  },

  responsive: [
    {
      breakpoint: 1600,
      options: {
        chart: {
          width: 400,
          innerHeight: 500,
          outerHeight: 400,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 350,
        },
      },
    },
  ],
};

const DashboardCircleChart: React.FC = () => {
  const [state] = useState<ChartThreeState>({
    series: [10, 20, 70],
  });

  return (
    <div className=" col-span-10 rounded-sm border border-stroke bg-white  pt-7.5 pb-5 shadow-default sm:px-7.5 xl:col-span-5">
      <div className="mb-3  gap-4 sm:flex">
        <h1 className="pt-8 ml-4 text-xl font-bold text-black ">
          Orders Overview
        </h1>
      </div>

      <div className="mb-2">
        <div className="absolute ml-40 mt-24 max-md:ml-36 max-md:mt-20 2xl:ml-28 2xl:mt-16">
          <p className="font-bold text-3xl text-black">2528</p>
          <p className="ml-4 font-semibold text-base">Orders</p>
        </div>
        <div id="chartThree" className=" flex 2xl:flex">
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
