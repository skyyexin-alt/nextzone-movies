# NextZone

A complete, production-ready cinematic movie and TV discovery platform built with Next.js 14, Tailwind CSS, and the TMDB API.

## Features

- **Cinematic Dark Theme**: Beautiful, immersive UI optimized for streaming content.
- **Server-Side Rendered**: Next.js App Router for optimal SEO and performance.
- **TMDB API Integration**: Securely fetches live movie and TV show data.
- **Smooth Carousels**: Touch-friendly, draggable content rails using Embla Carousel.
- **My Watchlist**: Save movies and shows to your local storage.
- **Random Pick**: Spin the wheel to get a random movie recommendation!
- **Universal Search**: Fast, debounced search overlay for finding content instantly.
- **Fully Responsive**: Flawless experience from mobile to 4K monitors.

## Setup Instructions

1. **Clone or Download** this directory.
2. Ensure you have **Node.js** installed (v24 or later recommended).
3. Open a terminal in this directory and run:
   ```bash
   npm install
   ```
4. Copy the environment variables example:
   ```bash
   cp .env.example .env.local
   ```
5. Add your TMDB API Key to `.env.local` (`NEXT_PUBLIC_TMDB_API_KEY`).
6. Start the development server:
   ```bash
   npm run dev
   ```
7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Carousels**: Embla Carousel React

## License

This project is for educational and portfolio purposes. Data is provided by the TMDB API.
