import React from "react";
import StartupForm from "@/components/StartupForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Page = async () => {
  // Check if the user is authenticated
  const session = await auth();

  if (!session) redirect("/");

  return (
    <>
      {/*Hero section*/}
      <section className="pink_container !min-h-[230px]">
        <h1 className="heading">Submit Your Startup</h1>
      </section>

      {/*Form*/}
      <StartupForm />
    </>
  );
};
export default Page;
