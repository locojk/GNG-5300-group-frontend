// "use client";

// import React, { useState, useEffect, useRef } from "react";

// const TodayWorkout: React.FC = () => {
//   const [workoutData, setWorkoutData] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number | null>(null);
//   const [timer, setTimer] = useState<number>(30); // Default timer for each exercise (30 seconds)
//   const [isTimerRunning, setIsTimerRunning] = useState(false);
//   const [workoutFinished, setWorkoutFinished] = useState(false);
//   const apiCallInitiated = useRef(false);

//   const defaultPlan = {
//     "Workout Name": "Default Full Body Workout",
//     Duration: "30 minutes",
//     Difficulty: "Beginner",
//     "Estimated Calories Burned": "150-200 calories",
//     "Equipment Needed": "None",
//     Exercises: [
//       { Name: "Bodyweight Squats", Instructions: "Perform 3 sets of 10-15 reps." },
//       { Name: "Push-Ups", Instructions: "Perform 3 sets of 10 reps. Modify if necessary." },
//       { Name: "Lunges", Instructions: "Perform 3 sets of 10 reps per leg." },
//       { Name: "Planks", Instructions: "Hold for 30 seconds. Repeat 3 times." },
//       { Name: "Jumping Jacks", Instructions: "Perform 3 sets of 15 reps to finish." },
//     ],
//     "Additional Tips": "Make sure to warm up and cool down before and after the workout.",
//   };

//   useEffect(() => {
//     const fetchWorkoutData = async () => {
//       if (apiCallInitiated.current) return;
//       apiCallInitiated.current = true;

//       try {
//         const token = localStorage.getItem("authToken");
//         if (!token) {
//           throw new Error("Authentication token not found. Please log in.");
//         }

//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ai_chat/query`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ query: "today's workout plan" }),
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch workout data");
//         }

//         const result = await response.json();
//         console.log("API Response:", result);

//         if (result.status === "success" && result.data) {
//           const exercises = Array.isArray(result.data.Exercises)
//             ? result.data.Exercises
//             : [];

//           // Use the default plan if exercises are empty
//           if (exercises.length === 0) {
//             setWorkoutData(defaultPlan);
//           } else {
//             setWorkoutData(result.data);
//           }
//         } else {
//           throw new Error(result.message || "Invalid workout data received from the API");
//         }
//       } catch (err: any) {
//         console.error("Error fetching workout data:", err);
//         setError(err.message);
//         setWorkoutData(defaultPlan); // Fall back to default plan if an error occurs
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWorkoutData();
//   }, []);

//   useEffect(() => {
//     let timerInterval: NodeJS.Timeout;

//     if (isTimerRunning && timer > 0) {
//       timerInterval = setInterval(() => {
//         setTimer((prevTimer) => prevTimer - 1);
//       }, 1000);
//     } else if (timer === 0 && isTimerRunning) {
//       setIsTimerRunning(false);
//     }

//     return () => clearInterval(timerInterval);
//   }, [isTimerRunning, timer]);

//   const handleStartWorkout = () => {
//     if (workoutData && workoutData.Exercises) {
//       setCurrentExerciseIndex(0); // Start with the first exercise
//       setTimer(30); // Reset timer for the first exercise
//       setIsTimerRunning(true); // Start the timer
//     }
//   };

//   const handleNextExercise = () => {
//     if (currentExerciseIndex !== null && workoutData?.Exercises) {
//       if (currentExerciseIndex < workoutData.Exercises.length - 1) {
//         setCurrentExerciseIndex(currentExerciseIndex + 1);
//         setTimer(30); // Reset timer for the next exercise
//         setIsTimerRunning(true); // Start the timer
//       } else {
//         setWorkoutFinished(true); // Mark workout as finished
//         setCurrentExerciseIndex(null); // Reset exercise index
//         setIsTimerRunning(false); // Stop the timer
//       }
//     }
//   };

//   if (loading) {
//     return <p>Loading today’s workout...</p>;
//   }

//   if (error) {
//     console.warn("Using default workout due to error:", error);
//   }

//   if (!workoutData) {
//     return <p>No workout data available.</p>;
//   }

//   const exercises = Array.isArray(workoutData.Exercises)
//     ? workoutData.Exercises
//     : [];

