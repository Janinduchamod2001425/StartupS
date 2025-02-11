import {defineQuery} from "next-sanity";

// This query used to fetch posts data from sanity database
export const STARTUPS_QUERY = defineQuery(`*[_type == "startup" && defined(slug.current)] | order(_createdAt desc) {
    _id,
    title,
    slug,
    _createdAt,
    author -> {
        _id, name, image, bio
    },
    views,
    description,
    category,
    image
}`);