import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const PerformanceChart: React.FC = () => {
  const data = [
    { name: "Weight", data: [70, 68, 65, 63] },
  ];
  const categories = ["Week 1", "Week 2", "Week 3", "Week 4"];

  const chartOptions: ApexOptions = {
    chart: {
      type: "line",
      toolbar: { show: false },
    },
    xaxis: {
      categories: categories,
      title: { text: "Time" },
      labels: {
        style: {
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      title: { text: "Progress" },
      labels: {
        style: {
          fontSize: '12px',
        },
      },
    },
    stroke: { curve: "smooth" },
    dataLabels: { enabled: false },
    markers: { size: 4 },
  };

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-center">Performance Over Time</h3>
      <Chart options={chartOptions} series={data} type="line" height={250} />
    </div>
  );
};

export default PerformanceChart;


