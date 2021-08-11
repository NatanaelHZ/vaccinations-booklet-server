const db = require("../models");
const User = db.user;

exports.create = (request, response) => {

  if (!request.body) {
    response.status(400).send({
      message: 'Failed to create new user.'
    });

    return;
  }

  const user = {
    name: request.body.name,
    email: request.body.email,
    password: request.body.password 
  };

  User.create(user).then(data => {
    response.send({
      message: 'Success to create new user.'
    });
  }).catch(error => {
    response.status(500).send({
      message: error.message || 'Erro to create new user'
    });
  });
};
