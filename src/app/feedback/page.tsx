"use client";

import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Define interfaces for your data structures
interface DailyProgressEntry {
  log_date: string;
  total_workout_time: number;
  total_calories_burnt: number;
}

interface KeyStatistics {
  total_calories_burnt: number;
  avg_calories_burnt_per_day: number;
  avg_workout_duration_per_session: number;
}

interface ResponseData {
  data: {
    key_statistics: KeyStatistics;
    daily_progress: DailyProgressEntry[];
  };
}

interface TransformedData {
  stats: {
    caloriesBurned: number;
    avgCaloriesPerWeek: number;
    avgWorkoutDuration: number;
  };
  dailyProgress: {
    date: string;
    workoutTime: number;
    caloriesBurnt: number;
  }[];
  feedback: string;
}

export default function FeedbackPage() {
  const [data, setData] = useState<TransformedData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("authToken="))
          ?.split("=")[1];
        if (!token) {
          throw new Error("Missing authentication token. Please log in.");
        }

        const response = await fetch(
          `http://40.82.181.182/api/v1/daily/workout_logs/progress`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch workout data. Status: ${response.status}`);
        }

        const responseData: ResponseData = await response.json();

        const transformedData: TransformedData = {
          stats: {
            caloriesBurned: responseData.data.key_statistics.total_calories_burnt || 0,
            avgCaloriesPerWeek: responseData.data.key_statistics.avg_calories_burnt_per_day || 0,
            avgWorkoutDuration:
              responseData.data.key_statistics.avg_workout_duration_per_session || 0,
          },
          dailyProgress: responseData.data.daily_progress.map((entry: DailyProgressEntry) => ({
            date: entry.log_date || "Unknown Date",
            workoutTime:
              typeof entry.total_workout_time === "number" ? entry.total_workout_time : 0,
            caloriesBurnt:
              typeof entry.total_calories_burnt === "number" ? entry.total_calories_burnt : 0,
          })),
          feedback: "Keep up the excellent work! Your consistency is paying off.",
        };

        setData(transformedData);
      } catch (error: any) {
        setError(error.message || "Failed to load data. Please try again.");
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

  if (error) {
    return (
      <DefaultLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-100 text-red-700 p-4 rounded mb-4 text-center">
            <h1 className="text-3xl font-semibold mb-4">Error</h1>
            <p>{error}</p>
          </div>
        </div>
      </DefaultLayout>
    );
  }

  if (!data || !data.dailyProgress || !data.stats) {
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
              <div className="w-1/2 md:w-1/3 p-4">
                <div className="bg-green-100 p-6 rounded-lg">
                  <p className="text-4xl font-bold text-green-600">
                    {data.stats.caloriesBurned} kcal
                  </p>
                  <p className="text-lg text-gray-700">Total Calories Burnt</p>
                </div>
              </div>
              <div className="w-1/2 md:w-1/3 p-4">
                <div className="bg-yellow-100 p-6 rounded-lg">
                  <p className="text-4xl font-bold text-yellow-600">
                    {data.stats.avgCaloriesPerWeek} kcal
                  </p>
                  <p className="text-lg text-gray-700">Avg Calories Burnt/Day</p>
                </div>
              </div>
              <div className="w-1/2 md:w-1/3 p-4">
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
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Daily Workout Progress</h2>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={data.dailyProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="workoutTime"
                  stroke="#4F46E5"
                  name="Workout Time (mins)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="caloriesBurnt"
                  stroke="#FF5733"
                  name="Calories Burnt (kcal)"
                />
              </LineChart>
            </ResponsiveContainer>
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
