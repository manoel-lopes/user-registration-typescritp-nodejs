import 'reflect-metadata'
import express from 'express'
import { routes } from './routes'

import './db'

const app = express()
const port = 3001

app.use(express.json())
app.use(routes)

app.listen(
  port,
  () => console.log(`The server is running on http://localhost:${port}`))
