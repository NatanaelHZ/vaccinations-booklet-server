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
    },
    asked_recovery_password: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },{
    sequelize,
    tableName: 'users',
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
