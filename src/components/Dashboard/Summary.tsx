"use client";

import React from "react";
import TodayWorkout from "@/components/Workout/TodayWorkout";
import WeeklyProgress from "@/components/Workout/WeeklyProgress";
import GoalProgressChart from "@/components/Charts/GoalProgressChart";
import dynamic from "next/dynamic";

// Load charts dynamically to avoid SSR issues
const PerformanceChart = dynamic(() => import("@/components/Charts/PerformanceChart"), { ssr: false });
const MilestonesChart = dynamic(() => import("@/components/Charts/MilestonesChart"), { ssr: false });

// Card wrapper component with vertical centering
const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-white shadow-md rounded-lg p-6 h-full flex items-center justify-center">
    {children}
  </div>
);

const Summary: React.FC = () => {
  return (
    <div className="p-6 grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {/* Today's Workout */}
      <Card>
        <TodayWorkout />
      </Card>

      {/* Weekly Progress */}
      <Card>
        <WeeklyProgress />
      </Card>

      {/* Goal Progress */}
      <Card>
        <GoalProgressChart />
      </Card>

      {/* Additional Progress Tracking */}
      <div className="col-span-1 md:col-span-2 xl:col-span-3 grid gap-6 grid-cols-1 xl:grid-cols-2">
        <Card>
          <PerformanceChart />
        </Card>
        <Card>
          <MilestonesChart />
        </Card>
      </div>
    </div>
  );
};

export default Summary;




