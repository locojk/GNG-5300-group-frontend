import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import PersonalizedFeedback from "@/components/Feedback/PersonalizedFeedback";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feedback - Workout AI",
};

export default function FeedbackPage() {
  return (
    <DefaultLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">
          Your Progress Feedback
        </h1>
        <div className="mb-12">
          <PersonalizedFeedback />
        </div>
      </div>
    </DefaultLayout>
  );
}
