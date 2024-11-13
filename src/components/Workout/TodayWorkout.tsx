// import React from "react";

// interface TodayWorkoutProps {
//   workoutName: string;
//   duration: string;
//   exercises: string[];
//   onStartWorkout: () => void;
// }

// const TodayWorkout: React.FC<TodayWorkoutProps> = ({
//   workoutName,
//   duration,
//   exercises,
//   onStartWorkout,
// }) => {
//   return (
//     <div className="rounded-lg border border-gray-300 bg-white p-5 shadow-md dark:border-gray-700 dark:bg-gray-800">
//       <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
//         Today’s Workout: {workoutName}
//       </h3>
//       <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
//         Duration: {duration}
//       </p>

//       <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
//         Exercises:
//       </h4>
//       <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 mb-4">
//         {exercises.map((exercise, index) => (
//           <li key={index}>{exercise}</li>
//         ))}
//       </ul>

//       <button
//         onClick={onStartWorkout}
//         className="w-full py-2 text-center text-white bg-blue-500 hover:bg-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
//       >
//         Start Workout
//       </button>
//     </div>
//   );
// };

// export default TodayWorkout;

import React from "react";

const TodayWorkout: React.FC = () => {
  const workoutData = {
    workoutName: "Upper Body Strength",
    duration: "45 minutes",
    exercises: ["Push-ups", "Pull-ups", "Squats", "Plank"],
  };

  const handleStartWorkout = () => {
    console.log("Workout started!");
  };

  return (
    <div>
      <h3 className="text-lg font-semibold">Today’s Workout: {workoutData.workoutName}</h3>
      <p>Duration: {workoutData.duration}</p>
      <h4 className="mt-2 font-semibold">Exercises:</h4>
      <ul>
        {workoutData.exercises.map((exercise, index) => (
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
