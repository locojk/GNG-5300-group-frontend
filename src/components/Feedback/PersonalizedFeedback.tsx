import React from "react";

export default function PersonalizedFeedback() {
  const feedback = [
    "Great job keeping up with your workouts! Consider increasing the intensity for better results.",
    "Make sure to focus on your diet as well. A balanced diet will help you achieve your fitness goals.",
    "You have been consistent for the past few weeks. Try adding some variety to your routine for more fun!",
  ];

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">AI-Generated Personalized Feedback</h2>
      <ul className="list-disc pl-5 space-y-2">
        {feedback.map((item, index) => (
          <li key={index} className="text-gray-700">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
