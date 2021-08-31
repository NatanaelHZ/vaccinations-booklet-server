const { Router } = require('express');
const userRoutes = require('./userRoutes');
const vaccineRoutes = require('./vaccineRoutes');

const routes = Router();

userRoutes(routes);
vaccineRoutes(routes);

module.exports = routes;
