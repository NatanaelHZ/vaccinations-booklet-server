'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  class VaccineApplication extends Model {}

  VaccineApplication.init({
    schedule_date: {
      type: Sequelize.DATE,
      allowNull: false
    },
    vaccine_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    is_applied: {
      type: Sequelize.BOOLEAN,
    },
  },{
    sequelize,
    tableName: 'vaccine_applications',
  });

  VaccineApplication.associate = models => {
    VaccineApplication.belongsTo(models.Vaccine, {
      foreignKey: 'vaccine_id',
      as: 'vaccine'
    });
  }

  return VaccineApplication;
};
