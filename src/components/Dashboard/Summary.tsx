"use client";

import React from "react";
import TodayWorkout from "@/components/Workout/TodayWorkout";

// Card wrapper component
const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-white shadow-md rounded-lg p-6 flex flex-col">
    {children}
  </div>
);

const Summary: React.FC = () => {
  return (
    <div className="p-6 grid gap-6">
      {/* Today's Workout Plan (Full Width) */}
      <Card>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Today's Workout Plan</h2>
        <TodayWorkout />
      </Card>

      {/* Your Work Progress (Full Width) */}
      {/* <Card>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Your Work Progress</h2>
        <WeeklyProgress />
      </Card> */}
    </div>
  );
};

export default Summary;





