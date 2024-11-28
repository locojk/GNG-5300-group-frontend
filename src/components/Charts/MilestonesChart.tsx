// import React from "react";
// import Chart from "react-apexcharts";
// import { ApexOptions } from "apexcharts";

// interface MilestonesChartProps {
//   milestones: { label: string; value: number }[]; // Example: [{ label: "Workouts", value: 75 }, { label: "Weight Loss", value: 50 }]
// }

// const MilestonesChart: React.FC<MilestonesChartProps> = ({ milestones }) => {
//   const chartOptions: ApexOptions = {
//     chart: {
//       type: "radialBar",
//     },
//     plotOptions: {
//       radialBar: {
//         dataLabels: {
//           name: {
//             fontSize: "16px",
//           },
//           value: {
//             fontSize: "22px",
//             formatter: (val: number) => `${val}%`,
//           },
//         },
//       },
//     },
//     labels: milestones.map(milestone => milestone.label),
//   };

//   const chartSeries = milestones.map(milestone => milestone.value);

//   return (
//     <div className="rounded-lg border border-gray-300 bg-white p-5 shadow-md dark:border-gray-700 dark:bg-gray-800">
//       <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
//         Milestones Progress
//       </h3>
//       <Chart options={chartOptions} series={chartSeries} type="radialBar" height={300} />
//     </div>
//   );
// };

// export default MilestonesChart;

import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const MilestonesChart: React.FC = () => {
  const milestones = [
    { label: "Workouts", value: 75 },
    { label: "Weight Loss", value: 50 },
  ];

  const chartOptions: ApexOptions = {
    chart: { type: "radialBar" },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: { fontSize: "16px" },
          value: {
            fontSize: "22px",
            formatter: (val: number) => `${val}%`,
          },
        },
      },
    },
    labels: milestones.map((milestone) => milestone.label),
    colors: ["#4CAF50", "#FF6347"],
  };

  return (
    <div>
      <h3 className="text-lg font-semibold">Milestones Progress</h3>
      <Chart options={chartOptions} series={milestones.map((milestone) => milestone.value)} type="radialBar" height={300} />
    </div>
  );
};

export default MilestonesChart;

