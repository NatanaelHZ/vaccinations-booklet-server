const { Router } = require('express');

const users = require("../controllers/userController.js");

const routes = Router();

routes.post("/users", users.create);

module.exports = routes;
