import { createConnection } from 'typeorm'

createConnection({
  type: 'sqlite',
  database: './src/db/db.sqlite',
  entities: ['./src/app/models/**.ts'],
  migrations: ['./src/db/migrations/**.ts'],
  cli: {
    migrationsDir: './src/db/migrations'
  }
})
