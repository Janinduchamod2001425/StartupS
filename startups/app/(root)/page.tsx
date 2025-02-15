import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

// Home Page of the application
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  // Extract the search query from URL parameters
  const query = (await searchParams).query;

  // Define the query parameters
  const params = { search: query || null };

  // Fetch the authentication session
  const session = await auth();

  // Log the session ID (for debugging purposes)
  console.log(session?.id);

  // Fetch startup data from Sanity using query and parameters
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

  return (
    <>
      {/*Hero Section*/}
      <section className="gradient_container">
        {/*Main Title*/}
        <h1 className="heading">
          Pitch Your Startup, <br /> Connect With Entrepreneurs
        </h1>

        {/*Sub Title*/}
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
          Competitions.
        </p>

        {/*Search Bar*/}
        <SearchForm query={query} />
      </section>

      {/*Results Section*/}
      <section className="section_container">
        {/*Search results heading*/}
        <p className="text-30-semibold">
          {query ? `Search Results for "${query}"` : "All Startups"}
        </p>

        {/*Display search results in a grid*/}
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            // Map the posts if exists
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>

      {/*Enable real-time updates from sanity*/}
      <SanityLive />
    </>
  );
}
