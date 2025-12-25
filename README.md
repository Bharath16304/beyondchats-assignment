BeyondChats Assignment – Full Stack Implementation
Introduction

This repository contains my complete solution for the BeyondChats technical assignment.
The task was divided into three phases covering backend development, automation using AI, and frontend rendering.

I’ve focused on keeping the solution practical, clean, and easy to understand, while following real-world development practices.

Project Structure

beyondchats-assignment/
├── backend-laravel/     # Laravel backend (Phase 1)
├── node-ai-updater/     # Node.js AI automation (Phase 2)
├── frontend-react/      # React frontend (Phase 3)
└── README.md

beyondchats-assignment/
├── backend-laravel/     # Laravel backend (Phase 1)
├── node-ai-updater/     # Node.js AI automation (Phase 2)
├── frontend-react/      # React frontend (Phase 3)
└── README.md

Phase 1 – Laravel Backend
What was done

Created a Laravel backend to manage blog articles

Scraped articles from the BeyondChats blog and stored them in the database

Built REST APIs to create, read, update, and delete articles

Added pagination and an is_updated flag to track rewritten content

Key Features

Custom Artisan command for scraping blog articles

SQLite database for simplicity

Clean REST API design

Pagination support

How to run

cd backend-laravel
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve

To run the scraper:
php artisan scrape:beyondchats


Phase 2 – Node.js AI Automation
What was done

In this phase, I built a Node.js script that automates article enhancement using AI:

Fetches the latest article from the Laravel API

Searches the article title on Google

Selects the top two relevant blog/article links

Scrapes their main content

Uses an LLM (Google Gemini) to rewrite the original article

Publishes the updated article back to Laravel

Adds a references section citing the scraped sources

Tech Used

Node.js

Axios

Cheerio

SerpAPI (Google Search)

Google Gemini API

Environment variables

Create a .env file inside node-ai-updater/:


LARAVEL_API=http://127.0.0.1:8000/api/articles
SERPAPI_KEY=your_serpapi_key
GEMINI_API_KEY=your_gemini_api_key

How to run

cd node-ai-updater
npm install
node index.js

Note: Running the AI rewrite requires a valid Gemini API key.
The full pipeline logic is implemented as required, even if API execution is limited by key or quota.

Phase 3 – React Frontend
What was done

Created a simple React frontend using Vite

Fetched articles from the Laravel API

Displayed original and updated articles clearly

Highlighted rewritten articles using an “Updated” badge

Built a responsive and clean UI

How to run
cd frontend-react
npm install
npm run dev

Open:
http://localhost:5173


npm run dev
Open:

arduino
Copy code
http://localhost:5173
Running the Project Together
You’ll typically use two terminals:

Terminal 1 – Laravel backend
cd backend-laravel
php artisan serve

Terminal 2 – React frontend
cd frontend-react
npm run dev

(Optional) Run AI updater:
cd node-ai-updater
node index.js
