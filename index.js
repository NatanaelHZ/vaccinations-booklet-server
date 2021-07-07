require('dotenv').config();
const express = require('express');
const routes = require('./src/routes');
const db = require("./src/models");

const app = express();

app.use(routes);

db.sequelize.sync();

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});

//Código exemplo model
//https://bezkoder.com/node-express-sequelize-postgresql/#Initialize_Sequelize