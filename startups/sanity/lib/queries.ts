import { defineQuery } from "next-sanity";

// This query fetches all startups from the Sanity database
// It filters startups that have a defined slug and match the search query in title, category, or author's name
// Results are ordered by creation date in descending order
export const STARTUPS_QUERY =
  defineQuery(`*[_type == "startup" && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search ] | order(_createdAt desc) {
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

// This query fetches a specific startup by its ID
// It retrieves detailed information about the startup, including the author and pitch content
export const STARTUP_BY_ID_QUERY =
  defineQuery(`*[_type == "startup" && _id == $id][0]{
    _id,
    title,
    slug,
    _createdAt,
    author -> {
        _id, name, username, image, bio
    },
    views,
    description,
    category,
    image,
    pitch
}`);

// This query fetches the number of views for a specific startup by its ID
export const STARTUP_VIEWS_QUERY =
  defineQuery(`*[_type == "startup" && _id == $id][0]{
    _id, views
}`);

// This query fetches an author by their GitHub ID
// It retrieves details such as name, username, image, and bio
export const AUTHOR_BY_GITHUB_ID_QUERY =
  defineQuery(`*[_type == "author" && id == $id][0] {
    _id,
    id,
    name,
    username,
    image,
    bio
}`);

// This query fetches an author by their unique Sanity document ID
// It returns the same details as the GitHub query but uses the author's Sanity ID instead
export const AUTHOR_BY_ID_QUERY =
  defineQuery(`*[_type == "author" && _id == $id][0] {
    _id,
    id,
    name,
    username,
    image,
    bio
}`);

// This query fetches all startups created by a specific author
// It filters startups by the author's reference ID and orders results by creation date in descending order
export const STARTUPS_BY_AUTHOR_QUERY =
  defineQuery(`*[_type == "startup" && author._ref == $id] | order(_createdAt desc) {
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

// This query fetches a playlist by its slug
// It retrieves the playlist along with its selected startups, including their authors and relevant details
export const PLAYLIST_BY_SLUG_QUERY =
  defineQuery(`*[_type == "playlist" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  select[]->{
    _id,
    _createdAt,
    title,
    slug,
    author->{
      _id,
      name,
      slug,
      image,
      bio
    },
    views,
    description,
    category,
    image,
    pitch
  }
}`);
