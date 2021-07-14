const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  },{
    hooks: {
      beforeSave: (user,  options) => {
        const hash = bcrypt.hashSync(user.password, SALT_ROUNDS);
        user.password = hash;
      }
    }
  });

  return User;
};
