# MelodIQ

MelodIQ is a web application that lets users explore and analyse music listening habits using data from Last.fm.
Users can search for listeners, view their profiles, and see their most played tracks, albums, and artists.

The goal of MelodIQ is to provide a clean, fast interface for discovering listening patterns and comparing music taste.

---

## Features

### Search Users

Find any Last.fm user and explore their listening activity.

### Top Tracks, Albums, and Artists

View a user's most played music ranked by play count.

### User Profiles

Each profile displays curated listening statistics including:

* Top tracks
* Top albums
* Top artists

### Fast and Modern UI

MelodIQ is built using modern React architecture with server components and optimized data fetching.

---

## Tech Stack

**Framework**

* Next.js (App Router)

**Language**

* TypeScript

**Styling**

* Tailwind CSS

**Database / ORM**

* Prisma

**Icons**

* Lucide React

**APIs**

* Last.fm API

---

## Installation

Clone the repository:

```bash
git clone https://github.com/mjmck/melodIQ.git
cd melodIQ
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
DATABASE_URL=your_database_url
API_SECRET=your_lastfm_api_secret
API_KEY=your_lastfm_api_key
```

Run the development server:

```bash
npm run dev
```

The app will be available at:

```
http://localhost:3000
```
---

## Author

Created as a personal project exploring modern full-stack development with Next.js and music data analysis.

