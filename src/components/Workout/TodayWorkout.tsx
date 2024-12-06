"use client";

import React, { useState, useEffect, useRef } from "react";

const TodayWorkout: React.FC = () => {
  const [workoutData, setWorkoutData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number | null>(null);
  const [timer, setTimer] = useState<number>(30); // Default timer for each exercise (30 seconds)
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [workoutFinished, setWorkoutFinished] = useState(false);
  const [workoutStarted, setWorkoutStarted] = useState(false); // New state for tracking if the workout has started
  const apiCallInitiated = useRef(false);

  const defaultPlan = {
    "Workout Name": "Full Body Workout",
    Duration: "30 minutes",
    Difficulty: "Beginner",
    "Estimated Calories Burned": "150-200 calories",
    "Equipment Needed": "None",
    Exercises: [
      { Name: "Bodyweight Squats", Instructions: "Perform 3 sets of 10-15 reps." },
      { Name: "Push-Ups", Instructions: "Perform 3 sets of 10 reps. Modify if necessary." },
      { Name: "Lunges", Instructions: "Perform 3 sets of 10 reps per leg." },
      { Name: "Planks", Instructions: "Hold for 30 seconds. Repeat 3 times." },
      { Name: "Jumping Jacks", Instructions: "Perform 3 sets of 15 reps to finish." },
    ],
    "Additional Tips": "Make sure to warm up and cool down before and after the workout.",
  };

  useEffect(() => {
    const fetchWorkoutData = async () => {
      if (apiCallInitiated.current) return;
      apiCallInitiated.current = true;

      try {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("authToken="))
          ?.split("=")[1];
        if (!token) {
          throw new Error("Authentication token not found. Please log in.");
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ai_chat/query`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ query: "today's workout plan" }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch workout data");
        }

        const result = await response.json();
        console.log("API Response:", result);

        if (result.status === "success" && result.data) {
          const exercises = Array.isArray(result.data.Exercises)
            ? result.data.Exercises
            : [];

          // Use the default plan if exercises are empty
          if (exercises.length === 0) {
            console.log("Using default plan as fallback");
            setWorkoutData(defaultPlan);
          } else {
            setWorkoutData(result.data);
          }
        } else {
          throw new Error(result.message || "Invalid workout data received from the API");
        }
      } catch (err: any) {
        console.error("Error fetching workout data:", err);
        setError(err.message);
        setWorkoutData(defaultPlan); // Fall back to default plan if an error occurs
      } finally {
        setLoading(false);
      }
    };

    fetchWorkoutData();
  }, []);

  useEffect(() => {
    let timerInterval: NodeJS.Timeout;

    if (isTimerRunning && timer > 0) {
      timerInterval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && isTimerRunning) {
      setIsTimerRunning(false);
    }

    return () => clearInterval(timerInterval);
  }, [isTimerRunning, timer]);

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
    <div className="flex flex-col md:flex-row items-center md:items-start justify-between p-8">
      {/* Content Section */}
      <div className="md:w-2/3 w-full">
        {loading ? (
          <p>Loading today’s workout...</p>
        ) : error ? (
          <>
            <p>No workout data available.</p>
            <p>Please set up your profile and workout setting</p>
          </>
        ) : workoutFinished ? (
          <div>
            <h3 className="text-2xl font-semibold text-green-500">🎉 Congratulations! 🎉</h3>
            <p className="mt-4 text-lg">
              You have successfully completed today’s workout:{" "}
              <strong>{workoutData["Workout Name"]}</strong>.
            </p>
            <p>Great job! Keep up the good work!</p>
            <button
              className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => window.location.reload()}
            >
              Back
            </button>
          </div>
        ) : currentExerciseIndex !== null ? (
          <div>
            <h3 className="text-lg font-semibold">
              Exercise {currentExerciseIndex + 1} of {exercises.length}
            </h3>
            <p className="mt-2 text-xl font-bold">{exercises[currentExerciseIndex]?.Name}</p>
            <p className="mt-4">{exercises[currentExerciseIndex]?.Instructions}</p>
            <p className="mt-4 text-lg">
              <strong>Timer:</strong> {timer} seconds
            </p>
            <div className="mt-4">
              <button
                className="px-4 py-2 rounded bg-green-500 text-white"
                onClick={handleNextExercise}
              >
                {currentExerciseIndex === exercises.length - 1
                  ? "Finish Workout"
                  : "Next Exercise"}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-semibold">
              Today’s Workout: {workoutData["Workout Name"]}
            </h3>
              <p>
                <strong>Duration:</strong> {workoutData.Duration || "Not specified"}
              </p>
              <p>
                <strong>Difficulty:</strong> {workoutData.Difficulty || "Not specified"}
              </p>
              <p>
                <strong>Equipment Needed:</strong> {workoutData["Equipment Needed"] || "None"}
              </p>
            <p>
               <strong>Estimated Calories Burned:</strong>{" "}
               {workoutData["Estimated Calories Burned"] || "Unknown"}
             </p>
             <h4 className="mt-2 font-semibold">Exercises:</h4>
                <ul className="list-disc ml-5">
               {exercises.map((exercise: any, index: number) => (
                <li key={index}>
                  <strong>{exercise.Name}</strong>: {exercise.Instructions}
                </li>
              ))}
            </ul>
            <h4 className="mt-2 font-semibold">Additional Tips:</h4>
            <p>{workoutData["Additional Tips"] || "No additional tips provided"}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={handleStartWorkout}
            >
              Start Workout
            </button>
          </div>
        )}
      </div>

      {/* Image Section */}
      {!workoutStarted && (
        <div className="md:w-1/3 w-full mt-6 md:mt-0 flex justify-center md:ml-6">
          <img
            src="/images/plan.png"
            alt="Workout Image"
            className="max-w-full h-auto"
          />
        </div>
      )}
    </div>
  );
};

export default TodayWorkout;



