const { Router } = require('express');

const users = require("../controllers/user.controller.js");

const routes = Router();

routes.post("/users", users.create);

module.exports = routes;
