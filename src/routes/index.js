const { Router } = require('express');
const userRoutes = require('./userRoutes');

const routes = Router();

userRoutes(routes);

module.exports = routes;
