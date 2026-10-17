# Movii

Movii is a movie search app built with React. It shows a randomly selected
featured movie on first load, lets you search the OMDb catalog, view movie
details, and switch between light and dark themes.

Movie data is requested through a server-side Vercel Function. The OMDb API key
is kept on the server and is not included in the browser bundle.

## Requirements

- Node.js and npm
- The Vercel CLI for local development
- An [OMDb API key](https://www.omdbapi.com/apikey.aspx)

Install the Vercel CLI globally if needed:

```sh
npm install --global vercel
```

## Setup

Install project dependencies:

```sh
npm install
```

Create `.env.local` in the project root and add your OMDb API key:

```env
OMDB_API_KEY=your_api_key
```

Do not add the `REACT_APP_` prefix. The key is read only by the server-side
function. Keep `.env.local` private and do not commit it.

## Local development

Start the app and Vercel Function together:

```sh
npm start
```

Open [http://localhost:3001](http://localhost:3001). Use this address rather
than port 3000 so the browser requests and `/api/movies` function are served by
Vercel's local development server.

## Features

- Shows a random featured movie as soon as the app opens
- Searches for movies by title
- Opens movie details when a result is selected
- Provides poster placeholders when a movie has no poster
- Supports light and dark themes

## API

The Vercel Function in `api/movies.js` proxies requests to OMDb:

- `GET /api/movies?s=<search term>` searches for movies
- `GET /api/movies?i=<IMDb ID>` fetches movie details

Provide one parameter per request. The function responds with an error if
`OMDB_API_KEY` is missing or the request to OMDb fails.

## Deploy to Vercel

1. Import this repository as a project in Vercel.
2. Add `OMDB_API_KEY` under **Project Settings → Environment Variables** for
   the environments where the app should run.
3. Deploy or redeploy the project.

The frontend is built with `react-scripts build`; Vercel deploys the `api/`
function alongside the static build.

## Available scripts

| Command | Description |
| --- | --- |
| `npm start` | Start Vercel's local development server on port 3001 |
| `npm test` | Run the Create React App test runner |
| `npm run build` | Create an optimized production build in `build/` |
