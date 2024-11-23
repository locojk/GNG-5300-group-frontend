"use client";

import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

// Dynamically import Chart with SSR disabled
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function FeedbackPage() {
  const workoutChartOptions: ApexOptions = {
    chart: {
      type: "line",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
    },
    stroke: {
      curve: "smooth",
    },
    colors: ["#4F46E5"],
    dataLabels: {
      enabled: false,
    },
    title: {
      text: "Workout Progress",
      align: "left",
      style: {
        fontSize: "16px",
        color: "#333",
      },
    },
  };

  const workoutChartSeries = [
    {
      name: "Workout Progress",
      data: [2, 4, 6, 5, 8],
    },
  ];

  const dietChartOptions: ApexOptions = {
    chart: {
      type: "line",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
    },
    stroke: {
      curve: "smooth",
    },
    colors: ["#34D399"],
    dataLabels: {
      enabled: false,
    },
    title: {
      text: "Diet Progress",
      align: "left",
      style: {
        fontSize: "16px",
        color: "#333",
      },
    },
  };

  const dietChartSeries = [
    {
      name: "Diet Progress",
      data: [3, 5, 4, 6, 7],
    },
  ];

  return (
    <DefaultLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">
          Your Progress Feedback
        </h1>
        <div className="mb-12">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Key Progress Statistics</h2>
            <div className="flex flex-wrap justify-around">
              <div className="w-1/2 md:w-1/4 p-4">
                <div className="bg-blue-100 p-6 rounded-lg">
                  <p className="text-4xl font-bold text-blue-600">3.5 kg</p>
                  <p className="text-lg text-gray-700">Total Weight Lost</p>
                </div>
              </div>
              <div className="w-1/2 md:w-1/4 p-4">
                <div className="bg-green-100 p-6 rounded-lg">
                  <p className="text-4xl font-bold text-green-600">12,500 kcal</p>
                  <p className="text-lg text-gray-700">Total Calories Burnt</p>
                </div>
              </div>
              <div className="w-1/2 md:w-1/4 p-4">
                <div className="bg-yellow-100 p-6 rounded-lg">
                  <p className="text-4xl font-bold text-yellow-600">2,500 kcal</p>
                  <p className="text-lg text-gray-700">Avg Calories Burnt/Week</p>
                </div>
              </div>
              <div className="w-1/2 md:w-1/4 p-4">
                <div className="bg-purple-100 p-6 rounded-lg">
                  <p className="text-4xl font-bold text-purple-600">45 mins</p>
                  <p className="text-lg text-gray-700">Avg Workout Duration/Session</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-12">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Workout Progress Analytics</h2>
            <Chart options={workoutChartOptions} series={workoutChartSeries} type="line" height={350} />
          </div>
        </div>
        <div className="mb-12">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Diet Progress Analytics</h2>
            <Chart options={dietChartOptions} series={dietChartSeries} type="line" height={350} />
          </div>
        </div>
        <div className="mb-12">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">AI-Generated Personalized Feedback</h2>
            <p className="text-gray-700 mb-4">
              Based on your recent activity, you have shown consistent improvement in your workout routine. Keep up the good work! Consider adding more variety to your exercises to improve overall fitness.
            </p>
            <p className="text-gray-700">
              Your diet progress is also showing positive trends. Maintaining a balanced intake of proteins, carbohydrates, and fats will further enhance your performance. Keep focusing on nutrient-rich foods!
            </p>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
