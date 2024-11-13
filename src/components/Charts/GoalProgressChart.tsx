// import React from "react";
// import Chart from "react-apexcharts";
// import { ApexOptions } from "apexcharts"; // Import ApexOptions for type checking

// interface GoalProgressChartProps {
//   goalName: string; // The name of the goal, e.g., "Weight Loss"
//   goalProgress: number; // Current progress toward the goal in percentage
//   target: string; // Target value description, e.g., "Lose 10 lbs"
// }

// const GoalProgressChart: React.FC<GoalProgressChartProps> = ({
//   goalName,
//   goalProgress,
//   target,
// }) => {
//   const chartOptions: ApexOptions = {
//     chart: {
//       type: "radialBar",
//     },
//     plotOptions: {
//       radialBar: {
//         hollow: {
//           size: "70%",
//         },
//         dataLabels: {
//           name: {
//             offsetY: -10,
//             fontSize: "16px",
//           },
//           value: {
//             fontSize: "22px",
//             color: "#333",
//             formatter: function (val) {
//               return `${val}%`;
//             },
//           },
//         },
//       },
//     },
//     labels: [goalName],
//     colors: ["#4CAF50"], // Customize the color for the progress
//   };

//   const chartSeries = [goalProgress];

//   return (
//     <div className="rounded-lg border border-gray-300 bg-white p-5 shadow-md dark:border-gray-700 dark:bg-gray-800">
//       <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
//         {goalName} Progress
//       </h3>
      
//       {/* Radial Progress Chart */}
//       <Chart options={chartOptions} series={chartSeries} type="radialBar" height={300} />

//       <p className="text-center mt-4 text-sm text-gray-600 dark:text-gray-300">
//         Target: {target}
//       </p>
//     </div>
//   );
// };

// export default GoalProgressChart;

import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const GoalProgressChart: React.FC = () => {
  const goalData = {
    goalName: "Weight Loss",
    goalProgress: 65,
    target: "Lose 10 lbs",
  };

  const chartOptions: ApexOptions = {
    chart: {
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "70%",
        },
        dataLabels: {
          name: {
            offsetY: -10,
            fontSize: "16px",
          },
          value: {
            fontSize: "22px",
            color: "#333",
            formatter: function (val) {
              return `${val}%`;
            },
          },
        },
      },
    },
    labels: [goalData.goalName],
    colors: ["#4CAF50"],
  };

  return (
    <div>
      <h3 className="text-lg font-semibold">Weight Loss Progress</h3>
      <Chart options={chartOptions} series={[goalData.goalProgress]} type="radialBar" height={300} />
      <p className="text-center mt-4 text-sm text-gray-600">
        Target: {goalData.target}
      </p>
    </div>
  );
};

export default GoalProgressChart;


