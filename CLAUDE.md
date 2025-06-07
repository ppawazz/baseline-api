# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development

- Start the development server with hot reloading:
  ```
  npm run dev
  ```

- Start the production server:
  ```
  npm start
  ```

### Docker Setup

- Start the application and database with Docker Compose:
  ```
  docker-compose up
  ```

- Build and start containers in detached mode:
  ```
  docker-compose up --build -d
  ```

- Stop containers:
  ```
  docker-compose down
  ```

- View logs:
  ```
  docker-compose logs -f
  ```

## Environment Variables

The application requires these environment variables, typically set in a `.env` file:

```
PORT=3000
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=products_db
```

When running outside Docker, change `DB_HOST` to `localhost` or your database host.

## Architecture

This is a simple REST API built with Express.js and PostgreSQL with the following structure:

1. **Express Application** (`src/app.js`): The main entry point that sets up the Express server and routes.

2. **Routes** (`src/routes/`): Define API endpoints:
   - `data.js`: Routes for `/api/data` endpoints

3. **Controllers** (`src/controllers/`): Handle HTTP requests and responses:
   - `dataController.js`: Controller for data endpoints

4. **Services** (`src/services/`): Contain business logic and database operations:
   - `dbService.js`: Database operations using the `pg` client

5. **Database**:
   - PostgreSQL database initialized with sample product data
   - Initial schema and data defined in `init.sql`

### Data Flow

1. GET `/api/data`:
   - Route directs to `getData` controller
   - Controller calls `getDataFromDB` service
   - Service queries PostgreSQL database
   - Data flows back through the layers to the client as JSON

2. GET `/api/data/count`:
   - Route directs to `countData` controller
   - Controller calls `countDataFromDB` service
   - Service counts all records in the product table
   - Count data flows back through the layers to the client as JSON

3. POST `/api/data/create/:count`:
   - Route directs to `createData` controller
   - Controller validates the count parameter (between 1-1000)
   - Controller calls `createDataInDB` service with the count
   - Service inserts records into PostgreSQL database
   - Created data flows back through the layers to the client as JSON

4. DELETE `/api/data/delete-all`:
   - Route directs to `deleteAllData` controller
   - Controller calls `deleteAllDataFromDB` service
   - Service deletes all records from the product table
   - Response with deletion count flows back to the client as JSON

### Docker Configuration

The application uses Docker Compose to run:
- A Node.js container for the API
- A PostgreSQL container for the database
- Database persistence through a Docker volume