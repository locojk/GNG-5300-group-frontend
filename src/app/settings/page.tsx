"use client";

import React, { useState } from 'react';
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const SettingsPage: React.FC = () => {
    // State to hold user choices
    const [goal, setGoal] = useState<string | null>(null);
    const [daysPerWeek, setDaysPerWeek] = useState<number>(3);
    const [workoutDuration, setWorkoutDuration] = useState<number>(30);
    const [restDays, setRestDays] = useState<string[]>([]);

    const handleGoalSelect = (selectedGoal: string) => {
        setGoal(selectedGoal);
    };

    const handleDayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDaysPerWeek(Number(event.target.value));
    };

    const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWorkoutDuration(Number(event.target.value));
    };

    const handleRestDayToggle = (day: string) => {
        setRestDays((prevRestDays) =>
            prevRestDays.includes(day)
                ? prevRestDays.filter(d => d !== day)
                : [...prevRestDays, day]
        );
    };

    const handleGeneratePlan = () => {
        console.log("Goal:", goal);
        console.log("Days per week:", daysPerWeek);
        console.log("Workout duration:", workoutDuration);
        console.log("Rest days:", restDays);
        // Here you would implement the logic to generate a workout plan based on the selected settings
    };

    return (
        <DefaultLayout>
            <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                    <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Workout Settings</h2>

                    {/* Step 1: Select Fitness Goal */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">Select Your Fitness Goal</h3>
                        <div className="flex gap-4">
                            <button
                                className={`px-4 py-2 rounded-md transition duration-300 ${goal === 'Strength' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                                onClick={() => handleGoalSelect('Strength')}
                            >
                                Strength
                            </button>
                            <button
                                className={`px-4 py-2 rounded-md transition duration-300 ${goal === 'Weight Loss' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                                onClick={() => handleGoalSelect('Weight Loss')}
                            >
                                Weight Loss
                            </button>
                            <button
                                className={`px-4 py-2 rounded-md transition duration-300 ${goal === 'Flexibility' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                                onClick={() => handleGoalSelect('Flexibility')}
                            >
                                Flexibility
                            </button>
                        </div>
                    </div>

                    {/* Step 2: Set Schedule */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">Set Your Workout Schedule</h3>
                        <label className="block mb-2 text-gray-700">
                            Days per Week
                            <input
                                type="number"
                                min="1"
                                max="7"
                                value={daysPerWeek}
                                onChange={handleDayChange}
                                className="w-full p-2 mt-1 border rounded-lg"
                            />
                        </label>
                        <label className="block mb-2 text-gray-700">
                            Workout Duration (minutes)
                            <input
                                type="number"
                                min="10"
                                value={workoutDuration}
                                onChange={handleDurationChange}
                                className="w-full p-2 mt-1 border rounded-lg"
                            />
                        </label>
                    </div>

                    {/* Step 3: Select Rest Days */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">Select Rest Days</h3>
                        <div className="flex gap-2 flex-wrap">
                            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
                                <button
                                    key={day}
                                    className={`px-3 py-1 rounded-md transition duration-300 ${restDays.includes(day) ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                                    onClick={() => handleRestDayToggle(day)}
                                >
                                    {day}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Generate Plan Button */}
                    <button
                        onClick={handleGeneratePlan}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition duration-300"
                    >
                        Generate Workout Plan
                    </button>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default SettingsPage;
