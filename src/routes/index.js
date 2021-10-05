const { Router } = require('express');
const auth = require('../middleware/auth');
const userRoutes = require('./userRoutes');
const vaccineRoutes = require('./vaccineRoutes');

const routes = Router();

userRoutes(routes);
vaccineRoutes(routes,auth);

module.exports = routes;
