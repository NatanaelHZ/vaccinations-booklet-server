const { User } = require("../models");

exports.create = (request, response) => {

  if (!request.body) {
    return response.status(400).json({
      message: 'Failed to create new user.'
    });
  }

  const user = {
    name: request.body.name,
    email: request.body.email,
    password: request.body.password 
  };

  User.create(user).then(data => {
    return response.json({
      message: 'Success to create new user.'
    });
  }).catch(error => {
    return response.status(500).json({
      message: error.message || 'Erro to create new user'
    });
  });
};
