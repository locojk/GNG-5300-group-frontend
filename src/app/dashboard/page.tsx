"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Summary from "@/components/Dashboard/Summary";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    // Check for the auth token in cookies
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("authToken="))
      ?.split("=")[1];

    // if (!token) {
    //   // If no token, redirect to the home page
    //   router.push("/");
    // }
  }, [router]);

  return (
    <DefaultLayout>
      <Summary />
    </DefaultLayout>
  );
}
