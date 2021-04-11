const ini = require('ini')
const fs = require('fs')

const {
  host,
  username,
  password,
  database
} = ini.parse(fs.readFileSync('./env.ini', 'utf-8'))

module.exports = {
  type: 'postgres',
  host,
  username,
  password,
  database,
  entities: ['./src/app/models/**.ts'],
  migrations: ['./src/db/migrations/**.ts'],
  cli: {
    migrationsDir: './src/db/migrations'
  }
}
