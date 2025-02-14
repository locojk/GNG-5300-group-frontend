"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Summary from "@/components/Dashboard/Summary";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export default function Dashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authToken="))
    ?.split("=")[1];

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
