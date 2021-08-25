const UserController = require('../controllers/userController');

module.exports = (routes) => {
  routes.post("/users", UserController.create);
  routes.post('/users/login', UserController.login)
};

