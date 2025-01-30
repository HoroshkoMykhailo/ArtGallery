# ArtGallery

## Project Overview

This web application allows gallery administrators to manage and display art pieces in a virtual gallery. Users can view, filter, and sort through artwork, while gallery admins can add new artwork or remove existing pieces.

The project consists of two main components: a frontend (Single Page Application) and a backend (Web API). You can implement either part to complete the task, but completing both is encouraged.

## Key Features

- **View Art Listings:** Users can browse a list of available artwork with details such as title, artist, type, price, and availability.
- **Sorting and Filtering:** Sort artworks by price (ascending or descending). Filter artworks by artist and type.
- **Add New Artwork:** Users can add an artwork to list of available artwork.
- **Delete Artwork:** Users can remove an artwork listing.
- **Persistent Gallery State:** Initially, four artworks are displayed upon application launch.

## Technical Requirements

- **Frontend:**
  - Language: TypeScript
  - Framework: React
- **Backend:**
  - Language: TypeScript
  - Framework: NestJS
  - Database: PostgreSQL
  - ORM: TypeORM

## Local Setup

To get the source code of the application, clone the repository using the following command `git clone <repository_link>`

Then:

1. Install dependencies: `npm install`.

2. Build shared: `npm run build:shared`

3. Run database. You can run it by installing postgres on your computer.

4. Create and fill all .env files. These files are:

- apps/frontend/.env
- apps/backend/.env

You should use .env.example files as a reference.

5. Run backend: `npm run start:dev -w apps/backend`

6. Run frontend: `npm run start:dev -w apps/frontend`
