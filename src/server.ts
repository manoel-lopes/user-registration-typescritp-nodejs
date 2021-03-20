const express = require('express')

require('./database')

const app = express()
const port = 3001

app.use(express.json())

app.listen(
    port,
    () => console.log(`The server is running on http://localhost:${port}`))