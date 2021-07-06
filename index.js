require('dotenv').config();
const express = require('express');
const routes = require('./src/routes');

const app = express();

app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
