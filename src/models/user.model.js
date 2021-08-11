'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

module.exports = (sequelize, Sequelize) => {
  class User extends Model {
    comparePassword(password) {
      return bcrypt.compare(password, this.password);
    }
  }

  User.init({
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
    sequelize,
    tableName: 'users',
    hooks: {
      beforeCreate: (user,  options) => {
        const hash = bcrypt.hashSync(user.password, SALT_ROUNDS);
        user.password = hash;
      }
    }
  });

  return User;
};
