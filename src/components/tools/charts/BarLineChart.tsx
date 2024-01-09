import { ApexOptions } from "apexcharts";
import React, { useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import Divider from "../divider/Divider";

type Data = {
  x: string | number | string[];
  y: string | number;
};

type BarLineChartProps = {
  chartData: {
    name: string;
    data: Data[];
  }[];
  additionalData?: {
    label: string;
    value: string | number;
  }[];
  disableLegends?: boolean;
  label?: string;
  height?: number;
  chartColors: string[];
  chartType: "area" | "bar";
};

const BarLineChart: React.FC<BarLineChartProps> = ({
  chartData,
  chartColors,
  disableLegends = false,
  additionalData = null,
  label,
  height = 350,
  chartType = "area",
}) => {
  const optimalColumnWidthPercent = useMemo(
    () => 20 + 60 / (1 + 30 * Math.exp(-chartData.length / 3)),
    [chartData]
  );

  const options: ApexOptions = useMemo(() => {
    return {
      legend: {
        show: !disableLegends ? true : false,
        position: "top",
        horizontalAlign: "left",
        fontSize: "16px",
        labels: {
          useSeriesColors: true,
        },
        markers: {
          width: 12,
          height: 12,
          strokeWidth: 2,
          strokeColor: "#F2F6FA",
          offsetX: -10,
        },
        itemMargin: {
          horizontal: 15,
        },
      },
      colors: chartColors,
      chart: {
        // stacked: true,
        dropShadow: {
          enabled: true,
          color: "#623CEA14",
          top: 10,
          blur: 4,
          left: 0,
          opacity: 0.1,
        },

        toolbar: {
          show: false,
        },
      },
      // responsive: [
      //   {
      //     breakpoint: 1024,
      //     options: {
      //       chart: {
      //         height: 300,
      //       },
      //     },
      //   },
      //   {
      //     breakpoint: 1366,
      //     options: {
      //       chart: {
      //         height: 350,
      //       },
      //     },
      //   },
      // ],
      stroke: {
        width: chartType === "area" ? [3.5, 3.5] : [0, 0],
        curve: "smooth",
      },
      grid: {
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
        borderColor: "#F2F6FA",
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 3.5,
        colors: "#fff",
        strokeColors: chartColors,
        strokeWidth: 3.5,
        strokeOpacity: 0.9,
        strokeDashArray: 0,
        fillOpacity: 1,
        hover: {
          sizeOffset: 5,
        },
      },
      xaxis: {
        type: "category",
        axisBorder: {
          show: false,
        },
        // categories: [["t", "asda"], "t", "t", "t", "t", "t"],
        axisTicks: {
          show: false,
        },
        labels: {
          // rotate: 0,
          // trim: true,
          style: { fontSize: chartType === "bar" ? "0.5rem" : undefined },
        },
      },
      plotOptions: {
        bar: {
          // distributed: true,
          columnWidth: optimalColumnWidthPercent + "%",
        },
      },
    };
  }, [disableLegends, chartColors, chartType, optimalColumnWidthPercent]);

  return (
    <div className="pt-6 px-4 rounded-sm border border-stroke bg-white shadow-md h-full">
      {label && (
        <div
          className={`mb-4 ml-4 text-grText-dark font-bold ${
            chartType === "area" ? "text-[1.375rem]" : ""
          }`}
        >
          {label}
        </div>
      )}

      <ReactApexChart
        options={options}
        series={chartData}
        type={chartType}
        height={height}
      />

      {additionalData && (
        <div className="flex justify-center gap-8 mb-8 mt-2">
          {additionalData.map((data, index) => {
            const isLast = index + 1 === additionalData.length;

            return (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center">
                  <span className="text-grText-gray">{data.label}</span>
                  <span className="text-grText-dark font-bold text-[1.25rem]">
                    {data.value}
                  </span>
                </div>

                {!isLast && <Divider direction="vertical" />}
              </React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BarLineChart;
