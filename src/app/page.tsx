"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isCheckingLogin, setIsCheckingLogin] = useState(true);

  useEffect(() => {
    // Function to check if the user is logged in by verifying the token in cookies
    const checkLogin = () => {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("authToken="))
        ?.split("=")[1];

      if (token) {
        // If token exists, redirect to dashboard
        router.push("/dashboard");
      } else {
        // If no token, allow rendering the page
        setIsCheckingLogin(false);
      }
    };

    checkLogin();
  }, [router]);

  const handleSetUp = () => {
    // Navigate to the register page with the email as a parameter
    router.push(`/register?email=${encodeURIComponent(email)}`);
  };

  // Show a loading indicator while checking login status
  if (isCheckingLogin) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <p>Checking login status...</p>
      </div>
    );
  }

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/images/background.jpg')" }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Login Button */}
      <div className="absolute top-8 right-8">
        <a
          href="/login"
          className="bg-transparent border border-white text-white px-4 py-2 rounded-md hover:bg-white hover:text-black transition duration-300"
        >
          Log In
        </a>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl p-4">
        {/* Logo */}
        <Image src="/logo.svg" alt="Logo" width={150} height={50} className="mb-8" />

        {/* Heading */}
        <h1 className="text-4xl font-bold mb-4">
          We’ll Do the Heavy Lifting to Grow Your Personal Training Business
        </h1>

        {/* Subheading */}
        <p className="text-lg mb-6">
          Keep your clients easily on track with their fitness goals anytime and from anywhere
        </p>

        {/* Email Input and CTA Button */}
        <div className="flex items-center gap-4 w-full max-w-md mb-8">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 p-3 rounded-md text-gray-800"
          />
          <button
            onClick={handleSetUp}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md transition duration-300"
          >
            Set Up
          </button>
        </div>
      </div>
    </div>
  );
}

