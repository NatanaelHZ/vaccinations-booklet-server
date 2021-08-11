const UserController = require('../controllers/userController');

module.exports = (routes) => {
  routes.post('/users/login', UserController.login)
};

