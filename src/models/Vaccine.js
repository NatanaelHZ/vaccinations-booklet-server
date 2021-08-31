'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  class Vaccine extends Model {}

  Vaccine.init({
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },{
    sequelize,
    tableName: 'vaccines',
  });

  Vaccine.associate = models => {
    Vaccine.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
  }

  return Vaccine;
};
