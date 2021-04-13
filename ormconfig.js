module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: ['./src/app/models/**.ts'],
  migrations: ['./src/db/migrations/**.ts'],
  cli: {
    migrationsDir: './src/db/migrations'
  }
}
