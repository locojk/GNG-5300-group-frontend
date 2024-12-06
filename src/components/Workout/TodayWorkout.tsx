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
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ai/today-workout`);
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
    if (workoutData && workoutData.Exercises) {
      setWorkoutStarted(true); // Set workoutStarted to true
      setCurrentExerciseIndex(0); // Start with the first exercise
      setTimer(300); // Set custom timer for the first exercise (300 seconds)
      setIsTimerRunning(true); // Start the timer
    }
  };

  const handleNextExercise = () => {
    if (currentExerciseIndex !== null && workoutData?.Exercises) {
      if (currentExerciseIndex < workoutData.Exercises.length - 1) {
        const nextExerciseIndex = currentExerciseIndex + 1;
        setCurrentExerciseIndex(nextExerciseIndex);
  
        // Set specific timer for each exercise based on index
        const timers = [300, 200, 250, 200, 300]; // Example timers for each exercise (seconds)
        setTimer(timers[nextExerciseIndex]); // Set timer for the next exercise
        setIsTimerRunning(true); // Start the timer
      } else {
        setWorkoutFinished(true); // Mark workout as finished
        setCurrentExerciseIndex(null); // Reset exercise index
        setIsTimerRunning(false); // Stop the timer
        handleSaveWorkoutLog(); // Save the workout log after completion
      }
    }
  };

  const exercises = Array.isArray(workoutData?.Exercises)
    ? workoutData.Exercises
    : [];

  const handleSaveWorkoutLog = async () => {
    try {
      const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("authToken="))
          ?.split("=")[1];
      if (!token) {
        throw new Error("Authentication token not found. Please log in.");
      }

      // Save the workout log data
      const workoutLogData = {
        log_date: new Date().toISOString().split('T')[0],  // Use today's date
        workout_content: "Yoga and Stretching",  // You can dynamically set this based on your logic
        total_weight_lost: 0.2,  // You can calculate or dynamically set this
        total_calories_burnt: workoutData["Estimated Calories Burned"] || 0,  // Fetch calories from workoutData
        avg_workout_duration: timer,  // Use the timer value for workout duration
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/daily/workout_logs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(workoutLogData),
      });

      if (!response.ok) {
        throw new Error("Failed to save workout log.");
      }

      const result = await response.json();
      console.log("Workout log saved:", result);
    } catch (err) {
      console.error("Error saving workout log:", err);
    }
  };

  console.log("Workout Data:", workoutData); // Debugging log to inspect data structure

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



