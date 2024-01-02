import React, { useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

type DonutChartProps = {
  chartData: {
    labels: string[];
    values: number[];
    colors: string[];
  };
  label?: string;
  height?: number;
};

const DonutChart: React.FC<DonutChartProps> = ({
  chartData,
  label,
  height = 350,
}) => {
  const options: ApexOptions = useMemo(() => {
    return {
      labels: chartData.labels,
      colors: chartData.colors,
      dataLabels: {
        enabled: false,
        formatter: function (val: number) {
          return val.toFixed(2) + "%";
        },
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
            },
          },
        },
      },
      legend: {
        show: false,
      },
    };
  }, [chartData]);

  return (
    <div
      className={`${
        label?.length > 0 &&
        "p-6 rounded-sm border border-stroke bg-white shadow-md h-full"
      }`}
    >
      {label && (
        <div className="mb-4 text-grText-dark font-bold text-[1.375rem]">
          {label}
        </div>
      )}

      <ReactApexChart
        type="donut"
        series={chartData.values}
        options={options}
        height={height}
      />

      {label && (
        <div className="flex flex-col gap-2">
          {chartData.labels.map((label, index) => {
            const color = chartData.colors[index];
            const value = chartData.values[index];

            return (
              <div key={index} className="flex justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`block h-4 w-4 rounded-full border-4`}
                    style={{ borderColor: color }}
                  />
                  <span>{label}</span>
                </div>

                <span
                  className="inline-block rounded-md py-0.5 px-1.5 text-xs font-medium text-white"
                  style={{ backgroundColor: color }}
                >
                  {value}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DonutChart;
