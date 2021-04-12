## NodeJS TypeScript TypeORM and PostgresSQL

REST API developed with NodeJS TypeScript TypeORM and PostgresSQL

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
- Build and run the project
```
npm run dev

or

yarn dev
```
- Create a `.env` on the root of your project with your database access credentials
```
DB_HOST = 'Your host'
DB_USER = 'Your database username'
DB_PASS = 'Your database password'
DB_NAME = 'Your database name'
```
Navigate to `http://localhost:3001` using a API Client for REST like insomnia or postman
