import Summary from "@/components/Dashboard/Summary";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title:
    "Workout AI",
  description: "GNG-5300 Group Project",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <Summary />
      </DefaultLayout>
    </>
  );
}