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
  chartColors?: string[];
};

const DonutChart: React.FC<DonutChartProps> = ({
  chartData,
  // label,
  height,
  // chartColors,
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
    <div>
      <ReactApexChart
        type="donut"
        series={chartData.values}
        options={options}
        height={height}
      />
    </div>
  );
};

export default DonutChart;
