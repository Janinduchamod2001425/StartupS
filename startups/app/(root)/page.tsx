import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";
import {client} from "@/sanity/lib/client";
import {STARTUPS_QUERY} from "@/sanity/lib/queries";

export default async function Home({searchParams}: { searchParams: Promise<{ query?: string }> }) {

    const query = (await searchParams).query

    const posts = await client.fetch(STARTUPS_QUERY);
    
    return (
        <>
            {/*Hero Section*/}
            <section className="pink_container">
                {/*Main Title*/}
                <h1 className="heading">Pitch Your Startup, <br/> Connect With Entrepreneurs</h1>

                {/*Sub Title*/}
                <p className="sub-heading !max-w-3xl">
                    Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.
                </p>

                {/*Search Bar*/}
                <SearchForm query={query}/>
            </section>

            {/*Results Section*/}
            <section className="section_container">

                {/*Search results heading*/}
                <p className="text-30-semibold">
                    {query ? `Search Results for "${query}"` : "All Startups"}
                </p>

                <ul className="mt-7 card_grid">
                    {
                        posts?.length > 0 ? (
                            posts.map((post: StartupCardType) => (
                                <StartupCard key={post?._id} post={post}/>
                            ))
                        ) : (
                            <p className="no-results">No startups found</p>
                        )
                    }
                </ul>

            </section>
        </>
    )
}
