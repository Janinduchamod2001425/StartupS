# StartupS 💡

<img src="https://go-skill-icons.vercel.app/api/icons?i=nextjs,typescript,tailwind"  alt="Cover Image"/>

![Startups App Demo](./cover/startups.png)

 <div>
    <img src="https://img.shields.io/badge/-Typescript-black?style=for-the-badge&logoColor=white&logo=react&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/-Sanity-black?style=for-the-badge&logoColor=white&logo=sanity&color=F03E2F" alt="sanity" />

  </div>

## <a name="tech-stack">⚙️ Tech Stack</a>

- React 19
- Next.js 15
- Sanity
- TailwindCSS
- ShadCN
- TypeScript

## <a name="features">🔋 Features</a>

- **Live Content API**: Displays the latest startup ideas dynamically on the homepage using Sanity's Content API.

- **GitHub Authentication**: Allows users to log in easily using their GitHub account.

- **Pitch Submission**: Users can submit startup ideas, including title, description, category, and multimedia links (
image or video).

- **View Pitches**: Browse through submitted ideas with filtering options by category.

- **Pitch Details Page**: Click on any pitch to view its details, with multimedia and description displayed.

- **Profile Page**: Users can view the list of pitches they've submitted.

- **Editor Picks**: Admins can highlight top startup ideas using the "Editor Picks" feature managed via Sanity Studio.

- **Views Counter**: Tracks the number of views for each pitch instead of an upvote system.

- **Search**: Search functionality to load and view pitches efficiently.

- **Minimalistic Design**: Fresh and simple UI with only the essential pages for ease of use and a clean aesthetic.

and many more, including the latest **React 19**, **Next.js 15** and **Sanity** features alongside code architecture and
reusability

<hr />

#### Create next App

```bash
npx create-next-app@latest
```

#### Install Next Auth

```bash
npm install next-auth
```

#### Get the Auth Secret

```bash
npx auth secret
```

#### shadcn components

```bash
npx shadcn@latest add input textarea toast     
```

#### Set up Environment Variables

Create a new file named `.env.local` in the root of your project and add the following content:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SANITY_API_VERSION='vX'
SANITY_TOKEN=

AUTH_SECRET= 
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
```
