"use client";

import React, { useState, useEffect } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useRouter } from "next/navigation";

const UserProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(true);
  const [username, setUsername] = useState("Username Example");
  const [email, setEmail] = useState("example@example.com");
  const [age, setAge] = useState<number | "">("");
  const [weight, setWeight] = useState<number | "">("");
  const [height, setHeight] = useState<number | "">("");
  const [goal, setGoal] = useState<string | null>(null);
  const [preference, setPreference] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const userId = localStorage.getItem("userId");
  const authToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authToken="))
    ?.split("=")[1];

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userId || !authToken) {
        setError("User is not authenticated.");
        router.push("/login");
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/user/profile?user_id=${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || "Failed to fetch profile.");
        }

        const data = await response.json();
        const userInfo = data.data;

        setUsername(userInfo.username || "");
        setEmail(userInfo.email || "");
        setAge(userInfo.age || "");
        setWeight(userInfo.weight_kg || "");
        setHeight(userInfo.height_cm || "");
        setGoal(userInfo.goal || null);
        setPreference(userInfo.preference || null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId, authToken]);

  const handleSaveClick = async () => {
    if (!userId || !authToken) {
      setError("User is not authenticated.");
      return;
    }

    try {
      setLoading(true);

      const profileData = {
        username,
        email,
        age,
        weight_kg: weight,
        height_cm: height,
        goal,
        preference,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/profile/update`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: userId, ...profileData }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to update profile.");
      }

      setIsEditing(false);
      console.log("Profile updated successfully!");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => setIsEditing(true);

  const handleContinue = () => console.log("Continue to next step");

  if (loading) {
    return (
      <DefaultLayout>
        <div className="flex items-center justify-center min-h-screen">
          <p>Loading...</p>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="flex items-center justify-center mb-6">
            <div className="w-24 h-24 bg-indigo-500 text-white rounded-full flex items-center justify-center text-3xl font-bold">
              {username[0]?.toUpperCase() || "?"}
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
            User Profile Setup
          </h2>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="text-center text-gray-700 mb-6">
            {isEditing ? (
              <>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value ? Number(e.target.value) : "")}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value ? Number(e.target.value) : "")}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value ? Number(e.target.value) : "")}
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
                <p className="mb-2">
                  <span className="font-semibold">Username:</span> {username}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Email:</span> {email}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Age:</span> {age}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Weight:</span> {weight} kg
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Height:</span> {height} cm
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Goal:</span> {goal}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Preference:</span> {preference}
                </p>
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

