"use client";

import React, { useState } from 'react';
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const UserProfilePage: React.FC = () => {
    const [isEditing, setIsEditing] = useState(true); // 初始为编辑状态
    const [username, setUsername] = useState('Username Example');
    const [email, setEmail] = useState('example@example.com');
    const [age, setAge] = useState<number | ''>('');
    const [weight, setWeight] = useState<number | ''>('');
    const [height, setHeight] = useState<number | ''>('');
    const [goal, setGoal] = useState<string | null>(null);
    const [preference, setPreference] = useState<string | null>(null);

    const handleSaveClick = () => {
        setIsEditing(false);
        console.log("Saved Profile:", { username, email, age, weight, height, goal, preference });
        // 在这里可以添加保存逻辑，例如调用API来保存用户信息
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleContinue = () => {
        // 用户选择继续到锻炼或饮食计划
        console.log("Continue to next step");
    };

    return (
        <DefaultLayout>
            <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                    <div className="flex items-center justify-center mb-6">
                        <div className="w-24 h-24 bg-indigo-500 text-white rounded-full flex items-center justify-center text-3xl font-bold">
                            {username[0].toUpperCase()}
                        </div>
                    </div>
                    <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">User Profile Setup</h2>

                    <div className="text-center text-gray-700 mb-6">
                        {isEditing ? (
                            <>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        id="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
                                        Age
                                    </label>
                                    <input
                                        type="number"
                                        id="age"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value ? Number(e.target.value) : '')}
                                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="weight">
                                        Weight (kg)
                                    </label>
                                    <input
                                        type="number"
                                        id="weight"
                                        value={weight}
                                        onChange={(e) => setWeight(e.target.value ? Number(e.target.value) : '')}
                                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="height">
                                        Height (cm)
                                    </label>
                                    <input
                                        type="number"
                                        id="height"
                                        value={height}
                                        onChange={(e) => setHeight(e.target.value ? Number(e.target.value) : '')}
                                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                                    />
                                </div>
                                <button
                                    onClick={handleSaveClick}
                                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition duration-300"
                                >
                                    Save Profile
                                </button>
                            </>
                        ) : (
                            <>
                                <p className="mb-2"><span className="font-semibold">Username:</span> {username}</p>
                                <p className="mb-2"><span className="font-semibold">Email:</span> {email}</p>
                                <p className="mb-2"><span className="font-semibold">Age:</span> {age}</p>
                                <p className="mb-2"><span className="font-semibold">Weight:</span> {weight} kg</p>
                                <p className="mb-2"><span className="font-semibold">Height:</span> {height} cm</p>
                                <p className="mb-2"><span className="font-semibold">Goal:</span> {goal}</p>
                                <p className="mb-2"><span className="font-semibold">Preference:</span> {preference}</p>
                                <button
                                    onClick={handleEditClick}
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition duration-300 mt-4"
                                >
                                    Edit Profile
                                </button>
                                <button
                                    onClick={handleContinue}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-300 mt-4"
                                >
                                    Continue to Next Step
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default UserProfilePage;
