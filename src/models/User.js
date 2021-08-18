const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },{
    hooks: {
      beforeCreate: (user,  options) => {
        const hash = bcrypt.hashSync(user.password, SALT_ROUNDS);
        user.password = hash;
      }
    },
    indexes: [
      {
        unique: true,
        fields: ['email']
      }
    ]
  });

  return User;
};
