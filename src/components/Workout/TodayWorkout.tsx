"use client";

import React, { useState, useEffect } from "react";

const TodayWorkout: React.FC = () => {
  const [workoutData, setWorkoutData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWorkoutData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("Authentication token not found. Please log in.");
        }

        // Make a POST request with Authorization header
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ai_chat/query`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ query: "today's workout plan" }), // Replace with actual query payload
        });

        if (!response.ok) {
          throw new Error("Failed to fetch workout data");
        }

        const result = await response.json();

        // Print the raw response in the console
        console.log("API Response:", result);

        if (result.status === "success") {
          setWorkoutData(result.data);
        } else {
          throw new Error(result.message || "Failed to retrieve workout data");
        }
      } catch (err: any) {
        console.error("Error fetching workout data:", err);
        setError(err.message);
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

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if (!workoutData) {
    return <p>No workout data available.</p>;
  }

  return (
    <div>
      <h3 className="text-lg font-semibold">
        Today’s Workout: {workoutData["Workout Name"]}
      </h3>
      <p>
        <strong>Duration:</strong> {workoutData.Duration} minutes
      </p>
      <p>
        <strong>Difficulty:</strong> {workoutData.Difficulty}
      </p>
      <p>
        <strong>Equipment Needed:</strong> {workoutData["Equipment Needed"]}
      </p>
      <p>
        <strong>Estimated Calories Burned:</strong> {workoutData["Estimated Calories Burned"]}
      </p>
      <h4 className="mt-2 font-semibold">Exercises:</h4>
      <ul>
        {workoutData.Exercises.split(", ").map((exercise: string, index: number) => (
          <li key={index}>• {exercise}</li>
        ))}
      </ul>
      <h4 className="mt-2 font-semibold">Additional Tips:</h4>
      <p>{workoutData["Additional Tips"]}</p>
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







