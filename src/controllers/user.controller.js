const db = require("../models");
const User = db.user;

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
    return request.json({
      message: 'Success create new user.'
    });
  }).catch(error => {
    return request.status(500).json({
      message: error.message || 'Erro to create new user'
    });
  });
};
