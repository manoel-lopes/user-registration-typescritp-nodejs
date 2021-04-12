## NodeJS TypeScript TypeORM and PostgresSQL

This is a simple REST API to a user registration developed with NodeJS TypeScript TypeORM and PostgresSQL

# Pre-reqs
- Install [Node.js](https://nodejs.org/en/)
- Install [Postgres](https://www.postgresql.org/download/)
- Install [VS Code](https://code.visualstudio.com/)

# Getting started
- Clone the repository
```
git clone https://github.com/manoel-lopes/user-registration-typescript-nodejs.git
```
- Install dependencies
```
cd <project_name>

npm i

or

yarn
```
- Create a `.env` on the root of your project with your database access credentials
```
DB_HOST = 'Your host'
DB_USER = 'Your database username'
DB_PASS = 'Your database password'
DB_NAME = 'Your database name'
```
- Create your database using the terminal
```
psql -U <user>
Password for user postgres: <password>
create database <database_name>;
```
You can also use SQL Shell or pgAdmin to create your database, as your prefer

- Run the migrations to create the project tables
```
npm run typeorm migration:run

or

yarn typeorm migration:run
```
# Start the server
- Run in development mode
```
npm run dev

or

yarn dev
```

## REST Architecture

- List all users - GET: http://localhost:3001/users
If there are registered users on database, it returns an array with all users in JSON format containing the fields id, name, email, created_at and updated_at

- Get a user - GET: http://localhost:3001/users/:id
   
- Create a user - POST: http://localhost:3001/users 
  
- Update a user - GET: http://localhost:3001/users/:id

- Delete a user - GET: http://localhost:3001/users/:id
