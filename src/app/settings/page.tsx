"use client";

import React, { useState, useEffect } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const SettingsPage: React.FC = () => {
  const [goal, setGoal] = useState<string | null>(null);
  const [daysPerWeek, setDaysPerWeek] = useState<number>(3);
  const [workoutDuration, setWorkoutDuration] = useState<number>(30);
  const [restDays, setRestDays] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchFitnessGoal = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("authToken="))
          ?.split("=")[1];

        console.log(token);
        if (!token) {
          setError("Missing authentication token. Please log in.");
          return;
        }

        const response = await fetch(
          `http://40.82.181.182/api/v1/workout/fitness_goal`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          if (response.status === 404) {
            console.warn("No fitness goal found. Defaulting to initial setup.");
            return;
          }
          const errorData = await response.json();
          throw new Error(errorData.detail || "Failed to fetch fitness goal.");
        }

        const data = await response.json();
        const goalData = data.data;

        // Populate state with fetched data
        setGoal(goalData.goal || null);
        setDaysPerWeek(goalData.days_per_week || 3);
        setWorkoutDuration(goalData.workout_duration || 30);
        setRestDays(goalData.rest_days || []);
      } catch (err: any) {
        console.error("Error fetching fitness goal:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFitnessGoal();
  }, []);

  const handleSaveFitnessGoal = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("authToken="))
          ?.split("=")[1];
      if (!token) {
        setError("Missing authentication token. Please log in.");
        return;
      }

      // Validate rest days
      const validDays = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ];
      const invalidDays = restDays.filter((day) => !validDays.includes(day));
      if (invalidDays.length > 0) {
        setError(`Invalid rest days: ${invalidDays.join(", ")}`);
        return;
      }

      const fitnessGoalData = {
        goal,
        days_per_week: daysPerWeek,
        workout_duration: workoutDuration,
        rest_days: restDays,
      };

      const response = await fetch(
        `http://40.82.181.182/api/v1/workout/fitness_goal`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(fitnessGoalData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to save fitness goal.");
      }

      const result = await response.json();
      console.log("Fitness goal saved:", result);
      setSuccess("Fitness goal updated successfully!");
    } catch (err: any) {
      console.error("Error saving fitness goal:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DefaultLayout>
        <div className="flex items-center justify-center min-h-screen">
          <p>Loading...</p>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
            Workout Settings
          </h2>

          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}

          {/* Select Fitness Goal */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Select Your Fitness Goal</h3>
            <div className="flex gap-4">
              <button
                className={`px-4 py-2 rounded-md transition duration-300 ${
                  goal === "strength"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
                onClick={() => setGoal("strength")}
              >
                Strength
              </button>
              <button
                className={`px-4 py-2 rounded-md transition duration-300 ${
                  goal === "weight_loss"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
                onClick={() => setGoal("weight_loss")}
              >
                Weight Loss
              </button>
              <button
                className={`px-4 py-2 rounded-md transition duration-300 ${
                  goal === "flexibility"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
                onClick={() => setGoal("flexibility")}
              >
                Flexibility
              </button>
            </div>
          </div>

          {/* Workout Schedule */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Set Your Workout Schedule</h3>
            <label className="block mb-2 text-gray-700">
              Days per Week
              <input
                type="number"
                min="1"
                max="7"
                value={daysPerWeek}
                onChange={(e) => setDaysPerWeek(Number(e.target.value))}
                className="w-full p-2 mt-1 border rounded-lg"
              />
            </label>
            <label className="block mb-2 text-gray-700">
              Workout Duration (minutes)
              <input
                type="number"
                min="10"
                value={workoutDuration}
                onChange={(e) => setWorkoutDuration(Number(e.target.value))}
                className="w-full p-2 mt-1 border rounded-lg"
              />
            </label>
          </div>

          {/* Rest Days */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Select Rest Days</h3>
            <div className="flex gap-2 flex-wrap">
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
                (day) => (
                  <button
                    key={day}
                    className={`px-3 py-1 rounded-md transition duration-300 ${
                      restDays.includes(day)
                        ? "bg-red-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                    onClick={() =>
                      setRestDays((prev) =>
                        prev.includes(day)
                          ? prev.filter((d) => d !== day)
                          : [...prev, day]
                      )
                    }
                  >
                    {day}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveFitnessGoal}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition duration-300"
          >
            Save Workout Settings
          </button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SettingsPage;




