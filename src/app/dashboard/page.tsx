"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Summary from "@/components/Dashboard/Summary";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/");
    }
  }, [router]);

  return (
    <DefaultLayout>
      <Summary />
    </DefaultLayout>
  );
}
