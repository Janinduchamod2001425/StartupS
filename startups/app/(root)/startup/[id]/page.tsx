import React, { Suspense } from "react";
import {
  PLAYLIST_BY_SLUG_QUERY,
  STARTUP_BY_ID_QUERY,
} from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";

const md = markdownit();

export const experimental_ppr = true;

// Display the startup card when the user clicks on the  details button in the startup card
const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  // Fetch the Startups and Editor Picks Startups from Sanity
  // Promise.all is used to execute both fetch requests at the same time(Parallel Fetching),
  // improving performance by avoiding sequential fetching.
  const [post, { select: editorPosts }] = await Promise.all([
    client.fetch(STARTUP_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: "editor-picks" }),
  ]);

  // If the post or editor picks startups are not found, return a 404 Not Found page
  if (!post) return notFound();

  // Convert the startup's pitch from Markdown to HTML using the Markdown renderer
  const parsedContent = md.render(post?.pitch || "");

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        {/*Posted Date*/}
        <p className="tag">{formatDate(post?._createdAt)}</p>

        {/*Post Title*/}
        <h1 className="heading">{post?.title}</h1>

        {/*Description*/}
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>

      <section className="section_container">
        {/*Post Thumbnail*/}
        <img
          src={post.image}
          alt="Thumbnail"
          className="w-full h-auto rounded-xl"
        />
        {/*Avatar*/}
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              {/*Author Profile*/}
              <Image
                src={post.author.image}
                alt="Avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />

              {/*Author Name and Username*/}
              <div>
                <p className="text-20-medium">{post.author.name}</p>
                <p className="text-16-medium !text-black-300">
                  @{post.author.username}
                </p>
              </div>
            </Link>

            {/*Category*/}
            <p className="category-tag">{post.category}</p>
          </div>

          {/*Pitch Details*/}
          <h3 className="text-30-bold">Pitch Details</h3>
          {parsedContent ? (
            <article
              className="prose max-w-4xl font-work-sans break-all"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="no-results">No Details Provided</p>
          )}
        </div>
        {/*Section Divider*/}
        <hr className="divider" />
        {/*Editor Picks Posts*/}
        {editorPosts?.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="text-30-semibold">Editor Picks</p>

            <ul className="mt-7 card_grid-sm">
              {editorPosts.map((post: StartupTypeCard, i: number) => (
                <StartupCard key={i} post={post} />
              ))}
            </ul>
          </div>
        )}
        {/*Use skeleton while loading the startups*/}
        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};
export default Page;