//   if (workoutFinished) {
//     return (
//       <div>
//         <h3 className="text-2xl font-semibold text-green-500">🎉 Congratulations! 🎉</h3>
//         <p className="mt-4 text-lg">
//           You have successfully completed today’s workout:{" "}
//           <strong>{workoutData["Workout Name"]}</strong>.
//         </p>
//         <p>Great job! Keep up the good work!</p>
//       </div>
//     );
//   }

//   if (currentExerciseIndex !== null) {
//     const isLastExercise = currentExerciseIndex === exercises.length - 1;

//     return (
//       <div>
//         <h3 className="text-lg font-semibold">
//           Exercise {currentExerciseIndex + 1} of {exercises.length}
//         </h3>
//         <p className="mt-2 text-xl font-bold">{exercises[currentExerciseIndex]?.Name}</p>
//         <p className="mt-4">{exercises[currentExerciseIndex]?.Instructions}</p>
//         <p className="mt-4 text-lg">
//           <strong>Timer:</strong> {isLastExercise ? "N/A" : `${timer} seconds`}
//         </p>
//         <div className="mt-4">
//           <button
//             className={`px-4 py-2 rounded bg-green-500 text-white`}
//             onClick={handleNextExercise}
//           >
//             {isLastExercise ? "Finish Workout" : "Next Exercise"}
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h3 className="text-lg font-semibold">
//         Today’s Workout: {workoutData["Workout Name"]}
//       </h3>
//       <p>
//         <strong>Duration:</strong> {workoutData.Duration || "Not specified"}
//       </p>
//       <p>
//         <strong>Difficulty:</strong> {workoutData.Difficulty || "Not specified"}
//       </p>
//       <p>
//         <strong>Equipment Needed:</strong> {workoutData["Equipment Needed"] || "None"}
//       </p>
//       <p>
//         <strong>Estimated Calories Burned:</strong> {workoutData["Estimated Calories Burned"] || "Unknown"}
//       </p>
//       <h4 className="mt-2 font-semibold">Exercises:</h4>
//       <ul>
//         {exercises.map((exercise: any, index: number) => (
//           <li key={index}>• {exercise.Name}</li>
//         ))}
//       </ul>
//       <h4 className="mt-2 font-semibold">Additional Tips:</h4>
//       <p>{workoutData["Additional Tips"] || "No additional tips provided"}</p>
//       <button
//         className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
//         onClick={handleStartWorkout}
//       >
//         Start Workout
//       </button>
//     </div>
//   );
// };

// export default TodayWorkout;

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
  const apiCallInitiated = useRef(false);

  const defaultPlan = {
    "Workout Name": "Default Full Body Workout",
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
        const token = localStorage.getItem("authToken");
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
      setCurrentExerciseIndex(0); // Start with the first exercise
      setTimer(30); // Reset timer for the first exercise
      setIsTimerRunning(true); // Start the timer
    }
  };

  const handleNextExercise = () => {
    if (currentExerciseIndex !== null && workoutData?.Exercises) {
      if (currentExerciseIndex < workoutData.Exercises.length - 1) {
        setCurrentExerciseIndex(currentExerciseIndex + 1);
        setTimer(30); // Reset timer for the next exercise
        setIsTimerRunning(true); // Start the timer
      } else {
        setWorkoutFinished(true); // Mark workout as finished
        setCurrentExerciseIndex(null); // Reset exercise index
        setIsTimerRunning(false); // Stop the timer
      }
    }
  };

  const exercises = Array.isArray(workoutData?.Exercises)
    ? workoutData.Exercises
    : [];

  return (
    <div className="flex">
      {/* Content Section */}
      <div className="w-1/2 p-4">
        {loading ? (
          <p>Loading today’s workout...</p>
        ) : error ? (
          <>
            <p>No workout data available.</p>
            <p>Error: {error}</p>
          </>
        ) : workoutFinished ? (
          <div>
            <h3 className="text-2xl font-semibold text-green-500">🎉 Congratulations! 🎉</h3>
            <p className="mt-4 text-lg">
              You have successfully completed today’s workout:{" "}
              <strong>{workoutData["Workout Name"]}</strong>.
            </p>
            <p>Great job! Keep up the good work!</p>
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
                <li key={index}>{exercise.Name}</li>
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
      <div className="w-1/3">
        <img
          src="/images/plan.png"
          alt="Workout Image"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default TodayWorkout;




























