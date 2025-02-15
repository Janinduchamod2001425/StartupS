import React, { Suspense } from "react";
import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import UserStartups from "@/components/UserStartups";
import { StartupCardSkeleton } from "@/components/StartupCard";

export const experimental_ppr = true; // Enable experimental performance features in Next.js

// User Profile Page
const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  // Extract user ID from the URL parameters
  const id = (await params).id;

  // Fetch the authenticated session
  const session = await auth();

  // Fetch user details from Sanity based on the ID
  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });

  // If user does not exist, show a 404 Not Found page
  if (!user) return notFound();

  return (
    <>
      <section className="profile_container">
        {/*Profile Card*/}
        <div className="profile_card">
          <div className="profile_title">
            {/*User Name*/}
            <h3 className="text-24-black uppercase text-center line-clamp-1">
              {user.name}
            </h3>
          </div>

          {/*User Profile Image*/}
          <Image
            src={user.image}
            alt={user.name}
            width={220}
            height={220}
            className="profile_image"
          />

          {/*Username*/}
          <p className="text-30-extrabold mt-7 text-center">
            @{user?.username}
          </p>

          {/*User Bio*/}
          <p className="mt-1 text-center text-14-normal">{user?.bio}</p>
        </div>

        {/*User's Startups*/}
        <div className="flex-1 flex flex-col gap-5 lg:mt-5">
          <p className="text-30-bold">
            {session?.id === id ? "My" : "All"} Startups
          </p>

          {/* Startups List */}
          <ul className="card_grid-sm">
            {/* Suspense ensures loading state while fetching data */}
            <Suspense fallback={<StartupCardSkeleton />}>
              <UserStartups id={id} />
            </Suspense>
          </ul>
        </div>
      </section>
    </>
  );
};
export default Page;
