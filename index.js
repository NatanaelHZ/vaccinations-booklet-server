require('dotenv').config()
const express = require('express')
const routes = require('./src/routes');

const app = express()
const port = 3000

app.use(routes);

app.listen(process.env.SERVER, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
