"use client";

import React, { useState, useEffect } from "react";

const TodayWorkout: React.FC = () => {
  const [workoutData, setWorkoutData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fallbackData = {
    workoutName: "Upper Body Strength",
    duration: "45 minutes",
    exercises: ["Push-ups", "Pull-ups", "Squats", "Plank"],
  };

  useEffect(() => {
    const fetchWorkoutData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ai_chat/query`);
        if (!response.ok) {
          throw new Error("Failed to fetch workout data");
        }
        const data = await response.json();
        setWorkoutData(data);
      } catch (err: any) {
        console.error("Error fetching workout data:", err);

        // Set test data as response data
        setWorkoutData(fallbackData);

      } finally {
        setLoading(false);
      }
    };

    fetchWorkoutData();
  }, []);

  const handleStartWorkout = () => {
    console.log("Workout started!");
  };

  if (loading) {
    return <p>Loading today’s workout...</p>;
  }

  if (!workoutData) {
    return <p>No workout data available.</p>;
  }

  return (
    <div>
      <h3 className="text-lg font-semibold">Today’s Workout: {workoutData.workoutName}</h3>
      <p>Duration: {workoutData.duration}</p>
      <h4 className="mt-2 font-semibold">Exercises:</h4>
      <ul>
        {workoutData.exercises.map((exercise: string, index: number) => (
          <li key={index}>• {exercise}</li>
        ))}
      </ul>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleStartWorkout}
      >
        Start Workout
      </button>
    </div>
  );
};

export default TodayWorkout;



