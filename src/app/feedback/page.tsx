"use client";

import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

// Dynamically import Chart with SSR disabled
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function FeedbackPage() {
  const [data, setData] = useState<TransformedData | null>(null);
  const [loading, setLoading] = useState(true);

  const fallbackData = {
    stats: {
      weightLost: 3.5,
      caloriesBurned: 12500,
      avgCaloriesPerWeek: 2500,
      avgWorkoutDuration: 45,
    },
    chart: {
      weeks: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
      data: [30, 45, 60, 50, 70],
    },
    feedback: "You're making great progress! Keep pushing yourself but remember to rest.",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workout`);
        if (!response.ok) {
          throw new Error("Failed to fetch workout data");
        }
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error("Error fetching data, using fallback data:", error);
        setData(fallbackData); // Use fallback JSON if API fails
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <DefaultLayout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">
            Loading Your Progress...
          </h1>
        </div>
      </DefaultLayout>
    );
  }

  if (!data || !data.chart || !data.stats || !data.feedback) {
    return (
      <DefaultLayout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">
            Failed to load data. Please try again.
          </h1>
        </div>
      </DefaultLayout>
    );
  }

  const workoutChartOptions: ApexOptions = {
    chart: {
      type: "line",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: data.chart.weeks,
      labels: {
        style: {
          fontSize: "12px",
          colors: ["#333"],
        },
      },
    },
    yaxis: {
      title: {
        text: "Workout Time (minutes)",
        style: {
          fontSize: "14px",
          color: "#333",
        },
      },
      labels: {
        style: {
          fontSize: "14px",
          colors: ["#333"],
        },
        formatter: (value) => `${value.toFixed(1)} mins`,
      },
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
                  <p className="text-4xl font-bold text-blue-600">{data.stats.weightLost} kg</p>
                  <p className="text-lg text-gray-700">Total Weight Lost</p>
                </div>
              </div>
              <div className="w-1/2 md:w-1/4 p-4">
                <div className="bg-green-100 p-6 rounded-lg">
                  <p className="text-4xl font-bold text-green-600">
                    {data.stats.caloriesBurned} kcal
                  </p>
                  <p className="text-lg text-gray-700">Total Calories Burnt</p>
                </div>
              </div>
              <div className="w-1/2 md:w-1/4 p-4">
                <div className="bg-yellow-100 p-6 rounded-lg">
                  <p className="text-4xl font-bold text-yellow-600">{data.stats.avgCaloriesPerWeek} kcal</p>
                  <p className="text-lg text-gray-700">Avg Calories Burnt/Week</p>
                </div>
              </div>
              <div className="w-1/2 md:w-1/4 p-4">
                <div className="bg-purple-100 p-6 rounded-lg">
                  <p className="text-4xl font-bold text-purple-600">
                    {data.stats.avgWorkoutDuration} mins
                  </p>
                  <p className="text-lg text-gray-700">Avg Workout Duration/Session</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-12">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Workout Progress Analytics</h2>
            <Chart
              options={workoutChartOptions}
              series={[{ name: "Workout Progress", data: data.chart.data }]}
              type="line"
              height={350}
            />
          </div>
        </div>
        {/* <div className="mb-12">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              AI-Generated Personalized Feedback
            </h2>
            <p className="text-gray-700">{data.feedback}</p>
          </div>
        </div> */}
      </div>
    </DefaultLayout>
  );
}





